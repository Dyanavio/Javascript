window.modal = null;

document.addEventListener('DOMContentLoaded', () =>
{
    const nameInput = document.querySelector('#task1Container');
    if(nameInput)
    {
        nameInput.addEventListener('keydown', nameKeyDown);
    }

    window.modal = document.querySelector('#modal');
    if(window.modal)
    {
        window.modal.onclick = modalClick;
    }
    const modalOpenButton = document.querySelector('#modal-open');
    if(modalOpenButton) modalOpenButton.onclick = modalOpenButtonClick;

    const modalCloseButton = document.querySelector('#modal-close');
    if(modalCloseButton) modalCloseButton.onclick = modalCloseButtonClick;

    const trafficButton = document.querySelector("#buttonNext");
    if(trafficButton)
    {
        trafficButton.onclick = trafficNextColor;
    }
    
});

function trafficNextColor(e)
{
    console.log("Button");
    const light1 = document.querySelector("#light-1");
    const light2 = document.querySelector("#light-2");
    const light3 = document.querySelector("#light-3");
    if(light1 && light2 && light3)
    {
        if(light1.style["background-color"] == 'red')
        {
            light1.style["background-color"] = 'lightgray';
            light2.style["background-color"] = 'gold';
            return true;
        }
        if(light2.style["background-color"] == 'gold')
        {
            light2.style["background-color"] = 'lightgray';
            light3.style["background-color"] = 'green';
            return true;
        }
        if(light3.style["background-color"] == 'green')
        {
            light3.style["background-color"] = 'lightgray';
            light1.style["background-color"] = 'red';
            return true;
        }
        else
        {
            light1.style["background-color"] = 'red';
        }
    }
}

function modalClick(e)
{
    e.stopPropagation();
}

function modalCloseButtonClick(e)
{
    window.modal.style.display = 'none';
}

function modalOpenButtonClick(e)
{
    console.log('Display' + window.modal.style.display);
    if(window.modal.style.display == 'none' || window.modal.style.display == '')
    {
        window.modal.style.display = 'block';
    }
    else
    {
        console.log('Modal window is already open');
    }
    
}

function nameKeyDown(e)
{
    // 8 - Backspace
    if((e.keyCode < 65 || e.keyCode > 90) && (e.keyCode < 97 || e.keyCode > 122) && e.keyCode != 8)
    {
        console.log('ignored', e.key);
        e.preventDefault();
        return false;
    }
}