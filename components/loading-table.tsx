import { Skeleton } from "@/components/ui/skeleton";

export function LoadingTable({ columns = 6, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <div className="w-full rounded-md border overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-2">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}