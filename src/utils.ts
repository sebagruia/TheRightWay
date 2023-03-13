import { FoodCategory, Unit } from './interfaces/utilsInterfaces';

export const formatName = (name: string) => {
  const splitString = name.split('');
  const formatedString = splitString.map((item: string, index: number) => {
    if (index === 0) {
      return item.toUpperCase();
    }
    return item;
  });
  return formatedString.join("");
};

export const sortDescending = (a: any, b: any) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
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
  { id: 3, iconName: 'fa-light fa-strawberry', name: 'Fructe' },
  { id: 4, iconName: 'fa-light fa-strawberry', name: 'Fructe' },
  { id: 5, iconName: 'fa-light fa-strawberry', name: 'Fructe' },
  { id: 6, iconName: 'fa-light fa-strawberry', name: 'Fructe' },
  { id: 7, iconName: 'fa-light fa-strawberry', name: 'Fructe' },
];
