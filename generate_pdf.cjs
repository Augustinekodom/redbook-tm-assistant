const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Create a PDF document with custom margins
const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
  info: {
    Title: 'RedBook AI - Technical Project Overview & Portfolio',
    Author: 'Augustine Kodom',
    Subject: 'Traffic Management RAG AI Assistant Portfolio',
    Keywords: 'React, RAG, AI, Traffic Management, NRSWA, Gemini API, Tailwind CSS, Vercel'
  }
});

const outputPath = path.join(__dirname, 'RedBook_AI_Project_Overview.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Styling Colors (Obsidian Pitch Black & Amber Gold Palette)
const PRIMARY_AMBER = '#d97706'; // Amber 600
const PITCH_BLACK = '#000000';   // Pitch Black
const DARK_ZINC = '#18181b';     // Zinc 900
const TEXT_MUTED = '#52525b';    // Zinc 600
const BG_LIGHT = '#fafafa';      // Zinc 50
const ACCENT_BORDER = '#e4e4e7'; // Zinc 200

function drawHeader() {
  // Title Banner Background (Pure Black)
  doc.rect(40, 40, 515, 80).fill(PITCH_BLACK);
  
  // Decorative Amber Accent Strip
  doc.rect(40, 40, 6, 80).fill(PRIMARY_AMBER);
  
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('RedBook AI Assistant', 60, 52);

  doc.fillColor('#fbbf24')
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('Domain-Specific RAG System for UK Traffic Management (NRSWA 1991)', 60, 78);

  doc.fillColor('#a1a1aa')
     .font('Helvetica')
     .fontSize(9)
     .text('Developer Portfolio & Technical Architecture Overview | Augustine Kodom', 60, 95);

  doc.y = 135;
}

function drawSectionHeading(title) {
  doc.moveDown(0.5);
  const currentY = doc.y;
  
  // Left Amber Indicator Pill
  doc.rect(40, currentY, 4, 18).fill(PRIMARY_AMBER);
  
  doc.fillColor(PITCH_BLACK)
     .font('Helvetica-Bold')
     .fontSize(13)
     .text(title, 52, currentY + 2);
  
  doc.moveDown(0.4);
}

// ---------------------------
// PAGE 1 CONTENT
// ---------------------------
drawHeader();

drawSectionHeading('1. Executive Summary & Project Purpose');
doc.fillColor(TEXT_MUTED)
   .font('Helvetica')
   .fontSize(9.5)
   .text(
     'RedBook AI is a production-grade, domain-specific AI assistant and decision-support web application engineered specifically for UK Traffic Management (TM) Operatives, Site Supervisors, and NRSWA Safety Inspectors.\n\n' +
     'The system is strictly grounded in the Department for Transport (DfT) statutory Code of Practice: "Safety at Street Works and Road Works", backed by Section 65 of the New Roads and Street Works Act 1991 (NRSWA). It solves a critical industry challenge: delivering instant, 100% accurate, zero-hallucination safety guidance to operatives working in high-risk outdoor roadwork environments.',
     40, doc.y, { width: 515, align: 'left', lineGap: 3 }
   );

drawSectionHeading('2. Key Problem & Engineering Solution');

// Problem / Solution Box
const boxY = doc.y + 5;
doc.rect(40, boxY, 250, 105).fillAndStroke(BG_LIGHT, ACCENT_BORDER);
doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(10).text('The Industry Problem', 50, boxY + 10);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(8.5).text(
  '• Roadwork operatives must comply with strict legal safety zone clearances on site.\n' +
  '• Consulting physical 100+ page manuals in harsh outdoor weather is slow and error-prone.\n' +
  '• Incorrect safety zone setups result in statutory fines, legal liability, and physical danger.',
  50, boxY + 26, { width: 230, lineGap: 2 }
);

doc.rect(305, boxY, 250, 105).fillAndStroke(BG_LIGHT, ACCENT_BORDER);
doc.fillColor(PRIMARY_AMBER).font('Helvetica-Bold').fontSize(10).text('The Engineering Solution', 315, boxY + 10);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(8.5).text(
  '• Grounded RAG AI Engine linking questions directly to exact Red Book Page & Table citations.\n' +
  '• Mobile-first UI with pitch-black theme & fixed bottom navigation dock for thumb-reachability.\n' +
  '• Interactive Calculators for instant speed limit -> safety zone & taper calculations.\n' +
  '• 100% Zero-Cost Architecture ($0/month operating cost).',
  315, boxY + 26, { width: 230, lineGap: 2 }
);

doc.y = boxY + 115;

drawSectionHeading('3. Core Application Features & UX Innovations');

doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Bold Definitive Top Answer Summary:', 40, doc.y);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9).text(
  '   To prevent operatives from scanning long paragraphs on site, answers begin with a bold, direct 1-sentence summary callout box before detailing statutory code breakdowns.',
  40, doc.y + 12, { width: 515, lineGap: 2 }
);

doc.y += 32;
doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Progressive Typewriter Streaming Reveal:', 40, doc.y);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9).text(
  '   Implemented custom character-by-character streaming animation with a glowing cursor, delivering a conversational AI experience without layout dumping.',
  40, doc.y + 12, { width: 515, lineGap: 2 }
);

doc.y += 32;
doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Mobile View Optimization & Bottom Navigation Dock:', 40, doc.y);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9).text(
  '   Designed an uncluttered top header paired with a glassmorphic bottom navigation tab bar (AI Chat, Calculators, Code Browser) for seamless mobile usage.',
  40, doc.y + 12, { width: 515, lineGap: 2 }
);

doc.y += 32;
doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Touch-Optimized Interactive Safety Calculators:', 40, doc.y);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9).text(
  '   Includes Table 1 Safety Zone & Lead-in Taper Calculator, Traffic Control Selector (Give & Take / Priority / Portable Signals), and Pedestrian Footway Clearance Evaluator.',
  40, doc.y + 12, { width: 515, lineGap: 2 }
);

doc.y += 32;
doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Hands-Free Web Speech API Voice Input:', 40, doc.y);
doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9).text(
  '   Integrated browser-native Speech-to-Text allowing operatives holding equipment or wearing work gloves to ask questions hands-free.',
  40, doc.y + 12, { width: 515, lineGap: 2 }
);

// Footer Page 1
doc.fillColor('#94a3b8').font('Helvetica').fontSize(8)
   .text('RedBook AI Portfolio Overview — Page 1 of 2', 40, 800, { align: 'center', width: 515 });

// ---------------------------
// PAGE 2 CONTENT
// ---------------------------
doc.addPage();

drawSectionHeading('4. Technical Architecture & Tech Stack');

// Tech Stack Table
const tableY = doc.y + 5;

// Table Header
doc.rect(40, tableY, 515, 20).fill(PITCH_BLACK);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9);
doc.text('Layer', 50, tableY + 5);
doc.text('Technology / Library', 170, tableY + 5);
doc.text('Engineering Rationale', 350, tableY + 5);

const rows = [
  ['Frontend Framework', 'React 18 + Vite 4', 'Fast single-page app architecture with 10s build times.'],
  ['UI & Styling', 'Pitch Black Theme + Tailwind CSS', 'High-contrast outdoor obsidian theme with touch targets >= 44px.'],
  ['Icons & Design', 'Lucide React', 'Consistent, modern vector icons for domain controls.'],
  ['AI & RAG Pipeline', '@google/generative-ai + BM25', 'Gemini 1.5 Flash integration + standalone local vector engine.'],
  ['Database / Storage', 'PostgreSQL + pgvector / Local KB', 'Grounded text chunks with HNSW vector similarity search.'],
  ['Speech Recognition', 'Web Speech API (Browser)', 'Zero-dependency native speech-to-text for hands-free voice input.'],
  ['Deployment & CI/CD', 'Vercel Serverless + GitHub', 'Automatic production deployments with $0 operating cost.']
];

let rY = tableY + 20;
rows.forEach((row, i) => {
  const bg = i % 2 === 0 ? BG_LIGHT : '#ffffff';
  doc.rect(40, rY, 515, 22).fillAndStroke(bg, ACCENT_BORDER);
  doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(8.5).text(row[0], 50, rY + 6);
  doc.fillColor(PRIMARY_AMBER).font('Helvetica-Bold').fontSize(8.5).text(row[1], 170, rY + 6);
  doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(8).text(row[2], 350, rY + 6, { width: 200 });
  rY += 22;
});

doc.y = rY + 15;

drawSectionHeading('5. Key Software Engineering Competencies Demonstrated');

doc.fillColor(TEXT_MUTED).font('Helvetica').fontSize(9)
   .text(
     '1. Full-Stack Web Development: Modular React architecture, pitch-black responsive design, custom hooks, and state management.\n' +
     '2. AI / RAG Engineering: Structuring un-structured PDF manuals into vectorized knowledge bases, prompt guardrails, and citation tracking.\n' +
     '3. Product & UX Design: User-centered design for field operatives (hands-free mic, mobile bottom dock, typewriter reveal).\n' +
     '4. Cost Optimization: Engineered a $0/month architecture leveraging serverless Vercel hosting and free-tier APIs.\n' +
     '5. Production Readiness: Clean CI/CD pipeline, Git version control, Vercel SPA route rewrites, and environment variable configuration.',
     40, doc.y, { width: 515, lineGap: 4 }
   );

drawSectionHeading('6. Repository & Live Links');

const linksY = doc.y + 5;
doc.rect(40, linksY, 515, 60).fillAndStroke('#fffbe6', '#fde68a');

doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• GitHub Repository:', 50, linksY + 12);
doc.fillColor(PRIMARY_AMBER).font('Helvetica').fontSize(9.5).text('https://github.com/Augustinekodom/redbook-tm-assistant', 160, linksY + 12);

doc.fillColor(PITCH_BLACK).font('Helvetica-Bold').fontSize(9.5).text('• Live Demo URL:', 50, linksY + 34);
doc.fillColor(PRIMARY_AMBER).font('Helvetica').fontSize(9.5).text('https://redbook-tm-assistant.vercel.app', 160, linksY + 34);

// Footer Page 2
doc.fillColor('#94a3b8').font('Helvetica').fontSize(8)
   .text('RedBook AI Portfolio Overview — Page 2 of 2', 40, 800, { align: 'center', width: 515 });

// Finalize document
doc.end();

stream.on('finish', () => {
  console.log(`PDF successfully generated at: ${outputPath}`);
});
