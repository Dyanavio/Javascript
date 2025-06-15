document.addEventListener("DOMContentLoaded", ()=>
{
    const form = document.getElementById('form');
    if(!form) throw "Element #form was not found";
    window.form = form;

    const result = document.getElementById("result-div");
    if(!result) throw "Element #result-div was not found";
    window.resultDiv = result;

    const delayButton = document.getElementById("delay-button");
    if(!delayButton) throw "Element #delay-button was not found";
    //delayButton.addEventListener('click', delay);
    delayButton.addEventListener('click', delayAlternative);
});

// ---- THEN AND CATCH ----

function pause(ms)
{
    return new Promise(
        (onResolve, onReject) =>
        {
            setTimeout(() => {
                const radio = document.querySelector('input[name="return-type"]:checked').value;
                if(radio == 'resolve') onResolve(ms);
                if(radio == 'reject') onReject(ms);
            }, ms);
        }
    );
}

function delay()
{
    const timeout = document.getElementById('time-delay').value;
    var date = new Date();
    var text = `Called at: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}<br/>`;
    
    pause(timeout)
    .then(
        (ms) => {
            var date = new Date();
            window.resultDiv.className = 'alert alert-success mt-3';
            text += `Ended with 'Success' at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            window.resultDiv.innerHTML = text;
            console.log("Success " + ms);
        }
    )
    .catch(
        (ms) => {
            var date = new Date();
            window.resultDiv.className = 'alert alert-danger mt-3';
            text += `Ended with 'Failure' at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            window.resultDiv.innerHTML = text;
            console.log("Failure " + ms);
        }
    );
}

// ---- AWAIT ----

function pauseAlternative(ms, text)
{
    return new Promise(
        (onResolve, onReject) =>
        {
            setTimeout(() => {
                const radio = document.querySelector('input[name="return-type"]:checked').value;
                var date = new Date();
                if(radio == 'resolve')
                {
                    window.resultDiv.className = 'alert alert-success mt-3';
                    text += `Ended with 'Success' at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    window.resultDiv.innerHTML = text;
                    console.log("Success " + ms);    
                    onResolve(ms);
                }
                if(radio == 'reject') 
                {
                    window.resultDiv.className = 'alert alert-danger mt-3';
                    text += `Ended with 'Failure' at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    window.resultDiv.innerHTML = text;
                    console.log("Failure " + ms);
                    onReject(ms);
                }
            }, ms);
        }
    );
}

async function delayAlternative()
{
    const timeout = document.getElementById('time-delay').value;
    var date = new Date();
    var text = `Called at: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}<br/>`;
    
    await pauseAlternative(timeout, text).catch(error => console.log(error));
}