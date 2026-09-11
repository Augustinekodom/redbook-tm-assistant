import { GoogleGenerativeAI } from '@google/generative-ai';
import { queryLocalKnowledgeBase, RED_BOOK_METADATA } from '../data/redbook_kb.js';

/**
 * Generates a clean, bold, direct summary answer based on question keywords & matched chunk context.
 */
function synthesizeDirectSummary(question, topChunk) {
  const q = question.toLowerCase();

  // Sideways Safety Zone Queries
  if (q.includes('sideways') || q.includes('safety zone') || q.includes('clearance')) {
    if (q.includes('40')) {
      return "**Definitive Answer: For a 40 mph road, the sideways safety zone MUST be a minimum of 1.2 metres.**";
    } else if (q.includes('30') || q.includes('20')) {
      return "**Definitive Answer: For roads 30 mph or less, the sideways safety zone MUST be a minimum of 0.5 metres.**";
    } else if (q.includes('50') || q.includes('60') || q.includes('national')) {
      return "**Definitive Answer: For 50 mph or 60 mph single carriageways, the sideways safety zone MUST be a minimum of 1.2 metres.**";
    }
    return "**Definitive Answer: Under Table 1 of the Red Book, the sideways safety zone is 0.5m for ≤30 mph roads and 1.2m for 40–60 mph single carriageway roads.**";
  }

  // Taper Length Queries
  if (q.includes('taper') || q.includes('lead-in')) {
    if (q.includes('30') || q.includes('20')) {
      return "**Definitive Answer: For a 30 mph road, the minimum lead-in taper length is 15 metres.**";
    } else if (q.includes('40')) {
      return "**Definitive Answer: For a 40 mph road, the minimum lead-in taper length is 30 metres.**";
    } else if (q.includes('50')) {
      return "**Definitive Answer: For a 50 mph single carriageway road, the minimum lead-in taper length is 45 metres.**";
    } else if (q.includes('60')) {
      return "**Definitive Answer: For a 60 mph single carriageway road, the minimum lead-in taper length is 60 metres.**";
    }
    return "**Definitive Answer: Lead-in taper lengths are 15m (30mph), 30m (40mph), 45m (50mph), and 60m (60mph single carriageway).**";
  }

  // Footway & Pedestrian Queries
  if (q.includes('footway') || q.includes('pedestrian') || q.includes('wheelchair') || q.includes('pram') || q.includes('width')) {
    return "**Definitive Answer: The standard minimum footway width for pedestrians is 1.5 metres (with a 1.2m restricted minimum allowed only under exceptional constraints, and an absolute 1.0m bottleneck limit for under 6m length).**";
  }

  // Traffic Control Selection
  if (q.includes('give and take') || q.includes('priority') || q.includes('traffic light') || q.includes('shuttle') || q.includes('stop')) {
    if (q.includes('give and take') || q.includes('give & take')) {
      return "**Definitive Answer: Priority Control (Give & Take) is permitted only on roads with a speed limit of 30 mph or less, maximum site length of 50 metres, and good visibility to both ends.**";
    }
    return "**Definitive Answer: Select traffic control based on speed & length: Give & Take (<=30mph, <=50m), Priority Signs (<=80m), or Portable Traffic Signals (for >80m or speed >30mph).**";
  }

  // High-Vis / PPE Rules
  if (q.includes('ppe') || q.includes('hi vis') || q.includes('high vis') || q.includes('clothing') || q.includes('helmet')) {
    return "**Definitive Answer: All operatives must wear EN ISO 20471 Class 3 high-visibility clothing (full-sleeve coat/jacket or vest + trousers) at all times day and night.**";
  }

  // Default Synthesizer for Other Queries
  return `**Definitive Answer: ${topChunk.title} (${topChunk.section}, Page ${topChunk.page}).**`;
}

/**
 * Executes a grounded RAG query using local knowledge base chunks & optional Gemini LLM synthesis.
 */
export async function executeRAGQuery(userQuestion, apiKey = '') {
  // 1. Retrieve top matching Red Book chunks from local vector/BM25 index
  const relevantChunks = queryLocalKnowledgeBase(userQuestion, 4);

  // If no matching chunks found locally, provide a safe out-of-scope guidance
  if (relevantChunks.length === 0) {
    return {
      answer: "**Definitive Answer: Out of Scope / Unrecognized Query.**\n\nI couldn't find a direct match in the NRSWA Red Book Code of Practice for your specific query. Please check if your question relates to high-speed dual carriageways / motorways (which fall under Traffic Signs Manual Chapter 8 instead of the Red Book), or rephrase your question using standard traffic management terms like 'safety zone', 'taper', 'footway', or 'shuttle working'.",
      citations: [],
      isOutofScope: true,
      source: "Red Book Rules Engine"
    };
  }

  // Build grounded context from retrieved chunks
  const contextText = relevantChunks.map(c => `
[SECTION: ${c.section} | PAGE: ${c.page} | REFERENCE: ${c.tableRef}]
TITLE: ${c.title}
CONTENT:
${c.content}
`).join('\n---\n');

  // Check if API key is provided via argument, Vercel Env Var, or Local Storage
  const effectiveApiKey = apiKey || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || localStorage.getItem('gemini_api_key') || '';

  if (effectiveApiKey) {
    try {
      const genAI = new GoogleGenerativeAI(effectiveApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a certified Traffic Management Safety Inspector expert in the UK DfT "Safety at Street Works and Road Works – A Code of Practice" (The Red Book under NRSWA 1991).

Answer the following operative question strictly using the provided Red Book context chunks below. 

CRITICAL FORMATTING RULE:
1. You MUST start your response with a bold, direct, 1-sentence summary starting with "**Definitive Answer: ...**" that answers the question immediately in plain English.
2. After the bold definitive answer line, leave a blank line, then provide the full detailed breakdown from the Red Book using clear bullet points.
3. Include exact Page Number, Section Title, and Table references.

[CONTEXT FROM RED BOOK]:
${contextText}

[OPERATIVE QUESTION]:
${userQuestion}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return {
        answer: responseText,
        citations: relevantChunks.map(c => ({ section: c.section, page: c.page, tableRef: c.tableRef, title: c.title })),
        source: "Gemini 1.5 Flash (Grounded Red Book RAG)",
        isOutofScope: false
      };
    } catch (err) {
      console.warn("Gemini API call error, falling back to Local Grounded Engine:", err);
    }
  }

  // Local RAG Synthesizer with Bold Definitive Answer at Top
  const primaryMatch = relevantChunks[0];
  const boldSummary = synthesizeDirectSummary(userQuestion, primaryMatch);

  const formattedAnswer = `${boldSummary}

---

### Detailed Code Guidance:
* **Section:** ${primaryMatch.section} (${primaryMatch.tableRef}, Page ${primaryMatch.page})
* **Title:** ${primaryMatch.title}

${primaryMatch.content}

${relevantChunks.length > 1 ? `\n\n### Related Reference:\n* **${relevantChunks[1].section} (Page ${relevantChunks[1].page}):** ${relevantChunks[1].title}\n${relevantChunks[1].content}` : ''}

*Statutory Basis: Section 65 of the New Roads and Street Works Act 1991 (NRSWA).*`;

  return {
    answer: formattedAnswer,
    citations: relevantChunks.map(c => ({ section: c.section, page: c.page, tableRef: c.tableRef, title: c.title })),
    source: "Zero-Cost Local RAG Engine",
    isOutofScope: false
  };
}
