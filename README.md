# <img src='./app/favicon.ico' width='45' style='margin-bottom: -10px; margin-right: 5px;' alt='logo'> Md Umar Siddique | Engineering Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=neon&logoColor=black)](https://neon.tech/)
[![Resend](https://img.shields.io/badge/Resend_API-000000?style=for-the-badge&logo=minutemailer&logoColor=white)](https://resend.com/)
[![Husky](https://img.shields.io/badge/Husky_Hooks-42B983?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/)

[Live Site](https://umarsiddique-portfolio.vercel.app) · [View Code](https://github.com/umarSiddique010/umarsiddique-portfolio) · [Report Bug](https://github.com/umarSiddique010/umarsiddique-portfolio/issues)

</div>

---

## 📖 Overview

This repository houses the source code for my professional engineering portfolio. More than just a showcase of projects, this application is a demonstration of modern web architecture, emphasizing **performance, type safety, and component modularity**.

Built on **Next.js 16 (App Router)** and **React 19**, the system leverages **Tailwind CSS v4** for styling and **Motion** for complex, physics-based interactions. The architecture prioritizes a "production-first" mindset, featuring comprehensive unit testing, strict linting gates, and server-side validation for all data mutations.

> **Core Philosophy:** "Systems Over Syntax." Writing code is the baseline; architecting systems that are maintainable, scalable, and resilient is the goal.

---

## 🏗️ Architectural Highlights & Engineering Decisions

### 1. Interactive Interface Design (`CodeIntro`)

The Hero section features a custom `CodeIntro` component that simulates a macOS-style terminal window.

- **Physics-Based Animation:** Leveraging `motion/react` (formerly Framer Motion), the component implements spring-physics for minimizing, maximizing, and restoring the window state.
- **Layout Animations:** The component uses the `layout` prop to automatically animate changes in DOM structure without manual coordinate calculation, ensuring 60fps performance during state transitions.
- **Component Isolation:** The window logic is encapsulated entirely within the client component, preventing re-renders of the static server-rendered background.

### 2. Robust Messaging System (Server Actions)

The contact form is not a simple client-side API call. It is a robust, full-stack feature built using **Next.js Server Actions**.

- **Type-Safe Validation:** Inputs are validated on the server using `zod` schemas before execution, ensuring data integrity and preventing injection attacks.
- **Database Persistence:** Validated messages are persisted to a **Neon Serverless PostgreSQL** database.
- **Transactional Email:** The system integrates with the **Resend API** to trigger two concurrent email streams:
  1.  An immediate admin notification with full payload details.
  2.  An automated, professional acknowledgement email sent to the user.
- **Progressive Enhancement:** The form uses React's `useActionState` hook to manage pending states and optimistic UI updates without blocking the main thread.

### 3. Engineering Discipline & Quality Assurance

This project enforces enterprise-level code quality standards.

- **Testing Strategy:** Critical UI components (like the Contact Form and Navigation) and utility functions are tested using **Vitest** and **React Testing Library**.
- **CI/CD Gates:** A strict **Husky** setup enforces `lint-staged` protocols. Commits are blocked unless they pass ESLint checks and Prettier formatting, ensuring the main branch remains clean and consistent.

---

## 🛠️ Technology Stack

| Category       | Technology            | Usage                                                    |
| :------------- | :-------------------- | :------------------------------------------------------- |
| **Framework**  | **Next.js 16**        | App Router, Server Actions, SSR/SSG.                     |
| **UI Library** | **React 19**          | Server Components, Hooks, `useActionState`.              |
| **Styling**    | **Tailwind CSS v4**   | Utility-first styling, CSS variables, Dark Mode.         |
| **Animation**  | **Motion**            | Complex gestures, layout transitions, scroll animations. |
| **Database**   | **Neon (PostgreSQL)** | Serverless SQL database for message persistence.         |
| **Validation** | **Zod**               | Schema validation for forms and environment variables.   |
| **Email**      | **Resend**            | Transactional email API for contact form logic.          |
| **Testing**    | **Vitest**            | Unit and Integration testing runner.                     |
| **Icons**      | **Lucide React**      | Consistent, lightweight SVG iconography.                 |

---

## 🚀 Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/umarSiddique010/umarsiddique-portfolio.git
   cd umarsiddique-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following keys (required for the Contact form to function):

   ```bash
   # Database Connection (Neon Postgres)
   DATABASE_URL="postgres://user:password@endpoint.neon.tech/neondb?sslmode=require"

   # Email Service (Resend)
   RESEND_API_KEY="re_123456789"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Run Tests**
   To ensure all components are functioning as expected:
   ```bash
   npm run test
   ```

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── about/            # About page logic
│   ├── blog/             # Blog listing & filtering
│   ├── contact/          # Contact page with server actions
│   ├── projects/         # Project showcase
│   └── globals.css       # Tailwind v4 imports & theme variables
├── components/           # Reusable UI Components
│   ├── contact-cards/    # Form logic & server integration
│   ├── home/             # Hero, Marquee, & Landing sections
│   └── ui/               # Radix/Shadcn primitives (Button, Card, Badge)
├── lib/                  # Utilities & Server Actions
│   ├── action.ts         # Server-side form handling (Zod/Resend/SQL)
│   └── utils.ts          # Class merging utilities
└── public/               # Static assets
```

---

<div align="center">

**Crafted by Md Umar Siddique**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/md-umar-siddique)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/umarSiddique010)
[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](https://dev.to/umarsiddique)

</div>
