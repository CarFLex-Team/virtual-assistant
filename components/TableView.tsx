interface TableViewProps {
  data: {
    columns: string[] | undefined;
    rows: Record<string, any>[];
  };
}
// const tempColumns = [
//   "id",
//   "customer",
//   "date",
//   "product",
//   "category",
//   "region",
//   "supplier",
//   "quantity",
//   "price",
// ];
export default function TableView({ data }: TableViewProps) {
  return (
    <div className="overflow-auto bg-white p-4 rounded-xl shadow-lg border w-[70vw] border-gray-200">
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-100">
          <tr>
            {data.columns?.map((col) => (
              <th key={col} className="px-4 py-2 text-gray-700 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx) => {
            console.log(row);
            return (
              <tr key={idx} className="border-t hover:bg-gray-50">
                {data.columns?.map((col) => (
                  <td key={col} className="px-4 py-2 text-gray-800">
                    {row[col]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
