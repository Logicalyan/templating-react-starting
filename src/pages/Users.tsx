import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/DataTable';
import UserFilters from '@/components/UserFilters';
import api from '@/lib/api';
import type { ApiResponse, User } from '@/types/api';

interface FilterForm {
  search: string;
  role: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => row.getValue('name') || '-',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.getValue('email') || '-',
  },
  {
    accessorKey: 'roles',
    header: 'Role',
    cell: ({ row }) => (row.getValue('roles') as string[])?.join(', ') || '-',
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat Pada',
    cell: ({ row }) => row.getValue('created_at')
      ? new Date(row.getValue('created_at') as string).toLocaleDateString('id-ID')
      : '-',
  },
];

const fetchUsers = async (page: number, limit: number, filters: FilterForm = { search: '', role: '', sortBy: 'created_at', sortOrder: 'desc' }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: limit.toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.role && { role: filters.role }),
    ...(filters.sortBy && { sortBy: filters.sortBy }),
    ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
  });

  const response = await api.get<ApiResponse<User[]>>(`/users?${params.toString()}`);
  return response.data;
};

export default function UsersPage() {
  const [filters, setFilters] = useState<FilterForm>({
    search: '',
    role: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  return (
    <div className="space-y-4">
      <UserFilters onApplyFilters={setFilters} />
      <DataTable<User>
        columns={columns}
        fetchData={(page, limit) => fetchUsers(page, limit, filters)}
        queryKey={['users', filters.search, filters.role, filters.sortBy, filters.sortOrder]}
        limit={10}
      />
    </div>
  );
}