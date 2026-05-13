import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";

export default function GistorammDraw({ data, drawMax, drawMin }) {
  const chartRef = useRef(null);
  const w = 8;
  const gap = 2;

  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(+svg.attr("width"));
    setHeight(+svg.attr("height"));
  }, []);

  const margin = {
    top: 10,
    bottom: 60,
    left: 40,
    right: 10,
  };

  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  let allValuesToDisplay = [];
  data.forEach((d) => {
    if (drawMin) allValuesToDisplay.push(d.values[0]);
    if (drawMax) allValuesToDisplay.push(d.values[1]);
  });

  let [min, max] =
    allValuesToDisplay.length > 0 ? d3.extent(allValuesToDisplay) : [0, 0];

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.labelX))
      .range([0, boundsWidth]);
  }, [data, boundsWidth]);

  const scaleY = useMemo(() => {
    const yMin = min === max ? min * 0.5 : min * 0.85;
    const yMax = min === max ? max * 1.5 : max * 1.1;

    return d3.scaleLinear().domain([yMin, yMax]).range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    if (!drawMax && !drawMin) {
      d3.select("div.error").style("border", "solid red");
      d3.select("div.error").select("p").style("display", "block");
      return;
    } else {
      d3.select("div.error").style("border", "");
      d3.select("div.error").select("p").style("display", "");
    }

    const xAxis = d3.axisBottom(scaleX);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const yZero = scaleY.range()[0];

    if (drawMin) {
      const xOffset = drawMax ? -(w + gap / 2) : -(w / 2);

      chartGroup
        .selectAll(".bar-min")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-min")
        .attr("x", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2 + xOffset)
        .attr("y", (d) => scaleY(d.values[0]))
        .attr("width", w)
        .attr("height", (d) => yZero - scaleY(d.values[0]))
        .style("fill", "blue");
    }

    if (drawMax) {
      const xOffset = drawMin ? gap / 2 : -(w / 2);

      chartGroup
        .selectAll(".bar-max")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-max")
        .attr("x", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2 + xOffset)
        .attr("y", (d) => scaleY(d.values[1]))
        .attr("width", w)
        .attr("height", (d) => yZero - scaleY(d.values[1]))
        .style("fill", "red");
    }
  }, [scaleX, scaleY, data, drawMax, drawMin, height]);

  return <svg ref={chartRef} width="700" height="400"></svg>;
}
