window.mainBlock = document.getElementById('main-block');
window.selectedDate = new Date();

window.addEventListener('hashchange', () => {
    selectPage();
});

document.addEventListener("DOMContentLoaded", () =>
{
    selectPage();
});
  
function selectPage()
{
    const route = window.location.hash.split('/');
    switch(route[0])
    {
        case '':
        case '#home':
            homePage();
            break;
        case '#rate':
            ratePage(route[1]);
            break;
        default:
            pageNotFound();
            break;
    }
}

function m(val)
{
    return val < 10 ? `0${val}` : val;
}

function ratePage(cc)
{
    if(typeof cc == 'undefined')
    {
        cc = 'GBP';
    }
    const date1 = new Date();
    const date2 = new Date(date1.getTime() - 604800000) // 604800000 - 7 days converted to milliseconds
    const d1 = `${date1.getFullYear()}${m(date1.getMonth() + 1)}${m(date1.getDate())}`;
    const d2 = `${date2.getFullYear()}${m(date2.getMonth() + 1)}${m(date2.getDate())}`;
    //console.log(d1, d2);
    //let url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${d2}&end=${d1}&valcode=${cc.toLowerCase()}&sort=exchangedate&order=desc&json`;
    let url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20200302&json`;
    
    fetch(url)
    .then(response => response.json())
    .then(json => 
    {
        console.log(json);
        let html = JSON.stringify(json);
        //for(let r of json)
        //{
        //    html += `<p>exchangedate: ${r.exchangedate}, rate: ${r.rate}</p>`;
        //}
        window.mainBlock.innerHTML = html;
    });
    
    
}

function pageNotFound()
{
    dwindow.mainBlock.innerHTML = "Not found";
}

function homePage()
{
    //https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json
    //https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20200302&json
    const date = `${window.selectedDate.getFullYear()}${m(window.selectedDate.getMonth() + 1)}${m(window.selectedDate.getDate())}`;
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`)
    .then(response => response.json())
    .then(json => 
    {
        let table = `<div class='form-group'><label for='rate-date'>Date:</label><input value='${window.selectedDate.getFullYear()}-${m(window.selectedDate.getMonth() + 1)}-${m(window.selectedDate.getDate())}' style='width: 10vw' type='date' id='rate-date' class='form-control mb-3'/></div><h2>Currency rates for ${window.selectedDate.getDate()}.${m(window.selectedDate.getMonth() + 1)}.${m(window.selectedDate.getFullYear())}</h2><table class='table table-light table-striped table-bordered'><thead class='table-dark'><tr><th>Code</th><th>Name</th><th>Rate(₴)</th></tr></thead><tbody>`;
        for(let rate of json)
        {
            table += `<tr data-cc="${rate.cc}"><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td></tr>`;
        }
        table += "</tbody></table>";
        window.mainBlock.innerHTML = table;
        for(let element of window.mainBlock.querySelectorAll('[data-cc]'))
        {
            element.onclick = rateClick;
        }
        window.mainBlock.querySelector('#rate-date').onchange = rateDateChange;
        window.mainBlock.querySelector('#rate-date').Date = window.selectedDate;
    });
}

function rateDateChange(e)
{
    window.selectedDate = new Date(e.target.value);
    homePage();
}

function rateClick(e)
{
    const cc = e.target.closest('[data-cc]').getAttribute('data-cc');
    console.log(cc);
    window.location.hash = '#rate/' + cc;
    
}