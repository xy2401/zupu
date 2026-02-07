
import React, { useState } from 'react';
import { Person } from '../types';

interface Props {
  parentId: string;
  parentName: string;
  generation: number;
  onClose: () => void;
  onAdd: (person: Person) => void;
}

const AddMemberModal: React.FC<Props> = ({ parentId, parentName, generation, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson: Person = {
      id: Date.now().toString(),
      name,
      gender,
      generation: generation + 1,
      birthDate,
      occupation,
      fatherId: parentId,
      childrenIds: []
    };
    onAdd(newPerson);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-[#8b0000] p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-serif-zh font-bold">添加后辈</h3>
            <p className="text-white/70 text-sm">为 {parentName} 添加子嗣</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">姓名</label>
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-stone-200 py-2 focus:border-[#8b0000] outline-none transition-colors"
              placeholder="请输入成员姓名"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">性别</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full border-b-2 border-stone-200 py-2 focus:border-[#8b0000] outline-none transition-colors bg-transparent"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">出生日期</label>
              <input 
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full border-b-2 border-stone-200 py-2 focus:border-[#8b0000] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">职业/成就</label>
            <input 
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full border-b-2 border-stone-200 py-2 focus:border-[#8b0000] outline-none transition-colors"
              placeholder="例：著名学者、实业家等"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 border border-stone-200 rounded-lg font-bold text-stone-600 hover:bg-stone-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-[#8b0000] text-white rounded-lg font-bold hover:bg-red-800 transition-colors shadow-lg shadow-red-900/20"
            >
              保存入册
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
