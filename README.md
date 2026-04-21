# AI Personal Assistant SaaS 🤖🚀

A fullstack **AI-powered Personal Assistant SaaS application** built with **Next.js, React, Convex, and Eden AI**.

This project demonstrates how to build a modern, scalable AI application capable of handling real-time conversations, user personalization, and monetization through token-based usage.

---

## 🧠 About the Project

This application allows users to interact with **custom AI assistants** through a modern chat interface.

It combines:

- Real-time backend (Convex)
- AI model orchestration (Eden AI)
- Modern frontend (Next.js + React)

The result is a **production-ready SaaS platform** with authentication, assistant customization, and scalable architecture. :contentReference[oaicite:0]{index=0}

---

## 🚀 Core Features

### 🤖 AI Assistant System
- Chat with AI assistants in real-time
- Multiple AI assistants per user
- Custom assistant personalities and configurations
- Support for multiple AI models via Eden AI

### ⚡ Real-Time Backend
- Powered by Convex (serverless backend)
- Instant chat updates
- Persistent chat history per user

### 🔐 Authentication & User Management
- Secure login and session handling
- Protected routes
- User profiles and settings

### 💬 Chat Experience
- Interactive chat UI
- Typing indicators
- Error handling for API responses

### 🎛️ Assistant Customization
- Create, edit, and delete assistants
- Configure:
  - Name
  - Personality
  - Tone
  - AI model

### 💳 Monetization System
- Token / credit-based usage system
- Track AI usage per user
- Payment integration (e.g., Razorpay)

### 📊 Dashboard & UX
- Sidebar navigation
- Assistant selection interface
- Responsive design (mobile + desktop)

---

## 🧰 Tech Stack

| Technology | Role |
|------------|------|
| **Next.js** | Fullstack framework |
| **React** | UI library |
| **TypeScript** | Type safety |
| **Convex** | Backend (real-time DB + functions) |
| **Eden AI** | AI model aggregation |
| **Tailwind CSS** | Styling |
| **Axios** | API requests |
| **Razorpay** *(optional)* | Payments |

---

## 📁 Project Structure
 
```
ai-assistant/
├── app/
│   ├── (auth)/            # Login and register pages
│   ├── dashboard/         # Main workspace layout
│   ├── assistants/        # AI assistant list and management
│   ├── chat/              # Chat UI per assistant
│   ├── profile/           # User profile and settings
│   └── api/
│       ├── ai/            # Eden AI API route
│       └── payment/       # Razorpay webhooks
├── components/            # Reusable UI components
├── convex/                # Convex backend functions and schema
├── lib/                   # Utility functions and helpers
├── public/                # Static assets
└── styles/                # Global styles (Tailwind)
```

## ⚙️ Getting Started
 
### Prerequisites
 
- Node.js >= 18
- A [Convex](https://www.convex.dev/) account
- An [Eden AI](https://www.edenai.co/) account and API key
- A [Razorpay](https://razorpay.com) account
- A Google OAuth app (for authentication)
### 1. Clone the Repository
 
```bash
git clone https://github.com/your-username/ai-personal-assistant.git
cd ai-personal-assistant
```
 
### 2. Install Dependencies
 
```bash
npm install
```
 
### 3. Set Up Environment Variables
 
Create a `.env.local` file in the root of your project:
 
```env
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_public_url
 
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
 
# Eden AI
EDEN_AI_API_KEY=your_eden_ai_api_key
 
# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
 
### 4. Initialize Convex
 
```bash
npx convex dev
```
 
### 5. Run the Development Server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---

### Real-Time Backend (Convex)
 
Convex handles chat history, user sessions, assistant configurations, and token balances in real time — no manual polling needed.
 
### Credit & Token System
 
Each API call deducts tokens from the user's balance stored in Convex. Users are notified when credits are low and can purchase more via Razorpay.
 
---
 
## 🚀 Deployment
 
1. Push your project to a GitHub repository.
2. Connect the repo to [Vercel](https://vercel.com).
3. Add all environment variables in the Vercel dashboard.
4. Deploy — Vercel handles the build and hosting automatically.
   
---
