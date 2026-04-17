import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Filter from "./Filter";
import { useState } from "react";

export default function Table({ data, amountRows, isVisiablePagin }) {
  const [dataTable, setDataTable] = useState(data);
  const updateDataTable = (value) => setDataTable(value);
  const [VisiablePagin, setVisiablePagin] = useState(isVisiablePagin);
  const [n, setN] = useState(Math.ceil(dataTable.length / amountRows));
  const selectLastPage = (page) => setN(page);
  const [numPage, setNumPage] = useState(n);
  const arr = Array.from({ length: n }, (v, i) => i + 1);

  return VisiablePagin ? (
    <>
      <h4>Фильтры</h4>
      <Filter
        filtering={updateDataTable}
        data={dataTable}
        fullData={data}
        selectLastPage={selectLastPage}
      />
      <table>
        <TableHead head={Object.keys(data[0])} />
        <TableBody body={dataTable} amountRows={amountRows} numPage={n} />
      </table>
      <div className="pagination">
        {arr.map((item, index) => (
          <span
            key={index}
            className={index == n - 1 ? "select-page page" : "page"}
            onClick={(e) => setN(e.target.innerHTML)}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  ) : (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} data={dataTable} fullData={data} />
      <table></table>
      <table>
        <TableHead head={Object.keys(data[0])} />
        <TableBody
          body={dataTable}
          amountRows={dataTable.length}
          numPage={numPage}
          selectLastPage={selectLastPage}
        />
      </table>
    </>
  );
}
