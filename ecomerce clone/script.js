// import showAllItems from "./listScript";

const container = document.getElementById('container')
const logo = document.getElementById('logo');
const allTotal = document.getElementById('allTotal')
const listSection = document.getElementById('list-container')
const cut = document.getElementById('cut')
listSection.style = 'display:none';

logo.addEventListener('click', () => {

    listSection.style = 'display:block';
    container.style = 'display:none'
    logo.innerText = '0'

})

cut.addEventListener('click', () => {
    listSection.style = 'display:none';
    container.style = 'display:block'
})


async function getData() {
    let response = await fetch('https://dummyjson.com/products')
    let result = await response.json()
    console.log(result.products);
    showData(result.products);
}
getData()

const cardContainer = document.getElementById('card-container')
let listOfAddToCart = [];
function showData(result) {
    result.forEach(elm => {
        // console.log(elm);
        let card = document.createElement('div');
        card.className = 'card'
        let imgContainer = document.createElement('div');
        let img = document.createElement('img')
        imgContainer.className = 'img-ontainer'
        let imageUrl = elm.images[0];
        img.src = `${imageUrl}`;

        imgContainer.append(img)
        let title = document.createElement('h4')
        title.innerText = `${elm.title}`

        let priceSec = document.createElement('div')
        priceSec.className = 'price-sec'
        let price = document.createElement('span')
        price.innerText = `${elm.price}`
        let btn = document.createElement('button')
        btn.className = `add-to-cart`
        btn.innerText = `add to cart`


        priceSec.append(price, btn)
        let bottomSec = document.createElement('div')
        bottomSec.className = 'bottom-sec'

        let count = document.createElement('span')
        count.innerText = '0';
        let minus = document.createElement('button')
        minus.innerHTML = "<i class='fa-solid fa-minus'></i>"
        minus.addEventListener('click', () => { decrement(count) })
        let plus = document.createElement('button')
        plus.innerHTML = "<i class='fa-solid fa-plus'></i>"
        plus.addEventListener('click', () => { increment(count) })
        bottomSec.append(minus, count, plus)
        card.append(imgContainer, title, priceSec, bottomSec)
        cardContainer.append(card)

        /*add to cart btn function*/
        btn.addEventListener('click', () => {
            // btn.style = "background-color:white;color:black;"
            let noItems = Number(count.innerText);
            if (noItems == 0) {
                alert("First select number of items")
            }
            else {
                let total = Number(logo.innerText);
                let newTotal = total + noItems;
                logo.innerText = `${newTotal}`
                allTotal.innerText = `${Number(allTotal.innerText) + (noItems * elm.price)}`
                // console.log(noItems);
                let obj = { element: elm, noItems: noItems }
                showAllItems(obj)
                count.innerText = '0';
            }
        })
    });
}

function increment(element) {
    let count = Number(element.innerText);
    element.innerText = `${count + 1}`
}
function decrement(element) {
    let count = Number(element.innerText);
    if (count == 0) {
        alert("You have not add this items")
    }
    else {
        let total = Number(logo.innerText);
        element.innerText = `${count - 1}`
    }
}


function showAllItems(obj) {
    console.log(listOfAddToCart);
    let isExist = listOfAddToCart.find((elm) => elm.element.title == obj.element.title)
    if (isExist) {
        let indexOfExisting = listOfAddToCart.indexOf(isExist)
        let oldNoOfItems = listOfAddToCart[indexOfExisting].noItems;
        let newNoOfItems = oldNoOfItems + obj.noItems;
        listOfAddToCart[indexOfExisting].noItems = newNoOfItems;        
    }
    else{
        listOfAddToCart.push(obj)
    }

    const listSec = document.getElementById('list-sec');
    console.log(listSec);


    if (listSec) {
        const removeElm = listSec.getElementsByClassName('row');
        while (removeElm.length > 0) {
            removeElm[0].parentNode.removeChild(removeElm[0]);
        }
    }
    console.log(listOfAddToCart);

    // console.log(element);
    // console.log(noItems);
    listOfAddToCart.forEach((elm) => {
        let row = document.createElement('div');
        row.className = 'row'
        let col1 = document.createElement('div');
        col1.className = 'col'
        let col2 = document.createElement('div');
        col2.className = 'col'
        let col3 = document.createElement('div');
        col3.className = 'col'
        let col4 = document.createElement('div');
        col4.className = 'col'
        let col5 = document.createElement('div');
        col5.className = 'col'
        let col6 = document.createElement('div');
        col6.className = 'col'


        let img = document.createElement('img')
        let imageUrl = elm.element.images[0];
        img.src = `${imageUrl}`;
        col1.append(img)

        let productName = document.createElement('h3')
        productName.innerText = `${elm.element.title}`
        col2.append(productName)

        let totalItems = document.createElement('p')
        totalItems.innerText = `${elm.noItems}`
        col3.append(totalItems)

        let price = document.createElement('p')
        price.innerText = `${elm.element.price * elm.noItems}`
        col4.append(price)

        let minus = document.createElement('button')
        minus.className = 'minus'
        minus.innerHTML = "<i class='fa-solid fa-minus'></i>"
        minus.addEventListener('click', () => {
            let newNoItems = Number(totalItems.innerText) - 1;
            if (newNoItems == 0) {
                allTotal.innerText = `${Number(allTotal.innerText) - (1 * elm.element.price)}`
                row.style = "display:none"
            }
            else {
                totalItems.innerText = `${newNoItems}`
                price.innerText = `${elm.element.price * newNoItems}`
                allTotal.innerText = `${Number(allTotal.innerText) - (1 * elm.element.price)}`
            }

        })
        let plus = document.createElement('button')
        plus.className = 'plus'
        plus.innerHTML = "<i class='fa-solid fa-plus'></i>"
        plus.addEventListener('click', () => {
            let newNoItems = Number(totalItems.innerText) + 1;
            totalItems.innerText = `${newNoItems}`
            price.innerText = `${elm.element.price * newNoItems}`
            allTotal.innerText = `${Number(allTotal.innerText) + (1 * elm.element.price)}`
        })

        col5.append(minus, plus)

        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'delete'

        deleteBtn.addEventListener('click', () => {
            let want = confirm('do you want to remove this items')
            if (want) {
                allTotal.innerText = `${Number(allTotal.innerText) - (Number(totalItems.innerText) * elm.element.price)}`
                // console.log(productName.innerText);
               let deleteElm =  listOfAddToCart.find((e)=>e.element.title == productName.innerText)
               let deleteIdx = listOfAddToCart.indexOf(deleteElm);
               listOfAddToCart.splice(deleteIdx,1)
            //    console.log(deleteIdx);
                row.parentNode.removeChild(row);
            }
        })


        col6.append(deleteBtn)
        row.append(col1, col2, col3, col4, col5, col6)
        listSec.append(row)
    })

}


