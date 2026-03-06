const correspond = {
  Модель: "i5",
  Производитель: "i14",
  "Частота ядра (МГц)": ["i6", "i7"],
  "Энергопотребление (Вт)": ["i8", "i9"],
  "Цена ($)": ["i10", "i11"],
  "Видеопамять (ГБ)": ["i12", "i13"],
  "Мощность (баллы)": ["i15", "i16"],
  "Потоковые процессоры": ["i17", "i18"],
};

const dataFilter = (dataForm) => {
  let dictFilter = {};

  for (const item of dataForm.elements) {
    let valInput = item.value;

    if (item.type === "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type === "number") {
      if (valInput === "") {
        if (
          item.id.includes("i6") ||
          item.id.includes("i8") ||
          item.id.includes("i10") ||
          item.id.includes("i12") ||
          item.id.includes("i15") ||
          item.id.includes("i17")
        ) {
          valInput = -Infinity;
        } else {
          valInput = +Infinity;
        }
      } else {
        valInput = Number(valInput);
      }
    }

    dictFilter[item.id] = valInput;
  }

  return dictFilter;
};

const filterTable = (data, idTable, dataForm) => {
  const datafilter = dataFilter(dataForm);

  let tableFilter = data.filter((item) => {
    let result = true;

    Object.entries(item).forEach(([key, val]) => {
      if (typeof val === "string") {
        const id = correspond[key];

        if (id) {
          result &&= val.toLowerCase().includes(datafilter[id]);
        }
      } else if (typeof val === "number") {
        const from = correspond[key][0];
        const to = correspond[key][1];

        const min = datafilter[from];
        const max = datafilter[to];

        result &&= val >= min && val <= max;
      }
    });

    return result;
  });

  clearTable(idTable);

  if (tableFilter.length === 0) {
    const headerKeys = Object.keys(data[0]);
    const headerRow = createHeaderRow(headerKeys);

    document.getElementById(idTable).append(headerRow);
  } else {
    createTable(tableFilter, idTable);
  }
};

const filterButton =
  document.getElementById("filter").lastElementChild.previousElementSibling;

filterButton.addEventListener("click", () => {
  resetSort(document.getElementById("sort"), "list");

  filterTable(buildings, "list", document.getElementById("filter"));
});

function clearFilter(data, idTable, dataForm) {
  clearTable(idTable);

  for (const item of dataForm.elements) {
    if (item.type === "button") continue;

    item.value = "";
  }

  createTable(data, idTable);
}

const clearButton = document.getElementById("filter").lastElementChild;

clearButton.addEventListener("click", () => {
  resetSort(document.getElementById("sort"), "list");

  clearFilter(buildings, "list", document.getElementById("filter"));
});
