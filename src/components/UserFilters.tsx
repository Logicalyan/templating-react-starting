import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterForm {
  search: string;
  role: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface UserFiltersProps {
  onApplyFilters: (filters: FilterForm) => void;
}

export default function UserFilters({ onApplyFilters }: UserFiltersProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FilterForm>({
    defaultValues: {
      search: '',
      role: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
    },
  });

  const onSubmit = (data: FilterForm) => {
    onApplyFilters(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
      <div>
        <Input
          placeholder="Cari nama, email, atau role..."
          {...register('search')}
        />
        {errors.search && <span className="text-red-500 text-sm">{errors.search.message}</span>}
      </div>
      <div>
        <Input
          placeholder="Filter berdasarkan role (admin, user, dll.)"
          {...register('role')}
        />
        {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
      </div>
      <select {...register('sortBy')}>
        <option value="name">Nama</option>
        <option value="email">Email</option>
        <option value="created_at">Dibuat Pada</option>
        <option value="role_name">Role</option>
      </select>
      <select {...register('sortOrder')}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <Button type="submit">Terapkan</Button>
    </form>
  );
}