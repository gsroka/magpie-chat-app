# Magpie Chat App

This is a web application built with Next.js and the Vercel AI SDK. The application features mocked authentication, a real-time streaming chat interface with an AI model, file/image attachment capabilities, and user profile management.

---

### ✨ Features

- **Mocked Authentication:** Login flow using hardcoded credentials.
- **Real-time AI Chat:** A clean chat interface with real-time message streaming from a large language model.
- **File & Image Support:** Attach images to your messages and get responses from a vision-enabled AI model.
- **Profile Management:** View and edit your user profile name, with changes saved locally.
- **Responsive Design:** Fully responsive UI that works on all screen sizes.

---

### 🛠️ Tech Stack

- **Framework:** Next.js 15 & React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & shadcn/ui
- **Icons:** Lucide React
- **AI Integration:** Vercel AI SDK
- **State Management:** React Context & React Hooks
- **Environment Variables:** T3 Env & Zod
- **Tooling:** ESLint, Prettier, PNPM

---

### 📁 Project Structure

```text
magpie-chat-app/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (authorized)/   # Protected routes group
│   │   │   ├── chat/       # Chat interface page
│   │   │   └── profile/    # User profile page
│   │   ├── (unauthorized)/ # Client routes group
│   │   │   └── login/      # Login page
│   │   ├── api/            # API route handlers
│   │   │   └── chat/       # AI chat endpoint
│   ├── _actions/           # Server actions
│   │   └── auth.ts         # Authentication
│   ├── _components/        # Feature-specific components
│   │   ├── chat/
│   │   ├── layout/
│   │   └── profile/
│   ├── _config/            # Application configuration files
│   │   └── nav.config.ts
│   ├── _context/           # React Context providers
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

**Key Folders:**

- **`src/app/`**: Next.js 15 App Router with file-based routing
- **`src/app/(authorized)/`**: Protected route group requiring authentication
- **`src/components/`**: Reusable React components and shadcn/ui elements
- **`src/lib/`**: Business logic, utilities, and type definitions
- **`public/`**: Static assets (images, icons, etc.)

---

### 🚀 Getting Started

Follow these instructions to set up and run the project locally.

#### 1. Prerequisites

- Node.js (v20+)
- pnpm

#### 2. Installation & Setup

1.  **Clone the repository from the bundle file:**

    ```bash
    git clone ai-chat-app.bundle ai-chat-app
    cd ai-chat-app
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your AI provider API key:

    ```env
    # Example for Anthropic
    ANTHROPIC_API_KEY="your_api_key_here"
    ```

4.  **Run the development server:**
    ```bash
    pnpm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

**Login Credentials:**

- **Email:** `test@example.com`
- **Password:** `password123`

---

### ✅ Project TODO Checklist

#### Phase 0: Project Setup & Configuration

- [x] Initialize a project using `create-t3-app`.
- [x] Install and configure libraries: `shadcn/ui`, `@ai-sdk`, and `lucide-react`.
- [x] Set up the initial Git repository, and create a `README.md` file with a project description and setup instructions.
- [x] Configure environment variables (`.env`) for the language model API key.

#### Phase 1: Architecture, Routing & Typing

- [x] Create the base application folder structure (e.g., `_components`, `_lib`, `_actions`).
- [x] Define core application types in TypeScript (e.g., `User`, `Message`, `ChatMessage`).
- [x] Implement the root layout (`layout.tsx`) and the layout for authorized users in the `(authorized)` route group.
- [x] Create placeholder pages for `/login`, `/chat`, and `/profile`.
- [x] Implement `loading.tsx`, `error.tsx`, and `not-found.tsx` files in key routing segments for better UX and error handling.
- [x] Build shared navigation components (e.g., `Sidebar`) and implement active menu state logic.

#### Phase 2: Mocked Authentication (with Server Actions)

- [x] Create the login form on the `/login` page using `shadcn/ui` components.
- [x] Implement `login` and `logout` logic.
- [x] Use **React Context** (`AuthContext` + `AuthProvider`) for client-side session state management (storing the logged-in user object).
- [x] Secure routes within the `(authorized)` group.

#### Phase 3: Core Chat Interface (Text Streaming)

- [x] Create an API Route Handler (`/api/chat/route.ts`) to handle communication with the Vercel AI SDK.
- [x] Build the chat interface components: `ChatArea`, `MessageList`, `MessageInput`.
- [x] Integrate the `useChat` hook from the `@ai-sdk` library to manage chat state, send messages, and handle response streaming.
- [x] Implement loading indicators while the AI is generating a response.
- [x] Style the interface and add auto-scrolling functionality to the latest message.
- [x] Chat area position should be fixed at the bottom of the screen.
- [x] Fix any potential type conversion errors between `UIMessage` and the AI SDK's `Message` during development.

#### Phase 4: Advanced Features (Files & Profile)

- [x] **Multimodal Chat:**
  - [x] Extend the `MessageInput` component to support file (image) selection and display its preview.
  - [x] Implement client-side logic for converting the image to Base64 format.
  - [x] Update the API Route Handler (`/api/chat`) to handle multimodal messages (text + image).
- [x] **Profile Management:**
  - [x] Build the UI for the `/profile` page with a form for editing user data.
  - [x] Implement persistence of profile data in `localStorage` so that changes are saved locally.
  - [x] Ensure that profile changes are reactively reflected in other parts of the UI (e.g., in the `Header`).

#### Phase 6: Refinements & Feature Expansion

- [x] **Enhanced File Support:**
  - [x] Implement PDF file support in the chat.
- [ ] **Improved User Experience (UX):**
  - [x] Implement error display system using toasts for API communication errors.
  - [x] Display a "Hello!" welcome message on the chat page when there are no messages.
  - [ ] Improve the loading spinner for a more polished and modern feel.
- [ ] **UI & Responsiveness:**
  - [x] Implement a collapsible sidebar with a toggle icon for better mobile and tablet support.
  - [ ] Polish the UI and add responsive design for better user experience on mobile devices.
  - [ ] toast notifications description text color should be consistent with the rest of the UI.
- [ ] **Expanded Profile Management:**
  - [ ] Add functionality to change the user's avatar and email address.
- [ ] **Code Refactoring & Optimization:**
  - [ ] Refactor components to better leverage React Server Components (RSC), minimizing client-side logic.
  - [ ] Identify and abstract shared logic into reusable components to adhere to the DRY principle.
- [x] **Code Refactoring & Optimization:**
- [x] **Fixed Critical Security Issues:**
  - [x] Moved authentication validation from client to server-side
  - [x] Removed hardcoded credentials from client-visible code
  - [x] Implemented secure session management with HTTP-only cookies
- [x] **Fixed Architecture Violations:**
  - [x] Converted authorized layout to Server Component
  - [x] Removed unnecessary "use client" from layout components
  - [x] Implemented proper server-side auth checks
- [x] **Fixed State Management:**
  - [x] Eliminated redundant state storage between localStorage and Context
  - [x] Implemented single source of truth for user data
  - [x] Simplified profile update logic
- [ ] Identify and abstract more shared logic into reusable components to adhere to the DRY principle.

#### Phase 7: Finalization & Submission

- [ ] Conduct a full code review for **SOLID, DRY, KISS** principles, and **accessibility (a11y)**.
- [ ] Add concise **JSDoc** comments to key components and functions.
- [ ] Perform manual testing of all functionalities across different browsers and screen sizes (RWD).
- [ ] Ensure the Git history is clean and follows the **Conventional Commits** convention.
- [ ] Add transitions and animations to the application.
- [ ] Submit the project bundle file.

#### Phase 8: Advanced UX & Chat Utilities

- [ ] **Chat Management:**
  - [ ] Implement a "Start New Chat" button to clear the current conversation.
- [ ] **Message Interaction & Formatting:**
  - [ ] Add a "Copy" button to each message bubble for easy content copying.
  - [ ] Implement syntax highlighting for code blocks within AI responses.
  - [ ] Create a response navigation map/button to allow jumping between AI-generated answers in long conversations.
- [ ] **Error Handling:**
  - [ ] Enhance the root error boundary (`error.tsx`) to provide a "Refresh Page" option on application crash.
- [ ] Add memoization to the chat handler to improve performance.
- [ ] Add more comprehensive error boundaries.

#### Optional Features

- [ ] **[Optional] Speech-to-Text:** Implement message dictation functionality using the Web Speech API.
