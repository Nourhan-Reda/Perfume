export interface Perfume {
  id: string;
  title: string;
  price: string | number;
  stock: string | number;
  category: string;
  image: string;
}

export type PerfumeInput = Omit<Perfume, "id">;

export const BLANK_PERFUME: PerfumeInput = {
  title: "",
  price: "",
  stock: "",
  category: "Unisex",
  image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
};
