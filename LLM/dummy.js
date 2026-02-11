// Production-ready AI project narrative for demo presentations.
// Exported data structures keep the story consistent and easy to customize.

const projectOverview = {
  projectName: "Navigator AI: Customer Support Copilot",
  elevatorPitch:
    "Navigator AI ingests scattered support knowledge, ranks the best answers, and drafts guided responses so agents solve tickets 40% faster.",
  problemStatement:
    "Support teams juggle knowledge bases, policy docs, and CRM notes. Context switching bloats handle time and increases inconsistent replies.",
  solutionSummary:
    "A retrieval-augmented AI copilot that unifies customer context, retrieves verified knowledge, and generates grounded replies with human-in-the-loop controls.",
  targetUsers: ["Enterprise customer support agents", "Team leads monitoring quality"],
  measurableOutcomes: [
    "Reduce average handling time by 35-45%",
    "Increase first-contact resolution by 18%",
    "Deliver auditable answers with automated citation tracking",
  ],
};

const architecture = {
  ingestionPipeline: [
    "Scheduled connectors pull manuals, FAQs, and CRM transcripts every hour.",
    "Documents are chunked (300 tokens, 50-token overlap) and enriched with metadata (product, locale, revision).",
    "Embeddings generated via `text-embedding-3-large`; vectors stored in Pinecone with hybrid keyword fallback.",
  ],
  runtimePipeline: [
    "Auth gateway validates agent session and fetches ticket context from CRM API.",
    "Query expander produces multi-query variations to boost recall for vague requests.",
    "Vector store returns top-k passages; cross-encoder reranks for factual tightness.",
    "Response composer builds structured prompt with citations; GPT-4.1-mini generates draft.",
    "Guardrail layer validates JSON schema, checks citations, and redacts PII before UI render.",
  ],
  deployment: {
    orchestration: "LangGraph running on FastAPI with Temporal for long-running flows.",
    monitoring: ["OpenTelemetry traces per step", "Dashboards for recall, latency, deflection rate"],
    security: [
      "All secrets stored in AWS Secrets Manager",
      "Namespace isolation in Pinecone",
      "Conversation logs scrubbed for PII within 24 hours",
    ],
  },
};

const demoScript = [
  {
    step: "Set the scene",
    talkingPoints: [
      "Introduce a stressed support agent handling an escalated premium customer incident.",
      "Highlight the challenge: scattered knowledge, urgent SLA, and need for confident answers.",
    ],
  },
  {
    step: "Load ticket context",
    talkingPoints: [
      "Show CRM ticket with device logs; Navigator AI auto-detects device model and firmware version.",
      "Explain how metadata narrows Pinecone search to compliant docs only.",
    ],
  },
  {
    step: "Retrieve and draft",
    talkingPoints: [
      "Trigger the retrieval; display top passages with scores and inline citations.",
      "Reveal the generated response JSON with summary, steps, and confidence flag.",
      "Stress guardrails: response blocked if citation coverage < 80% or PII detected.",
    ],
  },
  {
    step: "Human approval and feedback loop",
    talkingPoints: [
      "Agent tweaks response, hits approve; system logs decisions and feedback.",
      "Mention how thumbs-down triggers a retraining queue and alerts content ops.",
    ],
  },
  {
    step: "Metrics slide",
    talkingPoints: [
      "Share pilot results: SLA compliance jump, reduced escalations, CSAT lift.",
      "Call out governance: audit trail, model versioning, rollback plan.",
    ],
  },
];

const qAndAReadiness = [
  {
    question: "How do you prevent hallucinations?",
    answer:
      "We enforce retrieval grounding with top-k thresholding, cite sources, and decline responses if coverage drops below 80%. Guardrails include JSON validation, banned-topic filters, and human approvals for high-risk actions.",
  },
  {
    question: "What happens when the vector store misses relevant docs?",
    answer:
      "We fall back to hybrid search (BM25 + dense), run multi-query expansion, and surface low-confidence alerts so agents know to escalate. Missed queries feed an active-learning backlog.",
  },
  {
    question: "How scalable is the architecture?",
    answer:
      "Temporal orchestrates workflows across containers, Pinecone handles sharding transparently, and stateless FastAPI workers autoscale based on queue depth. Observability tracks p95 latency to maintain strict SLAs.",
  },
  {
    question: "How do you secure customer data?",
    answer:
      "We encrypt in transit and at rest, isolate tenants via Pinecone namespaces, scrub PII from logs, and offer private networking. Data retention policies align with SOC2 controls and can be customized per client.",
  },
];

/**
 * Builds a concise narrative summary for quick presentations.
 * Keeps logic tiny so it is easy to adapt.
 */
function craftNarrative() {
  const headline = `${projectOverview.projectName}: ${projectOverview.elevatorPitch}`;
  const objectives = projectOverview.measurableOutcomes.join("; ");
  return `${headline}\nKey outcomes: ${objectives}`;
}

module.exports = {
  projectOverview,
  architecture,
  demoScript,
  qAndAReadiness,
  craftNarrative,
};
