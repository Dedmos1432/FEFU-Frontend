export default function TableRow({ row, isHead }) {
  return isHead == "0"
    ? row.map((item, index) => <td key={index}> {item} </td>)
    : row.map((item, index) => <th key={index}> {item} </th>);
}
