import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/learn/intro">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
              <img src="/img/storage.png" alt="Decentralized Storage" style={{ width: '50px', marginBottom: '1rem' }} />
              <Heading as="h3">Decentralized Storage</Heading>
              <p>Store files securely on IPFS with Hippius pinning, or use our S3-compatible storage for enterprise-grade compatibility.</p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
              <img src="/img/blockchain.png" alt="Blockchain-Powered" style={{ width: '50px', marginBottom: '1rem' }} />
              <Heading as="h3">Blockchain-Powered</Heading>
              <p>Our Substrate blockchain ensures transparency and trust, with staking and rewards for network participants.</p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
              <img src="/img/security.png" alt="Anonymous & Secure" style={{ width: '50px', marginBottom: '1rem' }} />
              <Heading as="h3">Anonymous & Secure</Heading>
              <p>Protect your data with anonymous storage solutions, backed by cryptographic guarantees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Welcome to Hippius"
      description="Hippius is a transparent, decentralized, anonymous cloud storage platform built on a custom Substrate blockchain, leveraging IPFS and S3-compatible storage.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.features}>
          <div className="container">
            <Heading as="h2">Get Started</Heading>
            <ul>
              <li>
                <Link to="/learn/intro">Learn</Link>: Understand Hippius and web3 basics.
              </li>
              <li>
                <Link to="/use/ipfs-website">Use</Link>: Host a website or app on IPFS.
              </li>
              <li>
                <Link to="/earn/staking">Earn</Link>: Stake tokens or run miners to contribute and earn rewards.
              </li>
              <li>
                <Link to="/blockchain/intro">Develop</Link>: Build on Hippius with our developer guides and <Link to="http://api.hippius.io/swagger-ui">API</Link>.
              </li>
            </ul>
            <Heading as="h2">Join the Community</Heading>
            <p>
              Connect with us on <Link to="https://discord.hippius.com">Discord</Link> or follow us on <Link to="https://x.com/hippius_subnet">X</Link> to stay updated and get support.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}