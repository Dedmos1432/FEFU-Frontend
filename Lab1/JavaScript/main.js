document.addEventListener("DOMContentLoaded", function () {
  setSortSelects(buildings, document.getElementById("sort"));
  const graphForm = d3.select("#graph_settings");
  drawGraph(buildings, graphForm);
  const buildBtn = document.getElementById("buildGraphBtn");
  buildBtn.addEventListener("click", (e) => {
    e.preventDefault();
    drawGraph(buildings, graphForm);
  });
});

const createOption = (str, val) => {
  let item = document.createElement("option");
  item.text = str;
  item.value = val;
  return item;
};

const setSortSelect = (arr, sortSelect) => {
  sortSelect.append(createOption("Нет", 0));
  arr.forEach((item, index) => {
    sortSelect.append(createOption(item, index + 1));
  });
};

const setSortSelects = (data, dataForm) => {
  const head = Object.keys(data[0]);
  let selectIndex = 0;

  for (const item of dataForm.elements) {
    if (item.tagName === "SELECT") {
      setSortSelect(head, item);
      if (selectIndex > 0) {
        item.disabled = true;
      }
      selectIndex++;
    }
  }
};
