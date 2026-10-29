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

Insights, comments and reactions work for any file you share by link. For [screenshots and recordings](/use/captures) on a paid plan, they're switched on for you.

## Open a capture's Insights

Insights open in a panel on the right, so the list you were looking at stays in view. In **Captures**, click <BgStyledText>Insights</BgStyledText> on a capture's row, or choose <BgStyledText>View insights</BgStyledText> from its row menu. The button shows how many views the capture's link has had, for example **12 views**, or **Insights off** when the link isn't counting views.

You can also open them from the link's row in **Shared Links**, from the card right after a capture (in its More menu in the desktop app, <BgStyledText>View insights</BgStyledText> right on the card in the console), and from any email about your link, which takes you straight there in the console.

### A capture without a link yet

In the desktop app, every screenshot and recording on the Captures page has the Insights button, even one that has no share link yet. That happens when you've turned off **Copy a share link after capture**, for example. On those captures the button is grey, and the panel explains that Insights start once the capture has a share link.

Click <BgStyledText>Create link</BgStyledText> and Hippius makes the link, copies it to your clipboard and shows its Insights right there in the panel. Views, comments and reactions are switched on for the new link where your plan includes them. On the Free plan they start off, as they do for every link (see [Where the switches start](#where-the-switches-start)).

If you shared a capture from somewhere else, such as the [browser extension](/use/browser-extension), the console or another computer, the desktop app finds that link too. It shows on the capture's row, and Insights open for it.

### From the menu bar

In the desktop app's menu bar window (the system tray on Windows and Linux), open a capture's menu and choose <BgStyledText>View insights</BgStyledText>, right after **Share via link…**. Hippius opens on the Captures page with that capture's Insights already open, ready for you to read the comments or make a link.

<Screenshot src="/img/console/captures/captures-insights-button.png" alt="The Captures page in the console, with a 9 views button on a recording's row that opens its Insights" dark raw />

The panel shows the headline numbers first (views, people and how much they watched, with how many comments and reactions there are), then the comments, viewers and reactions, each on its own tab, so a link with dozens of comments stays easy to read. In the console the panel opens on Comments when there are some, and a row of pills under the file name shows which of Insights, Comments and Reactions are on for the link.

<Screenshot src="/img/desktop/captures/insights-panel.png" alt="The Insights panel in the desktop app next to the Captures page, showing 9 views, 5 people, 71% completion and four comments" dark raw />

<Screenshot src="/img/console/captures/insights.png" alt="The Insights panel in the console with 9 views, 4 people viewed, completion and average watch, then the Viewers tab with a chart of where people stopped and the viewer list" dark raw />

## What the numbers mean

<Unordered>
  <li><strong>Views</strong>: every time the file was opened from the link. Your own visits don't count while you're signed in to the console in that browser. Open your link in a browser where you aren't signed in, a private window for example, and that visit counts like anyone else's.</li>
  <li><strong>Unique viewers</strong>: different browsers that opened it. The same person on their phone and their laptop counts twice.</li>
  <li><strong>Completion</strong>: for each view of a recording, how much of the video was played, averaged over all views. Skipped parts don't count, and parts watched twice count once.</li>
  <li><strong>Average watch time</strong>: how long people watched, on average.</li>
  <li><strong>Where people stopped</strong>: a chart that shows, for each moment of the recording, how many views reached it. A sharp drop tells you where people lost interest or found what they needed. Each commenter appears on the chart at the moment their comment is about.</li>
  <li><strong>Viewers</strong>: everyone who watched, with how much they watched and when. You don't see who they are: each one shows as <em>Anonymous viewer</em>, unless they also left a comment under their name in the same browser, which puts that name on their views.</li>
</Unordered>

Screenshots and other pictures get views and viewers, but no completion or chart, since there is nothing to play.

## Comments and reactions

When comments are on, people who open your link see the comments in a panel beside the screenshot or video (below it on a phone), with a box to add their own. Anyone with the link can read the comments, and posting one needs a Hippius account.

People comment under their account's name, or leave it off: the **Posting as** menu next to the box offers their name (*Shown to the owner and anyone with the link*) or **Anonymous viewer** (*Your name isn't shown with this comment*). Someone who signs in with an access key has no name of their own, so they show as a short form of their account address, such as <code>5dsqam…sk63</code>, on the link's page and in your Insights. Since every comment needs a sign-in, Hippius knows which account posted it, even when it shows as Anonymous viewer. Only the name, or Anonymous viewer, is shown to you and to other viewers.

People can also reply to a comment, and a reply you post on your own link carries an **Owner** badge.

Reactions sit in a row of chips under the file: all eight of them (👍 ❤️ 😂 😮 🎉 👏 🔥 🙌), always in the same order, each with how many people picked it once someone has. One tap adds your reaction, and tapping it again takes it back. Anyone with the link sees the counts, but not who reacted. Viewing the link needs no account, while reacting needs a sign-in, the same as commenting.

A comment on a recording shows the moment in the video it was written at, so you know which part someone is talking about. On the link's page it also sits on the video's timeline, and clicking it plays the video from that moment.

You stay in charge of what appears on your link. From a comment's menu in Insights you can delete it for everyone, or block its author from commenting and reacting on this link, and **Unblock** undoes it. Their earlier comments stay until you delete them.

<Screenshot src="/img/console/captures/insights-comments.png" alt="The Comments tab of the console's Insights panel, with comments from Sam, Robin and Jordan at moments in the recording, a reply from the owner, and the reaction totals in the summary" dark raw />

### Mention someone in a comment

To get someone's attention in a comment or a reply, type `@` and pick them from the list that appears. You can tag the link's owner and anyone who has commented under a name. The owner shows as **Owner** until they've replied under their own name, and people who commented anonymously can't be tagged.

When someone tags you as the owner, you see it in Insights, in the console and in the desktop app: the mention is highlighted, the comment says **Mentioned you**, and a **Mentions you** filter next to the sort shows only the comments that mention you. Who was tagged is sealed inside the encrypted comment along with the words, so Hippius can't see it either.

## Choose what each link collects

Each link has three switches: **Insights** (counting views and watch time), **Comments** and **Reactions**. When Insights is on, people who open the link see a short note on the page: *The owner can see who viewed*. What you actually see is how many views and viewers the link had, and a name only for people who commented under their name.

You'll find them in the share dialog when you make a link, and later in the link's Insights, behind the gear at the top of the panel (**Link settings**). In the console, clicking any of the pills under the file name opens them too. Changes apply straight away. Turning one off stops new views, comments or reactions from being added, and what was already collected stays in your Insights.

<Screenshot src="/img/desktop/captures/link-settings.png" alt="Link settings opened from the gear in the Insights panel, with Insights, Comments and Reactions switched on" dark raw />

### Where the switches start

| | Desktop app | Console |
|---|---|---|
| Screenshots and recordings, paid plan | On | On |
| Screenshots and recordings, Free plan | Off | Off |
| Other files, any plan | Off | Off |

On the Free plan, turning a switch on shows an upgrade prompt instead, *Insights, comments and reactions are available on paid Drive plans*, with an **Upgrade** button. Links that already have one on keep it, and you can always turn it off. Insights on the Free plan show how many views a link has had and by how many people; completion, the chart and the viewer list come with paid plans. In the console, a Free plan link that isn't counting views shows the upgrade card in its Insights instead of numbers.

In the desktop app, **Track views, comments and reactions** in [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording) decides where the switches start for your captures.

## Emails about your links

Hippius can email you when something happens to your links, so you don't have to keep checking. You can get an email when a link is opened for the first time, and another when people comment (comments are encrypted, so it says how many there are, not what they say). There's also a daily or weekly summary of views and comments across all your links, if you'd like one.

Choose them in the console under [Settings, Share link emails](/use/console/settings#share-link-emails), or in the desktop app under [Settings, Notifications](/use/desktop/settings#emails-about-your-links). Each email also has a link to stop that kind of email.

<Screenshot src="/img/desktop/captures/settings-link-emails.png" alt="Emails about your links in the desktop app's notification settings, with First views, New comments and a weekly Summary" dark raw />

## Privacy

Share links are public: anyone who has the full link can open the file. Insights, comments and reactions follow the same idea, with as little as possible visible to Hippius.

**Who can read comments.** Comments, the names people comment under and who they tag are encrypted with the link's key, the part after the `#` that browsers never send to a server. Anyone with the link can read them, and Hippius can't. That's also why comment emails only tell you how many there are. Hippius does know which account posted each comment, because posting needs a sign-in, and that includes comments posted as Anonymous viewer.

**Reading them on a new device.** Hippius needs that key again before it can show you the comments. The console looks for it wherever your browser already has it: the tab you made the link in, your Drive if it's unlocked, another console tab you have open, or the browser extension when you open Insights from it. When it finds the key, the comments open straight away, with no password. Only when none of those has it does Insights ask for your [unlock password](/use/console/unlock-password), the same one that opens your Drive. The desktop app finds the key in your account by itself. If it can't, a comment shows as *This comment couldn't be read*, and opening the full link in your browser still shows every comment on the link's own page. Comments on a link with a password are only shown on that page, after the password.

**What isn't encrypted.** Reactions, the moment in a recording each reaction was added at, and view counts. Hippius has to count them, so it can see which emoji were picked and where, and how many views a link had, but never the file. Only numbers are kept, never what was on screen.

**How viewers are counted.** A view carries no account or IP address, only a random ID kept in the viewer's browser. That browser sends the same ID to every Hippius link it opens, so the ID isn't private to one link. If someone comments under their name in the same browser, their name appears next to their views in your Insights.

If a link reaches someone it shouldn't, turn it off in Shared Links. From then on nobody can open the link, its comments or its reactions. See [Share links for captures](/use/captures/share-links#turn-a-link-off).

## Where to go next

<Unordered>
  <li><a href="/use/captures/share-links">Share links for captures</a>: who can open them, chat previews, and turning a link off.</li>
  <li><a href="/use/captures/plans">Free and paid plans</a></li>
  <li><a href="/use/captures/troubleshooting">Troubleshooting &amp; FAQ</a></li>
</Unordered>
