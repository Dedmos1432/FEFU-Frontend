import TableRow from "./TableRow";

export default function TableBody({ body, numPage, amountRows }) {
  const begRange = (numPage - 1) * amountRows;
  const endRange = begRange + Number(amountRows);

  return (
    <tbody>
      {body.map((item, index) => (
        <tr
          key={index}
          className={index >= begRange && index < endRange ? "show" : "hide"}
        >
          <TableRow row={Object.values(item)} isHead="0" />
        </tr>
      ))}
    </tbody>
  );
}
