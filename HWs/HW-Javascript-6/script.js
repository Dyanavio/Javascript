document.addEventListener('DOMContentLoaded', () =>
{
    for(let control of document.querySelectorAll("form .form-control"))
    {
        control.onkeypress = inputKeyPressed;
        control.onchange = inputKeyPressed;
    }
    window.colorCollection = 
    [
        { "name": "Yellowgreen", "type": "RGB", "code": "154, 205, 50" },
        { "name": "Darkcyan", "type": "RGBA", "code": "0, 139, 139, 1" },
        { "name": "Orangered", "type": "HEX", "code": "#FF4500" }
    ];
    displayColors();
});

document.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const data = validateForm(e.target);

    if(!data) return;

    window.colorCollection.push(data);
    displayColors();
    e.target.reset();


});

function displayColors()
{
    const grid = document.getElementById("wrapper");
    if(!grid) throw "Element #grid was not found";
    grid.innerHTML = "";

    for(let color of window.colorCollection)
    {
        const item = document.createElement('div');
        item.classList.add('cell');
        switch(color.type)
        {
            case "RGB":
                item.style.backgroundColor = `rgb(${color.code})`; 
                break;
            case "RGBA":
                item.style.backgroundColor = `rgba(${color.code})`;
                break;
            case "HEX":
                item.style.backgroundColor = color.code;
                break;
        }
        
        item.innerHTML = `<div class="inner-cell"><p>${color.name}<br>${color.type}<br>${color.code}</p></div>`;
        grid.appendChild(item);
    }
}

function validateForm(form)
{
    const nameInput = form.querySelector("[name='color-name']");
    const name = nameInput.value;
    if(!name)
    {
        setInvalid(nameInput, "Color name is required");
        return false;
    }
    const namePattern = /^[a-zA-Z]+$/;
    if(!namePattern.test(name))
    {
        setInvalid(nameInput, "Invalid color name. Only one word and letters");
        return false;
    }
    for(let color of window.colorCollection)
    {
        if(color.name == name)
        {
            setInvalid(nameInput, "Color name is already is use");
            return false;
        }
    }

    const typeInput = form.querySelector("[name='color-type']");
    const type = typeInput.value;

    const codeInput = form.querySelector("[name='code']");
    const code = codeInput.value;
    var codePattern = /^$/;
    switch(type)
    {
        case "RGB":
            codePattern = /^(25[0-5]|1[0-9][0-9]|[1-9]?[0-9])(,)(\s?)(25[0-5]|1[0-9][0-9]|[1-9]?[0-9])(,)(\s?)(25[0-5]|1[0-9][0-9]|[1-9]?[0-9])$/;
            break;
        case "RGBA":
            codePattern = /^(25[0-5]|1[01][0-9]|[1-9]?[0-9])(,)(\s?)(25[0-5]|1[01][0-9]|[1-9]?[0-9])(,)(\s?)(25[0-5]|1[01][0-9]|[1-9]?[0-9])(,)(\s?)(([0]|[0](\.)[0-9])|1)$/;
            break;
        case "HEX":
            codePattern = /^#[0-9a-zA-Z]{6}$/;
            break;
    }
    if(!codePattern.test(code))
    {
        setInvalid(codeInput, "Invalid code for declared type");
        return false;
    }

    return { "name": name, "type": type, "code": code };

}

function setInvalid(input, message)
{
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.parentNode.querySelector(".invalid-feedback").innerText = message;
}

function inputKeyPressed(e)
{
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
}