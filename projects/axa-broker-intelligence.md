---
layout: project
illustration: insurance
title: AI-Powered Broker Intelligence
description: In a team challenge with AXA, I led stakeholder requirements work and helped deliver an agentic AI prototype for market monitoring and broker visit preparation.
context: IBM watsonx Agentic AI Challenge
permalink: /projects/axa-broker-intelligence/
---

## The team project

I took part in a team challenge project with <a href="https://www.axa.ch/en/private-customers.html" target="_blank" rel="noopener">AXA Switzerland {% include new-tab-arrow.html %}</a>, developing an agentic AI prototype for insurance market monitoring and preparation for broker meetings. The work formed part of <a href="https://www.credly.com/badges/5fbe826f-5b32-4bc5-8f61-9304e123b644/print" target="_blank" rel="noopener">IBM watsonx Agentic AI Challenge Switzerland 2026 {% include new-tab-arrow.html %}</a>.

The business problem was the effort involved in gathering information from different sources, deciding what mattered and preparing a useful overview for a conversation. Our team developed and demonstrated a briefing workflow designed to bring recurring market monitoring and on-demand preparation together.

## How the prototype supports preparation

The prototype combines recurring information gathering with user-initiated briefing requests. Coordinated agents bring relevant context together around a consultant’s question, while the conversational interface provides a way to request and review a briefing. The user can then check the supporting information and identify topics worth discussing.

<figure class="case-diagram case-diagram-insurance">
  <figcaption>A high-level view of the prototype</figcaption>
  <ol class="case-steps">
    <li><strong>Describe the preparation need</strong><span>Start with the question or meeting the user is preparing for.</span></li>
    <li><strong>Bring relevant context together</strong><span>Organise supporting information into a focused briefing.</span></li>
    <li><strong>Review and prepare</strong><span>Check the context and choose topics for the discussion.</span></li>
  </ol>
</figure>

An important design question was what would make the output useful to the person preparing for the meeting. A concise summary also needs enough context to explain why information matters and where to check it.

## Designing for reliable outputs

Reliability required work on both the generation instructions and the underlying data access. I helped clarify what the system could claim from available information and improve structured retrieval so that the response had a more consistent basis.

The team reviewed whether briefings answered the request, whether important points had supporting information and whether gaps remained visible to the user. Scenario-based checks helped us investigate unsupported responses and refine the solution around the consultant’s task.

## My contribution within the team

- **Client and stakeholder discovery.** I led stakeholder interviews to understand broker consultants’ preparation workflows, information needs and pain points. I translated those discussions into feature specifications and an MVP scope.
- **From requirements to the interface.** I contributed to the chat UI for requesting briefings, connecting the way consultants describe a need with the information the system needs to return.
- **Coordinated agent design.** I helped design a multi-agent approach for market monitoring and briefing requests, connecting the business workflow with how the AI solution gathers and uses information.
- **Output reliability.** I worked on generation constraints, SQL-based retrieval fixes and scenario-based checks to address unsupported or inconsistent responses.
