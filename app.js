const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//Pixel Modifier
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";

let painting = false;
let filling = false;

//Stop Painting function
function stopPainting() {
    painting = false
}

//Start Painting function
function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    //console.log(event);

    //Get the OffSet from the user
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x, y);

    if(!painting) {
        //console.log("Creating path in: ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //console.log("Creating line in: ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    //console.log(event);
    painting = true;
}

//Change color function
function handleColorClick(event) {
    //console.log(event.target.style);

    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//Handle range chang function
function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size; 
}

//Handle the mode function
function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

//Hnadling the Canvas click
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

//Prevent user frm saving the image with right click
function handleContextMenu(event) {
    //console.log(event);
    event.preventDefault();
}

//Hadling the saving function 
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    //console.log(link);
    link.click();
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}