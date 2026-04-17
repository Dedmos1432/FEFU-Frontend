export default function Filter({ filtering, data, fullData, clearSort }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target["model"].value.toLowerCase().trim() !== "" ||
      event.target["creater"].value.toLowerCase().trim() !== "" ||
      event.target["priceTo"].value.toLowerCase().trim() !== "" ||
      event.target["priceFrom"].value.toLowerCase().trim() !== "" ||
      event.target["memoryTo"].value.toLowerCase().trim() !== "" ||
      event.target["memoryFrom"].value.toLowerCase().trim() !== "" ||
      event.target["energTo"].value.toLowerCase().trim() !== "" ||
      event.target["energFrom"].value.toLowerCase().trim() !== "" ||
      event.target["powerTo"].value.toLowerCase().trim() !== "" ||
      event.target["powerFrom"].value.toLowerCase().trim() !== "" ||
      event.target["ghzTo"].value.toLowerCase().trim() !== "" ||
      event.target["ghzFrom"].value.toLowerCase().trim() !== "" ||
      event.target["processTo"].value.toLowerCase().trim() !== "" ||
      event.target["processFrom"].value.toLowerCase().trim() !== ""
    ) {
      const filterField = {
        Модель: event.target["model"].value.toLowerCase(),
        Производитель: event.target["creater"].value.toLowerCase(),
        "Цена ($)": [
          event.target["priceTo"].value,
          event.target["priceFrom"].value,
        ],
        "Видеопамять (ГБ)": [
          event.target["memoryTo"].value,
          event.target["memoryFrom"].value,
        ],
        "Энергопотребление (Вт)": [
          event.target["energTo"].value,
          event.target["energFrom"].value,
        ],
        "Мощность (баллы)": [
          event.target["powerTo"].value,
          event.target["powerFrom"].value,
        ],
        "Частота ядра (МГц)": [
          event.target["ghzTo"].value,
          event.target["ghzFrom"].value,
        ],
        "Потоковые процессоры": [
          event.target["processTo"].value,
          event.target["processFrom"].value,
        ],
      };
      let arr = fullData;
      for (const key in filterField) {
        arr = arr.filter((item) => {
          const filterVal = filterField[key];
          if (Array.isArray(filterVal)) {
            const from = filterVal[0] !== "" ? Number(filterVal[0]) : null;
            const to = filterVal[1] !== "" ? Number(filterVal[1]) : null;
            const itemVal = item[key] != null ? Number(item[key]) : null;

            if (from !== null && itemVal < from) return false;
            if (to !== null && itemVal > to) return false;
            return true;
          }
          return item[key].toLowerCase().includes(filterVal);
        });
      }
      filtering(arr);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>
        <label>Модель:</label>
        <input name="model" type="text" />
      </p>
      <p>
        <label>Производитель:</label>
        <input name="creater" type="text" />
      </p>
      <p>
        <label>Цена ($) от:</label>
        <input name="priceTo" type="number" />
        до
        <input name="priceFrom" type="number" />
      </p>
      <p>
        <label>Видеопамять (ГБ) от:</label>
        <input name="memoryTo" type="number" />
        до
        <input name="memoryFrom" type="number" />
      </p>
      <p>
        <label>Энергопотребление (Вт):</label>
        <input name="energTo" type="number" />
        до
        <input name="energFrom" type="number" />
      </p>
      <p>
        <label>Мощность (баллы) от:</label>
        <input name="powerTo" type="number" />
        до
        <input name="powerFrom" type="number" />
      </p>
      <p>
        <label>Частота ядра (МГц) от:</label>
        <input name="ghzTo" type="number" />
        до
        <input name="ghzFrom" type="number" />
      </p>
      <p>
        <label>Потоковые процессоры от:</label>
        <input name="processTo" type="number" />
        до
        <input name="processFrom" type="number" />
      </p>

      <p>
        <button type="submit">Фильтровать</button>
        <button
          type="reset"
          onClick={(e) => {
            filtering(fullData);
            clearSort(true);
          }}
        >
          Очистить фильтр
        </button>
      </p>
    </form>
  );
}
