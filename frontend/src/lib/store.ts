// src/lib/store.ts
import { create } from 'zustand';
import { ProjectGroup } from '@/features/projectGroup/types'; // Importujemy typ ProjectGroup

export interface Store {
    projectGroups: ProjectGroup[] | null;
    setProjectGroups: (data: ProjectGroup[]) => void;
}

const useStore = create<Store>((set) => ({
    projectGroups: null,
    setProjectGroups: (data: ProjectGroup[]) => set({ projectGroups: data }),
}));

export default useStore;
