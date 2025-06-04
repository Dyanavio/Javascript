const field = document.querySelector('#field');

document.addEventListener('DOMContentLoaded' , () => 
{
    
    if(field)
    {
        field.onclick = hitTheBall;
    }
});

function hitTheBall(e)
{
    const ball = document.querySelector("#ball"); 
    ball.style.left = e.offsetX - ball.clientWidth / 2 + 'px';
    ball.style.top = e.offsetY - ball.clientWidth / 2 + 'px';

    if(parseInt(ball.style.left) < 0){ ball.style.left = '0px'; };
    if(parseInt(ball.style.top) < 0) { ball.style.top = '0px'; }

    if(parseInt(ball.style.left) > window.screen.width - 110){ ball.style.left = (window.screen.width - 110) + 'px'; };
    if(parseInt(ball.style.top) > window.screen.height - 260){ ball.style.top = (window.screen.height - 260) + 'px'; };

}