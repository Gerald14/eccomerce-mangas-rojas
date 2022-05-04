
const list = document.querySelector('.products__list');
document.addEventListener('DOMContentLoaded',e => fetchData());

const btnFilter = document.getElementById('btn-filter');
const btnPay = document.getElementById('btn-pay');
// const btnRemove = document.querySelector('.btn-remove')


btnFilter.addEventListener('click',filterProducts);
list.addEventListener('click', e => eventButtonProduct(e))
// btnRemove.addEventListener('click',e => removeProductOfCart(e))

// btnPay.addEventListener('click',addCartShopping);


const fetchData = async() => {
    try {
        const res = await fetch('../../data/manga.json');
        const data = await res.json();
        console.log(res)
        console.log(data)
        paintProducts(data);
        paintShoppingCart();
        
    } catch (error) {
        console.log(error)
    }
    
}

function filterProducts(){
    const list_filter = document.querySelectorAll('.filter__check')
   console.log(list_filter)
    list_filter.forEach((filter,index)=>{
        switch (index) {
            case 0:
                if(filter.checked){
                    console.log('all')
                    
                    cleanDiv();
                    paintProducts(products);
                }
                break;
            case 1:
                if(filter.checked){
                    console.log('norma')
                    const newList = products.filter(product=>product.editorial=='Norma')
                    cleanDiv();
                    paintProducts(newList);
                }
                break;
            case 2:
                if(filter.checked){
                    console.log('ivrea')
                    const newList = products.filter(product=>product.editorial=='Ivrea')
                    cleanDiv();
                    paintProducts(newList);
                }
                 break;
                    
            default:
                break;
        }
        
    })
}

function paintProducts(products) {
   

    for(let product of products) {
        const div = paintProduct(product)
        list.appendChild(div)
    } 
}

function paintProduct(product){
    const {id,img,name,price}=product;
    const div = document.createElement('div');
    div.className = "product";
    div.innerHTML = `
        <div class="product__figure">
            <img src="../../assets/images/Mangas/${img}" alt="" />
        </div>
        <div class="product__title">${name}</div>
        <div class="product__price">S/. ${price}</div>
        <div class="product__details">
            <div class="product__details--btns">
                <button class="btn btn-dark btn-view" data-id="${id}">View</button>
                <button class="btn btn-dark btn-add" data-id="${id}">Add</button>
            </div>
        </div>
    `
    return div;
}

function cleanDiv(){
    const list = document.querySelector('.products__list')

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    
}

const eventButtonProduct = (e) => {
    const currenTarget  = e.target;
    const product = currenTarget.parentElement.parentElement.parentElement;
    console.log(product)
    currenTarget.classList.contains('btn-add')&& addCart(product);

}

const addCart = (objectDiv) => {
    let onCart = false;
    
    const product = {
        "id": objectDiv.querySelector('.btn-add').dataset.id,
        "name": objectDiv.querySelector('.product__title').textContent,
        "price" : objectDiv.querySelector('.product__price').textContent,
        "img" : objectDiv.querySelector('img').src,
        "cantidad":1
    }
    const products = localStorage.getItem('listCart');
    let list_products = JSON.parse(products)||[];
    let newlist=list_products.map((item)=>{
        if (item.id===product.id) {
            onCart=true;
            console.log('producto en el carrito')
            let json = {
                ... product,
                cantidad : item.cantidad+1 || 1
            }
            console.log(json)
            return json;
        }
        return {...item}
    })
    console.log(newlist)
    list_products = [...newlist]
    !onCart && list_products.push(product)
    localStorage.setItem('listCart',JSON.stringify(list_products))
    onCart ? paintShoppingCart(): addProductsToCart(product)
    
    // addHeaderCart({});
}

const addProductsToCart = (product) => {
    
    const {id,price,name,img,cantidad} = product;
    const shopBody = document.querySelector('.shop__body')
    const div = document.createElement('div');
    div.classList = 'shop__item';
    div.innerHTML = `
        <div class="product-img">
            <img src="${img}" alt="" srcset="">
        </div>
        <div class="product-details">
            <strong>${cantidad}</strong> x <span class="price">${price}</span>
            <p class="product-name"><a href="#">${name}</a></p>
        </div>
        <div class="product-access">
            <a class="btn-remove" data-id="${id} href="#">
                <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/22/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"/>
            </button>
            <a class="btn-edit" title="Edit item" href="#">
                <img src="https://img.icons8.com/metro/14/000000/edit.png"/>
            </a> 
        </div>
    `
    shopBody.appendChild(div)

}

function addHeaderCart({cantidad=0,total=0}){
    const header_cart = document.querySelector('.shop__header');
    const div = document.createElement('div');
    let mensaje_total = cantidad > 0 ? cantidad > 1 ? cantidad+' productos':cantidad +' producto':'Su carrito esta vacio' 
    let mensaje_price = total > 0 ? 'S/.--.--':`S/.${total}`
    let resultado = 
    `<div class="top-subtotal">${mensaje_total}, 
        <span class="price">${mensaje_price}</span> 
    </div>`;
    div.innerHTML = resultado;
    header_cart.append(div)
}

const paintShoppingCart = ()=>{
    const products = localStorage.getItem('listCart');
    const shopBody = document.querySelector('.shop__body')
    shopBody.innerHTML='';
    let list_products = JSON.parse(products)||[];
    if(products.length>0)
    list_products.forEach((product)=>{
        addProductsToCart(product)
    })

}

const removeProductOfCart= () => {
    const currenTarget  = e.target;
    console.log('e',currenTarget)
}