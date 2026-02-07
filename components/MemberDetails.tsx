
import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { generateBiography } from '../services/geminiService';

interface Props {
  person: Person | null;
  familyName: string;
  origin: string;
  onClose: () => void;
  onAddChild: (person: Person) => void;
}

const MemberDetails: React.FC<Props> = ({ person, familyName, origin, onClose, onAddChild }) => {
  const [loadingBio, setLoadingBio] = useState(false);
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);

  useEffect(() => {
    setGeneratedBio(null);
  }, [person?.id]);

  if (!person) return null;

  const handleGenerateBio = async () => {
    setLoadingBio(true);
    const bio = await generateBiography(person, familyName, origin);
    setGeneratedBio(bio);
    setLoadingBio(false);
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-500 flex flex-col border-l-8 border-imperial-red ${person ? 'translate-x-0' : 'translate-x-full'}`} style={{ borderColor: '#8b0000' }}>
      <div className="p-8 flex justify-between items-center border-b border-stone-100 bg-[#fcfaf2]">
        <div>
          <h2 className="text-3xl font-serif-zh font-bold text-[#8b0000]">{familyName}{person.name}</h2>
          <p className="text-stone-400 text-xs mt-1 uppercase tracking-widest">{person.gender === 'male' ? 'Male' : 'Female'} • 第 {person.generation} 代</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
          <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-[#8b0000] p-1 bg-white overflow-hidden shadow-2xl">
              <img src={`https://picsum.photos/seed/${person.id}/300/300`} alt={person.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-2 right-2 bg-[#daa520] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
              LV {person.generation}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-stone-400 text-[10px] font-bold block mb-1 uppercase tracking-wider">生辰与祭日</span>
            <span className="text-sm font-medium text-[#2c1810]">{person.birthDate || '始祖年代'} — {person.deathDate || '今'}</span>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-stone-400 text-[10px] font-bold block mb-1 uppercase tracking-wider">常居地</span>
            <span className="text-sm font-medium text-[#2c1810]">{person.location || origin}</span>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 col-span-2">
            <span className="text-stone-400 text-[10px] font-bold block mb-1 uppercase tracking-wider">职业与社会职务</span>
            <span className="text-sm font-medium text-[#2c1810]">{person.occupation || '资料完善中'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-stone-200 pb-2">
            <h3 className="text-xl font-serif-zh font-bold text-[#8b0000] flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path></svg>
              生平传记
            </h3>
            <button 
              onClick={handleGenerateBio}
              disabled={loadingBio}
              className="text-[10px] bg-[#8b0000] text-white px-4 py-1.5 rounded-full hover:bg-red-800 disabled:opacity-50 transition-all shadow-md flex items-center gap-2 uppercase font-bold tracking-wider"
            >
              {loadingBio ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM14.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path></svg>
              )}
              AI 智能润色
            </button>
          </div>
          <div className="text-[#2c1810] leading-relaxed text-sm bg-[#fcfaf2] p-6 rounded-2xl border-2 border-stone-100 shadow-inner italic font-serif-zh min-h-[150px]">
            {generatedBio || person.bio || "该成员暂无详细生平记载。作为后辈，您可以点击上方按钮，由 AI 根据现有基础资料为您生成一段感人的家族传记，或者手动修改完善。"}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-serif-zh font-bold text-[#8b0000]">家族数字化资产</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-stone-50 border border-stone-200 py-3 rounded-xl text-xs text-stone-600 hover:bg-white hover:border-[#8b0000] hover:text-[#8b0000] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              家族书信
            </button>
            <button className="flex items-center justify-center gap-2 bg-stone-50 border border-stone-200 py-3 rounded-xl text-xs text-stone-600 hover:bg-white hover:border-[#8b0000] hover:text-[#8b0000] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              宗族影集
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-8 border-t border-stone-100 flex gap-4 bg-white">
        <button className="flex-1 bg-white border-2 border-[#8b0000] text-[#8b0000] font-bold py-4 rounded-xl hover:bg-red-50 transition-all shadow-sm">
          修改成员资料
        </button>
        <button 
          onClick={() => onAddChild(person)}
          className="flex-1 bg-[#8b0000] text-white font-bold py-4 rounded-xl hover:bg-red-800 transition-all shadow-lg shadow-red-900/20"
        >
          添加嫡系子孙
        </button>
      </div>
    </div>
  );
};

export default MemberDetails;
