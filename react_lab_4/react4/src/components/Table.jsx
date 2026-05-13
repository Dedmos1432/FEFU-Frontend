import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Chart from "./Chart";
import Filter from "./Filter";
import { useState } from "react";

export default function Table({ data, amountRows, isVisiablePagin }) {
  const [dataTable, setDataTable] = useState(data);
  const updateDataTable = (value) => setDataTable(value);
  const [VisiablePagin, setVisiablePagin] = useState(isVisiablePagin);
  const n = Math.ceil(dataTable.length / amountRows);
  const [numPage, setNumPage] = useState(1);
  const arr = Array.from({ length: n }, (v, i) => i + 1);

  return VisiablePagin ? (
    <>
      <Chart data={dataTable} />
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} data={dataTable} fullData={data} />
      <table>
        <TableHead head={Object.keys(data[0])} />
        <TableBody body={dataTable} amountRows={amountRows} numPage={numPage} />
      </table>
      <div className="pagination">
        {arr.map((item, index) => (
          <span
            key={index}
            className={index == numPage - 1 ? "select-page page" : "page"}
            onClick={(e) => setNumPage(e.target.innerHTML)}
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
