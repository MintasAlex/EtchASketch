const gridContainer = document.querySelector("#drawing-grid");

let gridWidth = 16;
let gridCellWidth = "31.25px ";


let drawingColor = "#000000";
let backgroundColor = "#FFFFFF";

// track mousedown status
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//generate a grid with the given width
function generateGrid(gridWidth) {
    let gridCells = 0;
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            const gridCell = document.createElement("div");
            gridCells++;
            gridCell.style.backgroundColor = backgroundColor;
            gridContainer.appendChild(gridCell);
        }
    }

    gridContainer.style.gridTemplateColumns = gridCellWidth.repeat(gridWidth);
    gridContainer.style.gridTemplateRows = gridCellWidth.repeat(gridWidth);
}

function deleteGrid() {
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

//get darker or lighter version of a color 
function shadeColor(color, percent) {
    if (color.toLowerCase().indexOf('rgb') > -1) {
        var R = parseInt(color.substring(4).split(',')[0]);
        var G = parseInt(color.split(',')[1]);
        var B = parseInt(color.split(',')[2])
    } else {
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        if (R == 0) R = 32;
        if (G == 0) G = 32;
        if (B == 0) B = 32;
    }

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

//color selected cell with selected color
function colorCell(gridCell, drawingColor) {
    if (rainbowOn) {
        drawRainbow();
        gridCell.style.backgroundColor = drawingColor;
    } else if (darkenOn) {
        gridCell.style.backgroundColor = shadeColor(gridCell.style.backgroundColor, -10);
    } else if (lightenOn) {
        gridCell.style.backgroundColor = shadeColor(gridCell.style.backgroundColor, 10);
    } else gridCell.style.backgroundColor = drawingColor;
}

//color every cell with the selected background color
function clearGrid() {
    gridCells = gridContainer.querySelectorAll('div');

    gridCells.forEach(gridCell => {
        gridCell.style.backgroundColor = backgroundColor;
    });

}

//randomly select a color of the rainbow
function drawRainbow() {
    let randomNum = Math.floor(Math.random() * 6);
    switch (randomNum) {
        case (0):
            drawingColor = "#FF0000"; //red
            break;
        case (1):
            drawingColor = "#FFA500"; //orange
            break;
        case (2):
            drawingColor = "#FFFF00"; //yellow
            break;
        case (3):
            drawingColor = "#00FF00"; //green
            break;
        case (4):
            drawingColor = "#0000FF"; //blue
            break;
        case (5):
            drawingColor = "#4B0082"; //indigo
            break;
        case (6):
            drawingColor = "#FF00FF"; //violet
            break;
        default:
            drawingColor = "#FF0000"; //red
            break;
    }
}



//listening for actions on the grid
function listen() {
    gridCells = gridContainer.querySelectorAll('div');

    gridCells.forEach(gridCell => gridCell.addEventListener('mousedown', () => {
        colorCell(gridCell, drawingColor);
    }));

    gridCells.forEach(gridCell => gridCell.addEventListener('mouseenter', () => {
        if (mouseDown) colorCell(gridCell, drawingColor);
    }));
}


//menu actions
const penColorPicker = document.querySelector("#pen-color");
const backgroundColorPicker = document.querySelector("#background-color");
const eraserBtn = document.querySelector("#eraser");
const rainbowBtn = document.querySelector("#rainbow");
const darkenBtn = document.querySelector("#darken");
const lightenBtn = document.querySelector("#lighten");
const gridLineBtn = document.querySelector("#grid-lines");
const clearBtn = document.querySelector("#clear");
const gridSizeSliderContainter = document.querySelector("#grid-size-slider");
const gridSizeSlider = gridSizeSliderContainter.querySelector("input");
const gridSizeText = gridSizeSliderContainter.querySelector("p");


penColorPicker.addEventListener('input', () => {
    drawingColor = penColorPicker.value;
});


backgroundColorPicker.addEventListener('input', () => {
    backgroundColor = backgroundColorPicker.value;
});

let eraserOn = false;
eraserBtn.addEventListener('click', () => {
    if (!eraserOn) {
        drawingColor = backgroundColor;
        eraserOn = true;
        eraserBtn.style.filter = "brightness(80%)";
        eraserBtn.style.fontSize = "16px";
    }
    else {
        drawingColor = penColorPicker.value;
        eraserOn = false;
        eraserBtn.style.filter = "brightness(100%)";
        eraserBtn.style.fontSize = "18px";
    }
});

let rainbowOn = false;
rainbowBtn.addEventListener('click', () => {
    if (!rainbowOn) {
        rainbowOn = true;
        rainbowBtn.style.filter = "brightness(80%)";
        rainbowBtn.style.fontSize = "16px";
    } else {
        rainbowOn = false;
        rainbowBtn.style.filter = "brightness(100%)";
        rainbowBtn.style.fontSize = "18px";
        drawingColor = penColorPicker.value;
    }
});

let darkenOn = false;
darkenBtn.addEventListener('click', () => {
    if (!darkenOn) {
        darkenOn = true;
        darkenBtn.style.filter = "brightness(80%)";
        darkenBtn.style.fontSize = "16px";
    } else {
        darkenOn = false;
        darkenBtn.style.filter = "brightness(100%)";
        darkenBtn.style.fontSize = "18px";
    }
});


let lightenOn = false;
lightenBtn.addEventListener('click', () => {
    if (!lightenOn) {
        lightenOn = true;
        lightenBtn.style.filter = "brightness(80%)";
        lightenBtn.style.fontSize = "16px";
    } else {
        lightenOn = false;
        lightenBtn.style.filter = "brightness(100%)";
        lightenBtn.style.fontSize = "18px";
    }
});

let gridOn = true;
gridLineBtn.addEventListener('click', () => {
    if (gridOn) {
        gridCells.forEach(gridCell => {
            gridCell.style.border = "0px";
        });
        gridOn = false;
    } else {
        gridCells.forEach(gridCell => {
            gridCell.style.border = "1px solid black";
        });
        gridOn = true;
    }
});

clearBtn.addEventListener('click', clearGrid);

gridSizeSlider.oninput = function() {
    gridWidth = this.value;
    gridSizeText.textContent = "Grid Size: " + gridWidth + " X " + gridWidth;
    gridCellWidth = 500 / gridWidth + "px ";
    deleteGrid();
    generateGrid(gridWidth);
    listen();
}


//generate a 16x16 grid and wait for actions
generateGrid(16);
listen();