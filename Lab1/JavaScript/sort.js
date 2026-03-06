const createSortArr = (data) => {
  let sortArr = [];
  const sortSelects = data.getElementsByTagName("select");

  for (const item of sortSelects) {
    const keySort = item.value;
    if (keySort == 0) break;

    const desc = document.getElementById(item.id + "Desc").checked;
    sortArr.push({ column: keySort - 1, direction: desc });
  }
  return sortArr;
};

const sortTable = (idTable, formData) => {
  const sortArr = createSortArr(formData);
  const table = document.getElementById(idTable);

  if (sortArr.length === 0) {
    if (typeof buildings !== "undefined" && buildings.length > 0) {
      clearTable(idTable);
      createTable(buildings, idTable);
    }
    return false;
  }

  let rowData = Array.from(table.rows);
  if (rowData.length <= 1) return;

  const headerRow = rowData.shift();

  rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
      if (!first.cells[column] || !second.cells[column]) continue;

      const firstCell = first.cells[column].textContent.trim();
      const secondCell = second.cells[column].textContent.trim();

      const num1 = parseFloat(firstCell.replace(/\s/g, "").replace(",", "."));
      const num2 = parseFloat(secondCell.replace(/\s/g, "").replace(",", "."));

      let comparison = 0;

      if (!isNaN(num1) && !isNaN(num2)) {
        comparison = num1 - num2;
      } else {
        comparison = firstCell.localeCompare(secondCell, "ru");
      }

      if (comparison !== 0) {
        return direction ? -comparison : comparison;
      }
    }
    return 0;
  });

  table.innerHTML = "";
  table.append(headerRow);

  const tbody = document.createElement("tbody");
  rowData.forEach((item) => tbody.append(item));
  table.append(tbody);
};

const resetSort = (dataForm, tableId) => {
  const selects = dataForm.getElementsByTagName("select");

  for (let select of selects) {
    select.value = "0";
  }

  const checkboxes = dataForm.querySelectorAll('input[type="checkbox"]');
  for (let cb of checkboxes) {
    cb.checked = false;
  }

  let selectIndex = 0;
  for (const item of dataForm.elements) {
    if (item.tagName === "SELECT") {
      if (selectIndex > 0) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }
      selectIndex++;
    }
  }

  if (typeof buildings !== "undefined" && buildings.length > 0) {
    clearTable(tableId);
    createTable(buildings, tableId);
  }

  updateSortSelects();
};

const sortButton = document.querySelector('#sort input[value="Сортировать"]');
if (sortButton) {
  sortButton.addEventListener("click", () => {
    sortTable("list", document.getElementById("sort"));
  });
}

const resetButton = document.querySelector(
  '#sort input[value="Сбросить сортировку"]',
);
if (resetButton) {
  resetButton.addEventListener("click", () => {
    [...document.getElementById("filter").elements].forEach((it) => {
      if (it.type !== "button") {
        it.value = "";
      }
    });

    resetSort(document.getElementById("sort"), "list");
  });
}

const select1 = document.getElementById("fieldsFirst");
const select2 = document.getElementById("fieldsSecond");
const select3 = document.getElementById("fieldsThird");

const updateSortSelects = () => {
  const selects = [select1, select2, select3];

  const selectedValues = selects.map((s) => s.value);

  selects.forEach((select, index) => {
    const options = select.querySelectorAll("option");

    options.forEach((option) => {
      if (option.value === "0") {
        option.hidden = false;
        return;
      }

      const usedInOther = selectedValues.some(
        (val, i) => val === option.value && i !== index,
      );

      option.hidden = usedInOther;
    });
  });
};

if (select1) {
  select1.addEventListener("change", () => {
    if (select1.value != "0") {
      if (select2) select2.disabled = false;
    } else {
      if (select2) {
        select2.disabled = true;
        select2.value = "0";
      }
      if (select3) {
        select3.disabled = true;
        select3.value = "0";
      }
    }

    updateSortSelects();
  });
}

if (select2) {
  select2.addEventListener("change", () => {
    if (select2.value != "0") {
      if (select3) select3.disabled = false;
    } else {
      if (select3) {
        select3.disabled = true;
        select3.value = "0";
      }
    }

    updateSortSelects();
  });
}

if (select3) {
  select3.addEventListener("change", updateSortSelects);
}
