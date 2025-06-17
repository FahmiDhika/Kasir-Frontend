export interface IUser {
  id: string;
  uuid: string;
  nama: string;
  password: string;
  role: string;
  foto: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBarang {
  id: string;
  uuid: string;
  namaBarang: string;
  harga: number;
  stok: number;
  createdAt: string;
  updatedAt: string;
}
