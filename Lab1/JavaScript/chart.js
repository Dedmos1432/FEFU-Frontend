function createArrGraph(data, keyX) {
  const groupObj = d3.group(data, (d) => d[keyX]);
  let arrGraph = [];
  for (let entry of groupObj) {
    const minMax = d3.extent(entry[1].map((d) => d["Мощность (баллы)"]));
    arrGraph.push({ labelX: entry[0], values: minMax });
  }
  return arrGraph;
}

function drawGraph(data, dataForm) {
  const showMax = document.getElementById("i3").checked;
  const showMin = document.getElementById("i4").checked;
  const errorBlock = document.getElementById("error-message");
  const oySection = document.querySelector(".checkbox-group");

  errorBlock.textContent = "";
  oySection.style.outline = "none";

  const svg = d3.select("svg");
  svg.selectAll("*").remove();

  if (!showMax && !showMin) {
    errorBlock.textContent =
      "Ошибка: выберите хотя бы один показатель (Мин/Макс)";
    oySection.style.outline = "solid red";
    d3.select("svg").selectAll("*").remove();
    return;
  }

  document.getElementById("i3").addEventListener("change", () => {
    if (showMax || showMin) {
      errorBlock.textContent = "";
      oySection.style.outline = "none";
    }
  });
  document.getElementById("i4").addEventListener("change", () => {
    if (showMax || showMin) {
      errorBlock.textContent = "";
      oySection.style.outline = "none";
    }
  });

  const keyX = d3.select('input[name="ox"]:checked').node().value;
  let arrGraph = createArrGraph(data, keyX);

  const attr_area = {
    width: parseFloat(svg.attr("width")),
    height: parseFloat(svg.attr("height")),
    marginX: 60,
    marginY: 120,
  };

  const [scX, scY] = createAxis(svg, arrGraph, attr_area, showMin, showMax);

  let type = dataForm.select("#type").node().value;

  switch (type) {
    case "dots":
      if (showMax) createChart(svg, arrGraph, scX, scY, attr_area, "red", 1);
      if (showMin) createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0);
      break;

    case "column":
      createHistogram(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
      console.log(arrGraph);
      break;

    case "graph":
      if (showMax) {
        createPath(svg, arrGraph, scX, scY, attr_area, "red", "max");
      }
      if (showMin) {
        createPath(svg, arrGraph, scX, scY, attr_area, "blue", "min");
      }
      break;
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
    .domain([...data.map((d) => d.labelX)].sort((a, b) => a - b))
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

function createPath(svg, data, scaleX, scaleY, attr_area, color, option) {
  const collision_offset = 4;
  const line_width = "2";
  let value_type = option === "max" ? 1 : 0;
  data1 = data.sort((a, b) => a.labelX - b.labelX);
  const line = d3
    .line()
    .x((d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
    .y((d) => {
      let offset = 0;
      if (d.values[0] === d.values[1]) {
        offset = option === "max" ? -collision_offset : collision_offset;
      }
      return scaleY(d.values[value_type]) + offset;
    });
  svg
    .append("path")
    .datum(data1)
    .attr("d", line)
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .style("stroke-width", line_width)
    .style("stroke", color)
    .style("fill", "none");
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
