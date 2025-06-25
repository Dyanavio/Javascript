const authContent = `<button id="exit-button" class="btn btn-danger">Exit</button>`;
const anonContent = `<button id="authenticate-button" class="btn btn-primary">Enter</button>`;

document.addEventListener('DOMContentLoaded', () =>
{
   updateAuthBlock();
});

function updateAuthBlock()
{
    const authBlock = document.getElementById('auth-block');
    if(!authBlock) throw "Element #auth-block was not found";
    const token = window.localStorage.getItem('token');
    if(token)
    {
        const payload = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))));
        console.log(payload);
        const div = document.getElementById('alert');
        div.innerHTML += `${payload["nam"]}<br/>`;
        var issued  = new Date(payload['iat'] * 100);
        var expires = new Date(payload['exp'] * 100);
        div.innerHTML += `Issued at: ${issued.getHours()}:${issued.getMinutes()}:${issued.getSeconds()} ${issued.getDate()}.${issued.getMonth() + 1}.${issued.getFullYear()}<br/>`;
        div.innerHTML += `Expires at: ${expires.getHours()}:${expires.getMinutes()}:${expires.getSeconds()} ${expires.getDate()}.${expires.getMonth() + 1}.${expires.getFullYear()}`;
        div.style.display = '';
        authBlock.innerHTML = authContent;
        if(!window.localStorage.getItem('time') || window.localStorage.getItem('time') <= 0) window.localStorage.setItem('time', (payload['exp'] - payload['iat']) / 10);
        //startCountdown(payload['exp'] - payload['iat']);
        startCountdown();
    }
    else
    {
        const div = document.getElementById('alert');
        div.innerText = '';
        div.style.display = 'none';
        authBlock.innerHTML = anonContent;
    }
    updateListeners();
}

function startCountdown(time)
{
    const div = document.getElementById('countdown');
    const info = document.getElementById('info');
    //time /= 10;
    //window.localStorage.setItem('time', time);
    var x = setInterval(() => 
    {
        div.style.display = '';
        const token = window.localStorage.getItem('token');
        if(window.localStorage.getItem('time') == 0)
        {
            clearInterval(x);
            info.innerHTML = 'Expired';
            info.style.display = '';
            div.style.display = 'none';
            window.localStorage.removeItem('time');
            exitButtonClick();
        }
        if(!token)
        {
            clearInterval(x);
            info.innerHTML = 'You exited';
            info.style.display = '';
            div.style.display = 'none';
            window.localStorage.removeItem('time');
            exitButtonClick();
        }

        div.innerHTML = `Time left..: ${window.localStorage.getItem('time')} s`;
        var t = window.localStorage.getItem('time');
        t--;
        window.localStorage.setItem('time', t);

    }, 1000);
    
}

function updateListeners()
{
    const authButton = document.getElementById('authenticate-button');
    if(authButton)
    {
        authButton.onclick = authButtonClick;
    }
    const exitButton = document.getElementById('exit-button');
    if(exitButton)
    {
        exitButton.onclick = exitButtonClick;
    }
}

function exitButtonClick()
{
    window.localStorage.removeItem('token');
    updateAuthBlock();
}

function authButtonClick()
{
    const info = document.getElementById('info');
    info.style.display = 'none';
    authenticate()
    .then(token => {
        window.localStorage.setItem('token', token);
        updateAuthBlock();
    })
}

function authenticate()
{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6IlNvbWUgcmFuZG9tIFN0dWRlbnQifQ==.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
    return new Promise(
        (onResolve, onReject) => setTimeout(onResolve(token), 600)
    );
}