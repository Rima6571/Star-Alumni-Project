import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Returns page numbers to render around the current page. */
const getPages = (current, total) => {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i);
  }
  return range;
};

const DataTable = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found.',
  page = 1,
  totalPages = 1,
  onPageChange,
  actions,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-12 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={row.id ?? idx}
                  className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">{actions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/60">
          <p className="text-xs text-gray-500">
            Page <span className="font-medium text-gray-700">{page}</span> of{' '}
            <span className="font-medium text-gray-700">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={15} />
            </button>

            {getPages(page, totalPages).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange?.(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                  ${p === page
                    ? 'bg-[#1E40AF] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

