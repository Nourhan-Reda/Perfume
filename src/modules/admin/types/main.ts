export interface PerfumeProduct {
  id: string;
  title: string;
  brand: "VYRA";
  price: number;
  stock: number;
  category: "Men" | "Women" | "Unisex";
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  imageUrl: string;
}
