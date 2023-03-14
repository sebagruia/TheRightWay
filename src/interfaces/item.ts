export interface Item {
    id: string;
    itemName: string;
    check: boolean;
    quantity: string;
  }
  
  export interface Items {
    [key: string]: Item;
  }