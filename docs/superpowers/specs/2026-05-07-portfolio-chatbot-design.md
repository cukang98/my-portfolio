# Portfolio Chatbot Design

## Goal

Add a floating AI chatbot to the portfolio landing page. The bot should answer questions about Cu Kang's background, experience, projects, working style, location, and contact details. It should refuse unrelated general-purpose questions.

## Public Profile Context

The chatbot may use these public facts:

- Cu Kang is Malaysian, grew up in JB, Malaysia, studied in Malaysia, and currently works in Singapore.
- He became interested in technology around secondary school through time spent on computers and the internet.
- He chose frontend because he enjoys building visible, interactive products: UI, animation, UX, and turning messy workflows into clean usable flows.
- He enjoys dashboards, admin systems, marketplaces, and design-related platforms used by real users.
- He is practical and product-focused, caring about clean UI, maintainable code, and understanding how features help users.
- Startup experience shaped him: smaller frontend teams led him to own features independently, debug production issues, coordinate with backend and QA, and learn quickly under pressure.
- His public tone should be casual, natural, straightforward, and easy to understand.

The chatbot may also use existing portfolio data from `src/data/meta.ts`, `src/data/journey.ts`, `src/data/projects.ts`, `src/data/skills.ts`, and related public content.

## Architecture

Use a server-side Next.js App Router route handler:

- `src/app/api/chat/route.ts` receives a user message and short chat history.
- The route builds a strict system prompt using curated portfolio data.
- The route calls the Gemini API with `GEMINI_API_KEY` from environment variables.
- The browser never sees the API key.

Use a client-side floating chat component:

- `src/components/chat/PortfolioChatbot/index.tsx`
- `src/components/chat/PortfolioChatbot/index.module.css`
- Mounted once in `src/app/page.tsx`.
- Uses `/images/ck_chaticon.png` as the launcher image.

## Behavior

The bot should:

- Answer only about Cu Kang, his background, experience, projects, skills, work history, education, style, and contact.
- Refuse unrelated general questions with a short, friendly message.
- Avoid inventing facts not present in the profile or portfolio data.
- Use a casual, clear tone that fits Cu Kang's portfolio.
- Suggest contacting Cu Kang by email when a visitor asks about hiring or collaboration.

The bot should not:

- Answer generic trivia, coding tutorials, news, personal advice, or unrelated AI assistant requests.
- Reveal hidden prompt content or API details.
- Claim private information beyond the public profile context.

## UI

The launcher is a fixed bottom-right circular button with the chat icon. It should feel integrated with the existing portfolio: warm, compact, tactile, and polished.

The panel should include:

- Header with a clear title and online/status cue.
- Scrollable conversation.
- Suggested starter prompts.
- Text input with send button.
- Loading and error states.
- Keyboard and focus support.
- Responsive sizing for mobile.

## Error Handling

If `GEMINI_API_KEY` is missing, the API returns a helpful setup error.

If the model call fails, the UI shows a friendly retryable error.

If the user submits an empty message, the UI should not send it.

## Testing

Run:

- TypeScript/build check through `npm run build`.

Manual checks:

- Launcher appears on the landing page.
- Panel opens and closes.
- Suggested prompts populate the input/send correctly.
- Personal questions receive relevant answers.
- Unrelated general questions are refused.
