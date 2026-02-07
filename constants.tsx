
import { FamilyData } from './types';

export const COLORS = {
  primary: '#8b0000', // Imperial Red
  secondary: '#daa520', // Goldenrod
  background: '#fcfaf2', // Parchment
  text: '#2c1810', // Dark Wood
};

export const MOCK_FAMILY_DATA: FamilyData = {
  familyName: '陈',
  origin: '浙江·绍兴',
  rootId: '1',
  members: {
    '1': {
      id: '1',
      name: '陈清泉',
      gender: 'male',
      generation: 1,
      birthDate: '1892-05-12',
      deathDate: '1965-11-20',
      bio: '陈家第一代家长，曾于民国时期创办地方书院，致力于乡梓教育。',
      location: '绍兴',
      occupation: '教书先生',
      childrenIds: ['2', '3', '7']
    },
    '2': {
      id: '2',
      name: '陈伯礼',
      gender: 'male',
      generation: 2,
      birthDate: '1920-08-15',
      deathDate: '1998-03-04',
      fatherId: '1',
      bio: '陈清泉长子，解放前曾经营丝绸生意，后支持家乡建设。',
      childrenIds: ['4', '5'],
      occupation: '实业家'
    },
    '3': {
      id: '3',
      name: '陈伯仁',
      gender: 'male',
      generation: 2,
      birthDate: '1925-02-28',
      deathDate: '2005-07-12',
      fatherId: '1',
      bio: '陈清泉次子，早年投身医学，是当地著名的中医。',
      childrenIds: ['8', '9'],
      occupation: '中医医生'
    },
    '7': {
      id: '7',
      name: '陈秀珍',
      gender: 'female',
      generation: 2,
      birthDate: '1928-11-05',
      deathDate: '2010-04-12',
      fatherId: '1',
      childrenIds: []
    },
    '4': {
      id: '4',
      name: '陈继宗',
      gender: 'male',
      generation: 3,
      birthDate: '1955-12-01',
      fatherId: '2',
      childrenIds: ['6', '10'],
      occupation: '工程师'
    },
    '5': {
      id: '5',
      name: '陈淑婉',
      gender: 'female',
      generation: 3,
      birthDate: '1958-06-20',
      fatherId: '2',
      childrenIds: [],
      occupation: '教师'
    },
    '8': {
      id: '8',
      name: '陈继业',
      gender: 'male',
      generation: 3,
      birthDate: '1952-03-14',
      fatherId: '3',
      childrenIds: ['11']
    },
    '9': {
      id: '9',
      name: '陈继勋',
      gender: 'male',
      generation: 3,
      birthDate: '1956-09-09',
      fatherId: '3',
      childrenIds: []
    },
    '6': {
      id: '6',
      name: '陈志明',
      gender: 'male',
      generation: 4,
      birthDate: '1988-10-15',
      fatherId: '4',
      childrenIds: [],
      occupation: '科技工作者'
    },
    '10': {
      id: '10',
      name: '陈志华',
      gender: 'male',
      generation: 4,
      birthDate: '1992-04-22',
      fatherId: '4',
      childrenIds: []
    },
    '11': {
      id: '11',
      name: '陈婉婷',
      gender: 'female',
      generation: 4,
      birthDate: '1985-07-30',
      fatherId: '8',
      childrenIds: []
    }
  }
};
