
export interface Person {
  id: string;
  name: string;
  gender: 'male' | 'female';
  birthDate?: string;
  deathDate?: string;
  generation: number;
  bio?: string;
  avatar?: string;
  fatherId?: string;
  motherId?: string;
  spouseId?: string;
  childrenIds?: string[];
  location?: string;
  occupation?: string;
}

export interface FamilyData {
  rootId: string;
  members: Record<string, Person>;
  familyName: string;
  origin: string;
}

export interface TreeDataNode {
  name: string;
  person: Person;
  children?: TreeDataNode[];
}
