# Investor Room

Separate Next.js application for RandomTrip's investor room.

## 📚 Documentation

- **[Architecture Planning](./docs/investor-room-architecture.md)** - Architecture decisions, comparison of approaches, and technical stack
- **[Feature Specification](./docs/investor-room-feature-spec.md)** - Complete feature requirements and user journey
- **[Hybrid Approach Explained](./docs/investor-room-hybrid-approach.md)** - Detailed explanation of what's shared and how

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3011](http://localhost:3011) in your browser.

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://..." # Same database as main app
NEXTAUTH_URL="http://localhost:3011"
```

## Project Structure

```
investor-room/
  ├── app/              # Next.js App Router
  ├── components/       # React components
  ├── lib/              # Utilities and helpers
  ├── types/            # TypeScript types
  ├── prisma/           # Database schema
  └── docs/             # Architecture and design docs
```

## Status

✅ Project structure created  
⏳ Prisma schema setup (next step)  
⏳ Application implementation (next step)
