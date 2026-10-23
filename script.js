const container = document.querySelector(".container");
const colorPickerButton = document.querySelector("#colorPickerButton");
const colorPalette = document.querySelector("#colorPalette");
const swatches = [...document.querySelectorAll(".palette-swatch")];
const sizeInput = document.querySelector("#gridSize");
const applyGridButton = document.querySelector("#applyGrid");
const clearGridButton = document.querySelector("#clearGrid");
const saveImageButton = document.querySelector("#saveImage");
const eraserButton = document.querySelector("#eraserButton");

let activeColor = "#1d4ed8";
let activeTool = "paint";
let isPointerDown = false;
let gridSize = Number(sizeInput.value) || 16;

const setGridSize = (size) => {
  const safeSize = Math.min(Math.max(size, 4), 40);
  gridSize = safeSize;
  sizeInput.value = String(safeSize);
  container.style.setProperty("--grid-size", String(safeSize));
};

const updateColorButton = () => {
  colorPickerButton.style.background = `conic-gradient(${[
    "#ff4d4d",
    "#ff9f1c",
    "#ffe600",
    "#35d07f",
    "#30c5ff",
    "#5b5cff",
    "#ab4dff",
    "#ff4d9d",
    "#ff4d4d",
  ].join(", ")})`;
  colorPickerButton.style.setProperty("--selected-color", activeColor);
  colorPickerButton.querySelector(".color-picker-inner").style.background = activeColor;
};

const togglePalette = () => {
  colorPalette.classList.toggle("open");
};

const closePalette = () => {
  colorPalette.classList.remove("open");
};

const setActiveTool = (tool) => {
  activeTool = tool;
  eraserButton.classList.toggle("is-active", tool === "eraser");
  eraserButton.textContent = tool === "eraser" ? "Eraser On" : "Eraser";
};

const createGrid = (size) => {
  clearGrid();
  setGridSize(size);

  for (let i = 0; i < size * size; i += 1) {
    const square = document.createElement("button");
    square.type = "button";
    square.classList.add("grid-square");
    square.dataset.color = "";
    square.setAttribute("aria-label", `Grid square ${i + 1}`);

    square.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      isPointerDown = true;
      paintSquare(square);
    });

    square.addEventListener("pointerenter", (event) => {
      const pointerType = event.pointerType || "mouse";
      if (pointerType === "mouse" || pointerType === "pen" || isPointerDown) {
        paintSquare(square);
      }
    });

    square.addEventListener("pointerup", () => {
      isPointerDown = false;
    });

    square.addEventListener("pointerleave", () => {
      if (isPointerDown) {
        paintSquare(square);
      }
    });

    container.appendChild(square);
  }
};

const clearGrid = () => {
  container.innerHTML = "";
};

const paintSquare = (square) => {
  if (activeTool === "eraser") {
    square.dataset.color = "";
    square.style.backgroundColor = "transparent";
    return;
  }

  square.dataset.color = activeColor;
  square.style.backgroundColor = activeColor;
};

const downloadDrawing = () => {
  const squares = [...container.querySelectorAll(".grid-square")];
  const canvas = document.createElement("canvas");
  const cellSize = 24;
  const totalPixels = gridSize * cellSize;

  canvas.width = totalPixels;
  canvas.height = totalPixels;

  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  squares.forEach((square, index) => {
    const x = (index % gridSize) * cellSize;
    const y = Math.floor(index / gridSize) * cellSize;
    const fillColor = square.dataset.color || "#ffffff";

    context.fillStyle = fillColor;
    context.fillRect(x, y, cellSize, cellSize);
  });

  const link = document.createElement("a");
  const dataUrl = canvas.toDataURL("image/png");
  link.href = dataUrl;
  link.download = "etch-a-sketch.png";
  link.click();
};

colorPickerButton.addEventListener("click", (event) => {
  event.stopPropagation();
  togglePalette();
});

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    activeColor = swatch.dataset.color;
    setActiveTool("paint");
    swatches.forEach((item) => item.classList.toggle("active", item === swatch));
    updateColorButton();
    closePalette();
  });
});

eraserButton.addEventListener("click", () => {
  setActiveTool(activeTool === "eraser" ? "paint" : "eraser");
});

applyGridButton.addEventListener("click", () => {
  const nextSize = Number(sizeInput.value);

  if (!Number.isInteger(nextSize) || nextSize < 4 || nextSize > 40) {
    alert("Please choose a grid size between 4 and 40.");
    sizeInput.value = String(gridSize);
    return;
  }

  createGrid(nextSize);
});

clearGridButton.addEventListener("click", () => {
  createGrid(gridSize);
});

saveImageButton.addEventListener("click", downloadDrawing);

document.addEventListener("click", (event) => {
  if (!colorPickerButton.contains(event.target) && !colorPalette.contains(event.target)) {
    closePalette();
  }
});

window.addEventListener("pointerup", () => {
  isPointerDown = false;
});

updateColorButton();
setActiveTool("paint");
createGrid(gridSize);
