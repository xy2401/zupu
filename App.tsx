
import React, { useState, useMemo } from 'react';
import FamilyTree from './components/FamilyTree';
import MemberDetails from './components/MemberDetails';
import ScrollView from './components/ScrollView';
import ArchiveView from './components/ArchiveView';
import AddMemberModal from './components/AddMemberModal';
import { MOCK_FAMILY_DATA } from './constants';
import { Person, FamilyData } from './types';

const App: React.FC = () => {
  const [familyData, setFamilyData] = useState<FamilyData>(MOCK_FAMILY_DATA);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [activeTab, setActiveTab] = useState<'tree' | 'scroll' | 'archive'>('tree');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addingToParent, setAddingToParent] = useState<Person | null>(null);

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return familyData.members;
    const q = searchQuery.toLowerCase();
    const result: Record<string, Person> = {};
    // Fix: Explicitly cast Object.entries to allow access to Person properties and avoid unknown type errors.
    (Object.entries(familyData.members) as [string, Person][]).forEach(([id, person]) => {
      if (person.name.toLowerCase().includes(q) || (person.occupation || '').toLowerCase().includes(q)) {
        result[id] = person;
      }
    });
    return result;
  }, [searchQuery, familyData]);

  const handleAddMember = (newMember: Person) => {
    setFamilyData(prev => {
      const updatedMembers = { ...prev.members, [newMember.id]: newMember };
      // Update parent's children list
      if (newMember.fatherId && updatedMembers[newMember.fatherId]) {
        updatedMembers[newMember.fatherId] = {
          ...updatedMembers[newMember.fatherId],
          childrenIds: [...(updatedMembers[newMember.fatherId].childrenIds || []), newMember.id]
        };
      }
      return { ...prev, members: updatedMembers };
    });
    setIsAddModalOpen(false);
    setAddingToParent(null);
  };

  const openAddChildModal = (parent: Person) => {
    setAddingToParent(parent);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf2]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 shadow-sm sticky top-0 z-40 px-4">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#8b0000] text-white w-12 h-12 flex items-center justify-center rounded-xl font-serif-zh text-2xl font-bold shadow-lg">族</div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif-zh font-bold text-[#2c1810]">华夏数字化族谱系统</h1>
                <p className="text-xs text-[#8b0000] font-bold tracking-[0.2em]">{familyData.familyName}氏宗族 · {familyData.origin}</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-2 bg-stone-100 p-1 rounded-xl">
              {[
                { id: 'tree', label: '家谱树图', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                { id: 'scroll', label: '卷轴叙述', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { id: 'archive', label: '文史典藏', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-[#8b0000] shadow-sm' : 'text-stone-500 hover:text-[#8b0000]'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path></svg>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input 
                type="text"
                placeholder="搜索先贤、后辈..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#8b0000] w-64 transition-all"
              />
              <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button 
              onClick={() => {
                const root = familyData.members[familyData.rootId];
                openAddChildModal(root);
              }}
              className="bg-[#8b0000] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-800 transition-all shadow-lg shadow-red-900/20 active:scale-95"
            >
              录入谱系
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dynamic Content Switching */}
        <main className="flex-1 relative overflow-hidden">
          {activeTab === 'tree' && (
            <FamilyTree 
              data={{...familyData, members: filteredMembers}} 
              onSelectMember={setSelectedPerson} 
            />
          )}
          {activeTab === 'scroll' && (
            <ScrollView 
              data={{...familyData, members: filteredMembers}} 
              onSelectMember={setSelectedPerson} 
            />
          )}
          {activeTab === 'archive' && (
            <ArchiveView 
              data={{...familyData, members: filteredMembers}} 
              onSelectMember={setSelectedPerson} 
            />
          )}
        </main>

        {/* Sidebar Statistics (Desktop Only) */}
        <aside className="hidden lg:flex w-80 flex-col bg-white border-l border-stone-200 p-6 space-y-6 overflow-y-auto">
          <div className="space-y-4">
             <h3 className="font-serif-zh font-bold text-[#8b0000] text-lg border-b-2 border-[#8b0000] pb-2">宗族统计</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-xl">
                   <p className="text-[10px] text-stone-400 uppercase font-bold">总人数</p>
                   <p className="text-2xl font-serif-zh font-bold text-[#2c1810]">{Object.keys(familyData.members).length}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl">
                   <p className="text-[10px] text-stone-400 uppercase font-bold">活跃传人</p>
                   <p className="text-2xl font-serif-zh font-bold text-[#2c1810]">3</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-serif-zh font-bold text-[#8b0000] text-lg border-b-2 border-[#8b0000] pb-2">最新收录</h3>
             <div className="space-y-3">
                {/* Fix: Cast Object.values to Person[] to resolve unknown type issues during mapping. */}
                {(Object.values(familyData.members) as Person[]).slice(-3).reverse().map(member => (
                   <div 
                    key={member.id} 
                    onClick={() => setSelectedPerson(member)}
                    className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-stone-100"
                   >
                      <div className="w-10 h-10 rounded-full bg-[#8b0000]/10 flex items-center justify-center text-[#8b0000] font-bold">
                        {member.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#2c1810]">{member.name}</p>
                        <p className="text-[10px] text-stone-400">第 {member.generation} 代 • {member.occupation || '新成员'}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="mt-auto bg-[#fcfaf2] p-6 rounded-2xl border-2 border-stone-100 italic font-serif-zh text-sm leading-relaxed text-[#2c1810]">
             "参天之木，必有其根；怀山之水，必有其源。"
             <footer className="mt-4 text-xs font-sans not-italic text-stone-400 text-right">— 陈氏宗谱·序言</footer>
          </div>
        </aside>
      </div>

      {/* Overlays */}
      <MemberDetails 
        person={selectedPerson} 
        familyName={familyData.familyName}
        origin={familyData.origin}
        onClose={() => setSelectedPerson(null)} 
        onAddChild={openAddChildModal}
      />

      {isAddModalOpen && addingToParent && (
        <AddMemberModal 
          parentId={addingToParent.id}
          parentName={addingToParent.name}
          generation={addingToParent.generation}
          onClose={() => {
            setIsAddModalOpen(false);
            setAddingToParent(null);
          }}
          onAdd={handleAddMember}
        />
      )}
    </div>
  );
};

export default App;
