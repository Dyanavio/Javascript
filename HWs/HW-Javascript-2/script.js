const _console1 = document.getElementById("console1");
const _console2 = document.getElementById("console2");
const _console3 = document.getElementById("console3");
if(!_console1) throw "Element #console1 is not accessible";
if(!_console2) throw "Element #console2 is not accessible";
if(!_console3) throw "Element #console3 is not accessible";

var items = 
[
    {
        name: "Glasses",
        quantity: 1,
        bought: true
    },
    {
        name: "Bonsai",
        quantity: 10,
        bought: false
    },
    {
        name: "Book",
        quantity: 1,
        bought: true
    },
    {
        name: "Apples",
        quantity: 25,
        bought: false
    }
];

outputByPurchase(items);
// For new item
_console2.innerHTML += "----- FOR NEW ITEM -----<br/>";
output(items, _console2);
addToList(items);
// For already existing item
_console2.innerHTML += "----- FOR ALREADY EXISTING ITEM -----<br/>";;
addToList(items);
output(items, _console2);

buy("Apples", items, _console3);
output(items, _console3);


function outputByPurchase(items)
{
    var data = "";
    for(let item of items)
    {
        if(!item["bought"])
        {
            for(let field in item)
            {
                data += `${field}: ${item[field]}<br/>`;
            }
            data += "--------<br/>";
        }
    } 
    for(let item of items)
    {
        if(item["bought"])
        {
            for(let field in item)
            {
                data += `${field}: ${item[field]}<br/>`;
            }
            data += "--------<br/>";
        }
        
    }
    _console1.innerHTML += data;
}

function addToList(items)
{
    var name = prompt("Enter item name: ");
    var quantity = prompt("Enter quantity: ");
    var bought = prompt("Is item already bought?");

    var isPresent = false;

    if(isNaN(quantity)) quantity = 0;
    for(let item of items)
    {
        if(item["name"] == name)
        {
            item["quantity"] = Number(item["quantity"]) +  Number(quantity);
            item["bought"] = bought && item["bought"];
            isPresent = true;
            break;
        }
    }
    if(!isPresent)
    {
        items.push
        (
            {
                name: name,
                quantity: quantity,
                bought: bought
            }
        )
    }
}

function buy(name, items)
{
    for(let item of items)
    {
        if(item["name"] == name) item["bought"] = true;
    }
}

// Simple output
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