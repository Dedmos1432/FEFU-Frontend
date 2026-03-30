document.addEventListener("DOMContentLoaded", function () {
  const width = 600;
  const height = 600;
  const svg = d3.select("svg").attr("width", width).attr("height", height);
  const draw = (dataForm, scaleform, rotateForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);

    pict.attr(
      "transform",
      `translate(${dataForm.cx.value}, ${dataForm.cy.value}) rotate(${rotateForm.ygol.value}) scale(${scaleform.mx.value}, ${scaleform.my.value})`,
    );
  };

  document
    .querySelector('input[value="Нарисовать"]')
    .addEventListener("click", () =>
      draw(
        document.getElementById("setting"),
        document.getElementById("mashtab"),
        document.getElementById("povorot"),
      ),
    );

  document
    .querySelector('input[value="Очистить"]')
    .addEventListener("click", () => svg.selectAll("*").remove());
  const toggle = document.getElementById("animateToggle");
  const animFields = document.querySelectorAll(".anim-field");
  const drawBtn = document.querySelector('input[value="Нарисовать"]');
  const animBtn = document.getElementById("animateBtn");
  const toggle2 = document.getElementById("trajectoryToggle");

  const changeBnt = () => {
    if (toggle.checked) {
      animFields.forEach((el) => (el.style.display = "inline"));
      drawBtn.style.display = "none";
      animBtn.style.display = "inline";
    } else {
      animFields.forEach((el) => (el.style.display = "none"));
      drawBtn.style.display = "inline";
      animBtn.style.display = "none";
    }
  };
  toggle.addEventListener("change", changeBnt);

  toggle2.addEventListener("change", () => {
    if (toggle2.checked) {
      trajectoryType.style.display = "inline";
      toggle.checked = true;
      changeBnt();
      document.getElementById("setting").firstElementChild.style.display =
        "none";
      document.getElementById(
        "setting",
      ).firstElementChild.nextElementSibling.style.display = "inline";
      document.getElementById("mashtab").style.display = "none";
      document.getElementById("povorot").style.display = "none";
    } else {
      trajectoryType.style.display = "none";

      document.getElementById("mashtab").style.display = "inline";
      document.getElementById("povorot").style.display = "inline";
      document.getElementById("setting").firstElementChild.style.display =
        "inline";
      document.getElementById(
        "none",
      ).firstElementChild.nextElementSibling.style.display = "inline";
    }
  });

  const runAnimation = (dataForm, scaleform, rotateForm) => {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();
    const cx = +dataForm.cx.value;
    const cy = +dataForm.cy.value;
    const mx = +scaleform.mx.value;
    const my = +scaleform.my.value;
    const angle = +rotateForm.ygol.value;
    const cx2 = +dataForm.cx2.value;
    const cy2 = +dataForm.cy2.value;
    const mx2 = +scaleform.mx2.value;
    const my2 = +scaleform.my2.value;
    const angle2 = +rotateForm.ygol2.value;
    const type = dataForm.easeType.value;
    let easeFunc = d3.easeLinear;
    if (type === "elastic") easeFunc = d3.easeElastic;
    if (type === "bounce") easeFunc = d3.easeBounce;
    if (!toggle2.checked) {
      let pict = drawSmile(svg);
      pict
        .attr(
          "transform",
          `translate(${cx}, ${cy}) rotate(${angle}) scale(${mx}, ${my})`,
        )
        .transition()
        .duration(6000)
        .ease(easeFunc)
        .attr(
          "transform",
          `translate(${cx2}, ${cy2}) rotate(${angle2}) scale(${mx2}, ${my2})`,
        );
    } else {
      let pict = drawSmile(svg);
      let path = drawPath(dataForm.trajectoryType.value);
      pict
        .transition()
        .ease(easeFunc)
        .duration(6000)
        .attrTween("transform", translateAlong(path.node()));
    }
  };

  animateBtn.addEventListener("click", () =>
    runAnimation(
      document.getElementById("setting"),
      document.getElementById("mashtab"),
      document.getElementById("povorot"),
    ),
  );
});
