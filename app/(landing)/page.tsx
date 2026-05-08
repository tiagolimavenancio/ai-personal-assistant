"use client";

import { useState } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Users,
  MessageSquare,
  Brain,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Brain,
    title: "Advanced AI",
    description:
      "Assistant powered by cutting-edge AI models that learns and evolves with you.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversation",
    description:
      "Interact naturally and receive contextual and personalized responses.",
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Automate repetitive tasks and gain time to focus on what matters.",
  },
  {
    icon: Shield,
    title: "Privacy",
    description:
      "Your data is encrypted and protected with the highest security standards.",
  },
  {
    icon: Users,
    title: "Multiple Assistants",
    description:
      "Create different assistants for different needs and areas of your life.",
  },
  {
    icon: Sparkles,
    title: "Customization",
    description:
      "Customize personality, voice tone, and settings of your assistant.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up for free and access our intuitive platform.",
  },
  {
    number: "02",
    title: "Configure your assistant",
    description:
      "Choose the personality, goals, and preferences of your assistant.",
  },
  {
    number: "03",
    title: "Start interacting",
    description:
      "Use your assistant via chat, voice, or integration with your favorite apps.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect to get started",
    features: [
      "1 virtual assistant",
      "50 messages/month",
      "Basic AI",
      "Email support",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For personal use",
    features: [
      "3 virtual assistants",
      "Unlimited messages",
      "Advanced AI",
      "Integrations",
      "Priority support",
    ],
    cta: "Try Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$149",
    period: "/month",
    description: "For teams",
    features: [
      "10 virtual assistants",
      "Unlimited messages",
      "Premium AI",
      "Advanced integrations",
      "Team management",
      "24/7 support",
    ],
    cta: "Talk to Sales",
    highlight: false,
  },
];

const faqs = [
  {
    question: "What is an AI personal assistant?",
    answer:
      "An AI personal assistant is an intelligent virtual companion that uses artificial intelligence to help you with various tasks, from organization to answering questions and executing automated actions.",
  },
  {
    question: "How long does it take to create my assistant?",
    answer:
      "You can create your first assistant in less than 5 minutes! Our intuitive interface guides you through the setup process.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption and follow rigorous security standards. Your data is never shared with third parties.",
  },
  {
    question: "Can I use it on any device?",
    answer:
      "Yes! Our platform works on any web browser, plus we have mobile apps for iOS and Android.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes, you can cancel your subscription at any time with no additional fees. Your access remains until the end of your paid period.",
  },
];

function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Personal Assistance AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
              onClick={() => router.replace("/sign-in")}
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600">
                How it works
              </a>
              <a href="#pricing" className="text-gray-600">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600">
                FAQ
              </a>
              <button
                className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => {
                  router.replace("/sign-in");
                }}
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>New version with smarter AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your personal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Intelligent Assistant
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create personalized virtual assistants that understand you, learn
            from you, and help you be more productive every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition-all hover:scale-105 flex items-center justify-center gap-2">
              Create my assistant
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-violet-300 transition-all flex items-center justify-center gap-2">
              Watch demo
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-500">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">50M+</div>
              <div className="text-sm text-gray-500">Messages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-8 max-w-5xl mx-auto shadow-2xl">
            <div className="bg-gray-800 rounded-xl p-6 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-2">
                    Pro Assistant
                  </div>
                  <p className="text-gray-100 text-lg">
                    Hello! I'm your personal assistant. I'm here to help with
                    tasks, answer questions, or just chat. How can I help you
                    today?
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <div className="h-12 bg-gray-700 rounded-lg flex-1 animate-pulse" />
                <div className="h-12 bg-violet-600 rounded-lg w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools to create the perfect assistant for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-violet-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-200 transition-colors">
                <feature.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In three simple steps you'll have your personal assistant ready
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-8xl font-bold text-violet-100 absolute -top-4 -left-2">
                {step.number}
              </div>
              <div className="relative pt-12 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-violet-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the ideal plan for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl ${
                plan.highlight
                  ? "bg-gray-900 text-white ring-4 ring-violet-500/50"
                  : "bg-gray-50"
              }`}
            >
              <div className="mb-6">
                <h3
                  className={`text-xl font-semibold mb-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span
                  className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-gray-500 ${plan.highlight ? "text-gray-400" : ""}`}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle
                      className={`w-5 h-5 ${plan.highlight ? "text-violet-400" : "text-violet-600"}`}
                    />
                    <span
                      className={
                        plan.highlight ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ArrowRight
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? "rotate-90" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Personal Assistance AI
              </span>
            </div>
            <p className="text-sm">
              Your intelligent personal assistant for a more productive life.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © 2025 Personal Assistance AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
