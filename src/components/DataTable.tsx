import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, getPaginationRowModel, type ColumnDef, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ApiResponse } from '@/types/api';
import { Alert, AlertDescription } from './ui/alert';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  fetchData: (page: number, limit: number) => Promise<ApiResponse<TData[]>>;
  queryKey: string[];
  limit?: number;
} 

export default function DataTable<TData>({ columns, fetchData, queryKey, limit = 10 }: DataTableProps<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Mulai dari 0 untuk TanStack Table
    pageSize: limit,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKey, pagination.pageIndex + 1, pagination.pageSize],
    queryFn: () => fetchData(pagination.pageIndex + 1, pagination.pageSize),
    keepPreviousData: true,
  });

  const table = useReactTable<TData>({
    columns,
    data: data?.data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data?.meta?.last_page || 1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-4">
      {isLoading && <div>Loading...</div>}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>Error: {(error as Error).message}</AlertDescription>
        </Alert>
      )}
      {data?.error && (
        <Alert variant="destructive">
          <AlertDescription>{data.error}: {data.message}</AlertDescription>
        </Alert>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {data?.meta?.current_page || 1} of {data?.meta?.last_page || 1} pages ({data?.meta?.total || 0} items)
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}