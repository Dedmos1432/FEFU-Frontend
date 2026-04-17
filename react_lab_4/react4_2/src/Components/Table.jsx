import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Filter from "./Filter";
import { useState } from "react";
import Sort from "./Sort";

export default function Table({ data, amountRows, isVisiablePagin }) {
  const [dataTable, setDataTable] = useState(data);
  const updateDataTable = (value) => setDataTable(value);
  const [VisiablePagin, setVisiablePagin] = useState(isVisiablePagin);
  const n = Math.ceil(dataTable.length / amountRows);
  const [numPage, setNumPage] = useState(1);
  const arr = Array.from({ length: n }, (v, i) => i + 1);
  const [isClearSort, setIsClearSort] = useState(false);
  const clearSort = (value) => setIsClearSort(value);

  return VisiablePagin ? (
    <>
      <h4>Фильтры</h4>
      <Filter
        filtering={updateDataTable}
        data={dataTable}
        fullData={data}
        clearSort={clearSort}
      />
      <Sort
        fullData={dataTable}
        sortetData={updateDataTable}
        isClearSort={isClearSort}
      />
      <table>
        <TableHead head={Object.keys(data[0])} />
        <TableBody body={dataTable} amountRows={amountRows} numPage={numPage} />
      </table>
      <div className="pagination">
        {n == 1
          ? ""
          : arr.map((item, index) => (
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
        />
      </table>
    </>
  );
}
