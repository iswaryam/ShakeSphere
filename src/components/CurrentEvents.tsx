import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ExternalLink, RefreshCw, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ShakespeareEvent {
  title: string;
  location: string;
  date: string;
  type: 'Play' | 'Movie' | 'Festival' | 'Exhibition';
  description: string;
}

export const CurrentEvents: React.FC = () => {
  const [events, setEvents] = useState<ShakespeareEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Please set it in your environment variables.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "List 4-5 current or upcoming Shakespeare plays, movies, or events happening around the world in 2026. Format as a JSON array of objects with keys: title, location, date, type (one of: Play, Movie, Festival, Exhibition), and description. Return ONLY the JSON.",
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const data = JSON.parse(response.text || "[]");
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      // Fallback data
      setEvents([
        {
          title: "Hamlet",
          location: "Royal Shakespeare Theatre, Stratford-upon-Avon",
          date: "Spring 2026",
          type: "Play",
          description: "A major new production of the tragedy."
        },
        {
          title: "Shakespeare in the Park",
          location: "Central Park, New York",
          date: "Summer 2026",
          type: "Festival",
          description: "Free performances of 'As You Like It'."
        },
        {
          title: "The Tempest",
          location: "Globe Theatre, London",
          date: "Autumn 2026",
          type: "Play",
          description: "A magical production in the heart of London."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-16 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 text-amber-700 text-xs font-bold uppercase tracking-widest border border-amber-200/30">
            <Globe size={14} />
            Live Archive
          </div>
          <h2 className="text-4xl font-serif font-bold text-stone-900">The Global Stage Today</h2>
          <p className="text-stone-600 font-serif italic">Current productions and events keeping the Bard's spirit alive across the globe.</p>
        </div>
        <button 
          onClick={fetchEvents}
          disabled={loading}
          className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors"
          title="Refresh Events"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-amber-50/50 animate-pulse rounded-2xl border border-amber-200/50" />
            ))
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#fdfaf1] p-6 rounded-2xl border-2 border-[#d4c5a9] shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Calendar size={80} />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                      {event.type}
                    </span>
                    <span className="text-xs font-serif text-amber-700">{event.date}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-stone-500 text-xs mt-1">
                      <MapPin size={12} />
                      {event.location}
                    </div>
                  </div>
                  
                  <p className="text-sm text-stone-600 font-serif leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="pt-2">
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(event.title + ' ' + event.location + ' Shakespeare')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-800 flex items-center gap-1 hover:underline"
                    >
                      View Details <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
