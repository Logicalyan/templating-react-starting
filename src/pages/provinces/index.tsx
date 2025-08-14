'use client';

import { columns, type Province } from "./columns"
import { DataTable } from "../../components/common/data-table"
import axiosInstance from "@/lib/axiosInstance"
import type { ApiResponse } from "@/types/api";
async function getData(){
  return await axiosInstance.get<ApiResponse<Province[]>>(`/provinces`);
}

export default function ProvincePage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}