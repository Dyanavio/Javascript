document.addEventListener('DOMContentLoaded', () =>
{
    const appendTaskButton = document.getElementById('append-task-button');
    if(!appendTaskButton) throw "Elements #append-task-button was not found";
    appendTaskButton.addEventListener('click', appendTaskClick);

    const printTaskButton = document.getElementById('print-button');
    if(!printTaskButton) throw "Elements #print-button was not found";
    printTaskButton.addEventListener('click', printTaskClick);

    
    for(let button of document.querySelectorAll("[data-action = 'insert']"))
    {
        //button.addEventListener('click', insertButtonClick);
        button.onclick = insertButtonClick;
    }
    for(let button of document.querySelectorAll("[data-action = 'delete']"))
    {
        button.onclick = deleteButtonClick;
    }
    for(let button of document.querySelectorAll("[data-action = 'move-up']"))
    {
        button.onclick = moveUp;
    }
    for(let button of document.querySelectorAll("[data-action = 'move-down']"))
    {
        button.onclick = moveDown;
    }
    for(let button of document.querySelectorAll("[data-action ='edit']"))
    {
        button.onclick = edit;
    }

    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "Elements #todo-list was not found";
    window.todoList = todoList;
});


function moveUp(e)
{
    const li = e.target.closest('li'); // get the li of the button
    if(li == window.todoList.firstElementChild)
    {
        alert("Cannot move any further");
        return false;
    }
    const previous = li.previousElementSibling; // get the sibling element
    //console.log(previous);
    window.todoList.removeChild(li);
    //console.log(window.todoList);
    window.todoList.insertBefore(li, previous);
    updateClickListeners();
}

function moveDown(e)
{
    const li = e.target.closest('li'); 
    if(li == window.todoList.lastElementChild )
    {
        alert("Cannot move downward");
        return false;
    }
    const next = li.nextElementSibling; 
    //console.log(previous);
    window.todoList.removeChild(li);
    //console.log(window.todoList);
    next.after(li);
    updateClickListeners();
}

function deleteButtonClick(e)
{
    const li = e.target.closest('li');
    window.todoList.removeChild(li);
}

function updateClickListeners()
{
    for(let button of document.querySelectorAll("[data-action ='insert']"))
    {
        button.onclick = insertButtonClick;
    }
    for(let button of document.querySelectorAll("[data-action ='move-up']"))
    {
        button.onclick = moveUp;
    }
    for(let button of document.querySelectorAll("[data-action ='move-down']"))
    {
        button.onclick = moveDown;
    }
    for(let button of document.querySelectorAll("[data-action ='edit']"))
    {
        button.onclick = edit;
    }
    for(let button of document.querySelectorAll("[data-action ='delete']"))
    {
        button.onclick = deleteButtonClick;
    }
}

function edit(e)
{
    const li = e.target.closest('li');
    li.firstElementChild.innerText = prompt('Enter new description:');
}

function insertButtonClick(e)
{   
    // Cloning the element instead of creating an element anew
    const li = e.target.closest('li'); // example of li where the click occured
    const sample = document.getElementById("sample-task");
    if(!sample) throw "Element #sample-task was not found";

    const task = sample.cloneNode(true); // true for deep copying
    // Changing the text
    //task.innerText = "New task"; // but this erases the inner structure
    task.firstElementChild.innerText = prompt("Enter the description");

    for(let child of task.children)
    {
        child.style='';
    }

    //console.log(li);
    //console.log(todoList);
    window.todoList.insertBefore(task, li);
    updateClickListeners();
}

function printTaskClick()
{
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "Elements #todo-list was not found";

    // Iterating over all child elements of ul and taking text from that
    var txt = "";
    for(let li of todoList.children)
    {
        txt += li.innerText + '\r\n';
    }

    const sheet = document.getElementById('list');
    document.body.firstElementChild.removeChild(sheet);
    //sheet.style.border = '1 px solid black';
    //sheet.style.background = 'gray';
    //sheet.style["border-radius"] = '10px';
    //sheet.style.margin = '10px';
    //sheet.style.padding = '10px';
    //sheet.style["box-shadow"] = '5px 5px 3px black';
    sheet.style.display = "block";
    sheet.innerText = txt;
    document.body.firstElementChild.appendChild(sheet);

    //console.log(txt);
}

function appendTaskClick()
{
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "Elements #todo-list was not found";

    const sample = document.getElementById("sample-task");
    if(!sample) throw "Element #sample-task was not found";

    const task = sample.cloneNode(true);

    task.firstElementChild.innerText = prompt("Enter task description:");

    for(let child of task.children)
    {
        child.style = '';
    }
    // Creating an element as an object.
    //const task = document.createElement('li');
    // Forming the element
    //task.innerText = prompt("Enter the description: ");
    // Adding it to DOM
    todoList.appendChild(task);
    updateClickListeners();
}