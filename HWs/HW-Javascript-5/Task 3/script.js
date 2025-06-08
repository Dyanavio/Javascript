document.addEventListener('DOMContentLoaded', () =>
{
    window.book = document.getElementById("selected-book");

    const book1Button = document.getElementById("button-1");
    if(!book1Button) throw "Element #button-1 was not found";
    book1Button.onclick = selectBook;

    const book2Button = document.getElementById("button-2");
    if(!book2Button) throw "Element #button-2 was not found";
    book2Button.onclick = selectBook;

    const book3Button = document.getElementById("button-3");
    if(!book3Button) throw "Element #button-3 was not found";
    book3Button.onclick = selectBook;

    const buyButton = document.getElementById("buy-button");
    if(!buyButton) throw "Element #buy-button was not found";
    buyButton.onclick = buy;

});

function selectBook(e)
{
    const text = e.target.previousElementSibling.previousElementSibling.innerText;
    const selected = document.getElementById('selected-book');
    selected.value = text;
}

function buy()
{
    const selectedBook = document.getElementById('selected-book').value;
    const name = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const comment = document.getElementById("comment").value;
    const deliveryDate = document.getElementById("del-date").value;
    const deliveryAddress = document.getElementById("del-address").value;

    alert(`${name}, thank you for your order!\n\n${quantity > 1 ? "Books" : "Book"} ${selectedBook} will be delivered on ${deliveryDate} to ${deliveryAddress}`);
}