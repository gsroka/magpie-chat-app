# Magpie Chat App

This is a web application built with Next.js and the Vercel AI SDK. The application features mocked authentication, a real-time streaming chat interface with an AI model, file/image attachment capabilities, and user profile management.


***

### ✨ Features

* **Mocked Authentication:** Login flow using hardcoded credentials.
* **Real-time AI Chat:** A clean chat interface with real-time message streaming from a large language model.
* **File & Image Support:** Attach images to your messages and get responses from a vision-enabled AI model.
* **Profile Management:** View and edit your user profile name, with changes saved locally.
* **Responsive Design:** Fully responsive UI that works on all screen sizes.

***

### 🛠️ Tech Stack

* **Framework:** Next.js 15 & React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 & shadcn/ui
* **Icons:** Lucide React
* **AI Integration:** Vercel AI SDK
* **State Management:** React Context & React Hooks
* **Environment Variables:** T3 Env & Zod
* **Tooling:** ESLint, Prettier, PNPM

***

### 🚀 Getting Started

Follow these instructions to set up and run the project locally.

#### 1. Prerequisites

* Node.js (v20+)
* pnpm

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
* **Email:** `test@example.com`
* **Password:** `password123`

***

### ✅ Project TODO Checklist

#### Phase 0: Project Setup & Configuration
-   [X] Initialize a project using `create-t3-app`.
-   [X] Install and configure libraries: `shadcn/ui`, `@ai-sdk`, and `lucide-react`.
-   [X] Set up the initial Git repository, and create a `README.md` file with a project description and setup instructions.
-   [X] Configure environment variables (`.env`) for the language model API key.

#### Phase 1: Architecture, Routing & Typing
-   [X] Create the base application folder structure (e.g., `_components`, `_lib`, `_actions`).
-   [X] Define core application types in TypeScript (e.g., `User`, `Message`, `ChatMessage`).
-   [X] Implement the root layout (`layout.tsx`) and the layout for authorized users in the `(authorized)` route group.
-   [X] Create placeholder pages for `/login`, `/chat`, and `/profile`.
-   [ ] Implement `loading.tsx`, `error.tsx`, and `not-found.tsx` files in key routing segments for better UX and error handling.
-   [ ] Build shared navigation components (e.g., `Sidebar`, `Header`) and implement active menu state logic.

#### Phase 2: Mocked Authentication (with Server Actions)
-   [ ] Create the login form on the `/login` page using `shadcn/ui` components.
-   [ ] Implement `login` and `logout` logic.
-   [ ] Use **React Context** (`AuthContext` + `AuthProvider`) for client-side session state management (storing the logged-in user object).
-   [ ] Secure routes within the `(authorized)` group.

#### Phase 3: Core Chat Interface (Text Streaming)
-   [ ] Create an API Route Handler (`/api/chat/route.ts`) to handle communication with the Vercel AI SDK.
-   [ ] Build the chat interface components: `ChatArea`, `MessageList`, `MessageInput`.
-   [ ] Integrate the `useChat` hook from the `@ai-sdk` library to manage chat state, send messages, and handle response streaming.
-   [ ] Implement loading indicators while the AI is generating a response.
-   [ ] Style the interface and add auto-scrolling functionality to the latest message.
-   [ ] Fix any potential type conversion errors between `UIMessage` and the AI SDK's `Message` during development.

#### Phase 4: Advanced Features (Files & Profile)
-   [ ] **Multimodal Chat:**
    -   [ ] Extend the `MessageInput` component to support file (image) selection and display its preview.
    -   [ ] Implement client-side logic for converting the image to Base64 format.
    -   [ ] Update the API Route Handler (`/api/chat`) to handle multimodal messages (text + image).
-   [ ] **Profile Management:**
    -   [ ] Build the UI for the `/profile` page with a form for editing user data.
    -   [ ] Use a Server Action to handle saving profile changes.
    -   [ ] Implement persistence of profile data in `localStorage` so that changes are saved locally.
    -   [ ] Ensure that profile changes are reactively reflected in other parts of the UI (e.g., in the `Header`).

#### Phase 5: Optional Features
-   [ ] **[Optional] Speech-to-Text:** Implement message dictation functionality using the Web Speech API.

#### Phase 6: Finalization & Submission
-   [ ] Conduct a full code review for **SOLID, DRY, KISS** principles, and **accessibility (a11y)**.
-   [ ] Add concise **JSDoc** comments to key components and functions.
-   [ ] Perform manual testing of all functionalities across different browsers and screen sizes (RWD).
-   [ ] Ensure the Git history is clean and follows the **Conventional Commits** convention.

