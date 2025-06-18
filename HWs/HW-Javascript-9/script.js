document.addEventListener('DOMContentLoaded', () =>
{
    const date = new Date();
    window.api = `https://www.icalendar37.net/lunar/api/?year=${date.getFullYear()}&month=${date.getMonth() + 1}&shadeColor=gray&size=150&texturize=true&`;
    window.currentDay = date.getDate();
    window.currentMonth = date.getMonth() + 1;
    window.currentYear = date.getFullYear();

    const searchButton = document.getElementById('search-button');
    if(!searchButton) throw "Element #search-button was not found";
    searchButton.addEventListener('click', showPhases);

    const arrowLeft = document.getElementById('arrow-left');
    if(!arrowLeft) throw "Element #arrow-left was not found";
    arrowLeft.addEventListener('click', toLeft);

    const arrowRight = document.getElementById('arrow-right');
    if(!arrowRight) throw "Element #arrow-right was not found";
    arrowRight.addEventListener('click', toRight);

    const today = document.getElementById('moon-phase-today');
    const yesterday = document.getElementById('moon-phase-yesterday');
    const tomorrow = document.getElementById('moon-phase-tomorrow');
    if(!today || !yesterday || !tomorrow) throw "Element for display were not found";
    window.today = today;
    window.yesterday = yesterday;
    window.tomorrow = tomorrow;
});

async function searchMoonPhases()
{
    let currentResponse = "";
    let nextResponse = "";
    let previousResponse = "";

    

    const selected = document.getElementById('date-picker');
    if(!selected) throw "Element #date-picker was not found";
    const date = new Date(selected.value);

    if(selected.value)
    {
        window.currentYear =  date.getFullYear();
        window.currentMonth = date.getMonth() + 1;
        window.currentDay =   date.getDate();
    }
    selected.value = "";

    currentResponse = await fetch(`https://www.icalendar37.net/lunar/api/?year=${window.currentYear}&month=${window.currentMonth}&shadeColor=gray&size=150&texturize=true&`);

    if(currentMonth == 12) nextResponse = await fetch(`https://www.icalendar37.net/lunar/api/?year=${window.currentYear + 1}&month=${1}&shadeColor=gray&size=150&texturize=true&`);
    else nextResponse = await fetch(`https://www.icalendar37.net/lunar/api/?year=${window.currentYear}&month=${window.currentMonth + 1}&shadeColor=gray&size=150&texturize=true&`);
    
    if(currentMonth == 1) previousResponse = await fetch(`https://www.icalendar37.net/lunar/api/?year=${window.currentYear - 1}&month=${12}&shadeColor=gray&size=150&texturize=true&`);
    else previousResponse = await fetch(`https://www.icalendar37.net/lunar/api/?year=${window.currentYear}&month=${window.currentMonth - 1}&shadeColor=gray&size=150&texturize=true&`);

    return {
        "previous" : await previousResponse.json(),
        "current" : await currentResponse.json(),
        "next" :  await nextResponse.json()
    }
}

async function showPhases()
{
    var data = await searchMoonPhases();
    window.current = data["current"];
    window.next = data["next"];
    window.previous = data["previous"];

    const arrowLeft = document.getElementById('arrow-left');
    const arrowRight = document.getElementById('arrow-right');
    arrowLeft.style.display = "";
    arrowRight.style.display = "";  


    var date = new Date();

    var data = `<div class="center"><b>Today ${currentDay} ${window.current["monthName"]} ${window.current.year}</b></div><br/><div class="center">${window.current.phase[currentDay].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
    window.today.innerHTML = data;
    window.today.style.display = "";

    if(currentDay == 1)
    {
        data = `<div class="center"><b>Yesterday ${window.previous["daysMonth"]} ${window.previous["monthName"]} ${window.previous.year}</b></div><br/><div class="center">${window.previous.phase[window.previous["daysMonth"]].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
        window.yesterday.innerHTML = data;
        window.yesterday.style.display = "";
        data = `<div class="center"><b>Tomorrow ${currentDay + 1} ${window.current["monthName"]} ${window.current.year}</b></div><br/><div class="center">${window.current.phase[currentDay + 1].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
        window.tomorrow.innerHTML = data;
        window.tomorrow.style.display = "";
        
    }
    else
    {
        if(currentDay == window.current["daysMonth"])
        {
            data = `<div class="center"><b>Yesterday ${currentDay - 1} ${window.current["monthName"]} ${window.current.year}</b></div><br/><div class="center">${window.current.phase[currentDay - 1].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
            window.yesterday.innerHTML = data;
            window.yesterday.style.display = "";
            data = `<div class="center"><b>Tomorrow ${1} ${window.next["monthName"]} ${window.next.year}</b></div><br/><div class="center">${window.next.phase[1].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
            window.tomorrow.innerHTML = data;
            window.tomorrow.style.display = "";
        }
        else
        {
            data = `<div class="center"><b>Tomorrow ${currentDay + 1} ${window.current["monthName"]} ${window.current.year}</b></div><br/><div class="center">${window.current.phase[currentDay + 1].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
            window.tomorrow.innerHTML = data;
            window.tomorrow.style.display = "";
            data = `<div class="center"><b>Yesterday ${currentDay - 1} ${window.current["monthName"]} ${window.current.year}</b></div><br/><div class="center">${window.current.phase[currentDay - 1].svg}</div><br/><div class="center"><button class="btn btn-secondary">Details</button></div>`;
            window.yesterday.innerHTML = data;
            window.yesterday.style.display = "";
        }
    }
    setButtons();
}

function setButtons()
{
    const phases = document.getElementById('phases');
    for(let child of phases.children)
    {
        child.children[4].children[0].onclick = displayDetails;
    }
}

function displayDetails(e)
{
    const details = document.getElementById('details');
    if(!details) throw "Element #details could not be found";
    details.style.display = "";
    var source;
    var day = window.currentDay;
    var month = window.currentMonth;
    var year = window.currentYear;
    source = window.current;
    //console.log(e.target.parentElement.parentElement.id);
    switch(e.target.parentElement.parentElement.id)
    {
        case "moon-phase-yesterday":

            day--;
            if(day < 1)
            {
                month--;
                source = window.previous;
                if(month < 1)
                {
                    month = 12;
                    year--;
                }
                day = source["daysMonth"];
            }
            break;
        case "moon-phase-tomorrow":
            day++;
            if(day > source["daysMonth"])
            {
                day = 1;
                month++;
                source = window.next;
                if(month > 12)
                {
                    window.currentYear++;
                    window.currentMonth = 1;
                }
            }
            break;
    }
    console.log(source);
    //details.innerHTML = `<br/>${source.phase[new Date().getDate()].phaseName}<br/>Lightning: ${source.phase[new Date().getDate()].lighting};<br/>Distance: ${source.phase[new Date().getDate()].dis}`;
    details.innerHTML = `<div class="center" style="width: 50%; heigth: 100%">${source.phase[day].svg}</div>
                        <div style="padding: 30px; width: 50%; heigth: 100%"><h3>${day}.${month}.${year}</h3>
                            <ul>
                                <li>Phase name: ${source.phase[day].phaseName}</li>
                                <li>Lighting: ${source.phase[day].lighting}</li>

                            </ul>
                        </div>`;
}


function toLeft()
{
    window.currentDay--;
    if(window.currentDay < 1)
    {
        window.currentMonth--;
        if(window.currentMonth < 1)
        {
            window.currentMonth = 12;
            window.currentYear--;
        }
        window.currentDay = window.previous["daysMonth"];
    }
    showPhases();
}

function toRight()
{
    window.currentDay++;
    if(window.currentDay > window.current["daysMonth"])
    {
        window.currentDay = 1;
        window.currentMonth++;
        if(window.currentMonth > 12)
        {
            window.currentYear++;
            window.currentMonth = 1;
        }
    }
    showPhases();
}