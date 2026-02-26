import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Edit2, RefreshCw, Moon, Sun, Leaf } from 'lucide-react';

// --- Constants & Data ---

const QUOTES = [
  "To the world, we are siblings. To each other, we are a private comedy club with no cover charge.",
  "Shared DNA, shared secrets, and a mutual understanding that we are clearly the favorite children.",
  "A sibling is a lens through which you see your childhood in high definition and gold-tinted hues.",
  "We are the architects of each other's best memories and the patient witnesses to our most awkward phases.",
  "Like branches on a tree, we grow in different directions, yet our roots remain a single, golden thread.",
  "The original partners in crime, now gracefully upgraded to partners in life's grandest reveries.",
  "You are the anchor in my storm and the fine sparkle in my celebratory champagne.",
  "Siblings: the only people who can make you laugh until you cry, then cry until you laugh again.",
  "Our bond is written in the stars and forged in the fires of childhood living room forts.",
  "A sibling is a gift to the heart, a friend to the spirit, and a golden thread to the meaning of life.",
  "We may bicker over the vintage of the wine, but we conquer the world's challenges together.",
  "The keepers of the flame, the guardians of the legacy, and the best friends I never had to audition for.",
  "In the garden of life, siblings are the most resilient and beautiful perennials.",
  "We are a symphony of shared history, played with elegance on the strings of unconditional love.",
  "Through every season, you remain the constant, sophisticated melody in the soundtrack of my life.",
  "A sibling is a precious piece of childhood that can never be lost, only refined with time.",
  "We didn't realize we were making memories; we simply thought we were being legendary.",
  "Elegance is the only beauty that never fades, and our sibling bond is the height of sophistication."
];

const THEMES = {
  GOLD: {
    bg: 'bg-radial-[at_center_top] from-zinc-900 to-black',
    card: 'bg-zinc-900/50 border-zinc-800',
    accent: 'text-amber-400',
    button: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
    input: 'bg-black/40 border-zinc-800 text-zinc-200 focus:border-amber-500/50',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  AUTUMN: {
    bg: 'bg-radial-[at_center_top] from-stone-900 to-[#1a1412]',
    card: 'bg-stone-900/50 border-stone-800',
    accent: 'text-orange-400',
    button: 'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20',
    input: 'bg-black/40 border-stone-800 text-stone-200 focus:border-orange-500/50',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  }
};

// --- Helper Functions ---

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "A warm, golden morning to the ones who know me best.";
  if (hour >= 12 && hour < 17) return "A supportive afternoon wish for my favorite partners in mischief.";
  if (hour >= 17 && hour < 22) return "An evening of sentimental reflection on our shared journey.";
  return "A gentle night's rest to the keepers of my childhood secrets.";
};

const isSiblingsDay = () => {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 10; // April 10 (0-indexed month)
};

const formatNames = (names: string[]) => {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(", ");
  return `${rest} & ${last}`;
};

// --- Components ---

export default function App() {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSetup, setIsSetup] = useState(true);
  const [currentQuote, setCurrentQuote] = useState("");
  const [theme, setTheme] = useState<'GOLD' | 'AUTUMN'>('GOLD');

  useEffect(() => {
    const saved = localStorage.getItem('siblings_reverie_names');
    if (saved) {
      const parsed = JSON.parse(saved);
      setNames(parsed);
      setIsSetup(false);
      rollQuote();
    }
  }, []);

  const rollQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setCurrentQuote(QUOTES[randomIndex]);
  };

  const handleSave = () => {
    const cleaned = inputValue
      .split(',')
      .map(n => n.trim())
      .filter(n => n.length > 0);
    
    if (cleaned.length > 0) {
      setNames(cleaned);
      localStorage.setItem('siblings_reverie_names', JSON.stringify(cleaned));
      setIsSetup(false);
      rollQuote();
    }
  };

  const handleEdit = () => {
    setInputValue(names.join(', '));
    setIsSetup(true);
  };

  const currentTheme = THEMES[theme];
  const namesDisplay = useMemo(() => formatNames(names), [names]);
  const greeting = useMemo(() => getGreeting(), []);
  const isSpecialDay = useMemo(() => isSiblingsDay(), []);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-700 ${currentTheme.bg}`}>
      
      {/* Background Sparkle Effect for Special Day */}
      {isSpecialDay && !isSetup && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${currentTheme.accent}`}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 10,
                opacity: 0 
              }}
              animate={{ 
                y: -10,
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 3 + Math.random() * 4, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-[420px] rounded-[2.5rem] border p-8 shadow-2xl backdrop-blur-md transition-all duration-500 ${currentTheme.card}`}
      >
        <AnimatePresence mode="wait">
          {isSetup ? (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className={`text-3xl font-serif italic tracking-tight ${currentTheme.accent}`}>
                  Siblings Reverie
                </h1>
                <p className="text-zinc-400 text-sm">A chic appreciation for your closest kin.</p>
              </div>

              <div className="w-full space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">
                    Sibling Names
                  </label>
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. Amani, Brian, Neema"
                    className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-light ${currentTheme.input}`}
                  />
                  <p className="text-[10px] text-zinc-500 italic ml-1">Separate names with commas.</p>
                </div>

                <button 
                  onClick={handleSave}
                  className={`w-full py-4 rounded-2xl border font-medium tracking-wide transition-all duration-300 active:scale-95 ${currentTheme.button}`}
                >
                  Enter the Reverie
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="main"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center text-center"
            >
              {/* Theme Toggle */}
              <div className="absolute top-6 right-8 flex space-x-3">
                <button 
                  onClick={() => setTheme(theme === 'GOLD' ? 'AUTUMN' : 'GOLD')}
                  className={`p-2 rounded-full border transition-all duration-300 ${currentTheme.button}`}
                >
                  {theme === 'GOLD' ? <Leaf size={16} /> : <Sun size={16} />}
                </button>
              </div>

              {/* Illustration */}
              <div className={`mb-8 ${currentTheme.accent} opacity-80`}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20C35 20 25 35 25 50C25 65 35 80 50 80C65 80 75 65 75 50C75 35 65 20 50 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M35 50C35 42 42 35 50 35C58 35 65 42 65 50C65 58 58 65 50 65C42 65 35 58 35 50Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4"/>
                  <path d="M50 10V20M50 80V90M10 50H20M80 50H90" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Badge */}
              <div className={`mb-6 px-4 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold flex items-center space-x-2 ${currentTheme.badge}`}>
                {isSpecialDay ? <Sparkles size={12} /> : null}
                <span>{isSpecialDay ? "Official Siblings Day" : "Unofficial but mandatory appreciation"}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl font-serif leading-tight mb-3 text-zinc-100">
                Happy Great Siblings Day, <br />
                <span className={currentTheme.accent}>{namesDisplay}</span>
              </h1>

              {/* Subline */}
              <p className="text-zinc-400 text-sm font-light italic mb-10 max-w-[280px]">
                {greeting}
              </p>

              {/* Quote Card */}
              <div className="relative w-full mb-10 px-4">
                <div className="absolute -top-4 -left-2 text-4xl font-serif opacity-20 text-zinc-500">“</div>
                <motion.p 
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-zinc-200 text-lg font-light leading-relaxed tracking-wide"
                >
                  {currentQuote}
                </motion.p>
                <div className="absolute -bottom-8 -right-2 text-4xl font-serif opacity-20 text-zinc-500 rotate-180">“</div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-4 pt-4">
                <button 
                  onClick={rollQuote}
                  className={`w-full py-4 rounded-2xl border font-medium tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 ${currentTheme.button}`}
                >
                  <RefreshCw size={18} />
                  <span>Refresh Message</span>
                </button>

                <button 
                  onClick={handleEdit}
                  className="text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-widest font-bold flex items-center space-x-1 transition-colors duration-300 mx-auto"
                >
                  <Edit2 size={12} />
                  <span>Edit Names</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
