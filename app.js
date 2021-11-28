const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000"; // 기본컬러

//컨버스 크기
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

//컨버스 기본값 (커서)
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.width)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


//btn 함수 Default 값
let painting = false;
let filling = false;


//마우스가 그림판에 내려 앉았을 때.
function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}


//커서가 컨버스 안에서만 그릴 수 있게.
function onMouseMove(event) {
  const x = event.offsetX;  
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 그림판 배경 채우기 
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 그림판 붓 사이즈 
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//btn 더블 사용
function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
    ctx.fillStyle = ctx.strokeStyle;
  }
}

//버튼을 클릭했을때 컨버스 사이즈를 측정해서 가득 채우기.
function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.width)
  } 
}

// 우클릭 금지
function handleCM(event) {
  event.preventDefault()
}

// 이미지저장 (고쳐야함. jpg 저장이 안돼!!)
function handleSaveClick() {
  const image = canvas.toDataURL("image/.png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[^.^]";
  link.click();
}


//canvas에 사용되는 event
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting );
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// 컬러 배열 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


//btn click event
if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}