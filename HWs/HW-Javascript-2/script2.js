const _console4 = document.getElementById("console4");
const _console5 = document.getElementById("console5");
const _console6 = document.getElementById("console6");
if(!_console4) throw "Element #console4 is not accessible";
if(!_console5) throw "Element #console5 is not accessible";
if(!_console6) throw "Element #console6 is not accessible";

var check = 
[
    {
        name: "Glasses",
        quantity: 1,
        price: 500
    },
    {
        name: "Bonsai",
        quantity: 10,
        price: 350
    },
    {
        name: "Book",
        quantity: 1,
        price: 100
    },
    {
        name: "Apples",
        quantity: 25,
        price: 90
    }
];

output(check, _console4);
_console4.innerHTML += `<br/><br/>Total sum: ${totalSum(check)}`;
maxPrice(check);
_console6.innerHTML += `Average per item: ${average(check)}`;



function totalSum(check)
{
    var sum = 0;
    for(let item of check)
    {
        sum += Number(item["price"]) * Number(item["quantity"]);
    }
    return sum;
}

function average(check)
{
    var sum = totalSum(check);
    var count = 0;
    for(let item of check)
    {
        count += Number(item["quantity"]);
    }
    if(count == 0) return NaN;
    return sum / count;
}

function maxPrice(check)
{
    var max = Number(check[0]["quantity"]) * Number(check[0]["price"]);
    var name = check[0]["name"];
    for(let item of check)
    {
        var current = Number(item["quantity"]) * Number(item["price"]);
        if(current > max)
        {
            name = item["name"];
            max = current;
        }
    }
    _console5.innerHTML += `The most expensive purchase:<br/>${name}: ${max}`;
}


function output(items, _console)
{
    var data = "";
    for(let item of items)
    {
        for(let field in item)
        {
            data += `${field}: ${item[field]}<br/>`;
        }
        data += "--------<br/>";
    }
    _console.innerHTML += data;
}