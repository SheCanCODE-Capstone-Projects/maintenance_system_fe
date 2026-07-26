"use client";

import { FormEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";

type Message = { id: string; sender: string; text: string; at: string };
const key = "maintenance-hub-messages";
const starter: Message[] = [{ id: "welcome", sender: "Maintenance Hub", text: "Use this chat to ask about job progress, location, and service information.", at: "Now" }];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(starter); const [text, setText] = useState("");
  useEffect(() => { try { const saved = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Message[]; if (saved.length) setMessages(saved); } catch {} }, []);
  const send = (event: FormEvent) => { event.preventDefault(); const message = text.trim(); if (!message) return; const next = [...messages, { id: crypto.randomUUID(), sender: "You", text: message, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]; setMessages(next); window.localStorage.setItem(key, JSON.stringify(next)); setText(""); };
  return <main className="min-h-screen bg-[#f5f7f6] p-5 sm:p-10"><section className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><header className="border-b border-slate-200 bg-[#062A27] px-6 py-5 text-white"><h1 className="font-heading text-xl font-bold">Messages</h1><p className="mt-1 text-sm text-teal-100">Customer, technician, company, and admin support chat</p></header><div className="min-h-[420px] space-y-3 p-5">{messages.map((message) => <article key={message.id} className={`max-w-[82%] rounded-xl px-4 py-3 ${message.sender === "You" ? "ml-auto bg-[#ff5a1f] text-white" : "bg-slate-100 text-slate-700"}`}><p className="text-xs font-bold opacity-80">{message.sender}</p><p className="mt-1 text-sm">{message.text}</p><p className="mt-1 text-[10px] opacity-70">{message.at}</p></article>)}</div><form onSubmit={send} className="flex gap-3 border-t border-slate-200 p-4"><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Ask for progress or information…" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#ff5a1f]" /><button className="inline-flex items-center gap-2 rounded-lg bg-[#ff5a1f] px-4 py-3 text-sm font-semibold text-white"><Send size={16} />Send</button></form></section></main>;
}
