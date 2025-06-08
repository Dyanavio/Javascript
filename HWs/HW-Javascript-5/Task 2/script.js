document.addEventListener('DOMContentLoaded', () =>
{
    const button = document.getElementById("submit");
    if(!button) throw "Element #submit was not found";

    button.onclick = renderText;

});

function renderText()
{
    
    const text = document.getElementsByName("text")[0].value;
    const result = document.getElementById("result");
    const resultDiv = document.getElementById("result-div");

    result.style = null;
    resultDiv.style = null;

    const bold = document.getElementById("bold");
    const underline = document.getElementById("underline");
    const italics = document.getElementById("italics");   

    const positions = document.getElementsByName("positioning");

    for(let i = 0; i < positions.length; i++)
    {
        if(positions[i].checked)
        {
            console.log(positions[i].value);
            resultDiv.style.textAlign = positions[i].value;
            break;
        }
    }

    if(bold.checked) result.style.fontWeight = "bold";
    if(underline.checked) result.style["text-decoration"] = "underline";
    if(italics.checked) result.style.fontStyle = "italic";

    result.style.wordBreak = "break-all";

    result.innerText = text;

    


}

