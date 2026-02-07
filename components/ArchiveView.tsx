
import React from 'react';
import { FamilyData, Person } from '../types';

interface Props {
  data: FamilyData;
  onSelectMember: (person: Person) => void;
}

const ArchiveView: React.FC<Props> = ({ data, onSelectMember }) => {
  // Fix: Cast values to Person[] to fix unknown property errors when filtering for members with biography details.
  const membersWithBio = (Object.values(data.members) as Person[]).filter(m => m.bio || m.occupation);

  return (
    <div className="w-full h-full overflow-y-auto bg-[#f5f5f5] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-stone-300 pb-4">
          <div>
            <h2 className="text-3xl font-serif-zh font-bold text-[#2c1810]">文史典藏</h2>
            <p className="text-stone-500 mt-2">记录先贤事迹，传颂家族荣光</p>
          </div>
          <div className="text-sm text-stone-400">共收录 {membersWithBio.length} 篇传记</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membersWithBio.map(member => (
            <div 
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-stone-200 flex flex-col cursor-pointer group"
            >
              <div className="h-48 overflow-hidden bg-stone-100 relative">
                <img 
                  src={`https://picsum.photos/seed/${member.id}/400/300`} 
                  alt={member.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                   <h3 className="text-white text-xl font-bold font-serif-zh">{member.name}</h3>
                   <p className="text-white/80 text-xs">第 {member.generation} 代 · {member.occupation || '先贤'}</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 italic">
                  "{member.bio || '生平资料正在整理中...'}"
                </p>
                <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-xs text-stone-400">{member.location || '绍兴'}</span>
                  <button className="text-[#8b0000] text-xs font-bold hover:underline">阅读全文 →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveView;
