import React from 'react';
import { Github, ExternalLink, Sparkles } from 'lucide-react';

export const Resources: React.FC = () => {
  return (
    <section id="resources" className="grid md:grid-cols-2 gap-8 py-16">
      <ResourceCard
        icon={<Github size={20} />}
        title="Network Graphs Project"
        description="The original analysis of visualizing Hamilton characters as a social network."
        link="https://hackernoon.com/analysis-of-network-graphs-visualizing-hamilton-characters-as-a-social-network"
      />
      <ResourceCard
        icon={<Sparkles size={20} />}
        title="Folger Shakespeare"
        description="The definitive resource for digital Shakespeare texts and research."
        link="https://www.folger.edu"
      />
    </section>
  );
};

const ResourceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="p-8 rounded-3xl bg-[#fcf8e8] border-2 border-[#d4c5a9] hover:border-amber-600 transition-all group shadow-sm hover:shadow-md flex items-start gap-6"
  >
    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 group-hover:bg-amber-100 transition-colors border border-amber-100 shrink-0">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
        {title}
        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-800" />
      </h3>
      <p className="text-sm text-stone-600 leading-relaxed font-serif italic">
        {description}
      </p>
    </div>
  </a>
);
