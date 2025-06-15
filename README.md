# **turbo-ts-cli**

`turbo-ts-cli` is a CLI tool to bootstrap and manage **pnpm/Turborepo monorepos**, focusing on **Next.js and Node.js applications**. It provides a streamlined way to set up a **modern, scalable monorepo** with **best practices** baked in, while maintaining **minimal configuration**.

Despite being **batteries-included** with features like ESLint, TypeScript, and build tools, the project emphasizes **simplicity**, keeping all configurations **lean** and **easily customizable**.

---

## **✨ Features**
✔ Quickly bootstrap a **new monorepo** with **pnpm** and **Turborepo**
✔ Set up **Next.js, Node.js, NestJS** applications within the monorepo
✔ Integrate **shared packages** for common functionality
✔ Configure **ESLint, Prettier, TypeScript** for code quality
✔ Set up a **PostgreSQL database with Prisma ORM**
✔ Configure **BullMQ** for background job processing
✔ Implement **Docker** for a consistent development environment

---

## **⚡ Tech Stack**
- **Package Manager**: pnpm
- **Monorepo Tool**: Turborepo
- **Frontend**: Next.js
- **Backend**: Nest.js, Node.js
- **Database**: PostgreSQL + Prisma ORM
- **Queue System**: BullMQ
- **Containerization**: Docker
- **Language**: TypeScript
- **Linting & Formatting**: ESLint + Prettier

---

## **🚀 Installation & Usage**

### **1️⃣ Install the CLI**
```sh
pnpm add -g turbo-ts-cli
```

or use `npx` (without installation):
```sh
npx turbo-ts-cli@latest <monorepo-name>
```

### **2️⃣ Create a new monorepo**
```sh
turbo-ts-cli my-monorepo
```
Follow the interactive prompts to customize your project setup.

---

## **📚 Project Structure**
Once the monorepo is created, the structure will look like this:

```
my-monorepo/
├── apps/
│   ├── web/               # Next.js web application
│   ├── api/               # NestJS API server
│   └── worker/            # Node.js worker application
├── packages/
│   ├── db/                # Shared database package (Prisma)
│   ├── docker/            # Docker Compose configuration for development
│   ├── queue/             # Shared queue package (BullMQ)
│   ├── types/             # Shared TypeScript type package
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## **🛠 Commands**
After setting up your project, use the following commands:

### **1️⃣ Install dependencies**
```sh
pnpm install
```

### **2️⃣ Build**
```sh
pnpm build
```

### **3️⃣ Start the development environment**
```sh
pnpm dev
```

### **4️⃣ Initialize the database**
```sh
pnpm db:init
```

### **Other useful commands**
```sh
pnpm build      # Build all packages and apps
pnpm lint       # Run ESLint for all packages and apps
pnpm format     # Format all files using Prettier
pnpm test       # Run tests for all packages and apps
```

---

## **🤝 Contributing**
Contributions are welcome! Feel free to submit a Pull Request or open an issue.

---

## **👥 Credits**
**Creator**:
Kevin Wade ([YouTube](https://www.youtube.com/@kevinwwwade), [X/Twitter](https://x.com/kevinwwwade), [GitHub](https://github.com/mrwade))

**Modified by**:
flexyz ([GitHub](https://github.com/flexyzwork), [Email](contact@flexyzwork.com))

---

## **📝 License**
This project is licensed under the **MIT License**.

---
