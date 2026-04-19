import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';
import { ChatIcon, XIcon, SendIcon, MicIcon, MicOffIcon } from './Icons';

const API_BASE = 'http://localhost:8000';
const GEMINI_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

const QUICK = [
  { label: 'Most milk yield',         q: 'Which breed gives the most milk?' },
  { label: 'About Gir cow',           q: 'Tell me about the Gir cow breed' },
  { label: 'Best buffalo for milk',   q: 'Best buffalo breed for milk production?' },
  { label: 'Sahiwal breed',           q: 'What is the Sahiwal cow known for?' },
  { label: 'Murrah vs Jaffarabadi',   q: 'Difference between Murrah and Jaffarabadi buffalo?' },
];

function fmt(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot({ apiKey: apiKeyProp }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { id: 1, role: 'bot', text: 'Hello! Ask me anything about Indian cattle breeds.', time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);

  // Effective API key: prop (from App state/localStorage) or env
  const apiKey = apiKeyProp || GEMINI_KEY;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  const addMsg = (role, text) =>
    setMsgs(prev => [...prev, { id: Date.now(), role, text, time: new Date() }]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    if (!apiKey) {
      addMsg('bot', 'A Gemini API key is required. Please configure REACT_APP_GEMINI_API_KEY in your .env file.');
      return;
    }

    addMsg('user', msg);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, api_key: apiKey }),
      });
      const data = await res.json();
      const reply = data.response || 'Sorry, no response received.';
      addMsg('bot', reply);

      if (window.speechSynthesis) {
        const utt = new SpeechSynthesisUtterance(reply);
        utt.lang = 'en-IN';
        utt.rate = 0.95;
        window.speechSynthesis.speak(utt);
      }
    } catch (err) {
      addMsg('bot', `Connection error: ${err.message}. Ensure the backend is running on port 8000.`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      addMsg('bot', 'Voice recognition is not supported in this browser. Please use Chrome.');
      return;
    }
    if (listening) { recognitionRef.current?.stop(); return; }

    const r = new SR();
    r.lang = 'en-IN';
    r.interimResults = false;
    r.maxAlternatives = 1;
    recognitionRef.current = r;

    r.onstart = () => setListening(true);
    r.onresult = (e) => send(e.results[0][0].transcript);
    r.onerror = (e) => addMsg('bot', `Voice error: ${e.error}`);
    r.onend = () => setListening(false);
    r.start();
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <XIcon /> : <ChatIcon />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Cattle Assistant</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Powered by Gemini AI</div>
            </div>
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>
              <XIcon />
            </button>
          </div>

          {/* Quick chips */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
            {QUICK.map(({ label, q }) => (
              <button key={q} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50" onClick={() => send(q)} disabled={loading}>
                {label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <input
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Ask about any breed…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              disabled={loading}
            />
            <button
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 ${
                listening ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' : ''
              }`}
              onClick={toggleMic}
              title={listening ? 'Stop' : 'Voice input'}
            >
              {listening ? <MicOffIcon /> : <MicIcon />}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              onClick={() => send()}
              disabled={loading || !input.trim()}
              title="Send"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
