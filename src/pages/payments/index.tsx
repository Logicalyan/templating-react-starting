import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"
 function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "John De",
    },
    
    // ...
  ]
}

export default function PaymentPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}