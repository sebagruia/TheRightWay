export interface Item {
    id: string;
    itemName: string;
    check: boolean;
    quantity: string;
    unit:string;
    category:string;
  }
  export interface Items {
    [key: string]: Item;
  }