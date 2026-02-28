const createTable = (data, idTable) => {
  const table = document.getElementById(idTable);
  const header = Object.keys(data[0]);

  const headerRow = createHeaderRow(header);
  table.append(headerRow);

  const bodyRows = createBodyRows(data);
  table.append(bodyRows);
};
const createHeaderRow = (headers) => {
  const tr = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerHTML = header;
    tr.append(th);
  });
  return tr;
};

const createBodyRows = (data) => {
  const tbody = document.createElement("tbody");
  let values = data.map((it) => Object.values(it));

  values.forEach((it) => {
    const tr = document.createElement("tr");
    it.forEach((towerValues) => {
      const td = document.createElement("td");
      td.textContent = towerValues;
      tr.append(td);
    });
    tbody.append(tr);
  });
  return tbody;
};

const clearTable = (idTable) => {
  const table = document.getElementById(idTable);
  //   const tbody = table.children[1];
  //   tbody.innerHTML = "";

  if (table) {
    table.innerHTML = "";
  }
};
