import { DocumentData } from "firebase/firestore";

export interface Item extends DocumentData{
    id: string;
    itemName: string;
    check: boolean;
    quantity: string;
    unit:string;
    category:string;
    note:string;
  }
  export interface ItemsOfflineMode {
    [key: string]: Items;
  }
  export interface Items{
    [key: string]: Item;
  }
