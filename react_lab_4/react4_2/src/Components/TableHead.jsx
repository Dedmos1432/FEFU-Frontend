import TableRow from "./TableRow";
export default function TableHead({ head }) {
  return (
    <thead>
      <tr>
        <TableRow row={head} isHead="1" />
      </tr>
    </thead>
  );
}
