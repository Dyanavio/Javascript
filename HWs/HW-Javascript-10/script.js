document.addEventListener('DOMContentLoaded', () =>
{
    const button = document.getElementById('start-button');
    if(!button) throw "Element #start-button was not found";
    button.onclick = start;

    window.field = document.getElementById('field-block');
    if(!window.field) "Element #field-block was not found";
    window.ball = document.getElementById('ball-block');
    if(!window.ball) "Element #ball-block was not found";
    //window.brick = document.getElementById('brick-block');
    //if(!window.brick) throw "Element #brick-block was not found";
    //window.ball.vx = 2;
    //window.ball.vy = -3;
    window.ball.vx = 5;
    window.ball.vy = -5;
    
});


function moveBall()
{
    //console.clear()
    let posX = Number(window.ball.offsetLeft) + Number(window.ball.vx);
    let posY = Number(window.ball.offsetTop) + Number(window.ball.vy);
    
    if(posY <= 0) 
    {
        posY = 0;
        window.ball.vy *= -1;
    }
    if(posX <= 0) 
    {
        posX = 0;
        window.ball.vx *= -1;
    }
    if(posX >= window.field.clientWidth - window.ball.offsetWidth) 
    {
        posX = window.field.clientWidth - window.ball.offsetWidth;
        window.ball.vx *= -1;
    }
    if(posY >= window.field.clientHeight - window.ball.offsetHeight) 
    {
        posY = window.field.clientHeight - window.ball.offsetHeight;
        window.ball.vy *= -1;
    }

    for(let block of window.blocks)
    {
        if(posX > block.offsetLeft + Math.abs(window.ball.vx) && posX < block.offsetLeft + block.offsetWidth - Math.abs(window.ball.vx))
        {
            if((posY >= block.offsetTop - window.ball.offsetHeight) && !(posY >= block.offsetTop + block.offsetHeight - Math.abs(window.ball.vy)))
            {
                //console.log("first if Y");   
                posY = block.offsetTop - window.ball.offsetHeight - 1;
                window.ball.vy *= -1;
            }
            if((posY <= block.offsetTop + block.offsetHeight) && !(posY <= block.offsetTop - window.ball.offsetHeight + Math.abs(window.ball.vy)))
            {
                //console.log("second if Y");       
                posY = block.offsetTop + block.offsetHeight + 1;
                window.ball.vy *= -1;
            }
        }

        if((posY > block.offsetTop - window.ball.offsetHeight - 1) && (posY < block.offsetTop + block.offsetHeight))
        {
            if((posX >= block.offsetLeft - window.ball.offsetWidth) && !(posX >= block.offsetLeft + block.offsetWidth - Math.abs(window.ball.vx)))
            {
                //console.log("first if X");       
                posX = block.offsetLeft - window.ball.offsetWidth - 1;
                window.ball.vx *= -1;
            }
            if((posX <= block.offsetLeft + block.offsetWidth) && !(posX <= block.offsetLeft - window.ball.offsetWidth + Math.abs(window.ball.vx)))
            {
                //console.log("second if X");
                posX = block.offsetLeft + block.offsetWidth + 1;
                window.ball.vx *= -1;
            }
        }
    }

    //if(posX > window.brick.offsetLeft && posX < window.brick.offsetLeft + window.brick.offsetWidth)
    //{
    //    if((posY >= window.brick.offsetTop - window.ball.offsetHeight) && !(posY >= window.brick.offsetTop + window.brick.offsetHeight - Math.abs(window.ball.vy)))
    //    {
    //        //console.log("first if Y");   
    //        posY = window.brick.offsetTop - window.ball.offsetHeight - 1;
    //        window.ball.vy *= -1;
    //    }
    //    if((posY <= window.brick.offsetTop + window.brick.offsetHeight) && !(posY <= window.brick.offsetTop - window.ball.offsetHeight + Math.abs(window.ball.vy)))
    //    {
    //        //console.log("second if Y");       
    //        posY = window.brick.offsetTop + window.brick.offsetHeight + 1;
    //        window.ball.vy *= -1;
    //    }
    //}
    //    
    //if((posY > window.brick.offsetTop - window.ball.offsetHeight - 1) && (posY < window.brick.offsetTop + window.brick.offsetHeight))
    //{
    //    if((posX >= window.brick.offsetLeft - window.ball.offsetWidth) && !(posX >= window.brick.offsetLeft + window.brick.offsetWidth - Math.abs(window.ball.vx)))
    //    {
    //        //console.log("first if X");       
    //        posX = window.brick.offsetLeft - window.ball.offsetWidth - 1;
    //        window.ball.vx *= -1;
    //    }
    //    if((posX <= window.brick.offsetLeft + window.brick.offsetWidth) && !(posX <= window.brick.offsetLeft - window.ball.offsetWidth + Math.abs(window.ball.vx)))
    //    {
    //        //console.log("second if X");
    //        posX = window.brick.offsetLeft + window.brick.offsetWidth + 1;
    //        window.ball.vx *= -1;
    //    }
    //}

    window.ball.style.left = posX + 'px';
    window.ball.style.top = posY + 'px';

    setTimeout(moveBall, 16);
}

function start()
{
    //console.log(window.field.clientWidth, window.field.offsetWidth);
    //console.log(window.field.clientHeight, window.field.offsetHeight);
    //console.log(window.ball.offsetLeft, window.ball.offsetTop);
    //console.log(window.ball.offsetWidth, window.ball.offsetHeight);
    //console.log("Brick location: ", window.brick.offsetLeft, window.brick.offsetTop)
    //console.log("Brick size: ", window.brick.offsetWidth, window.brick.offsetHeight)
    //console.log("Left brick:", window.brick.offsetLeft - window.ball.offsetWidth);
    //console.log("Right brick: ", window.brick.offsetLeft + window.brick.offsetWidth + window.ball.offsetWidth);

    const input = document.getElementById('block-number');
    if(!input) throw "Element #block-number was not found";
    constructBlocks(input.value);

    moveBall();
}

function constructBlocks(n)
{   
    window.blocks = [];
    var blockWidth;
    if(n > 5) blockWidth = window.field.offsetWidth / (2 * 5 + 1);
    else blockWidth = window.field.offsetWidth / (2 * n + 1);
    var blockHeight = window.field.offsetHeight / 5;

    window.field.innerHTML = '';
    window.blocks = [];

    for(let i = 1; i <= n; i++)
    {
        const block = document.createElement('div');
        block.classList.add('brick-block');
        block.style.width = blockWidth + 'px';
        block.style.height = blockWidth + 'px';
        if(i <= 5)
        {
            block.style.left = (2 * i - 1) * blockWidth + 'px';
            block.style.top = (2 * 1 - 1) * blockHeight + 'px';
        }
        else
        {
            block.style.left = (2 * (i - 5) - 1) * blockWidth + 'px';
            block.style.top = (2 * 2 - 1) * blockHeight + 'px';
        }
        window.field.appendChild(block);
        window.blocks.push(block);
    }
    window.field.appendChild(window.ball);
        
}
