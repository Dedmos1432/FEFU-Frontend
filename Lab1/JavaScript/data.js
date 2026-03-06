const rows = document.getElementById("list").querySelectorAll("tr");
const data = [...rows];
const title = [...data[0].children].map((it) => it.textContent.trim());
const numericColumns = [
  "Цена ($)",
  "Видеопамять (ГБ)",
  "Энергопотребление (Вт)",
  "Мощность (баллы)",
  "Частота ядра (МГц)",
  "Потоковые процессоры",
];
const buildings = [...data.slice(1)]
  .map((row) => [...row.children].map((cell) => cell.textContent.trim()))
  .map((cellValues) => {
    let obj = {};
    cellValues.forEach((text, index) => {
      const columnName = title[index];
      if (numericColumns.includes(columnName)) {
        const normalizedText = text.replace(",", ".");
        obj[columnName] = Number(normalizedText);
      } else {
        obj[columnName] = text;
      }
    });
    return obj;
  });
