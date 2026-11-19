---
layout: project
illustration: knowledge
title: AI-Powered Personal Knowledge Base
description: I independently designed and developed a Logseq plugin and MCP integration around my own work, learning and everyday life, with source-linked retrieval and reviewed note imports.
context: Personal project
permalink: /projects/personal-knowledge-base/
---

I designed and developed this project end to end, starting from recurring needs in my own work, learning and everyday life. It connects the AI tools I use with my personal knowledge base, so useful ideas can move from a conversation into notes and back into future tasks.

I hope this approach could be insightful for people with similar needs for connecting their own tools and knowledge to make their work, learning and everyday life easier.

## Understanding first, organising afterwards

When I’m learning something new, I move between articles, videos, screenshots and questions. I want to follow the ideas and ask follow-up questions while they are still fresh. Afterwards, I ask the AI agent to organise the useful material, explanations and my own observations into structured notes, with sources and examples attached.

Using my existing Markdown notes as examples, the agent follows my usual headings, nesting and format while adapting the content to each request. It prepares a draft for Logseq import, so I spend less time organising notes and more time learning.

I built a <a href="https://logseq.com/" target="_blank" rel="noopener" style="color: #527761;"><strong>Logseq</strong> {% include new-tab-arrow.html %}</a> plugin and a shared Model Context Protocol (MCP) bridge. The bridge gives AI agents tools to search saved notes, read source excerpts and submit structured drafts. The plugin lets me preview and confirm those drafts before they enter my knowledge base.

## Applying past learning to a new task

Later, I might need to prepare a product discussion, investigate a business problem or learn how to build a new workflow. I describe the context, the output I need and a few keywords I remember from earlier learning.

The agent searches Logseq for relevant notes and passages, then researches additional material where the task needs it. It brings those resources together into a brief, plan or explanation organised around the request. References link back to the saved notes and external sources, so I can follow an idea to its origin and check how it applies.

## A walkthrough with fictional notes

Imagine I’m learning about onboarding. I read an article about progressive disclosure, collect a screenshot and discuss which settings a new user needs to see first. At the end, I ask the agent to organise the concept, example and open question into a Logseq note that follows my usual format.

Later, I’m preparing a product discussion about users getting stuck during account setup. I remember the keywords “progressive disclosure” and “first setup step”. The agent finds the relevant learning and usability notes, adds research on communicating progress, and drafts a discussion brief with sources attached. I review the proposed changes and questions, then decide which parts to keep for future work.

{% include knowledge-demo.html %}

## How I designed and engineered the workflow

{% include knowledge-integration-map.html %}

**Source-linked retrieval.** I implemented block-level keyword search over selected Logseq folders. Results include the page, parent context, an excerpt and a link to the original note; the agent can request a longer passage using a result ID. This gives a summary an inspectable source and keeps retrieval separate from the agent’s interpretation.

**Native note structure.** Existing notes or templates guide the draft’s layout. I built the importer to turn headings and nested lists into Logseq blocks, retaining source references and supporting selected attachments. The draft preview lets me review the complete outline before importing it, with useful explanations, examples and images kept together.

**Recoverable imports.** I store drafts durably, detect repeated submissions and track import acknowledgements. The plugin checks the active graph and existing import markers before writing, so a retry can recognise a note that was already saved. These details matter when an interruption leaves the agent, bridge and plugin with different views of what completed.

**Local storage and scoped access.** The graph and draft inbox are stored on my machine. I constrain search to selected folders and authenticate the local connection between the bridge and plugin. The agent receives the requested note excerpts for its reasoning.

**A reusable integration with regression checks.** I separated shared note access and draft handling from the workflows that use them, so learning, work preparation and reflection can reuse the same integration. Automated tests cover search updates, draft persistence, duplicate handling, heading hierarchy and repeated imports.

## Where I use it

- **Work preparation and meeting support.** Bring together relevant knowledge and earlier decisions for a discussion, presentation or project brief, then keep useful conclusions for the next task.
- **Self-development.** Connect ideas from technical reading, courses and projects, and turn them into explanations, learning plans or practice material. Language learning is one example within this broader workflow.
- **Journaling and personal reflection.** During everyday conversations with AI, a feeling or thought can connect with something I wrote years ago and have gradually forgotten. The agent can bring up dated excerpts that echo what I feel now, or express almost the opposite. I find it interesting to see those similarities and contrasts side by side. I can then ask it to help turn the conversation into a journal entry, keeping my current thoughts alongside links to those earlier notes. Reflection uses a separate memory-retrieval extension that shares the same draft and import workflow.
