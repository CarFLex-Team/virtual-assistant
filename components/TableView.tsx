interface TableViewProps {
  data: {
    title?: string;
    columns: string[] | undefined;
    rows: Record<string, any>[];
  };
}

export default function TableView({ data }: TableViewProps) {
  // console.log("TableView data:", data); // Debugging line to check the data structure
  return (
    <div className="bg-background rounded-xl border w-full border-border overflow-hidden">
      {data.title && (
        <h3 className="text-sm font-bold text-slate-100 w-full bg-background p-4">
          {data.title}
        </h3>
      )}
      <div className="overflow-auto max-h-100">
        <table className="w-full min-w-max text-left table-auto">
        <thead className="sticky top-0 z-10 bg-surface">
            <tr>
              {data.columns?.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-slate-100 font-semibold text-sm"
                >
                  {col
                    .split("_")
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr key={idx} className="border-t border-border hover:bg-surface">
                {data.columns?.map((col, i) => (
                  <td key={col} className="px-4 py-2 text-slate-300">
                    {/* row is keyed by column name — the old `row[i]` numeric-index
                      fallback never matched real data and was dead code */}
                    {row[i] || row[col] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
