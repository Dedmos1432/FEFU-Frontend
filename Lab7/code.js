document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("triangleForm");
  const imageContainer = document.getElementById("imageContainer");
  const resultDiv = document.getElementById("resultDiv");
  const showButton = document.getElementById("showButton");

  const baseField = document.getElementById("baseField");
  const adjacentAngleField = document.getElementById("adjacentAngleField");
  const oppositeAngleField = document.getElementById("oppositeAngleField");

  let isImageVisible = true;
  updateView();

  showButton.textContent = "Скрыть изображение";

  form.addEventListener("change", (e) => {
    if (e.target.name === "inputType") {
      isImageVisible = true;
      updateView();
      showButton.textContent = "Скрыть изображение";
    }
  });

  showButton.addEventListener("click", () => {
    isImageVisible = !isImageVisible;
    imageContainer.style.display = isImageVisible ? "block" : "none";
    showButton.textContent = isImageVisible
      ? "Скрыть изображение"
      : "Показать изображение";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });

  form.addEventListener("reset", () => {
    resultDiv.style.display = "none";
    clearErrors();
    isImageVisible = true;
    updateView();
    showButton.textContent = "Скрыть изображение";
  });

  setupFieldListeners();

  function drawTriangle(type) {
    let svgContent = "";
    if (type === "base_angle_adjacent") {
      svgContent = `
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,20 L170,130 L30,130 Z" fill="none" stroke="black" stroke-width="2"/>
          <text x="90" y="145" font-family="Arial" font-size="14" fill="blue">b (основание)</text>
          <path d="M50,130 A20,20 0 0,0 65,115" fill="none" stroke="red" stroke-width="2"/>
          <text x="40" y="110" font-family="Arial" font-size="14" fill="red">α</text>
          <text x="45" y="80" font-family="Arial" font-size="12">a</text>
          <text x="145" y="80" font-family="Arial" font-size="12">a</text>
        </svg>`;
    } else {
      svgContent = `
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,20 L170,130 L30,130 Z" fill="none" stroke="black" stroke-width="2"/>
          <text x="90" y="145" font-family="Arial" font-size="14" fill="blue">b (основание)</text>
          <path d="M90,35 A15,15 0 0,0 110,35" fill="none" stroke="red" stroke-width="2"/>
          <text x="95" y="55" font-family="Arial" font-size="14" fill="red">γ</text>
          <text x="45" y="80" font-family="Arial" font-size="12">a</text>
          <text x="145" y="80" font-family="Arial" font-size="12">a</text>
        </svg>`;
    }
    imageContainer.innerHTML = svgContent;
  }

  function getInputType() {
    return form.inputType.value;
  }

  function updateView() {
    const inputType = getInputType();
    drawTriangle(inputType);
    imageContainer.style.display = "block";

    if (inputType === "base_angle_adjacent") {
      adjacentAngleField.style.display = "block";
      oppositeAngleField.style.display = "none";
    } else {
      adjacentAngleField.style.display = "none";
      oppositeAngleField.style.display = "block";
    }

    resultDiv.style.display = "none";
  }

  function setupFieldListeners() {
    const baseInputs = form.querySelectorAll('input[name="base"]');
    const angleInputs = form.querySelectorAll('input[name="angle"]');

    function hideErrorFor(input) {
      input.classList.remove("error");
      const errorEl = input
        .closest(".input-group")
        .querySelector(".error-text");
      if (errorEl) errorEl.style.display = "none";
    }

    baseInputs.forEach((input) => {
      input.addEventListener("input", () => hideErrorFor(input));
      input.addEventListener("focus", () => hideErrorFor(input));
    });

    angleInputs.forEach((input) => {
      input.addEventListener("input", () => hideErrorFor(input));
      input.addEventListener("focus", () => hideErrorFor(input));
    });
  }

  function getErrorElement(fieldName) {
    if (fieldName === "base") {
      return baseField.querySelector(".error-text");
    }
    const type = getInputType();
    if (type === "base_angle_adjacent") {
      return adjacentAngleField.querySelector(".error-text");
    } else {
      return oppositeAngleField.querySelector(".error-text");
    }
  }

  function isValidPositiveNumber(value) {
    return value !== "" && !isNaN(value) && parseFloat(value) > 0;
  }

  function isValidAngle(value, type) {
    if (value === "" || isNaN(value)) return false;
    const angle = parseFloat(value);
    return type === "base_angle_adjacent"
      ? angle > 0 && angle < 90
      : angle > 0 && angle < 180;
  }

  function clearErrors() {
    form
      .querySelectorAll(".error-text")
      .forEach((el) => (el.style.display = "none"));
    form
      .querySelectorAll("input")
      .forEach((input) => input.classList.remove("error"));
  }

  function calculate() {
    clearErrors();
    const inputType = getInputType();

    const baseValue = form.querySelector('input[name="base"]').value;

    let angleValue = "";
    if (inputType === "base_angle_adjacent") {
      angleValue = adjacentAngleField.querySelector("input").value;
    } else {
      angleValue = oppositeAngleField.querySelector("input").value;
    }

    let hasErrors = false;

    if (!isValidPositiveNumber(baseValue)) {
      form.querySelector('input[name="base"]').classList.add("error");
      getErrorElement("base").style.display = "inline";
      hasErrors = true;
    }

    if (!isValidAngle(angleValue, inputType)) {
      const angleInput =
        inputType === "base_angle_adjacent"
          ? adjacentAngleField.querySelector("input")
          : oppositeAngleField.querySelector("input");
      angleInput.classList.add("error");
      getErrorElement("angle").style.display = "inline";
      hasErrors = true;
    }

    if (hasErrors) return;

    const b = parseFloat(baseValue);
    const angleDeg = parseFloat(angleValue);
    let alpha, gamma;

    if (inputType === "base_angle_adjacent") {
      alpha = (angleDeg * Math.PI) / 180;
      gamma = Math.PI - 2 * alpha;
    } else {
      gamma = (angleDeg * Math.PI) / 180;
      alpha = (Math.PI - gamma) / 2;
    }

    const a = b / (2 * Math.cos(alpha));
    const h_base = (b / 2) * Math.tan(alpha);
    const S = 0.5 * b * h_base;
    const p = (2 * a + b) / 2;

    const selected = [];
    const options = form.characteristics.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    let resultText = "<h3>Результаты:</h3>";

    if (selected.length === 0) {
      resultText += "<p>Выберите хотя бы одну характеристику.</p>";
    }

    if (selected.includes("height")) {
      const h_side = (2 * S) / a;
      resultText += `<p>Высота к основанию: ${h_base.toFixed(2)}</p>`;
      resultText += `<p>Высота к боковой стороне: ${h_side.toFixed(2)}</p>`;
    }

    if (selected.includes("inradius")) {
      const r = S / p;
      resultText += `<p>Радиус вписанной окружности: ${r.toFixed(2)}</p>`;
    }

    if (selected.includes("median")) {
      const m_base = h_base;
      const m_side = 0.5 * Math.sqrt(a * a + 2 * b * b);
      resultText += `<p>Медиана к основанию: ${m_base.toFixed(2)}</p>`;
      resultText += `<p>Медиана к боковой стороне: ${m_side.toFixed(2)}</p>`;
    }

    resultDiv.innerHTML = resultText;
    resultDiv.style.display = "block";
  }
});

let a = 1;
let b = {
  toString() {
    return "1";
  },
};
let c = 1;

console.log(a + b + c);
