# 🦜 Magpie Chat App

This is a web application built with Next.js and the Vercel AI SDK. The application features mocked authentication, a real-time streaming chat interface with an AI model, file/image attachment capabilities, and user profile management.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

- 🔐 **Secure Authentication:** Server-side validation with HTTP-only cookies
- 💬 **Real-time AI Chat:** Streaming responses powered by Anthropic Claude
- 📎 **File & Image Support:** Attach images and PDFs to your messages
- 👤 **Profile Management:** Customize your profile with persistent changes
- 📱 **Responsive Design:** Beautiful UI that works on all devices
- 🎨 **Modern Tech Stack:** Built with Next.js 15, React 19, and Tailwind CSS v4

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gsroka/magpie-chat-app.git
   cd magpie-chat-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your Anthropic API key:

   ```env
   # AI Provider API Key (Required)
   # Get your key at: https://console.anthropic.com/
   ANTHROPIC_API_KEY="sk-ant-..."
   
   # Optional: Override the default model
   # AI_MODEL="claude-3-5-sonnet-20240620"
   ```

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

- **Email:** `test@example.com`
- **Password:** `password123`

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) with Anthropic Claude
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State:** React Context API
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```
magpie-chat-app/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (authorized)/   # Protected routes
│   │   │   ├── chat/       # Chat interface page
│   │   │   └── profile/    # User profile page
│   │   ├── (unauthorized)/ # Public routes
│   │   │   └── login/      # Login page
│   │   ├── api/            # API endpoints
│   │   │   └── chat/       # AI chat endpoint
│   ├── _actions/           # Server actions
│   │   └── auth.ts         # Authentication
│   ├── _components/        # Feature-specific components
│   │   ├── chat/
│   │   ├── layout/
│   │   └── profile/
│   ├── _config/            # Application configuration files
│   │   └── nav.config.ts
│   ├── _context/           # React contexts
│   │   └── AuthContext.tsx
│   ├── _hooks/             # Custom React hooks
│   │   ├── useChatHandler.tsx
│   │   ├── useLoginForm.ts
│   │   └── ...
│   ├── _types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── _utils/             # Utility functions
│   │   └── files.ts
│   ├── components/         # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utility functions & configurations
│   │   ├── auth.ts         # Authentication logic
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── utils.ts        # General utilities
│   ├── styles/             # Additional stylesheets
│   │   └── globals.css     # Global styles
│   └── env.js              # Environment validation (T3 Env)
├── public/                 # Static assets
├── .env                    # Environment variables
└── Configuration files     # Next.js, TypeScript, ESLint, etc.
```

---

## 🗺️ Development Roadmap

<details>
<summary><strong>View Full Roadmap</strong></summary>

### ✅ Phase 1-6: Core Development (Completed)

- Authentication system with server-side validation
- Real-time AI chat with streaming
- File/image attachment support
- Profile management
- Responsive UI with mobile support
- Security hardening and architecture improvements

### 🚧 Phase 7: Polish & Performance

- [ ] Add message persistence with database integration
- [ ] Implement conversation history and search
- [ ] Add typing indicators and presence
- [ ] Optimize bundle size and loading performance
- [ ] Add comprehensive test coverage

### 📋 Phase 8: Enhanced UX

- [ ] Implement "New Chat" functionality
- [ ] Add message actions (copy, edit, regenerate)
- [ ] Syntax highlighting for code blocks
- [ ] Keyboard shortcuts and power user features
- [ ] Dark/light theme toggle

### 🎯 Phase 9: Advanced Features

- [ ] Multi-model support (GPT-4, Gemini, etc.)
- [ ] Conversation branching and versioning
- [ ] Export conversations (PDF, Markdown)
- [ ] Custom system prompts and presets
- [ ] Collaborative chat rooms

### 🚀 Phase 10: Production Ready

- [ ] User authentication with OAuth providers
- [ ] Rate limiting and usage quotas
- [ ] Admin dashboard and analytics
- [ ] Deployment guides for Vercel/AWS/Docker
- [ ] API documentation and SDK

### 💡 Optional Enhancements

- [ ] Speech-to-text and text-to-speech
- [ ] Plugin system for custom tools
- [ ] Mobile apps (React Native)
- [ ] Real-time collaboration features

</details>

---

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format:write # Format code with Prettier
pnpm typecheck    # Run TypeScript checks
```

---

## 📧 Contact

Grzegorz Sroka - [@gsroka89](https://x.com/gsroka89)

Project Link: [https://github.com/gsroka/magpie-chat-app](https://github.com/gsroka/magpie-chat-app)