// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка
function createArrGraph(data, key) {
  const groupObj = d3.group(data, (d) => d[key]);

  let arrGraph = [];
  for (let entry of groupObj) {
    const minMax = d3.extent(entry[1].map((d) => d["Высота"]));
    arrGraph.push({ labelX: entry[0], values: minMax });
  }

  return arrGraph;
}

function drawGraph(data) {
  const showMax = document.getElementById("showMax").checked;
  const showMin = document.getElementById("showMin").checked;
  const errorBlock = document.getElementById("error-message");
  const oySection = document.querySelector(".checkbox-group");

  errorBlock.textContent = "";
  oySection.style.outline = "none";

  if (!showMax && !showMin) {
    errorBlock.textContent =
      "Ошибка: выберите хотя бы один показатель (Мин/Макс)";
    oySection.style.outline = "solid red";
    d3.select("svg").selectAll("*").remove();
    return;
  }

  document.getElementById("showMin").addEventListener("change", () => {
    if (showMax || showMin) {
      errorBlock.textContent = "";
      oySection.style.outline = "none";
    }
  });
  document.getElementById("showMax").addEventListener("change", () => {
    if (showMax || showMin) {
      errorBlock.textContent = "";
      oySection.style.outline = "none";
    }
  });

  const keyX = document.querySelector('input[name="groupKey"]:checked').value;
  const chartType = document.getElementById("chartType").value;
  const svg = d3.select("svg");
  svg.selectAll("*").remove();

  let arrGraph = createArrGraph(data, keyX);
  if (keyX === "Год") {
    arrGraph.sort((a, b) => parseInt(a.labelX) - parseInt(b.labelX));
  }

  const attr_area = {
    width: parseFloat(svg.style("width")) || 800,
    height: parseFloat(svg.style("height")) || 400,
    marginX: 50,
    marginY: 50,
  };

  const [scX, scY] = createAxis(svg, arrGraph, attr_area, showMin, showMax);

  if (chartType === "dot") {
    if (showMax) createChart(svg, arrGraph, scX, scY, attr_area, "red", 1);
    if (showMin) createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0);
  } else {
    createHistogram(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
  }
}

function createHistogram(
  svg,
  data,
  scaleX,
  scaleY,
  attr_area,
  showMin,
  showMax,
) {
  const w = 8;
  const gap = 2;

  const chartGroup = svg
    .append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);

  const yZero = scaleY.range()[0];

  if (showMin) {
    const xOffset = showMax ? -(w + gap / 2) : -(w / 2);

    chartGroup
      .selectAll(".bar-min")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2 + xOffset)
      .attr("y", (d) => scaleY(d.values[0]))
      .attr("width", w)
      .attr("height", (d) => yZero - scaleY(d.values[0]))
      .style("fill", "blue");
  }

  if (showMax) {
    const xOffset = showMin ? gap / 2 : -(w / 2);

    chartGroup
      .selectAll(".bar-max")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2 + xOffset)
      .attr("y", (d) => scaleY(d.values[1]))
      .attr("width", w)
      .attr("height", (d) => yZero - scaleY(d.values[1]))
      .style("fill", "red");
  }
}

function createAxis(svg, data, attr_area, showMin, showMax) {
  let allValuesToDisplay = [];
  data.forEach((d) => {
    if (showMin) allValuesToDisplay.push(d.values[0]);
    if (showMax) allValuesToDisplay.push(d.values[1]);
  });

  const [min, max] = d3.extent(allValuesToDisplay);

  const scaleX = d3
    .scaleBand()
    .domain(data.map((d) => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX]);

  const yMin = min === max ? min * 0.5 : min * 0.85;
  const yMax = min === max ? max * 1.5 : max * 1.1;

  const scaleY = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([attr_area.height - 2 * attr_area.marginY, 0]);

  const axisX = d3.axisBottom(scaleX);
  const axisY = d3.axisLeft(scaleY);

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`,
    )
    .call(axisX)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  svg
    .append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .call(axisY);

  return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, valueIndex) {
  const r = 4;
  const className = valueIndex === 1 ? "dot-max" : "dot-min";

  svg
    .append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .selectAll(`.${className}`)
    .data(data)
    .enter()
    .append("circle")
    .attr("class", className)
    .attr("r", r)
    .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
    .attr("cy", (d) => {
      let yPos = scaleY(d.values[valueIndex]);
      if (d.values[0] === d.values[1]) {
        yPos += valueIndex === 1 ? -r : r;
      }
      return yPos;
    })
    .style("fill", color);
}
