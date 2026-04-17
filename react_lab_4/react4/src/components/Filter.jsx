export default function Filter({ filtering, data, fullData, selectLastPage }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target["structure"].value.toLowerCase().trim() !== "" ||
      event.target["type"].value.toLowerCase().trim() !== "" ||
      event.target["country"].value.toLowerCase().trim() !== "" ||
      event.target["fromYear"].value.toLowerCase().trim() !== "" ||
      event.target["toYear"].value.toLowerCase().trim() !== "" ||
      event.target["fromHight"].value.toLowerCase().trim() !== "" ||
      event.target["toHight"].value.toLowerCase().trim() !== ""
    ) {
      const filterField = {
        Название: event.target["structure"].value.toLowerCase(),
        Тип: event.target["type"].value.toLowerCase(),
        Страна: event.target["country"].value.toLowerCase(),
        Город: event.target["city"].value.toLowerCase(),
        Год: [event.target["fromYear"].value, event.target["toYear"].value],
        Высота: [
          event.target["fromHight"].value,
          event.target["toHight"].value,
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
      selectLastPage(Math.ceil(arr.length / 15));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Type:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Старна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="fromYear" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="toYear" type="number" />
      </p>
      <p>
        <label>Высота от:</label>
        <input name="fromHight" type="number" />
      </p>
      <p>
        <label>Высота до:</label>
        <input name="toHight" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button
          type="reset"
          onClick={(e) => {
            filtering(fullData);
          }}
        >
          Очистить фильтр
        </button>
      </p>
    </form>
  );
}
