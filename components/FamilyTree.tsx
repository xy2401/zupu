
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FamilyData, Person, TreeDataNode } from '../types';

interface Props {
  data: FamilyData;
  onSelectMember: (person: Person) => void;
}

const FamilyTree: React.FC<Props> = ({ data, onSelectMember }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG contents
    d3.select(svgRef.current).selectAll('*').remove();

    // Transform data for D3 tree
    const buildHierarchy = (id: string): TreeDataNode => {
      const person = data.members[id];
      return {
        name: person.name,
        person,
        children: person.childrenIds?.map(childId => buildHierarchy(childId)) || []
      };
    };

    const rootData = buildHierarchy(data.rootId);
    const root = d3.hierarchy<TreeDataNode>(rootData);

    const width = 1200;
    const height = 800;
    const margin = { top: 40, right: 120, bottom: 40, left: 120 };

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });
    
    d3.select(svgRef.current).call(zoom);

    const treeLayout = d3.tree<TreeDataNode>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    treeLayout(root);

    // Links
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, any>()
        .x(d => d.y)
        .y(d => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Nodes
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .on('click', (event, d) => onSelectMember(d.data.person))
      .style('cursor', 'pointer');

    node.append('rect')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', -50)
      .attr('y', -25)
      .attr('rx', 8)
      .attr('fill', d => d.data.person.gender === 'male' ? '#fff1f1' : '#f1f1ff')
      .attr('stroke', '#8b0000')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Noto Serif SC')
      .attr('font-weight', 'bold')
      .attr('fill', '#2c1810')
      .text(d => d.data.name);

    node.append('text')
      .attr('dy', '1.6em')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .text(d => `${d.data.person.generation}代`);

  }, [data, onSelectMember]);

  return (
    <div className="w-full h-full bg-[#fcfaf2] border border-stone-200 rounded-lg shadow-inner overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded shadow text-sm text-stone-600">
        提示：滚轮缩放，左键拖拽平移，点击节点查看详情
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default FamilyTree;
