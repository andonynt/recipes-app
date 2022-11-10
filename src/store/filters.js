import create from 'zustand';

const filters = create((set) => ({
  category: [{ strCategory: 'All' }],
  area: [{ strArea: 'All' }],
  setProp: (key, arg) => set((state) => ({
    [key]: [...state[key], ...arg]
  }))
}));

export default filters;