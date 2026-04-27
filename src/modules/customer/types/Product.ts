export interface Product {
  id: string;
  type:"product"|"user"|"setting";
  title: string;
  description: string;
  image: string;
  category: string;
  stock:number;
  price:number;
}