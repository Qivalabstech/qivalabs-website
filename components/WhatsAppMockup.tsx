'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  type: 'in' | 'out';
  text: string;
  time: string;
}

const CONVERSATION: Message[] = [
  { id: 1, type: 'out', text: 'Bhai, aaj tamatar ka rate kya hai?', time: '10:02' },
  { id: 2, type: 'in',  text: 'Namaste Ramesh bhai! 🌿 Aaj tamatar ₹28/kg, pyaaz ₹22/kg. Kya order dena hai?', time: '10:02' },
  { id: 3, type: 'out', text: '50kg tamatar chahiye bhai', time: '10:03' },
  { id: 4, type: 'in',  text: '✅ 50kg tamatar @ ₹28/kg = ₹1,400. Kal subah 8 baje delivery. Confirm?', time: '10:03' },
  { id: 5, type: 'out', text: 'Haan bhai, confirm karo', time: '10:04' },
  { id: 6, type: 'in',  text: 'Done! 🎉 Order #2847 confirm ho gaya. Aapka baki balance ₹3,200 hai. Dhanyawad!', time: '10:04' },
];

const STEP_DELAYS = [800, 1400, 1200, 1400, 900, 1600];
const TYPING_DURATION = 900;

export default function WhatsAppMockup() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function runLoop() {
      while (!cancelled) {
        setVisible([]);
        setTyping(false);
        await delay(600);

        for (let i = 0; i < CONVERSATION.length; i++) {
          if (cancelled) return;
          const msg = CONVERSATION[i];

          if (msg.type === 'in') {
            setTyping(true);
            await delay(TYPING_DURATION);
            if (cancelled) return;
            setTyping(false);
          }

          setVisible((prev) => [...prev, msg.id]);
          await delay(STEP_DELAYS[i]);
        }

        await delay(2400);
      }
    }

    runLoop();
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      className="relative w-full max-w-[340px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl"
      style={{ boxShadow: '0 0 60px rgba(34, 211, 238, 0.18), 0 30px 80px rgba(0,0,0,0.6)' }}
    >
      {/* Phone chrome */}
      <div className="bg-[#1a1a2e] rounded-t-[2rem] p-3 flex items-center justify-center">
        <div className="w-20 h-1.5 bg-[#333] rounded-full" />
      </div>

      {/* WhatsApp header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: '#075E54' }}
      >
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
          >
            Q
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">QIVA Bot</p>
          <p className="text-[#25D366] text-xs">Online • Business badho</p>
        </div>
        <div className="ml-auto flex gap-3">
          <svg className="w-5 h-5 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
      </div>

      {/* Chat body */}
      <div
        className="min-h-[380px] flex flex-col justify-end gap-2 px-3 py-4 overflow-hidden"
        style={{
          background: '#E5DDD5',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      >
        <AnimatePresence>
          {CONVERSATION.filter((m) => visible.includes(m.id)).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.type === 'out' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] px-3 py-2 text-xs text-gray-800 shadow-sm ${
                  msg.type === 'out' ? 'wa-bubble-out' : 'wa-bubble-in'
                }`}
              >
                <p className="leading-[1.5]">{msg.text}</p>
                <p className={`text-[10px] mt-0.5 opacity-60 ${msg.type === 'out' ? 'text-right' : ''}`}>
                  {msg.time}
                  {msg.type === 'out' && (
                    <span className="ml-1 text-[#53bdeb]">✓✓</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}

          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex justify-start"
            >
              <div className="wa-bubble-in px-3 py-2.5 shadow-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: '#f0f0f0' }}
      >
        <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-xs text-gray-400">
          Type a message…
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: '#25D366' }}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>

      {/* Phone chrome bottom */}
      <div className="bg-[#1a1a2e] rounded-b-[2rem] p-3 flex justify-center">
        <div className="w-16 h-1 bg-[#333] rounded-full" />
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
