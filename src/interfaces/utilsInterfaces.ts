export interface Unit {
  id: number;
  name: string;
  unit: string;
}
export interface FoodCategory {
  id: number;
  iconName: string;
  name: string;
}

export interface Item {
  id: string;
  itemName: string;
  check: boolean;
  quantity: string;
}

export interface Items {
  [key: string]: Item;
}

export interface List {
  id: string;
  listName: string;
  items: Items;
}
export interface Lists {
  [key: string]: List;
}
