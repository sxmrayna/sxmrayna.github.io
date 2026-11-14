---
layout: project
illustration: knowledge
title: AI-powered personal knowledge base
description: I built a way to bring years of Logseq notes into an AI conversation, then save what’s worth keeping back to the same knowledge base.
context: Personal project
permalink: /projects/personal-knowledge-base/
---

## Finding an idea I’ve already written down

I often remember a useful idea before I remember where I wrote it down. When I was preparing for a conversation or revisiting something I’d learned, I would open several notes and assemble the context again. I connected [Logseq](https://logseq.com/) to an AI agent so I could start with the task in front of me and bring the relevant notes into that conversation.

## A walkthrough with fictional notes

Imagine I’m preparing for a product discussion about simplifying onboarding. I can ask the assistant to find relevant notes, look at the excerpts it found, and use them to draft a short brief. A line from a usability note can inform the discussion, and a planning note can help turn it into a question for the team. I review the brief before saving it.

{% include knowledge-demo.html %}

## How I designed the workflow

I built a Logseq plugin and an integration for the AI agent through the Model Context Protocol (MCP). The integration lets the agent search selected areas of my knowledge base and show excerpts with their sources. I can compare those excerpts with what the agent drafts and check if a suggestion has support in my notes.

When I ask to save something, the agent sends it to a draft inbox in the Logseq plugin. I can preview the full draft there and choose what to import. I chose to make that preview a separate step because a working draft can be useful during a conversation even when I only want to keep part of it. The import preserves the note’s structure. A brief stays an outline, and terms or expressions can become flashcards with the examples I want to practice.

## Where I use it

- **Meeting support.** I use earlier notes to prepare a brief, then keep the decisions or phrasing I’ll need later.
- **Language practice.** I pick expressions from past notes, try saying them aloud in a new scenario and save useful corrections and examples as flashcards.
- **Personal reflection.** I pull up a dated excerpt about a similar experience, compare it with how I see things now and decide whether to save a new journal entry.
