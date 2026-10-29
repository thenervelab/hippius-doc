---
id: edit
title: Edit a Screenshot
sidebar_label: Edit a Screenshot
slug: /use/captures/edit
description: Mark up a screenshot or any picture in your Hippius Drive with arrows, shapes, text, highlights, numbered steps, blur and pixelate, crop it, then save a copy or replace the original.
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';
import BgStyledText from '@site/src/components/BgStyledText';
import Screenshot from '@site/src/components/Screenshot';

A screenshot often needs a little help: an arrow to the button that matters, a box around the error, or a blur over a name you shouldn't be sending. The Hippius editor does that without leaving Hippius, and the edited picture stays encrypted like everything else.

You can edit any PNG or JPEG in your drives, not just screenshots. The console opens WebP pictures too.

## Open the editor

<Unordered>
  <li><strong>In the console</strong>: open the row menu of a picture in Captures or any drive and choose <BgStyledText>Edit</BgStyledText>. You may be asked for your unlock password first, because the picture is decrypted on your computer to be drawn on.</li>
  <li><strong>In the desktop app</strong>: choose <BgStyledText>Edit image</BgStyledText> from a picture's menu in Drive or Captures, press <BgStyledText>Edit</BgStyledText> in the viewer, click the picture on the card right after a screenshot, or click the arrow on the Screenshot tile in your menu bar (the system tray on Windows and Linux) and choose <strong>Annotate an image</strong> to open any picture on your computer.</li>
</Unordered>

In the desktop app you can edit pictures in your own drives. In the console you can also edit pictures in a drive shared with you, as long as you're an Editor or a Manager there; Viewers aren't offered Edit.

## The tools

| Tool | Key | Good for |
|---|---|---|
| **Select and move** | V | Picking up, moving and resizing anything you've drawn |
| **Crop** | K | Cutting the picture down, freely or to a shape such as 1:1, 4:3 or 16:9 |
| **Arrow** | A | Pointing at the thing that matters |
| **Line** | L | Underlining or connecting |
| **Rectangle** and **Ellipse** | R, E | Drawing a box or a circle around something |
| **Text** | T | Adding a note |
| **Pen** | D | Drawing freehand (in the console) |
| **Highlighter** | M | Marking text the way a highlighter pen would |
| **Numbered step** | C | Numbered dots for step-by-step instructions |
| **Blur** and **Pixelate** | B, P | Hiding names, email addresses, passwords or anything private |

<Screenshot src="/img/console/captures/editor.png" alt="The screenshot editor with a rectangle and an arrow drawn on a screenshot" dark raw />

Each tool can take a colour and a thickness (thin, medium or thick). Undo and redo work as you'd expect.

:::tip Hide private things properly
Use **Blur** or **Pixelate** rather than drawing a box over something. They change the picture's pixels, so what's underneath is gone from the saved file, not just covered.
:::

## Save your edits

When you save, Hippius asks how:

<Unordered>
  <li><strong>Save as a copy</strong> (the default) adds a new picture next to the original, with <code>(edited)</code> in its name, for example <code>Screenshot 2026-10-12 at 14.03.11 (edited).png</code>. The original, and any link to it, stay as they were.</li>
  <li><strong>Replace the original</strong> writes over the picture.</li>
</Unordered>

:::info An existing link keeps the old picture
A share link is its own copy of the file, made when the link was created. If you replace a picture that already has a link, that link still shows the picture as it was. To share the edited version, share it again (and revoke the old link if you don't want the old picture out there).

There's one exception. In the desktop app, when you open the editor from the card right after a screenshot and choose **Replace the original**, the edited picture gets a new link and the old link stops working. The save dialog says so before you save: *It gets a new link, and the old link stops working.*
:::

That's why **Save as a copy** is the default: the copy gets its own link when you share it, and nothing you've already sent changes under anyone's feet.

In the desktop app you can skip the question. In [Settings, Screenshots &amp; Recording](/use/desktop/settings#screenshots--recording), **When saving an edited image** can be set to **Ask**, **Save a copy** or **Replace the original**. Picking **Remember my choice** in the save dialog sets the same thing.

A picture you open with **Annotate an image** from outside your drives is saved as a new screenshot with its own link, and the file on your computer is left as it was.

## Where to go next

<Unordered>
  <li><a href="/use/captures/share-links">Share links for captures</a></li>
  <li><a href="/use/captures/screenshots">Take a screenshot</a></li>
</Unordered>
