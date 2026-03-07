# <img src='./app/favicon.ico' height='45' style="margin-bottom:-11px; margin-right:2px;"/> Md Umar Siddique | Engineering Portfolio

<div align="center">

### Systems Over Syntax.

<p align="center">
  <strong>A production-grade Next.js 16 application showcasing full-stack architecture, 
  serverless orchestration, and disciplined engineering practices.</strong>
</p>

<p align="center">
  <a href="https://www.umarsiddique.dev/"><strong>View Live Production Deployment</strong></a>
  &nbsp;&nbsp;&bull;&nbsp;&nbsp;
  <a href="#local-development"><strong>Local Setup</strong></a>
  &nbsp;&nbsp;&bull;&nbsp;&nbsp;
  <a href="https://github.com/umarSiddique010/umarsiddique-portfolio/issues"><strong>Report an Issue</strong></a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=neon&logoColor=black)](https://neon.tech/)
[![Resend](https://img.shields.io/badge/Resend_API-000000?style=for-the-badge&logo=minutemailer&logoColor=white)](https://resend.com/)
[![Husky](https://img.shields.io/badge/Husky_Hooks-42B983?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/)
[![Lint-Staged](https://img.shields.io/badge/Lint--Staged-1572B6?style=for-the-badge&logo=git&logoColor=white)](https://github.com/lint-staged/lint-staged)
[![Vercel](https://img.shields.io/badge/Vercel_Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

## Overview

This repository houses the source code for **umarsiddique.dev**, a portfolio engineered to demonstrate **"Systems Over Syntax."** Unlike standard static portfolios, this application is a dynamic, full-stack system built on the **Next.js 16 App Router** and **React 19**.

It is designed to highlight architectural rigor, featuring a custom-built interactive terminal, a fully serverless messaging infrastructure with database persistence, and a strictly typed, tested codebase. The project adheres to a **"Shift Left"** philosophy, utilizing heavy linting, formatting, and unit testing to ensure production stability before deployment.

## Features & Architecture

### 1. Interactive `CodeIntro` Terminal

The hero section features a custom `CodeIntro` component that simulates a developer's terminal environment, complete with a functional **macOS-style window header**.

- **State-Driven UI:** Implements functional window controls where the "Maximize" state triggers a z-index overlay revealing hidden ASCII art, and "Minimize" utilizes layout projection to collapse the DOM node.
- **Physics-Based Animation:** Powered by `motion/react` spring physics (`stiffness: 150`, `damping: 15`), ensuring fluid, non-blocking window transitions without layout thrashing.
- **Component Isolation:** Encapsulated as a Client Component to decouple heavy animation logic from the main thread, preserving LCP (Largest Contentful Paint) performance.

### 2. Robust Serverless Messaging System

The contact form is not a simple `mailto` link or third-party iframe; it is a complete full-stack feature.

- **Server Actions:** Utilizes Next.js Server Actions and React 19's `useActionState` hook to handle form submissions without a separate API route, ensuring progressive enhancement.
- **Data Integrity:** Input is validated strictly against a **Zod** schema (`contactSchema`) on the server before processing.
- **Persistence & Notification:**
  - **Storage:** Validated messages are persisted to a **Neon Serverless PostgreSQL** database for long-term record keeping.
  - **Transactional Email:** The system orchestrates the **Resend API** to send dual emails: an immediate admin notification and a professional auto-reply to the user.
- **Error Handling:** Granular error states are returned from the server and rendered inline, providing immediate, accessible feedback.

### 3. Infrastructure & Edge Deployment

The application is engineered for low latency and high availability.

- **DNS Strategy:** The domain (`.dev` TLD registered via Porkbun) is routed through **Vercel's authoritative Nameservers**. This enables immediate propagation of DNS changes and leverages the Vercel Edge Network for global caching.
- **Security:** Strict HTTPS enforcement and automated SSL generation via Let's Encrypt.
- **Optimization:** Assets and font files (Geist Sans/Mono) are optimized and served via the edge, ensuring minimal Time to First Byte (TTFB).

### 4. Testing & Quality Assurance

This project treats testing as a first-class citizen, not an afterthought.

- **Unit Testing:** Critical components (e.g., `ContactForm`, `ContactCard`, `HeroSection`) are tested using **Vitest** and **React Testing Library**.
- **Mocking Strategy:** External dependencies like `motion/react`, `next/navigation`, and server actions are mocked to ensure isolated, deterministic tests.

### 5. Automated CI/CD Pipeline

To maintain high engineering standards, the repository enforces a strict automated workflow that prevents technical debt:

- **Git Hooks (Husky):** Pre-commit hooks are configured to run validation scripts locally, preventing broken or unformatted code from ever reaching the remote repository.
- **Lint-Staged:** Optimizes the workflow by running **ESLint** and **Prettier** only on staged files, ensuring style consistency without manual intervention.
- **Production-Ready Gates:** Every commit must pass type-checking (`tsc`) and the complete test suite, enforcing a "Zero-Bug" deployment philosophy before any code is merged into production.

## Tech Stack

| Category           | Technology          | Usage                                                              |
| :----------------- | :------------------ | :----------------------------------------------------------------- |
| **Core Framework** | **Next.js 16**      | App Router, Server Actions, Edge Runtime capability.               |
| **UI Library**     | **React 19**        | Server Components, `useActionState`, Hooks.                        |
| **Language**       | **TypeScript**      | Strict type safety across the entire codebase.                     |
| **Database**       | **Neon (Postgres)** | Serverless SQL database for persisting contact form data.          |
| **Messaging**      | **Resend**          | Transactional email API for notifications and auto-replies.        |
| **Styling**        | **Tailwind CSS v4** | Utility-first CSS, configured with generic theme variables.        |
| **Animation**      | **Motion**          | Complex layout animations, spring physics, and micro-interactions. |
| **Validation**     | **Zod**             | Schema validation for environment variables and form inputs.       |
| **Testing**        | **Vitest**          | Blazing fast unit test runner compatible with Vite.                |
| **DevOps / CI/CD** | **Husky & Vercel**  | Git hooks for linting and automated edge deployment.               |

## Local Development

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/umarSiddique010/umarsiddique-portfolio.git
cd umarsiddique-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory. You will need credentials for Neon and Resend.

```bash
# Database (Neon Postgres)
DATABASE_URL="postgres://user:password@ep-host.region.aws.neon.tech/neondb?sslmode=require"

# Email (Resend)
RESEND_API_KEY="re_123456789"
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Running Tests

To execute the Vitest suite:

```bash
npm test
```

---

<div align="center">

### Developer & Maintainer

**Md Umar Siddique**

<p align="center">
  <a href="https://www.umarsiddique.dev/">
    <img src="https://img.shields.io/badge/Portfolio-umarsiddique.dev-000000?style=flat-square&logo=googlechrome&logoColor=white" alt="Portfolio Website" />
  </a>
  <a href="https://www.linkedin.com/in/md-umar-siddique-1519b12a4/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/umarSiddique010">
    <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.npmjs.com/~umarSiddique010">
    <img src="https://img.shields.io/badge/NPM-CB3837?style=flat-square&logo=npm&logoColor=white" alt="NPM" />
  </a>
  <a href="https://dev.to/umarsiddique010">
    <img src="https://img.shields.io/badge/Dev.to-0A0A0A?style=flat-square&logo=dev.to&logoColor=white" alt="Dev.to" />
  </a>
</p>

&copy; 2024 - Present. Released under the MIT License.

</div>
