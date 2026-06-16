---
id: support
title: Help & Support
sidebar_label: Help & Support
slug: /use/console/support
description: 4
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import BgStyledIconWithText from '@site/src/components/BgStyledIconWithText';

## Introduction

The **Help & Support** page is your direct line to our team. If you hit a bug, have a billing question, or run into something the docs don't cover, open a ticket here. We'll reply inside the ticket and you'll see our messages the next time you load the page.

Reach Help & Support from the sidebar at <BgStyledIconWithText text="Help & Support" icon="HelpCircle" /> (in the Support section).

![Support page](/img/console/support/overview.png)

## Opening a Ticket

Click <BgStyledText>+ New Ticket</BgStyledText> in the top right corner to open the **Create a Ticket** dialog.

<Ordered>
  <li>Enter a clear, one line <strong>Subject</strong>, for example <em>"Upload stuck in processing after several minutes"</em>.</li>
  <li>Pick a <strong>Ticket Category</strong> from the dropdown (see the categories below).</li>
  <li>Pick a <strong>Ticket Severity</strong>: <strong>Low</strong> (minor issue, question, or feature request), <strong>Medium</strong> (affects you but you have a workaround), or <strong>High</strong> (blocking: you can't use the platform, data loss, or a security concern).</li>
  <li>Describe the problem in the <strong>Description</strong> field. Include what you were doing, what you expected to happen, what actually happened, any error text, and your browser, OS, and the approximate time.</li>
  <li>(Optional) Click the attachment icon to add a screenshot, log file, or other supporting file.</li>
  <li>Click <BgStyledText>Create Ticket</BgStyledText>.</li>
</Ordered>

![Create ticket modal](/img/console/support/create-ticket.png)

### Ticket Categories

<Unordered>
  <li><strong>Account & Billing</strong>: credits, subscriptions, payments, or account access issues.</li>
  <li><strong>Storage (My Files & S3)</strong>: uploads, downloads, encryption, S3 client errors, or sync problems.</li>
  <li><strong>General</strong>: feature questions, feedback, and anything else not covered above.</li>
</Unordered>

The new ticket appears at the top of your tickets table in the **Open** state, and our team is notified immediately.

:::tip Be specific: it helps us help you faster
Include your browser and OS, the exact time the issue occurred, and a screenshot if you have one. The more context you give, the faster we can diagnose and fix the problem.
:::

## Your Tickets

All your tickets appear in a table with the subject, category badge, status, and date of the last update. Use the filter pills above the table to show only tickets with a specific status:

<Unordered>
  <li><strong>All</strong>: every ticket regardless of status.</li>
  <li><strong>Open</strong>: newly created, waiting on our team.</li>
  <li><strong>In Progress</strong>: someone on our team is actively working on it.</li>
  <li><strong>Awaiting Response</strong>: we've replied and are waiting on your input.</li>
  <li><strong>Closed</strong>: resolved tickets.</li>
</Unordered>

Click any row to open the full ticket conversation.


## Reading and Replying to a Ticket

Clicking a ticket opens the **Ticket Messages** dialog, which shows the full conversation thread from oldest to newest. Your messages and team replies are styled differently so they're easy to tell apart. Attachments appear inline with download links.

To reply:

<Ordered>
  <li>Type your message in the <strong>Start typing</strong> field at the bottom.</li>
  <li>(Optional) Click the attachment icon to add files. They appear as chips above the input with an X to remove them.</li>
  <li>Click the <BgStyledText>Send</BgStyledText> arrow.</li>
</Ordered>

Your reply is added to the thread. If the ticket was **Awaiting Response**, the status moves back to **In Progress** and our team is notified.

You cannot reply on a closed ticket. The input field is disabled with a notice explaining this.

![Ticket messages dialog](/img/console/support/messages.png)

## Closing a Ticket

If your issue is resolved, you can close the ticket yourself:

<Ordered>
  <li>From the tickets table, open the action menu on the row and click <BgStyledText>Close Ticket</BgStyledText>, or open the ticket and click the close icon in the dialog header.</li>
  <li>Confirm in the <strong>Close Ticket</strong> dialog.</li>
</Ordered>


Closed tickets stay visible in the table and can be filtered with the **Closed** pill. They cannot be reopened. If the same issue comes back, create a new ticket and reference the old one in the description.

## Other Ways to Reach Us

For quick questions, community discussion, or contributing to open source Hippius repos:

<Unordered>
  <li><strong>Discord</strong>: the fastest way to get a reply from a human.</li>
  <li><strong>GitHub</strong>: bug reports and pull requests for Hippius open source projects.</li>
</Unordered>

## Where to next

<Unordered>
  <li><a href="/use/console/getting-started">Getting Started</a>: signing in and navigating the console.</li>
  <li><a href="/use/troubleshooting">S3 Troubleshooting</a>: common S3 client errors and self serve fixes.</li>
</Unordered>
