# sv-todo

A simple, modern Todo application built with **SvelteKit**, **Drizzle ORM**, and **TypeScript**.

---

## 🚀 Features

- **User authentication** (sign up, sign in)
- **Create, edit, and delete** todo items
- **Organize todos by slug** (custom URLs)
- **Persistent storage** with Drizzle ORM and SQL
- **Responsive, clean UI**

---

## 🛠️ Tech Stack

- [SvelteKit](https://kit.svelte.dev/) – Frontend framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Drizzle ORM](https://orm.drizzle.team/) – Database ORM
- [Vite](https://vitejs.dev/) – Build tool
- [PNPM](https://pnpm.io/) – Package manager

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PNPM](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Database Setup

1. Configure your database connection in `drizzle.config.ts`.
2. Run migrations (if any) using Drizzle CLI.

### Development

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
pnpm build
```

---

## 📁 Project Structure

```text
src/routes/   – SvelteKit routes (pages, API endpoints)
src/lib/      – Shared libraries, components, stores, and database logic
drizzle/      – Database migrations and metadata
static/       – Static assets
```

---

## 📄 License

MIT
