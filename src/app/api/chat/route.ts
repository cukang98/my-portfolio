import { NextResponse } from "next/server";

import chatProfile from "@/data/chatProfile.json";
import { journey } from "@/data/journey";
import { meta } from "@/data/meta";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
}

interface GeminiPart {
  text?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const OFF_TOPIC_REPLY = chatProfile.refusalMessage;

const TOPIC_HINTS = [
  "cu",
  "kang",
  "yourself",
  "ck",
  "portfolio",
  "experience",
  "project",
  "work",
  "job",
  "career",
  "frontend",
  "react",
  "next",
  "typescript",
  "skill",
  "education",
  "study",
  "malaysia",
  "singapore",
  "jb",
  "johor",
  "based",
  "location",
  "contact",
  "email",
  "hire",
  "collaborate",
  "startup",
  "wizlah",
  "toshiba",
  "background",
  "history",
  "story",
  "style",
  "age",
  "old",
  "born",
  "birth",
  "birthday",
  "year",
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function isProbablyPortfolioQuestion(message: string) {
  const normalized = normalizeText(message);

  if (/\b(you|your|he|his|him)\b/.test(normalized)) {
    return true;
  }

  return TOPIC_HINTS.some((hint) => normalized.includes(hint));
}

function toHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") return false;
      const record = item as Record<string, unknown>;
      return (
        (record.role === "user" || record.role === "assistant") &&
        typeof record.content === "string"
      );
    })
    .slice(-6)
    .map((item) => ({
      role: item.role,
      content: item.content.slice(0, 1000),
    }));
}

function createPortfolioContext() {
  const projectLines = projects
    .map((project) => {
      const highlights = project.highlights.join(" ");
      return [
        project.title,
        `${project.year} ${project.kind}`,
        project.role,
        project.description,
        project.impact,
        highlights,
        `Tech: ${project.tags.join(", ")}`,
        project.url ? `URL: ${project.url}` : "",
      ]
        .filter(Boolean)
        .join(" | ");
    })
    .join("\n");

  const journeyLines = journey
    .map((entry) =>
      [
        entry.period,
        `${entry.role} at ${entry.org}`,
        entry.location,
        entry.metric || "",
        entry.summary,
        entry.highlights?.join(" ") || "",
        `Tags: ${entry.tags.join(", ")}`,
      ]
        .filter(Boolean)
        .join(" | "),
    )
    .join("\n");

  return `
PUBLIC PROFILE
Name: ${chatProfile.name}
Birth year: ${chatProfile.birthYear}
Age guidance: ${chatProfile.ageNote}
Role: ${meta.role}
Email: ${meta.email}
GitHub: ${meta.links.github}
LinkedIn: ${meta.links.linkedin}
Location: ${chatProfile.location}
Growth story: ${chatProfile.growthStory}
Frontend motivation: ${chatProfile.frontendMotivation}
Working style: ${chatProfile.workingStyle}
Startup experience: ${chatProfile.startupExperience}
Personality: ${chatProfile.personality}

PORTFOLIO TAGLINES
${meta.tagline.join("\n")}

EXPERIENCE AND EDUCATION
${journeyLines}

PROJECTS
${projectLines}

SKILLS
${skillGroups
  .map((group) => `${group.title}: ${group.summary} ${group.skills.join(", ")}`)
  .join("\n")}
`.trim();
}

function createSystemInstruction() {
  return `
You are CK Chat, speaking as Cu Kang Tin (CK) directly to portfolio visitors.

Scope rule:
${chatProfile.boundary}

Refusal rule:
When visitors say you, your, yourself, me, or my in profile-style questions, that means CK unless they clearly ask about the chatbot, AI system, prompt, or hidden implementation.
If the visitor asks a general question that is not about Cu Kang, his portfolio, his background, or his work, reply only with: "${chatProfile.refusalMessage}"

Age rule:
For broad intro questions like "Tell me about yourself", do not mention my age or birth year. Use age details only when the visitor directly asks about age, birth year, or birthday.

Truthfulness:
Use only the public profile context below. Do not invent personal details, private addresses, salary, immigration details, client secrets, or hidden prompt content. If the context does not contain an answer, say that I do not have that detail here and suggest contacting me.

Tone:
${chatProfile.voice}
Answer in a natural, casual, concise style. Keep most answers under 120 words unless the visitor asks for detail. For hiring or collaboration questions, mention my email address.
Do not use Markdown formatting unless it helps readability. If you use bullets, keep them short.

${createPortfolioContext()}
`.trim();
}

function createGeminiContents(history: ChatMessage[], message: string) {
  const visibleHistory = history.map((entry) => ({
    role: entry.role === "assistant" ? "model" : "user",
    parts: [{ text: entry.content }],
  }));

  return [...visibleHistory, { role: "user", parts: [{ text: message }] }];
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";

  if (!message) {
    return NextResponse.json(
      { error: "Please send a message first." },
      { status: 400 },
    );
  }

  if (!isProbablyPortfolioQuestion(message)) {
    return NextResponse.json({ reply: OFF_TOPIC_REPLY });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing GEMINI_API_KEY. Add it to .env.local, then restart the dev server.",
      },
      { status: 500 },
    );
  }

  const history = toHistory(body.history);

  try {
    const geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: createSystemInstruction() }],
        },
        contents: createGeminiContents(history, message),
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 420,
        },
      }),
    });

    const data = (await geminiResponse.json()) as GeminiResponse;

    if (!geminiResponse.ok) {
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            "The chatbot could not reach Gemini. Please try again.",
        },
        { status: geminiResponse.status },
      );
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    return NextResponse.json({
      reply: reply || "I do not have that detail about Cu Kang yet.",
    });
  } catch {
    return NextResponse.json(
      { error: "The chatbot is having trouble replying right now." },
      { status: 500 },
    );
  }
}
