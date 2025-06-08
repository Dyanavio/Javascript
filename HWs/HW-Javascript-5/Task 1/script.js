document.addEventListener('submit', (e) =>
{
    e.preventDefault();
    for(let i = 1; i <= window.totalQuestions; i++)
    {
        const radios = document.getElementsByName(`question${i}`);
        for(let j = 0; j < radios.length; j++ ) 
        {
            if(radios[j].checked && radios[j].value == "correct") window.correctAnswers++;
        }
    }
    //alert("Correct " + window.correctAnswers);
    const result = document.getElementById("result");
    var style = "alert alert-danger";
    if(window.correctAnswers == window.totalQuestions) style = "alert alert-success";
    result.className = style;
    
    result.innerText = `${window.correctAnswers} correct answers out of ${window.totalQuestions}`;
    window.correctAnswers = 0;

});

document.addEventListener('DOMContentLoaded', () =>
{
    window.totalQuestions = 2;
    window.correctAnswers = 0;
})