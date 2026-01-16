function drawTriangle(type) {
  const container = document.getElementById("imageContainer");
  let svgContent = "";

  if (type === "base_angle_adjacent") {
    svgContent = `
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 20 L 170 130 L 30 130 Z" fill="none" stroke="black" stroke-width="2"/>
            <text x="90" y="145" font-family="Arial" font-size="14" fill="blue">b (основание)</text>
            <path d="M 50 130 A 20 20 0 0 0 65 115" fill="none" stroke="red" stroke-width="2"/>
            <text x="40" y="110" font-family="Arial" font-size="14" fill="red">α</text>
            <text x="45" y="80" font-family="Arial" font-size="12">a</text>
            <text x="145" y="80" font-family="Arial" font-size="12">a</text>
        </svg>`;
  } else {
    svgContent = `
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 20 L 170 130 L 30 130 Z" fill="none" stroke="black" stroke-width="2"/>
            <text x="90" y="145" font-family="Arial" font-size="14" fill="blue">b (основание)</text>
            <path d="M 90 35 A 15 15 0 0 0 110 35" fill="none" stroke="red" stroke-width="2"/>
            <text x="95" y="55" font-family="Arial" font-size="14" fill="red">γ</text>
            <text x="45" y="80" font-family="Arial" font-size="12">a</text>
            <text x="145" y="80" font-family="Arial" font-size="12">a</text>
        </svg>`;
  }
  container.innerHTML = svgContent;
}

function getInputType() {
  return document.querySelector('input[name="inputType"]:checked').value;
}

function updateView() {
  const inputType = getInputType();
  const fieldsContainer = document.getElementById("inputFields");

  drawTriangle(inputType);

  let fieldHTML = `
        <div class="input-group">
            <label for="baseInput">Длина основания (b):</label><br>
            <input type="number" id="baseInput" step="any">
            <span id="baseError" class="error-text" style="display: none;">Введите положительное число</span>
        </div>
    `;

  if (inputType === "base_angle_adjacent") {
    fieldHTML += `
            <div class="input-group">
                <label for="angleInput">Прилежащий угол (α) в градусах:</label><br>
                <input type="number" id="angleInput" step="any">
                <span id="angleError" class="error-text" style="display: none;">Угол должен быть > 0 и < 90°</span>
            </div>
        `;
  } else {
    fieldHTML += `
            <div class="input-group">
                <label for="angleInput">Противолежащий угол (γ) в градусах:</label><br>
                <input type="number" id="angleInput" step="any">
                <span id="angleError" class="error-text" style="display: none;">Угол должен быть > 0 и < 180°</span>
            </div>
        `;
  }

  fieldsContainer.innerHTML = fieldHTML;
  document.getElementById("resultDiv").style.display = "none";
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
  document
    .querySelectorAll(".error-text")
    .forEach((s) => (s.style.display = "none"));
  document
    .querySelectorAll("input")
    .forEach((i) => i.classList.remove("error"));
}

function calculate() {
  clearErrors();
  const inputType = getInputType();
  const baseValue = document.getElementById("baseInput").value;
  const angleValue = document.getElementById("angleInput").value;
  let hasErrors = false;

  if (!isValidPositiveNumber(baseValue)) {
    document.getElementById("baseInput").classList.add("error");
    document.getElementById("baseError").style.display = "inline";
    hasErrors = true;
  }

  if (!isValidAngle(angleValue, inputType)) {
    document.getElementById("angleInput").classList.add("error");
    document.getElementById("angleError").style.display = "inline";
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

  const selectedOptions = Array.from(
    document.getElementById("characteristicsSelect").selectedOptions
  ).map((o) => o.value);
  let resultText = "<h3>Результаты:</h3>";

  if (selectedOptions.length === 0) {
    resultText += "<p>Выберите хотя бы одну характеристику.</p>";
  }

  if (selectedOptions.includes("height")) {
    const h_side = (2 * S) / a;
    resultText += `<p>Высота к основанию: ${h_base.toFixed(2)}</p>`;
    resultText += `<p>Высота к боковой стороне: ${h_side.toFixed(2)}</p>`;
  }

  if (selectedOptions.includes("inradius")) {
    const r = S / p;
    resultText += `<p>Радиус вписанной окружности: ${r.toFixed(2)}</p>`;
  }

  if (selectedOptions.includes("median")) {
    const m_base = h_base;
    const m_side = 0.5 * Math.sqrt(a * a + 2 * b * b);
    resultText += `<p>Медиана к основанию: ${m_base.toFixed(2)}</p>`;
    resultText += `<p>Медиана к боковой стороне: ${m_side.toFixed(2)}</p>`;
  }

  const resDiv = document.getElementById("resultDiv");
  resDiv.innerHTML = resultText;
  resDiv.style.display = "block";
}

function clearInputs() {
  document.getElementById("baseInput").value = "";
  document.getElementById("angleInput").value = "";
  document.getElementById("resultDiv").style.display = "none";
  clearErrors();
}

window.onload = updateView;
