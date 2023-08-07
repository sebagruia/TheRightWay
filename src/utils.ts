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
  { id: 2, iconName: 'fa-light fa-pumpkin', name: 'Legume' },
  { id: 3, iconName: 'fa-light fa-strawberry', name: 'Alcool' },
  { id: 4, iconName: 'fa-light fa-strawberry', name: 'Patiserie' },
  { id: 5, iconName: 'fa-light fa-strawberry', name: 'Peste' },
  { id: 6, iconName: 'fa-light fa-strawberry', name: 'Dulciuri' },
  { id: 7, iconName: 'fa-light fa-strawberry', name: 'Lactate' },
  { id: 8, iconName: 'fa-light fa-strawberry', name: 'Cosmetice' },
  { id: 9, iconName: 'fa-light fa-strawberry', name: 'Seminte' },
  { id: 10, iconName: 'fa-light fa-strawberry', name: 'Animale Companie' },
  { id: 11, iconName: 'fa-light fa-strawberry', name: 'Farmacie' },
  { id: 12, iconName: 'fa-light fa-strawberry', name: 'Intretinere casa' },
  { id: 13, iconName: 'fa-light fa-strawberry', name: 'Copil' },
  { id: 14, iconName: 'fa-light fa-strawberry', name: 'Fructe uscate & seminte' },
  { id: 15, iconName: 'fa-light fa-strawberry', name: 'Uleiuri' },
  { id: 16, iconName: 'fa-light fa-strawberry', name: 'Carne' },
  { id: 17, iconName: 'fa-light fa-strawberry', name: '' },
];



