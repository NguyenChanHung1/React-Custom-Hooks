import { useMemo } from 'react';

export function resolveCellValue(value, item, renderFn) {
  return renderFn ? renderFn(value, item) : value;
}

export function useTable(data, schema) {
  return useMemo(() => {
    return data.map(item =>
      schema.map(column => {
        const value = item[column.key];
        return resolveCellValue(value, item, column.render);
      })
    );
  }, [data, schema]);
}
