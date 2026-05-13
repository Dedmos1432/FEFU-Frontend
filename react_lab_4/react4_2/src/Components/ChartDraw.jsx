import * as d3 from "d3";
import { useRef, useEffect, useState, useMemo } from "react";
export default function ChartDraw({ data, drawMax, drawMin }) {
  const chartRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  });
  const margin = {
    top: 10,
    bottom: 60,
    left: 40,
    right: 10,
  };

  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const indexOY = 1;
  const indexOY2 = 0;
  let newAxis = [];
  if (drawMin) {
    newAxis = [...newAxis, ...data.map((d) => d.values[indexOY2])];
  } else {
    newAxis = [...newAxis, ...data.map((d) => d.values[indexOY])];
  }
  let [min, max] = d3.extent(newAxis);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.labelX))
      .range([0, boundsWidth]);
  }, [data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1])
      .range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(scaleX);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", (d) => "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
    if (drawMax == true && drawMin == false) {
      d3.select("div.error").style("border", "");
      d3.select("div.error").select("p").style("display", "");
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", (d) => scaleY(d.values[indexOY]))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill", "red");
    } else if (drawMax == false && drawMin == true) {
      d3.select("div.error").style("border", "");
      d3.select("div.error").select("p").style("display", "");
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", (d) => scaleY(d.values[indexOY2]))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill", "blue");
    } else if (drawMax && drawMin) {
      d3.select("div.error").style("border", "");
      d3.select("div.error").select("p").style("display", "");
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", (d) => scaleY(d.values[indexOY2]))
        .attr("transform", `translate(${margin.left}, ${margin.top + 10})`)
        .style("fill", "blue");
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", (d) => scaleY(d.values[indexOY]))
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill", "red");
    } else {
      d3.select("div.error").style("border", "solid red");
      d3.select("div.error").select("p").style("display", "block");
    }
  }, [scaleX, scaleY, data]);

  return <svg ref={chartRef}> </svg>;
}
