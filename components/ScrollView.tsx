
import React from 'react';
import { FamilyData, Person } from '../types';

interface Props {
  data: FamilyData;
  onSelectMember: (person: Person) => void;
}

const ScrollView: React.FC<Props> = ({ data, onSelectMember }) => {
  // Fix: Cast Object.values to Person[] to allow access to member properties like generation.
  const generations = Array.from(new Set((Object.values(data.members) as Person[]).map(m => m.generation))).sort((a, b) => a - b);

  return (
    <div className="w-full h-full overflow-y-auto bg-[#fcfaf2] p-8 font-serif-zh">
      <div className="max-w-4xl mx-auto border-x border-stone-200 px-12 py-16 bg-white shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-stone-200 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-stone-200 to-transparent"></div>
        
        <h2 className="text-4xl text-center mb-16 text-[#8b0000] border-b-4 border-double border-[#8b0000] pb-4 inline-block mx-auto w-full">
          {data.familyName}氏宗族世代志
        </h2>

        <div className="space-y-12">
          {generations.map(gen => (
            <div key={gen} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-[#8b0000] flex-1 opacity-20"></div>
                <span className="text-2xl font-bold text-[#8b0000]">第 {gen} 代</span>
                <div className="h-px bg-[#8b0000] flex-1 opacity-20"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Fix: Explicitly cast values to Person[] to prevent property access errors on unknown types. */}
                {(Object.values(data.members) as Person[])
                  .filter(m => m.generation === gen)
                  .map(member => (
                    <div 
                      key={member.id}
                      onClick={() => onSelectMember(member)}
                      className="border border-stone-100 p-4 rounded-lg hover:border-[#8b0000] hover:shadow-md transition-all cursor-pointer group bg-stone-50/50"
                    >
                      <div className="text-xl font-bold mb-1 group-hover:text-[#8b0000]">{member.name}</div>
                      <div className="text-xs text-stone-400 mb-2">
                        {member.birthDate ? member.birthDate.split('-')[0] : '年份不详'}
                        {member.deathDate ? ` - ${member.deathDate.split('-')[0]}` : member.birthDate ? ' - 至今' : ''}
                      </div>
                      <div className="text-sm text-stone-600 line-clamp-1">{member.occupation || '暂无职务'}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
