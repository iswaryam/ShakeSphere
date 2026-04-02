import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { shakespeareData, Node, Link } from '../lib/shakespeareData';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X, Filter, Search, ExternalLink, BookOpen, Users } from 'lucide-react';

export const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterGenre, setFilterGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    let nodes = shakespeareData.nodes;
    if (filterGenre !== 'All') {
      const playIds = nodes.filter(n => n.group === 'play' && n.genre === filterGenre).map(n => n.id);
      nodes = nodes.filter(n => 
        (n.group === 'play' && n.genre === filterGenre) ||
        (n.group !== 'play' && shakespeareData.links.some(l => {
          const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
          const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
          return (sourceId === n.id && playIds.includes(targetId)) ||
                 (targetId === n.id && playIds.includes(sourceId));
        }))
      );
    }
    if (searchQuery) {
      nodes = nodes.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const nodeIds = new Set(nodes.map(n => n.id));
    const links = shakespeareData.links.filter(l => {
      const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });

    return { nodes, links };
  }, [filterGenre, searchQuery]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const updateDimensions = () => {
      const width = container.clientWidth;
      const height = 600;

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

      svg.selectAll('*').remove();

      // Add a parchment-like background pattern/filter if needed, but we'll stick to CSS for simplicity
      // Add glow filter
      const defs = svg.append('defs');
      const filter = defs.append('filter')
        .attr('id', 'glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');

      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      // Add gradient for nodes
      const gradient = defs.append('radialGradient')
        .attr('id', 'nodeGradient');
      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', 0.3);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', 'currentColor').attr('stop-opacity', 1);

      const g = svg.append('g');

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      const nodes: (Node & d3.SimulationNodeDatum)[] = filteredData.nodes.map(d => ({ ...d }));
      const links: (Link & d3.SimulationLinkDatum<d3.SimulationNodeDatum>)[] = filteredData.links.map(d => ({ ...d }));

      const simulation = d3.forceSimulation<Node & d3.SimulationNodeDatum>(nodes)
        .force('link', d3.forceLink<Node & d3.SimulationNodeDatum, Link & d3.SimulationLinkDatum<d3.SimulationNodeDatum>>(links).id(d => d.id).distance(200))
        .force('charge', d3.forceManyBody().strength(-800))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(80));

      const linkColors = {
        'motif': '#8b7355',
        'adaptation': '#ed64a6',
        'origin': '#38a169',
        'influence': '#3182ce',
        'etymology': '#805ad5',
        'character-overlap': '#dd6b20'
      };

      const link = g.append('g')
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', (d: any) => linkColors[d.type as keyof typeof linkColors] || '#8b7355')
        .attr('stroke-width', (d: any) => Math.sqrt(d.value) * 2)
        .attr('stroke-opacity', 0.4)
        .attr('class', 'transition-all duration-500 hover:stroke-opacity-100 cursor-help')
        .style('filter', 'url(#glow)');

      // Add animated particles on links
      const particles = g.append('g')
        .selectAll('circle')
        .data(links)
        .join('circle')
        .attr('r', 2)
        .attr('fill', (d: any) => linkColors[d.type as keyof typeof linkColors] || '#8b7355')
        .attr('opacity', 0.8)
        .each(function(d: any) { (d as any).progress = Math.random(); });

      const node = g.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .attr('class', 'cursor-pointer group')
        .on('click', (event, d) => {
          setSelectedNode(d);
          event.stopPropagation();
        })
        .call(d3.drag<SVGGElement, Node & d3.SimulationNodeDatum>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any);

      // Node shadow/glow
      node.append('circle')
        .attr('r', (d: any) => {
          if (d.group === 'play') return 32;
          if (d.group === 'character') return 26;
          return 22;
        })
        .attr('fill', (d: any) => d.color || '#8b7355')
        .attr('opacity', 0.15)
        .attr('class', 'animate-pulse');

      node.append('circle')
        .attr('r', (d: any) => {
          if (d.group === 'play') return 26;
          if (d.group === 'character') return 22;
          return 18;
        })
        .attr('fill', (d: any) => d.color || '#8b7355')
        .attr('stroke', '#3e2723')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', (d: any) => d.group === 'pop-culture' ? '4,2' : 'none')
        .attr('class', 'transition-all duration-300 group-hover:stroke-amber-500 group-hover:stroke-[4px] shadow-lg');

      node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.3em')
        .attr('font-size', (d: any) => d.group === 'play' ? '22px' : '18px')
        .text((d: any) => d.icon || '•')
        .attr('class', 'pointer-events-none select-none');

      node.append('text')
        .attr('dx', (d: any) => d.group === 'play' ? 35 : 30)
        .attr('dy', 5)
        .text((d: any) => d.label)
        .attr('fill', '#3e2723')
        .attr('font-size', (d: any) => d.group === 'play' ? '16px' : '14px')
        .attr('font-family', 'serif')
        .attr('font-weight', (d: any) => d.group === 'play' ? 'bold' : '500')
        .attr('class', 'pointer-events-none select-none opacity-80 group-hover:opacity-100 transition-opacity');

      simulation.on('tick', () => {
        link.attr('d', (d: any) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dr = Math.sqrt(dx * dx + dy * dy) * 1.5; // Curve factor
          return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
        });

        particles.attr('transform', function(this: any, d: any) {
          const parent = d3.select(this.parentNode).selectAll('path').filter((p: any) => p === d).node() as SVGPathElement;
          if (!parent) return '';
          
          // Increment progress
          d.progress = (d.progress + 0.005) % 1;
          const l = parent.getTotalLength();
          const p = parent.getPointAtLength(d.progress * l);
          return `translate(${p.x},${p.y})`;
        });

        node
          .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return simulation;
    };

    const simulation = updateDimensions();
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(container);

    return () => {
      simulation.stop();
      resizeObserver.disconnect();
    };
  }, [filteredData]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center bg-amber-50/50 p-4 rounded-xl border border-amber-200/50">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-amber-800" />
          <select 
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="bg-transparent border-b border-amber-300 text-amber-900 font-serif focus:outline-none"
          >
            <option value="All">All Genres</option>
            <option value="Comedy">Comedies</option>
            <option value="Tragedy">Tragedies</option>
            <option value="History">Histories</option>
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <Search size={18} className="text-amber-800" />
          <input 
            type="text"
            placeholder="Search the archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-b border-amber-300 text-amber-900 font-serif focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="relative w-full h-[600px] bg-[#fdfaf1] rounded-3xl border-2 border-[#d4c5a9] shadow-inner overflow-hidden" ref={containerRef}>
        <svg ref={svgRef} className="w-full h-full" />
        
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-72 bg-[#fcf8e8] border-2 border-[#d4c5a9] p-6 rounded-2xl shadow-xl z-20"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-3 right-3 text-[#8b7355] hover:text-[#5d4037]"
              >
                <X size={20} />
              </button>
              <div className="space-y-3">
                <div className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                  {selectedNode.group}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3e2723]">{selectedNode.label}</h3>
                {selectedNode.genre && (
                  <p className="text-xs font-serif italic text-amber-700">{selectedNode.genre}</p>
                )}
                <p className="text-sm text-[#5d4037] leading-relaxed font-serif">
                  {selectedNode.description}
                </p>

                {selectedNode.group === 'play' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-serif text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-amber-300"
                  >
                    <BookOpen size={16} />
                    View Play Details
                  </button>
                )}

                {/* Connections Section */}
                <div className="pt-4 border-t border-amber-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900">Connections</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {shakespeareData.links
                      .filter(l => {
                        const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
                        const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
                        return sourceId === selectedNode.id || targetId === selectedNode.id;
                      })
                      .map((l, i) => {
                        const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
                        const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
                        const otherNodeId = sourceId === selectedNode.id ? targetId : sourceId;
                        const otherNode = shakespeareData.nodes.find(n => n.id === otherNodeId);
                        
                        return (
                          <div key={i} className="p-2 rounded bg-white/50 border border-amber-100 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900">{otherNode?.label}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">{l.type}</span>
                            </div>
                            {l.reason && (
                              <p className="text-[11px] text-stone-600 italic leading-tight">
                                {l.reason}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-6 left-6 flex flex-col gap-4 z-10">
          <div className="bg-[#fcf8e8]/90 backdrop-blur-sm border border-[#d4c5a9] p-3 rounded-xl shadow-sm space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-900 mb-1">Legend</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-stone-700" />
                <span className="text-[9px] text-stone-600 font-serif">Plays</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="text-[9px] text-stone-600 font-serif">Themes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500 border border-dashed border-stone-800" />
                <span className="text-[9px] text-stone-600 font-serif">Pop Culture (Dashed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[9px] text-stone-600 font-serif">Characters</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#8b7355] font-serif flex items-center gap-2">
            <Info size={14} />
            Drag to rearrange, scroll to zoom. Click nodes for details.
          </div>
        </div>
      </div>

      {/* Play Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedNode && selectedNode.group === 'play' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#fdfaf1] border-4 border-[#d4c5a9] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative custom-scrollbar"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                    {selectedNode.genre}
                  </div>
                  <h2 className="text-5xl font-serif font-bold text-stone-900 flex items-center gap-4">
                    <span className="text-4xl">{selectedNode.icon}</span>
                    {selectedNode.label}
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <section className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 flex items-center gap-2">
                        <BookOpen size={14} />
                        Synopsis
                      </h4>
                      <p className="text-stone-700 leading-relaxed font-serif italic text-lg">
                        {selectedNode.synopsis}
                      </p>
                    </section>

                    {selectedNode.externalLink && (
                      <a
                        href={selectedNode.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 font-serif font-bold border-b-2 border-amber-200 hover:border-amber-400 transition-all pb-1"
                      >
                        Read at Folger Shakespeare Library
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <aside className="space-y-6">
                    <section className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 flex items-center gap-2">
                        <Users size={14} />
                        Main Characters
                      </h4>
                      <ul className="space-y-2">
                        {selectedNode.mainCharacters?.map((char, i) => (
                          <li key={i} className="text-sm font-serif text-stone-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </aside>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
