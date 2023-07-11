
getPorducts()
var container = document.getElementById('container')
var tags = document.getElementById('tags')
var btn = document.getElementById('btn')
btn.addEventListener('click',getData)
var localStorageArray = []

//GET ITEMS FROM LOCAL STORAGE

getItemsfromLocalStorage()
function getItemsfromLocalStorage(){
    var items = localStorage.getItem('ProductcartItems')
    // console.log(items)
    if(items){
        items = JSON.parse(items)
        console.log(items)
        localStorageArray = items
    }
}

//FETCH API TO GET ALL PRODUCT

async function getPorducts() {
    const productsResponse = await fetch('https://dummyjson.com/products').then(res => res.json())
    let products = productsResponse.products
    console.log(products)
    
    //For Each
    products.forEach((data, i) => {
        const card = `
        <div class='card'>
        <img src =${data.thumbnail} />
        <h4>${data.title} </h4>
        <h4>Price : $  ${data.price} </h4>
        <button class="CartBtn" onclick = "addToCart(this)">
        <span class="IconContainer"> 
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
        </span>
        <p class="text">Add to Cart</p>
        </button>
        </div>`
        container.innerHTML += card
    })
     

    //map
    var categories = []
    products.map((obj, i) => {
        if (!categories.includes(obj.category)) {
            categories.push(obj.category)
        }
    })


    categories.forEach((cat,i) => {
        var chip =`<button class="CatBtn" id="chip" onclick = "remove(this)">${cat}</button>`
        tags.innerHTML += chip
    })
    
    
}


//FUNCTION ON CATEGOERY FUNCTION
    
const remove = (btn)=>{
    container.innerHTML = null
    async function checking(){
        const productsResponse =await  fetch('https://dummyjson.com/products').then(res => res.json())
        let products = productsResponse.products
        console.log(products)    
        
        const chipHtml = btn.innerText
        console.log(chipHtml)
        var emptyArray = []
        for(var i=0 ; i<products.length ; i++){
            if(chipHtml === products[i].category){
                console.log(products[i])
                emptyArray.push(products[i])
                console.log(emptyArray)
            }
        }
        
            emptyArray.forEach((element , i)=>{
            const catCard = `<div class='card' >
            <img src =${element.thumbnail} />
            <h4>${element.title} </h4>
            <h4>Price : $  ${element.price} </h4>
            <button class="CartBtn" onclick = "addToCart(this)">
            <span class="IconContainer"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
            </span>
            <p class="text">Add to Cart</p>
            </button>
            </div>`
            container.innerHTML+=catCard
            })

    }

    checking()

}

//FETCH API TO GET SEARCH PRODUCT

async function getData() {
         var input = document.getElementById("userInput").value;
         console.log(input)
         const search = await fetch(`https://dummyjson.com/products/search?q=${input}`).then(res=>res.json())

          console.log(search)
          container.innerHTML = null
          search.products.forEach((data, i) => {
        
            const card = `<div class='card' >
            <img src =${data.thumbnail} />
            <h4>${data.title} </h4>
            <h4>Price : $  ${data.price} </h4>
            <button class="CartBtn" onclick = "addToCart(this)">
            <span class="IconContainer"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
            </span>
            <p class="text">Add to Cart</p>
            </button>
            </div>`
            container.innerHTML += card
        })
                      
          
        }
 


//ADD TO CART FUNCTION

var addToCart = (btn)=>{
    var parentNodeVal = btn.parentNode
    var src =  parentNodeVal.children[0].src
    var title = parentNodeVal.children[1].innerText
    var price = parentNodeVal.children[2].innerText
    var localStorageObj = {
        imgSrc : src ,
        productTitle : title ,
        productPrice : price 
    }
    localStorageArray.push(localStorageObj)
    console.log(localStorageArray)
    localStorage.setItem('ProductcartItems' , JSON.stringify(localStorageArray))


}



// setInterval(()=>{

     
//      var welcomeContainer = document.querySelector('.welcome-container-image')
//      welcomeContainer.innerHTML=null
//      const imgArray = ['https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60','https://images.unsplash.com/photo-1557690267-fad2f168bb95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBob25lfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60','https://images.unsplash.com/photo-1470350576089-539d5a852bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHBob25lfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60','https://images.unsplash.com/photo-1595535373192-fc8935bacd89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60']
//      const randomNumber = Math.floor((Math.random()*4))
//      const img = imgArray[randomNumber]
//      console.log(img)
//      console.log(randomNumber)
//      const imgSrc = `<img src="${img}" alt="">`
//      welcomeContainer.innerHTML = imgSrc

     
//  },3000)

//for each
//map
//filter
//find
//findbyindex
//reduce
//sort


//if we do it thruofh for loop

    // for (var i = 0; i < products.length; i++) {
    //     const card = `<div class='card' >
    //     <img src =${products[i].thumbnail} />
    //     <h4>${products[i].title} </h4>
    //     </div>`
    // }

    //map
    // let categories = products.map((obj, i) => {
    //     var prod = obj
    //     prod.available = true
    //     return prod
    // })



// async function fakeApi(){
//     const call = await fetch('https://reqres.in/api/users?page=2').then(res=>res.json())
//     console.log(call)
// }
// fakeApi()
