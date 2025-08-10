// src/types/api.ts
export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  created_at: string;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null; // Bisa null jika halaman kosong
  to: number | null;   // Bisa null jika halaman kosong
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export type ApiResponse<T> = {
  data: T;
  message: string;
  error: string | null;
  errors: any[];
  status: number;
  meta?: PaginationMeta;    // Opsional, hanya untuk respons paginasi
  links?: PaginationLinks;  // Opsional, hanya untuk respons paginasi
}