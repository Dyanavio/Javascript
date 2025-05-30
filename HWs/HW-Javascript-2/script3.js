var text = "Once used to be a default text";
if(!text) throw "Element #styledText is not accessible";

var styles = 
[
    {
        name: "color",
        value: "lightblue"
    },
    {
        name: "margin",
        value: "10px"
    },
    {
        name: "font-size",
        value: "24px"
    },
    {
        name: "background-color",
        value: "black"
    }
]

style(text, styles);


function style(text, styles)
{
    var data = '<p style="';
    for(let style of styles)
    {
        data += `${style["name"]}: ${style["value"]}; `;
    }
    data += `">${text}</p>`;
    console.log(data);
    document.write(data);
}