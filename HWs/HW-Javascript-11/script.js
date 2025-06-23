document.addEventListener('DOMContentLoaded', () =>
{
    window.elements = [];
    window.rights = [];
    window.lefts = [];

    window.field = document.getElementById('dnd-field');
    window.maxInRow = Math.floor(window.field.offsetWidth / (20)) - 2;
    window.level = 1;
    window.increment = window.field.children.length - 2;

    const addButton = document.getElementById('add-button');
    if(!addButton) throw "Element #add-button was not found";
    addButton.onclick = addElement;

    const finalizeButton = document.getElementById('finalize-button');
    if(!finalizeButton) throw "Element #finalize-button was not found";
    finalizeButton.onclick = finalizeAnswers;
    //let posX = 30;
    //for(let element of document.getElementsByClassName('dnd-item'))
    //{
    //    element.onmousedown = onMouseDown;
    //    element.style.left = posX + 'px';
    //    posX += element.offsetWidth + 10;
    //}
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    window.canDrag = false;

});

function addElement()
{
    const symbol = document.getElementById('input-symbol').value;
    const color = document.getElementById('input-color').value;
    if(!symbol || !color) return;

    const ball = document.createElement('div');
    ball.className = 'dnd-item';
    ball.name = `item-${window.elements.length + 1}`;
    ball.innerText = symbol;
    ball.style["backgroundColor"] = color;
    ball.onmousedown = onMouseDown;

    window.field.appendChild(ball);

    // Positioning inside dnd-field
    ball.style.top = (10 + ball.offsetHeight * Math.floor(((window.field.children.length - 2) / window.maxInRow))) + 'px';
    if(!(Math.floor(((window.field.children.length - 2) / window.maxInRow)) < level))
    {
        window.increment = 0;
        window.level++;
    }
    ball.style.left = 10 + (ball.offsetWidth * (window.increment) / 2) + 'px';
    window.increment++;

    window.elements.push({
        "symbol": symbol,
        "color": color,
        "name": `item-${window.elements.length + 1}`
    });
    //console.log(window.elements);
}

function finalizeAnswers()
{
    const alert = document.getElementById("alert");
    alert.style.display = '';
    var text = "Left block: ";
    for(let element of window.lefts)
    {
        text += `${element.name}[${element.symbol}]  `;
    }
    text += "\nRight block: ";
    for(let element of window.rights)
    {
        text += `${element.name}[${element.symbol}]  `;
    }
    alert.innerText = text;
}

function recalculate()
{
    const leftBlock = document.getElementById('left-block');
    const rightBlock = document.getElementById('right-block');

    window.lefts = [];
    window.rights = [];
    var maxBlockNumber = Math.floor(leftBlock.offsetWidth / 20) - 1;
    var levelRight = 1;
    var levelLeft = 1;
    var incremenetRight = 0;
    var incremenetLeft = 0;

    for(let child of leftBlock.children)
    {
        window.lefts.push(window.elements.find((element) => element.name == child.name))
    }
    for(let child of rightBlock.children)
    {
        window.rights.push(window.elements.find((element) => element.name == child.name))
    }
    leftBlock.innerHTML = '';
    rightBlock.innerHTML = '';
    for(let element of window.lefts)
    {
        let ball = document.createElement('div');
        ball.className = 'dnd-item';
        ball.name = element.name;
        ball.innerText = element.symbol;
        ball.style["backgroundColor"] = element.color;

        leftBlock.appendChild(ball);

        ball.style.top = 20 + ball.offsetHeight * Math.floor(leftBlock.children.length / maxBlockNumber) + 'px';
        if(Math.floor(leftBlock.children.length / maxBlockNumber) == levelLeft)
        {
            levelLeft++;
            incremenetLeft = 0;
        }
        ball.style.left = 20 + incremenetLeft * ball.offsetWidth / 2 + 'px';
        incremenetLeft++;
        
        ball.onmousedown = onMouseDown;
    }
    for(let element of window.rights)
    {
        let ball = document.createElement('div');
        ball.className = 'dnd-item';
        ball.name = element.name;
        ball.innerText = element.symbol;
        ball.style["backgroundColor"] = element.color;

        rightBlock.appendChild(ball); 

        ball.style.top = 20 + ball.offsetHeight * Math.floor(rightBlock.children.length / maxBlockNumber) + 'px';
        if(Math.floor(rightBlock.children.length / maxBlockNumber) == levelRight)
        {
            levelRight++;
            incremenetRight = 0;
        }
        ball.style.left = 20 + incremenetRight * ball.offsetWidth / 2 + 'px';
        incremenetRight++;
        
        ball.onmousedown = onMouseDown;
    }


    //console.log("Left block: ", window.lefts);
    //console.log("Right block: ", window.rights);
}

function onMouseDown(e)
{
    e.preventDefault();
    const dndField = document.getElementById('dnd-field');
    if(!dndField) throw "Element #dnd-item was not found";
    window.dndField = dndField;
    const rect = e.target.getBoundingClientRect();

    window.dndDeltaX = e.pageX - rect.x; 
    window.dndDeltaY = e.pageY - rect.y; 
    window.canDrag = true;
    window.draggableItem = e.target;
    
}
function onMouseMove(e)
{
    if(window.canDrag)
    {
        e.preventDefault();
        if(!window.draggablePhantom)
        {
            window.draggablePhantom = window.draggableItem.cloneNode(true);
            window.draggablePhantom.style.opacity = 0.7;
            window.draggablePhantom.id = '';
            window.dndField.appendChild(window.draggablePhantom);
        }
        window.draggablePhantom.style.left = e.pageX - window.dndField.offsetLeft - window.dndDeltaX + 'px'
        window.draggablePhantom.style.top = e.pageY - window.dndField.offsetTop - window.dndDeltaY + 'px'
    }
}
function onMouseUp(e)
{
    if(window.canDrag)
    {
        let rect = document.getElementById('left-block').getBoundingClientRect();
        if(rect.x < e.pageX && e.pageX < rect.x + rect.width && rect.y < e.pageY && e.pageY < rect.y + rect.height)
        {
            let leftBlock = document.getElementById('left-block');
            rect = leftBlock.getBoundingClientRect();
            if(rect.x < e.pageX && e.pageX < rect.x + rect.width && rect.y < e.pageY && e.pageY < rect.y + rect.height)
            {
                window.canDrag = false;
                leftBlock.appendChild(window.draggableItem);
                // Adding to array window.lefts
                //window.lefts.push(window.elements.find((element) => element.name == window.draggableItem.name));

                window.draggableItem.style.left = 20 + leftBlock.children.length * window.draggableItem.offsetWidth / 2 + 'px'
                window.draggableItem.style.top = 20 + 'px'
                
                window.dndField.removeChild(window.draggablePhantom);
                window.draggablePhantom = false;
                //window.increment--;
            }
        }
        else
        {
            let rightBlock = document.getElementById('right-block');
            rect = rightBlock.getBoundingClientRect();
            if(rect.x < e.pageX && e.pageX < rect.x + rect.width && rect.y < e.pageY && e.pageY < rect.y + rect.height)
            {
                window.canDrag = false;
                rightBlock.appendChild(window.draggableItem);
                // Adding to array window.rights
                //window.rights.push(window.elements.find((element) => element.name == window.draggableItem.name));

                window.draggableItem.style.left = 20 + rightBlock.children.length * window.draggableItem.offsetWidth / 2 + 'px'
                window.draggableItem.style.top = 20 + 'px'
                
                window.dndField.removeChild(window.draggablePhantom);
                window.draggablePhantom = false;
                //window.increment--;
            }
            else
            {
                window.canDrag = false;
                window.dndField.removeChild(window.draggablePhantom);
                window.draggablePhantom = false;
            }
        }
        if(window.field.children.length == 2) window.increment = 0;
        recalculate();
    }
    
}