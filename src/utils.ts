import { ItemsCategory, Unit } from './interfaces/utilsInterfaces';
import { Items } from './interfaces/item';
import { DataItem } from '../src/interfaces/charts';

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

export const itemsCategory: ItemsCategory[] = [
  { id: 1, iconName: 'fa-solid fa-lemon', name: 'Fructe', color: '#d39e00' }, // accentColor
  { id: 2, iconName: 'fa-solid fa-pepper-hot', name: 'Legume', color: '#32CD32' }, // LimeGreen (changed for visibility)
  { id: 3, iconName: 'fa-solid fa-martini-glass-citrus', name: 'Alcool', color: '#b33939' }, // danger
  { id: 4, iconName: 'fa-solid fa-cookie', name: 'Patiserie', color: '#FF69B4' }, // HotPink (changed from c69500)
  { id: 5, iconName: 'fa-solid fa-fish', name: 'Peste', color: '#10246a' }, // primary900
  { id: 6, iconName: 'fa-solid fa-ice-cream', name: 'Dulciuri', color: '#9370DB' }, // MediumPurple (changed from 36385a)
  { id: 7, iconName: 'fa-solid fa-cow', name: 'Lactate', color: '#00CED1' }, // DarkTurquoise (changed from 222549)
  { id: 8, iconName: 'fa-solid fa-venus', name: 'Cosmetice', color: '#6c757d' }, // mediumGray
  { id: 9, iconName: 'fa-solid fa-seedling', name: 'Seminte', color: '#2b3f5d' }, // primaryColor (moved here)
  { id: 10, iconName: 'fa-solid fa-dog', name: 'Animale Companie', color: '#FF8C00' }, // DarkOrange
  { id: 11, iconName: 'fa-solid fa-capsules', name: 'Farmacie', color: '#DC143C' }, // Crimson
  { id: 12, iconName: 'fa-solid fa-house-chimney-crack', name: 'Intretinere casa', color: '#1E90FF' }, // DodgerBlue
  { id: 13, iconName: 'fa-solid fa-child-reaching', name: 'Copil', color: '#FFB6C1' }, // LightPink
  { id: 15, iconName: 'fa-solid fa-bottle-droplet', name: 'Uleiuri', color: '#228B22' }, // ForestGreen
  { id: 16, iconName: 'fa-solid fa-drumstick-bite', name: 'Carne', color: '#8B4513' }, // SaddleBrown
  { id: 17, iconName: 'fa-solid fa-person-swimming', name: 'Activitati Sportive', color: '#00BFFF' }, // DeepSkyBlue
  { id: 18, iconName: 'fa-brands fa-xbox', name: 'Jocuri', color: '#c69500' }, // teal900 (moved here)
  { id: 19, iconName: 'fa-solid fa-plug', name: 'Electrocasnice', color: '#FF4500' }, // OrangeRed
  { id: 20, iconName: 'fa-solid fa-infinity', name: 'Generale', color: '#A9A9A9' }, // DarkGray (changed from FFD700)
];

export const mapListItemsToChartData = (items: Items) => {
  const chartData = [] as DataItem[];
  itemsCategory.forEach((itemCategory) => {
    const itemValue = Object.values(items).filter((item) => item.category === itemCategory.name).length;
    const percentage = Math.floor((itemValue / Object.values(items).length) * 100);
    if (itemValue > 0) {
      return chartData.push({
        id: itemCategory.id,
        name: itemCategory.name,
        value: percentage,
        fill: itemCategory.color,
      });
    }
  });
  return chartData;
};

export const emailValidationMessages = { valid: 'Looks Good', invalid: 'Please type an email address' };
export const passwordValidationMessages = { valid: 'Looks Good', invalid: 'Please type your password' };
