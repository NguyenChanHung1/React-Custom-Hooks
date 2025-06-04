import { useTable } from "../hooks/ui/useTable";

function TableComponent({ data, schema }) {
  const tableData = useTable(data, schema);
  console.log(tableData);
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          {schema.map((col, i) => (
            <th key={i}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;