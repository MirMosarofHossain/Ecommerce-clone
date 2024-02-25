// import showAllItems from "./listScript";

const container = document.getElementById('container')
const logo = document.getElementById('logo');
const allTotal = document.getElementById('allTotal')
const listSection = document.getElementById('list-container')
const cut = document.getElementById('cut')
listSection.style = 'display:none';

logo.addEventListener('click',()=>{

        listSection.style = 'display:block';
        container.style = 'display:none'
        logo.innerText='0'
    
})

cut.addEventListener('click',()=>{
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
                if(noItems==0){
                    alert("First select number of items")
                }  
                else{         
                let total = Number(logo.innerText);
                let newTotal = total + noItems;
                logo.innerText = `${newTotal}`
                allTotal.innerText = `${Number(allTotal.innerText) + (noItems*elm.price)}`
                // console.log(noItems);
                showAllItems(elm,noItems)

                // showAllItems(elm,)
                count.innerText='0';
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

const listSec = document.getElementById('list-sec');

function showAllItems(element,noItems){
    // console.log(element);
    // console.log(noItems);
    let row = document.createElement('div');
    row.className='row'
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
    let imageUrl = element.images[0];
    img.src = `${imageUrl}`;
    col1.append(img)

    let productName = document.createElement('h3')
    productName.innerText = `${element.title}`
    col2.append(productName)

    let totalItems = document.createElement('p')
    totalItems.innerText = `${noItems}`
    col3.append(totalItems)

    let price = document.createElement('p')
    price.innerText = `${element.price*noItems}`
    col4.append(price)

    let minus = document.createElement('button')
    minus.className='minus'
        minus.innerHTML = "<i class='fa-solid fa-minus'></i>"
        minus.addEventListener('click', () => {
           let newNoItems = Number(totalItems.innerText) - 1;
           if(newNoItems==0){
            allTotal.innerText = `${Number(allTotal.innerText) - (1*element.price)}`
              row.style = "display:none"
           }
           else{
           totalItems.innerText = `${newNoItems}`
           price.innerText = `${element.price*newNoItems}`
           allTotal.innerText = `${Number(allTotal.innerText) - (1*element.price)}`
        }

         })
        let plus = document.createElement('button')
        plus.className='plus'
        plus.innerHTML = "<i class='fa-solid fa-plus'></i>"
        plus.addEventListener('click', () => { 
            let newNoItems = Number(totalItems.innerText) +1;  
           totalItems.innerText = `${newNoItems}`
           price.innerText = `${element.price*newNoItems}`
           allTotal.innerText = `${Number(allTotal.innerText) + (1*element.price)}`
         })

        col5.append(minus,plus)

   let deleteBtn = document.createElement('button')
   deleteBtn.innerText = 'Delete'
   deleteBtn.className='delete'

   deleteBtn.addEventListener('click', ()=>{
    let want = confirm('do you want to remove this items')
    if(want){
        allTotal.innerText = `${Number(allTotal.innerText) - (Number(totalItems.innerText)*element.price)}`
        row.style = "display:none"
    }
   })


   col6.append(deleteBtn)
    row.append(col1,col2,col3,col4,col5,col6)
    listSec.append(row)
}