document.addEventListener('DOMContentLoaded', () =>
{
    const canvas = document.getElementById('canvas');
    if(!canvas) throw "Element #canvas was not found";

    const canvasStyle = getComputedStyle(canvas);
    canvas.width = parseFloat(canvasStyle.width);
    canvas.height = parseFloat(canvasStyle.height);
    window.dc = canvas.getContext('2d');
    window.color = "black";
    window.begin = {"x": 0, "y": 0};
    window.end =  {"x": 0, "y": 0};
    window.checked = "square"

    const palette1 = document.getElementById('color-palette-1');
    const palette2 = document.getElementById('color-palette-2');
    if(!palette1) throw "Element #color-palette-1 was not found";
    if(!palette2) throw "Element #color-palette-2 was not found";

    for(let button of palette1.children)
    {
        button.onclick = changeColor;
    }
    for(let button of palette2.children)
    {
        button.onclick = changeColor;
    }
    //canvas.onclick = canvasClick;
    canvas.onmousedown = canvasMouseDown;
    canvas.onmouseup = canvasOnMouseUp;

    const square = document.getElementById('square');
    const circle = document.getElementById('circle');
    const rhombus = document.getElementById('rhombus');
    const rightTriangle = document.getElementById('right-triangle');

    square.onclick = checkboxUpdate;
    circle.onclick = checkboxUpdate;
    rhombus.onclick = checkboxUpdate;
    rightTriangle.onclick = checkboxUpdate;
});
function canvasMouseDown(e)
{
    window.begin = {"x": e.offsetX, "y": e.offsetY};
    //console.log(e);
}
function canvasOnMouseUp(e)
{
    window.end = {"x": e.offsetX, "y": e.offsetY};
    if(window.begin.x == window.end.x && window.begin.y == window.end.y) 
    {
        canvasClick(e);
        return;
    }

    window.dc.beginPath();
    window.dc.lineWidth = 2;
    window.dc.strokeStyle = window.color;
    window.dc.fillStyle = window.color;

    switch(window.checked)
    {
        case "square":
            //console.log(window.end.x - window.begin.x);
            window.dc.rect(window.begin.x, window.begin.y, window.end.x - window.begin.x, window.end.y - window.begin.y);
            break;
        case "circle":
            window.dc.ellipse((window.begin.x + window.end.x) / 2, (window.begin.y + window.end.y) / 2, Math.abs(window.end.x - window.begin.x), Math.abs(window.end.y - window.begin.y), 0, 0, Math.PI * 2);
            break;
        case "rhombus":
            window.dc.moveTo((window.begin.x + window.end.x) / 2, window.begin.y);
            window.dc.lineTo(window.begin.x, (window.begin.y + window.end.y) / 2);
            window.dc.lineTo((window.begin.x + window.end.x) / 2, window.end.y);
            window.dc.lineTo(window.end.x, (window.begin.y + window.end.y) / 2);
            window.dc.lineTo((window.begin.x + window.end.x) / 2, window.begin.y);
            break;
        case "right-triangle":
            window.dc.lineTo(window.begin.x, window.end.y);
            window.dc.lineTo(window.end.x, window.end.y);
            window.dc.lineTo(window.begin.x, window.begin.y);
            break;
    }
    window.dc.fill();
    window.dc.stroke();
}

function canvasClick(e)
{
    window.dc.beginPath();
    window.dc.lineWidth = 2;
    window.dc.strokeStyle = window.color;
    window.dc.fillStyle = window.color;
    
    switch(window.checked)
    {
        case "square":
            window.dc.rect(e.offsetX, e.offsetY, 50, 50);
            break;
        case "circle":
            window.dc.arc(e.offsetX, e.offsetY, 20, 0, Math.PI * 2);
            break;
        case "rhombus":
            window.dc.moveTo(e.offsetX + 40, e.offsetY);
            window.dc.lineTo(e.offsetX, e.offsetY + 40);
            window.dc.lineTo(e.offsetX + 40, e.offsetY + 2 * 40);
            window.dc.lineTo(e.offsetX + 2 * 40, e.offsetY + 1 * 40);
            window.dc.lineTo(e.offsetX + 40, e.offsetY);
            break;
        case "right-triangle":
            window.dc.lineTo(e.offsetX, e.offsetY + 50);
            window.dc.lineTo(e.offsetX + 50, e.offsetY + 50);
            window.dc.lineTo(e.offsetX, e.offsetY);
            break;
    }

    window.dc.fill();
    window.dc.stroke();
}

function changeColor(e)
{
    window.color = e.target.name;
}

function checkboxUpdate(e)
{
    window.checked = e.target.id;
}