---
layout: project
illustration: coaching
title: RAG-Based AI Coaching App
description: I helped turn Unlocking Eve’s leadership assessment into a live AI coaching platform, working across architecture, full-stack development, model evaluation and product economics.
context: Live
permalink: /projects/ai-coaching/
---

## From assessment insights to everyday decisions

Unlocking Eve’s <a href="https://www.unlockingeve.org/integrated-leadership-diagnostic" target="_blank" rel="noopener" style="color: var(--accent);"><b>Integrated Leadership Diagnostic {% include new-tab-arrow.html %}</b></a> gives leaders a starting point for reflection. The coaching app helps them explore what those insights might mean in a real workplace situation, such as preparing for a difficult conversation or considering a decision.

A useful conversation needs to connect the assessment context with the situation the person brings, explain relevant ideas clearly and leave room for the leader’s own interpretation.

I presented this project at <a href="https://www.intent-for-change.org/event/seed-impact-summit-2026/" target="_blank" rel="noopener">SEED Impact Summit 2026 {% include new-tab-arrow.html %}</a>.

## My contribution

Within the team, I helped translate an established, research-based leadership assessment into a working AI coaching platform. My contribution covered architecture, product and full-stack development, launch and ongoing improvement.

- **Platform architecture and AI agents.** I designed and built agents that connect assessment results, retrieved leadership material and reflective dialogue, bringing rule-based assessment processing and LLM generation into one product experience.
- **Product requirements and full-stack development.** I worked on the journey from understanding results to continuing a coaching conversation, implementing user-facing features and the supporting backend workflows.
- **Engineering, testing and release.** I worked on automated checks, debugging and release preparation, supported deployment, and continued improving the live app.
- **Model evaluation and technical decisions.** I developed scenario-based evaluation workflows and compared model strategies against response quality, factual consistency, response time and operating cost.
- **Product economics and delivery planning.** I built a cost and pricing model, explored subscription scenarios and operating-cost levers, and contributed to the product and technical roadmap, feature backlog and engineering work breakdown.

<figure class="case-diagram case-diagram-coaching">
  <figcaption>A coaching conversation</figcaption>
  <ol class="case-steps">
    <li><strong>Bring a real situation</strong><span>Pick a leadership challenge where an assessment insight might help.</span></li>
    <li><strong>Reflect with context</strong><span>Explore the challenge through questions informed by relevant coaching material.</span></li>
    <li><strong>Choose an action</strong><span>Decide what to try in the next conversation or decision.</span></li>
  </ol>
</figure>

## Design decisions behind the experience

**Consistent assessment results, flexible conversation.** Deterministic scoring provides a stable reference for assessment facts. I connected that foundation with AI-generated explanations and questions, so the conversation can adapt to the person’s situation while retaining the meaning of their results.

**Coaching grounded in the framework.** Retrieval-augmented generation (RAG) brings relevant leadership material into the conversation. I designed the agents to use this context when interpreting results and supporting reflection, with review criteria for consistency with the organization’s leadership approach.

**Model choices and operating cost.** I evaluated tiered model strategies and the trade-offs between response quality, response time and cost. This connected technical design with the practical question of how to run a useful coaching service over time.

**A conversation that follows the person.** Someone asking about a result may want a direct explanation. Someone preparing to give feedback may want to explore perspectives or rehearse an opening question. I worked on flows that follow that intent and give the person room to clarify the situation or correct an interpretation.

Treating an assessment insight as a starting point for questions helps keep the leader involved in making sense of it. Any next action should be something they choose to take.

## Product economics, roadmap and governance

The cost and pricing model let me examine how usage assumptions, model choices and subscription scenarios affect commercial viability. I identified optimization opportunities and used the analysis to inform go-to-market discussions and delivery priorities.

My roadmap contribution connected the near-term feature backlog and engineering work breakdown with longer-term product priorities. It also included reviewing privacy and AI governance considerations for coaching under GDPR, the EU AI Act and the Swiss FADP, and translating those considerations into product and engineering questions for further review.

## Quality criteria for a live product

The app is live. The evaluation approach I contributed to checks whether the response uses relevant material, preserves assessment facts and addresses the person’s current request.

Scenario-based review considers how the coach handles clarification, changes in direction and questions about results. These checks make it possible to examine the behaviour behind a plausible-sounding answer. Feedback from people using the product can inform further work on usefulness and conversational quality.