import { useEffect, useRef, useState } from "react";

export default function Sort({ sortetData, fullData, isClearSort }) {
  const first = useRef(null);
  const second = useRef(null);
  const third = useRef(null);

  const fields =
    fullData && fullData.length > 0 ? Object.keys(fullData[0]) : [];

  const [firstField, setFirstField] = useState("Нет");
  const [secondField, setSecondField] = useState("Нет");
  const [thirdField, setThirdField] = useState("Нет");

  const [firstDesc, setFirstDesc] = useState(false);
  const [secondDesc, setSecondDesc] = useState(false);
  const [thirdDesc, setThirdDesc] = useState(false);

  useEffect(() => {
    setFirstField("Нет");
    setSecondField("Нет");
    setThirdField("Нет");

    setFirstDesc(false);
    setSecondDesc(false);
    setThirdDesc(false);
  }, [isClearSort]);

  useEffect(() => {
    if (second.current) second.current.disabled = true;
    if (third.current) third.current.disabled = true;
  }, []);

  useEffect(() => {
    if (!second.current || !third.current) return;

    if (firstField !== "Нет") {
      second.current.disabled = false;
    } else {
      second.current.disabled = true;
      third.current.disabled = true;
      setSecondField("Нет");
      setThirdField("Нет");
    }

    if (firstField !== "Нет" && secondField !== "Нет") {
      third.current.disabled = false;
    } else {
      third.current.disabled = true;
      setThirdField("Нет");
    }
  }, [firstField, secondField]);

  const secondOptions = fields.filter((item) => item !== firstField);

  const thirdOptions = fields.filter(
    (item) => item !== firstField && item !== secondField,
  );

  function compareValues(a, b, field, desc) {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      const result = valueA.localeCompare(valueB, "ru");
      return desc ? -result : result;
    }

    if (valueA < valueB) return desc ? 1 : -1;
    if (valueA > valueB) return desc ? -1 : 1;
    return 0;
  }

  function handleSort() {
    const sortLevels = [];

    if (firstField !== "Нет") {
      sortLevels.push({ field: firstField, desc: firstDesc });
    }

    if (secondField !== "Нет") {
      sortLevels.push({ field: secondField, desc: secondDesc });
    }

    if (thirdField !== "Нет") {
      sortLevels.push({ field: thirdField, desc: thirdDesc });
    }

    if (sortLevels.length == 0) {
      sortetData([...fullData]);
      return;
    }

    const sorted = [...fullData].sort((a, b) => {
      for (let i = 0; i < sortLevels.length; i++) {
        const result = compareValues(
          a,
          b,
          sortLevels[i].field,
          sortLevels[i].desc,
        );

        if (result !== 0) return result;
      }

      return 0;
    });

    sortetData(sorted);
  }

  function handleReset() {
    setFirstField("Нет");
    setSecondField("Нет");
    setThirdField("Нет");

    setFirstDesc(false);
    setSecondDesc(false);
    setThirdDesc(false);

    if (second.current) second.current.disabled = true;
    if (third.current) third.current.disabled = true;

    sortetData([...fullData]);
  }

  return (
    <details>
      <summary>Сортировка</summary>
      <form id="sort">
        Первый уровень:
        <select
          ref={first}
          id="fieldsFirst"
          name="sort1"
          value={firstField}
          onChange={(e) => setFirstField(e.target.value)}
        >
          <option value="Нет">Нет</option>
          {fields.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="checkbox"
          id="fieldsFirstDesc"
          checked={firstDesc}
          onChange={(e) => setFirstDesc(e.target.checked)}
        />
        по убыванию?
        <br />
        Второй уровень:
        <select
          ref={second}
          id="fieldsSecond"
          name="sort2"
          value={secondField}
          onChange={(e) => setSecondField(e.target.value)}
        >
          <option value="Нет">Нет</option>
          {secondOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="checkbox"
          id="fieldsSecondDesc"
          checked={secondDesc}
          onChange={(e) => setSecondDesc(e.target.checked)}
        />
        по убыванию?
        <br />
        Третий уровень:
        <select
          ref={third}
          id="fieldsThird"
          name="sort3"
          value={thirdField}
          onChange={(e) => setThirdField(e.target.value)}
        >
          <option value="Нет">Нет</option>
          {thirdOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="checkbox"
          id="fieldsThirdDesc"
          checked={thirdDesc}
          onChange={(e) => setThirdDesc(e.target.checked)}
        />{" "}
        по убыванию?
        <br />
        <br />
        <input type="button" value="Сортировать" onClick={handleSort} />
        <input
          type="button"
          value="Сбросить сортировку"
          onClick={handleReset}
        />
      </form>
    </details>
  );
}
