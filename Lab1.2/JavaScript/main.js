document.addEventListener("DOMContentLoaded", function () {
  createTable(buildings, "list");
  setSortSelects(buildings, document.getElementById("sort"));
});

const createOption = (str, val) => {
  let item = document.createElement("option");
  item.text = str;
  item.value = val;
  return item;
};

// формирование поля со списком
// параметры – массив со значениями элементов списка и элемент select

const setSortSelect = (arr, sortSelect) => {
  // создаем OPTION Нет и добавляем ее в SELECT
  sortSelect.append(createOption("Нет", 0));
  // перебираем массив со значениями опций
  arr.forEach((item, index) => {
    // создаем OPTION из очередного ключа и добавляем в SELECT
    // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
    sortSelect.append(createOption(item, index + 1));
  });
};

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => {
  // выделяем ключи словаря в массив
  const head = Object.keys(data[0]);
  let selectIndex = 0;

  // находим все SELECT в форме
  const allSelect = dataForm.getElementsByTagName("select");

  for (const item of dataForm.elements) {
    // формируем очередной SELECT
    if (item.tagName === "SELECT") {
      // 1. Заполняем текущий SELECT опциями
      setSortSelect(head, item);

      // 2. Блокируем все SELECT, кроме первого
      if (selectIndex > 0) {
        item.disabled = true;
      }

      // Увеличиваем счетчик только после обработки SELECT
      selectIndex++;
    }
  }
};

const changeNextSelect = (curSelect, nextSelectId) => {
  let nextSelect = document.getElementById(nextSelectId);

  nextSelect.disabled = false;

  // в следующем SELECT выводим те же option, что и в текущем
  nextSelect.innerHTML = curSelect.innerHTML;

  // удаляем в следующем SELECT уже выбранную в текущем опцию
  // если это не первая опция - отсутствие сортировки
  if (curSelect.value != 0) {
    nextSelect.remove(curSelect.value);
  } else {
    nextSelect.disabled = true;
  }
};

const select1 = document.getElementById("fieldsFirst");

select1.addEventListener("change", () => {
  changeNextSelect(select1, "fieldsSecond");
});
