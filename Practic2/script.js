const width = 600;
const height = 600;
const cx = width / 2;
const cy = height / 2;

const svg = d3
  .select("#svg-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const points = [];
const numPoints = 200;

for (let i = 0; i <= numPoints; i++) {
  const t = (i / numPoints) * Math.PI * 2;
  const x = cx + 150 * Math.sin(2 * t);
  const y = cy + 200 * Math.sin(t);
  points.push([x, y]);
}

const lineGenerator = d3.line().curve(d3.curveCatmullRom);
const path = svg
  .append("path")
  .attr("id", "trajectory")
  .attr("d", lineGenerator(points))
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1);

function drawSmile(svgElement) {
  const nlo = svg
    .append("g")
    .attr("id", "moving-object")
    .attr("transform", `translate(${cx}, ${cy})`);

  nlo
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("rx", 35)
    .attr("ry", 15)
    .attr("fill", "#555");
  nlo
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", -8)
    .attr("rx", 18)
    .attr("ry", 12)
    .attr("fill", "#87CEFA");
  nlo
    .append("circle")
    .attr("cx", -20)
    .attr("cy", 2)
    .attr("r", 4)
    .attr("fill", "yellow");
  nlo
    .append("circle")
    .attr("cx", 20)
    .attr("cy", 2)
    .attr("r", 4)
    .attr("fill", "yellow");
  nlo
    .append("ellipse")
    .attr("cx", 0)
    .attr("cy", -5)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "#08971d");
  nlo
    .append("line")
    .attr("x1", 4)
    .attr("y1", -8)
    .attr("x2", 10)
    .attr("y2", -13)
    .attr("stroke", "#08971d")
    .attr("stroke-width", 2);
  nlo
    .append("line")
    .attr("x1", 0)
    .attr("y1", -8)
    .attr("x2", -10)
    .attr("y2", -13)
    .attr("stroke", "#08971d")
    .attr("stroke-width", 2);
  nlo
    .append("line")
    .attr("x1", 0)
    .attr("y1", -10)
    .attr("x2", 0)
    .attr("y2", 4)
    .attr("stroke", "#08971d")
    .attr("stroke-width", 2);

  return nlo;
}

const smileObject = drawSmile(svg);
smileObject.attr("transform", `translate(${cx}, ${cy})`);

function startAnimation() {
  const duration = +document.getElementById("duration").value;
  const scale = +document.getElementById("scaleFactor").value;
  const rotation = +document.getElementById("rotationDeg").value;

  const pathNode = path.node();
  const totalLength = pathNode.getTotalLength();

  smileObject.interrupt();

  smileObject
    .transition()
    .duration(duration)
    .ease(d3.easeLinear)
    .attrTween("transform", function () {
      return function (t) {
        const p = pathNode.getPointAtLength(t * totalLength);
        const s = t * scale + 1;
        const r = t * rotation;

        return `translate(${p.x}, ${p.y}) rotate(${r}) scale(${s})`;
      };
    });
}

function clearAnimation() {
  smileObject.interrupt();
  smileObject
    .transition()
    .duration(500)
    .attr("transform", `translate(${cx}, ${cy}) rotate(0) scale(1)`);
}
