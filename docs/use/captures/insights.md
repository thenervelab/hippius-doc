---
id: insights
title: Insights, Comments and Reactions
sidebar_label: Insights & Comments
slug: /use/captures/insights
description: See how many people opened a Hippius share link, how much of a recording they watched and where they stopped, read their end-to-end encrypted comments and reactions, choose what each link collects, and get emails about your links.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

You sent a recording to your team. Did anyone watch it? Did they get to the part that matters? Insights answer that. For each share link you can see how many times it was opened and by how many people, and for a recording, how much of it each person watched and where people stopped.

The people you send a link to can also leave comments and react with an emoji, right under the screenshot or video. Their comments are end-to-end encrypted, so only people who have the link can read them. Not even Hippius can.

Insights, comments and reactions work for any file you share by link, but they are made for [screenshots and recordings](/use/captures), so that's where they're switched on for you.

:::info Where you'll find them
Insights, comments and reactions are live in the [console](/use/console/shared-links). In the desktop app they arrive in version **0.6.16**, which is available now on the [beta channel](/use/desktop/beta-channel) and comes to everyone with the next release.
:::

## Open a link's Insights

Insights open in a panel on the right, so the list you were looking at stays in view. You can open them from wherever you are:

<Unordered>
  <li><strong>Captures</strong>: in the desktop app, the <BgStyledText>Insights</BgStyledText> button next to a capture that has a link. In the console, <BgStyledText>View insights</BgStyledText> in the capture's row menu.</li>
  <li><strong>Shared Links</strong>: from the link's row.</li>
  <li><strong>The card after a capture</strong>: <BgStyledText>Insights</BgStyledText> in the card's More menu in the desktop app, or <BgStyledText>View insights</BgStyledText> on the card in the console.</li>
  <li><strong>An email about your link</strong>, which takes you straight to it in the console.</li>
</Unordered>

<Screenshot src="/img/desktop/captures/insights-panel.png" alt="The Insights panel in the desktop app next to the Captures page, showing 9 views, 5 people, 71% completion and four comments" dark raw />

In the desktop app, the top of the panel keeps the numbers that matter most: views, how many people watched, how much of the recording they got through on average, and how many comments and reactions there are. Below that, **Comments**, **Viewers** and **Reactions** each have a tab of their own, so a link with dozens of comments stays easy to read. Long comments fold away until you open them, and you can sort them newest or oldest first.

In the console the same information is laid out in one column: the view counts, a chart of where people stopped, the viewers, the comments and the reactions.

<Screenshot src="/img/console/captures/insights.png" alt="The Insights panel in the console with total views, unique viewers, completion rate, a chart of where people stopped, and the viewer list" dark raw />

## What the numbers mean

<Unordered>
  <li><strong>Views</strong>: every time the file was opened from the link. Your own visits don't count.</li>
  <li><strong>Unique viewers</strong>: different browsers that opened it. The same person on their phone and their laptop counts twice.</li>
  <li><strong>Completion</strong>: for each view of a recording, how much of the video was played, averaged over all views. Skipped parts don't count, and parts watched twice count once.</li>
  <li><strong>Average watch time</strong>: how long people watched, on average.</li>
  <li><strong>Where people stopped</strong>: a chart that shows, for each moment of the recording, how many views reached it. A sharp drop tells you where people lost interest or found what they needed. In the desktop app, each commenter appears on the chart at the moment they commented on.</li>
  <li><strong>Viewers</strong>: everyone who watched, with how much they watched and when. People appear as <em>Anonymous viewer</em> (in the desktop app) or <em>Someone</em> (in the console) unless they commented under a name.</li>
</Unordered>

Screenshots and other pictures get views and viewers, but no completion or chart, since there is nothing to play.

## Comments and reactions

When comments are on, people who open your link see a comment box under the screenshot or video and can read what others wrote. Anyone with the link can read the comments, and posting one needs a Hippius account. Reactions work the same way: anyone can see them, and reacting needs an account.

A comment on a recording shows the moment in the video it was written at, so you know which part someone is talking about.

You stay in charge of what appears under your link. Open a comment's menu in Insights to:

<Unordered>
  <li><strong>Delete</strong> the comment. It disappears for everyone.</li>
  <li><strong>Block</strong> the person who wrote it from commenting and reacting on this link. Their earlier comments stay until you delete them.</li>
</Unordered>

## Choose what each link collects

Every file link has three switches:

<Unordered>
  <li><strong>Insights</strong>: count views and watch time. People who open the link see a short note saying the owner can see how many people viewed it.</li>
  <li><strong>Comments</strong>: let people comment on the link.</li>
  <li><strong>Reactions</strong>: let people react with an emoji.</li>
</Unordered>

You'll find them in the share dialog when you make a link, and later in the link's Insights: behind the gear at the top of the panel in the desktop app, or under **Link settings** in the console. Changes apply straight away. Turning one off stops new views, comments or reactions from being added, and what was already collected stays in your Insights.

<Screenshot src="/img/desktop/captures/link-settings.png" alt="Link settings opened from the gear in the Insights panel, with Insights, Comments and Reactions switched on" dark raw />

### Where the switches start

<Unordered>
  <li><strong>Screenshots and recordings on a paid Drive plan</strong>: all three start on, so every capture you share comes with Insights from the first view.</li>
  <li><strong>Other files</strong>: all three start off. Turn them on when you share the file if you want them.</li>
  <li><strong>On the Free plan</strong>: in the desktop app (0.6.16), new links start with all three off, and turning one on shows an upgrade prompt. Links that already have one on keep it, and you can always turn it off. Insights on the Free plan still show how many views a link has had and by how many people; completion, the chart and the viewer list come with paid plans.</li>
</Unordered>

In the desktop app, **Track views, comments and reactions** in [Settings, under Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording) decides where the switches start for your captures.

:::note In the console today
The console currently starts all three switches on for the screenshots and recordings you take there, on every plan, and off for other files. On the Free plan, the counts you can see are the same as in the desktop app: views and viewers, with the rest behind an upgrade. Matching the desktop app's Free plan defaults is coming soon.
:::

## Emails about your links

Hippius can email you when something happens to your links, so you don't have to keep checking:

<Unordered>
  <li><strong>First views</strong>: an email when one of your links is opened for the first time.</li>
  <li><strong>New comments</strong>: an email when people comment on your links. Comments are encrypted, so the email says how many there are, not what they say.</li>
  <li><strong>Summary</strong>: a daily or weekly round-up of views and comments across all your links, or none.</li>
</Unordered>

Choose them in the desktop app under [Settings, Notifications](/use/desktop/settings#notifications) (version 0.6.16), or in the console under [Settings, Share link emails](/use/console/settings#share-link-emails). Each email also has a link to stop that kind of email. These emails are rolling out, so if you don't see the settings yet, they're on their way.

<Screenshot src="/img/desktop/captures/settings-link-emails.png" alt="Emails about your links in the desktop app's notification settings, with First views, New comments and a weekly Summary" dark raw />

## Privacy

Share links are public: anyone who has the full link can open the file. Insights, comments and reactions follow the same idea, with as little as possible visible to Hippius.

<Unordered>
  <li><strong>Comments and names are end-to-end encrypted.</strong> They're encrypted with a key that comes from the link itself, the part after the <code>#</code> that browsers never send to a server. Only people with the link can read them. Hippius stores the encrypted text and can't read it, which is also why comment emails only give a count.</li>
  <li><strong>Reading comments on a new device.</strong> To show you the comments, Hippius needs the link's key on the device you're using. The desktop app recovers it from your account when it can, and tells you if it can't. In the console, if the key isn't in your browser yet, Insights asks you to unlock with your password first, the same <a href="/use/console/unlock-password">unlock password</a> that opens your Drive.</li>
  <li><strong>Password-protected links</strong> keep their comments on the link's own page. Open the link with its password to read them.</li>
  <li><strong>Views are anonymous.</strong> A view is counted with a random ID kept in the viewer's browser. There's no account and no IP address attached to it, and only numbers are kept, never what was on screen.</li>
  <li><strong>Reactions and view counts are not encrypted.</strong> Hippius can see which emoji were chosen and how many times a link was viewed, because it has to count them. It still can't see the file.</li>
</Unordered>

If a link reaches someone it shouldn't, revoke it in Shared Links. From then on nobody can open the link, its comments or its reactions. See [Share links for captures](/use/captures/share-links#turn-a-link-off).

## Where to go next

<Unordered>
  <li><a href="/use/captures/share-links">Share links for captures</a>: who can open them, chat previews, and turning a link off.</li>
  <li><a href="/use/captures/plans">Free and paid plans</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
