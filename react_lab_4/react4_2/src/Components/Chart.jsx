import { use, useState } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";
import GistorammDraw from "./GistorammDraw";

export default function Chart({ data }) {
  const [ox, setOx] = useState("Энергопотребление (Вт)");
  const [oy, setOy] = useState([true, false]);
  const [type, setType] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    setType(Number(event.target["type"].value));
    setOx(event.target["ox"].value);
    setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
  };
  const createArrGraph = (data, key) => {
    let arrGraph = [];
    const groupObj = d3.group(data, (d) => d[key]);
    for (let entry of groupObj) {
      let minMax = d3.extent(entry[1].map((d) => d["Мощность (баллы)"]));
      arrGraph.push({ labelX: entry[0], values: minMax });
    }

    return arrGraph;
  };

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p> Значение по оси OX: </p>
        <div>
          <input
            type="radio"
            name="ox"
            value="Энергопотребление (Вт)"
            defaultChecked={ox === "Энергопотребление (Вт)"}
          />
          Энергопотребление
          <br />
          <input type="radio" name="ox" value="Видеопамять (ГБ)" />
          Видеопамять
        </div>
        <p> Значение по оси OY </p>
        <div className="error">
          <p className="erro-text"> Выберите хотя бы один параметр</p>
          <input
            type="checkbox"
            name="oy"
            defaultChecked={oy[0] === true}
            onChange={() => {
              d3.select("div.error").style("border", "");
              d3.select("div.error").select("p").style("display", "");
            }}
          />
          Максимальная мощность <br />
          <input
            type="checkbox"
            name="oy"
            onChange={() => {
              d3.select("div.error").style("border", "");
              d3.select("div.error").select("p").style("display", "");
            }}
          />
          Минимальная мощность
        </div>
        <div>
          Тип диаграммы{" "}
          <select name="type">
            <option value={0}>Точечная</option>
            <option value={1}>Гистограмма </option>
          </select>
        </div>

        <p>
          <button type="submit">Построить </button>
        </p>
      </form>
      {type == 0 ? (
        <ChartDraw
          data={createArrGraph(data, ox)}
          drawMax={oy[0]}
          drawMin={oy[1]}
        />
      ) : (
        <GistorammDraw
          data={createArrGraph(data, ox)}
          drawMax={oy[0]}
          drawMin={oy[1]}
        />
      )}
    </>
  );
}
