---
id: kubernetes-backups
title: Kubernetes Backups
sidebar_label: Backups
slug: /use/compute/kubernetes-backups
description: Automatic backups of a Hippius managed Kubernetes cluster. etcd snapshots sealed to your cluster key and daily Velero backups encrypted in the cluster, both stored in your own Hippius S3. Download and decrypt snapshots, and restore Velero backups into any cluster.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';

A managed cluster can back itself up automatically into your own Hippius S3 account: snapshots of its etcd database, and Velero backups of your workloads and their volumes. Both are encrypted inside the cluster, with keys only you hold, before they reach S3. This page explains what is backed up, and how to get your data back.

## Turn on backups

Backups are chosen when you create the cluster: **Automatic backups to your Hippius S3** in the **Add-ons** step, on by default. **They can only be turned on at creation.** A cluster created without them can't get them later: back up your workloads yourself, or create a new cluster with backups on.

Backups need a Hippius S3 account. If you don't have one, [set it up first](/use/console/s3). The cluster creates two buckets in it, one for etcd snapshots and one for Velero, named like `hippius-k8s-ID-xxxxxxxx-etcd` and `hippius-k8s-ID-xxxxxxxx-velero`. You can't delete them while the cluster can still write to them.

Backups are billed as S3 storage in your account, on top of the cluster's compute.

:::info Why Hippius can't read your backups
The buckets are in your S3 account, which Hippius operates. What protects your backups is the encryption done inside the cluster's confidential VMs, with keys sealed to your cluster key. Without your key file, nobody can open them.
:::

## What is backed up

| | etcd snapshots | Velero backups |
|---|---|---|
| **Contents** | The cluster's state: every Kubernetes object, including Secrets. | Your workloads in every namespace except Velero's own, with their persistent volumes. |
| **Schedule** | Every 6 hours. The first about 15 minutes after the cluster is ready. | Daily at 03:00 UTC. |
| **Kept** | The newest 14. | 7 days each. |
| **Encryption** | Each snapshot has its own random key, sealed to your cluster key, and is signed by the cluster. | Contents and names are encrypted in the cluster before they reach S3. |
| **To open it** | Your cluster key file, in the console. | The backup keys file, which only your cluster key can open. |

The **Backups** panel on the cluster's page shows both, and lists a problem if one needs attention, for example **the last etcd snapshot failed** or **Velero is not backing up**.

## Download and decrypt an etcd snapshot

<Ordered>
  <li>On the cluster's page, in the <strong>Backups</strong> panel, click <strong>Load key file</strong> and choose your <code>hippius-cluster-NAME.key</code>.</li>
  <li>In the <strong>etcd snapshots</strong> table, click <BgStyledText>Download & decrypt</BgStyledText> on the snapshot you want.</li>
</Ordered>

The console checks the cluster's signature and the checksum, decrypts the snapshot in your browser, and saves it as a `.db` file. Neither your key nor the snapshot is sent anywhere.

The file is a standard etcd snapshot. Inspect it with:

```bash
etcdutl snapshot status SNAPSHOT.db
```

The console can't restore a whole cluster from a snapshot yet. You can restore it yourself with RKE2's `--cluster-reset-restore-path`, which also needs the cluster's server token from the **Kubeconfig** panel. See [Get your kubeconfig](/use/compute/kubernetes#get-your-kubeconfig).

## Get the Velero backup keys

The Velero backups are encrypted with keys the cluster seals to your cluster key. To restore them anywhere, download those keys:

<Ordered>
  <li>In the <strong>Backups</strong> panel, load your key file.</li>
  <li>Click <BgStyledText>Download backup keys</BgStyledText>. You get <code>NAME-velero-keys.json</code>.</li>
</Ordered>

The file holds the S3 `endpoint`, the Velero `bucket`, and three passwords: `rclone_crypt_password`, `rclone_crypt_salt` and `kopia_repository_password`. Store it like your key file.

The keys are available a few minutes after the cluster is ready, once Velero is set up.

## Restore Velero backups into a cluster

You can restore the Velero backups into any Kubernetes cluster, including one that isn't on Hippius. The backups are read through rclone, which decrypts the bucket and serves it to Velero as plain S3.

You need:

<Unordered>
  <li>the backup keys file, <code>NAME-velero-keys.json</code>;</li>
  <li>an S3 access key and secret of yours with access to the bucket (<code>YOUR_ACCESS_KEY</code>, <code>YOUR_SECRET_KEY</code>), from the <a href="/use/console/s3">S3 page</a>;</li>
  <li>a recent <a href="https://rclone.org/downloads/">rclone</a>, <code>kubectl</code>, and Velero or its Helm chart.</li>
</Unordered>

### 1. Serve the decrypted bucket with rclone

On a machine the target cluster can reach, run these three commands, filling in `endpoint`, `bucket` and the passwords from your keys file:

```bash
rclone config create hippius s3 provider=Other endpoint=ENDPOINT region=auto force_path_style=true access_key_id=YOUR_ACCESS_KEY secret_access_key=YOUR_SECRET_KEY
rclone config create vault crypt remote=hippius:BUCKET password='RCLONE_CRYPT_PASSWORD' password2='RCLONE_CRYPT_SALT'
rclone serve s3 vault: --addr 0.0.0.0:8080 --auth-key 'restoreak,restoresk'
```

`rclone config create` stores the two crypt passwords in rclone's obscured form for you. The last command serves the decrypted backups as S3 on port 8080, with the access key `restoreak` and secret `restoresk`.

:::warning Don't expose this server to the internet
Anyone who reaches port 8080 with those credentials can read your decrypted backups. Run it on a private network, or limit port 8080 to the target cluster with a firewall, change the `--auth-key` pair to your own values, and stop it once the restore is done.
:::

### 2. Point Velero at it and restore

In the cluster you restore into, create the repository password before you install Velero. Replace `HOST` with the address of the machine running rclone:

```bash
kubectl create namespace velero
kubectl -n velero create secret generic velero-repo-credentials \
  --from-literal=repository-password='KOPIA_REPOSITORY_PASSWORD'
```

Then install Velero with a backup storage location that points at the rclone server, for example with these values for the Velero Helm chart:

```yaml title="velero-values.yaml"
initContainers:
  - name: velero-plugin-for-aws
    image: velero/velero-plugin-for-aws:v1.14.4
    volumeMounts:
      - mountPath: /target
        name: plugins
deployNodeAgent: true
snapshotsEnabled: false
configuration:
  uploaderType: kopia
  backupStorageLocation:
    - name: default
      provider: aws
      bucket: velero
      default: true
      config:
        region: auto
        s3ForcePathStyle: "true"
        s3Url: http://HOST:8080
        checksumAlgorithm: ""
credentials:
  secretContents:
    cloud: |
      [default]
      aws_access_key_id=restoreak
      aws_secret_access_key=restoresk
```

Compared with the recipe the console shows, these values also add Velero's AWS plugin (needed by `provider: aws`) and the node agent (needed to restore the persistent volumes, which are backed up with Kopia). The cluster's own Velero uses Velero 1.18 with plugin v1.14.4. The bucket is `velero`: that is its name inside the decrypted view rclone serves.

For example, with the Helm chart:

```bash
helm repo add vmware-tanzu https://vmware-tanzu.github.io/helm-charts
helm install velero vmware-tanzu/velero --namespace velero -f velero-values.yaml
```

Once Velero is running, list the backups and restore one:

```bash
velero backup get
velero restore create --from-backup BACKUP_NAME
```

## After you delete a cluster

When you delete a cluster, the access keys its masters used to write to the backup buckets are revoked. Empty buckets are deleted. **Buckets that hold backups are kept in your S3 account** and billed as S3 storage until you delete them.

:::warning Download what you need before you delete
The console opens snapshots and the backup keys from the cluster's page, which is gone once the cluster is deleted. Before you delete a cluster, download its Velero backup keys and any etcd snapshot you want to keep. With the keys file, you can restore the retained Velero backups with the steps above at any time.
:::
