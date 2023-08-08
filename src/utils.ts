import { FoodCategory, Unit } from './interfaces/utilsInterfaces';

export const formatName = (name: string) => {
  const splitString = name.split('');
  const formatedString = splitString.map((item: string, index: number) => {
    if (index === 0) {
      return item.toUpperCase();
    }
    return item;
  });
  return formatedString.join('');
};

export const sortCategories = (a: any, b: any) => {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  return 0;
};

export const units: Unit[] = [
  { id: 1, name: 'mililitru', unit: 'ml' },
  { id: 2, name: 'litru', unit: 'l' },
  { id: 3, name: 'gram', unit: 'g' },
  { id: 4, name: 'kilogram', unit: 'kg' },
  { id: 5, name: 'bucati', unit: 'buc' },
  { id: 6, name: 'pachet', unit: 'pct' },
  { id: 7, name: 'sticla', unit: 'st' },
];

export const foodCategories: FoodCategory[] = [
  { id: 1, iconName: 'fa-solid fa-lemon', name: 'Fructe' },
  { id: 2, iconName: 'fa-solid fa-pepper-hot', name: 'Legume' },
  { id: 3, iconName: 'fa-solid fa-martini-glass-citrus', name: 'Alcool' },
  { id: 4, iconName: 'fa-solid fa-cookie', name: 'Patiserie' },
  { id: 5, iconName: 'fa-solid fa-fish', name: 'Peste' },
  { id: 6, iconName: 'fa-solid fa-ice-cream', name: 'Dulciuri' },
  { id: 7, iconName: 'fa-solid fa-cow', name: 'Lactate' },
  { id: 8, iconName: 'fa-solid fa-venus', name: 'Cosmetice' },
  { id: 9, iconName: 'fa-solid fa-seedling', name: 'Seminte' },
  { id: 10, iconName: 'fa-solid fa-dog', name: 'Animale Companie' },
  { id: 11, iconName: 'fa-solid fa-capsules', name: 'Farmacie' },
  { id: 12, iconName: 'fa-solid fa-house-chimney-crack', name: 'Intretinere casa' },
  { id: 13, iconName: 'fa-solid fa-child-reaching', name: 'Copil' },
  { id: 15, iconName: 'fa-solid fa-bottle-droplet', name: 'Uleiuri' },
  { id: 16, iconName: 'fa-solid fa-drumstick-bite', name: 'Carne' },
];



