document.addEventListener("DOMContentLoaded", function () {
  showTable("build", buildings);

  const hiddenTableBtn = document.getElementById("hiddenTable");
  const buildTable = document.getElementById("build");
  let flag = false;

  hiddenTableBtn.addEventListener("click", () => {
    flag = !flag;
    if (flag) {
      buildTable.hidden = true;
      hiddenTableBtn.textContent = "Показать таблицу";
    } else {
      buildTable.hidden = false;
      hiddenTableBtn.textContent = "Скрыть таблицу";
    }
  });
  drawGraph(buildings);

  const buildBtn = document.getElementById("buildGraphBtn");
  buildBtn.addEventListener("click", () => {
    drawGraph(buildings);
  });
});
