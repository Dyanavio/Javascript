window.base64 = new Base64();

document.addEventListener('DOMContentLoaded', () =>
{
    const buttonEncode = document.getElementById('button-encode');
    if(!buttonEncode) throw "Element #button-encode was not found";
    buttonEncode.addEventListener('click', buttonEncodeClick);

    const buttonDecode = document.getElementById('button-decode');
    if(!buttonDecode) throw "Element #button-decode was not found";
    buttonDecode.addEventListener('click', buttonDecodeClick);

});

function buttonEncodeClick()
{
    document.getElementById('result').value = window.base64.createCredentials(
        document.getElementById('inputUserId').value, document.getElementById('inputPassword').value
    );
}

function buttonDecodeClick()
{
    var obj = window.base64.divideCredentials(document.getElementById('result').value);
    console.log(obj);
    document.getElementById('result-decode-id').value = obj["user-id"];
    document.getElementById('result-decode-password').value = obj["password"];
    //document.getElementById('result-decode-id').value = window.base64.divideCredentials(
    //    document.getElementById('result').value
    //);
}