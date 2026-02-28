const correspond = {
  Название: "structure",
  Тип: "category",
  Страна: "country",
  Город: "city",
  Год: ["yearFrom", "yearTo"],
  Высота: ["heightFrom", "heightTo"],
};

const dataFilter = (dataForm) => {
  let dictFilter = {};

  for (const item of dataForm.elements) {
    let valInput = item.value;

    // если поле типа text - приводим его значение к нижнему регистру
    if (item.type === "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type === "number") {
      /* САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From  - занести в valInput 
           -бесконечность
        - если поле пусто и его id включает To  - занести в valInput 
           +бесконечность
        */
      if (valInput === "") {
        if (item.id.includes("From")) {
          valInput = -Infinity;
        } else if (item.id.includes("To")) {
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
  // получаем данные из полей формы
  const datafilter = dataFilter(dataForm);

  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter((item) => {
    /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
    let result = true;

    // строка соответствует фильтру, если сравнение всех значения из input
    // со значением ячейки очередной строки - истина
    Object.entries(item).map(([key, val]) => {
      // текстовые поля проверяем на вхождение
      if (typeof val == "string") {
        result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
      } else if (typeof val == "number") {
        const fromKey = correspond[key][0];
        const toKey = correspond[key][1];

        const minVal = datafilter[fromKey];
        const maxVal = datafilter[toKey];

        // Проверяем, входит ли число в диапазон [minVal, maxVal]
        result &&= val >= minVal && val <= maxVal;
      }

      // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
    });

    return result;
  });

  // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
  clearTable(idTable);
  const tableElement = document.getElementById(idTable);

  if (tableFilter.length == 0) {
    const headerKeys = Object.keys(data[0]);
    const headerRow = createHeaderRow(headerKeys);
    tableElement.append(headerRow);
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
    if (item.type == "button") {
      continue;
    } else {
      item.value = "";
    }
  }
  createTable(data, idTable);
}

const clearButton = document.getElementById("filter").lastElementChild;

clearButton.addEventListener("click", () => {
  resetSort(document.getElementById("sort"), "list");
  clearFilter(buildings, "list", document.getElementById("filter"));
});
