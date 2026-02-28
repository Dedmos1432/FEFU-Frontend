const createSortArr = (data) => {
  let sortArr = [];

  const sortSelects = data.getElementsByTagName("select");

  for (const item of sortSelects) {
    // получаем номер выбранной опции
    const keySort = item.value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort == 0) {
      break;
    }
    // получаем порядок сортировки очередного уровня
    // имя флажка сформировано как имя поля SELECT и слова Desc
    const desc = document.getElementById(item.id + "Desc").checked;
    // очередной элемент массива - по какому столбцу и в каком порядке сортировать
    sortArr.push({ column: keySort - 1, direction: desc });
  }
  return sortArr;
};

const sortTable = (idTable, formData) => {
  // формируем управляющий массив для сортировки
  const sortArr = createSortArr(formData);

  // сортировать таблицу не нужно, во всех полях выбрана опция Нет
  if (sortArr.length === 0) {
    return false;
  }
  //находим нужную таблицу
  let table = document.getElementById(idTable);

  // преобразуем строки таблицы в массив
  let rowData = Array.from(table.rows);

  // удаляем элемент с заголовками таблицы
  const headerRow = rowData.shift();

  //сортируем данные по всем уровням сортировки
  rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
      const firstCell = first.cells[column].innerHTML;
      const secondCell = second.cells[column].innerHTML;

      // используем localeCompare для корректного сравнения
      const num1 = parseFloat(firstCell.replace(/\s/g, "").replace(",", "."));
      const num2 = parseFloat(secondCell.replace(/\s/g, "").replace(",", "."));

      let comparison = 0;

      if (!isNaN(num1) && !isNaN(num2)) {
        comparison = num1 - num2;
      } else {
        comparison = firstCell.localeCompare(secondCell);
      }

      if (comparison !== 0) {
        return direction ? -comparison : comparison;
      }
    }
    return 0;
  });

  table.innerHTML = "";
  table.append(headerRow);

  let tbody = document.createElement("tbody");
  rowData.forEach((item) => {
    tbody.append(item);
  });
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

  clearTable(tableId);
  createTable(buildings, tableId);
};
const sortButtun = document.querySelector('input[value="Сортировать"]');

sortButtun.addEventListener("click", () => {
  sortTable("list", document.getElementById("sort"));
});

const resetButton = document.querySelector(
  'input[value="Сбросить сортировку"]',
);

resetButton.addEventListener("click", () => {
  // for (const item of document.getElementById("filter").elements) {
  //   if (item.type == "button") {
  //     continue;
  //   } else {
  //     item.value = "";
  //   }
  // }
  [...document.getElementById("filter").elements].forEach((it) => {
    if (it.type == "button") {
      it.value;
    } else {
      it.value = "";
    }
  });
  resetSort(document.getElementById("sort"), "list");
});
