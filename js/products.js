// Listas
const list = document.querySelector('.products__list');
const listShop = document.querySelector('.shop__body');
const headerShop = document.querySelector('.shop__header');
//Templates
const templateProduct = document.getElementById('template-product').content;
const templateProductShop = document.getElementById('template-product-shop').content;
const templateHeaderShop = document.getElementById('template-header-shop').content;
const fragment = document.createDocumentFragment();
//Botones
const btnFilter = document.getElementById('btn-filter');
const btnPay = document.getElementById('btn-pay');
// const btnRemove = document.querySelector('.btn-remove')
console.log(templateHeaderShop)
//Eventos
document.addEventListener('DOMContentLoaded',e => fetchData());
btnFilter.addEventListener('click',filterProducts);
list.addEventListener('click', e => eventButtonProduct(e))
// btnRemove.addEventListener('click',e => removeProductOfCart(e))

// btnPay.addEventListener('click',addCartShopping);


const fetchData = async() => {
    try {
        
        const res = await fetch('../../data/manga.json');
        const data = await res.json();
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
                    
                    cleanDiv('.products__list');
                    paintProducts(products);
                }
                break;
            case 1:
                if(filter.checked){
                    console.log('norma')
                    const newList = products.filter(product=>product.editorial=='Norma')
                    cleanDiv('.products__list');
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
        const tmp = paintProduct(product)
        fragment.appendChild(tmp)
    } 
    list.appendChild(fragment)
}

function paintProduct(product){
    const {id,img,name,price}=product;

    templateProduct.querySelector('img').setAttribute('src',`../../assets/images/Mangas/${img}`);
    templateProduct.querySelector('.product__title').textContent = name;
    templateProduct.querySelector('.product__price').textContent = price;
    templateProduct.querySelector('.btn-view').dataset.id = id;
    templateProduct.querySelector('.btn-add').dataset.id = id;

    const clone = templateProduct.cloneNode(true);
    return clone;
}

function cleanDiv(classDiv){
    const list = document.querySelector(classDiv)

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    
}

const eventButtonProduct = (e) => {
    const currenTarget  = e.target;
    const product = currenTarget.parentElement.parentElement.parentElement;
    console.log(product)
    currenTarget.classList.contains('btn-add')&& addCart(product);
    Toastify({
        text: "Se agrego al carrito!!",
        className: "info",
        style: {
          background: "linear-gradient(135deg, #ff7852 0, #ff634d 25%, #f94646 50%, #eb1f41 75%, #e0003f 100%)",
        },
        close:true
      }).showToast();
}

const addCart = (objectDiv) => {
    let onCart = false;
    let total = 0;
    
    const product = {
        "id": objectDiv.querySelector('.btn-add').dataset.id,
        "name": objectDiv.querySelector('.product__title').textContent,
        "price" : objectDiv.querySelector('.product__price').textContent,
        "img" : objectDiv.querySelector('img').src,
        "cantidad":1
    }
    const products = localStorage.getItem('listCart');
    let list_products = JSON.parse(products)||[];
    let newlist = list_products.map((item)=>{
        if (item.id === product.id) {
            onCart = true;
            let json = {
                ... product,
                cantidad : item.cantidad+1 || 1
            }
            return json;
        }
        return {...item}
    })
    list_products = [...newlist]
    !onCart && list_products.push(product)
    localStorage.setItem('listCart',JSON.stringify(list_products))
    console.log('esta en carro?',onCart)
    onCart ? paintShoppingCart(): addProductsToCart(product)
    
}

const addProductsToCart = (product) => {
    console.log('Pintando el producto!!')
    
    const {id,price,name,img,cantidad} = product;
    
    templateProductShop.querySelector('img').setAttribute('src',img);
    templateProductShop.querySelector('.product-details strong').textContent = cantidad;
    templateProductShop.querySelector('.price').textContent = price;
    templateProductShop.querySelector('.product-name a').textContent = name;
    templateProductShop.querySelector('.btn-remove').dataset.id = id;

    const headerShop = templateHeaderShop.querySelector('.top-subtotal');

    if(Object.keys(headerShop.dataset).length > 0){
        const cantidadTotal = Number(headerShop.dataset.cantidad) + Number(cantidad);
        const priceTotal = Number(headerShop.dataset.price) + Number(price);
        addHeaderCart(cantidadTotal,priceTotal)
    }

    const div_empty = document.querySelector('.cart__empty');
    console.log(div_empty)
    if(div_empty)
    listShop.removeChild(div_empty)
    const clone = templateProductShop.cloneNode(true);
    fragment.appendChild(clone)
    listShop.appendChild(fragment)
}

function addHeaderCart(cantidad=0,total=0){
    console.log('cantidad',cantidad)
    console.log('total',total)
    let mensaje_total = cantidad > 0 ? cantidad > 1 ? cantidad+' productos, ':cantidad +' producto, ':'Su carrito esta vacio' 
    let mensaje_price = total < 0 ? 'S/.--.--':`S/.${total}`
    console.log(mensaje_price)
    
    // templateHeaderShop.querySelector('.top-subtotal').textContent = mensaje_total;
    headerShop.innerHTML='';
    templateHeaderShop.querySelector('.total').textContent = mensaje_total;
    templateHeaderShop.querySelector('.price').textContent = mensaje_price;
    templateHeaderShop.querySelector('.top-subtotal').dataset.price = total;
    templateHeaderShop.querySelector('.top-subtotal').dataset.cantidad = cantidad;

    
    const clone = templateHeaderShop.cloneNode(true);
    fragment.appendChild(clone)
    headerShop.appendChild(fragment)
}

const paintShoppingCart = ()=>{
    const products = localStorage.getItem('listCart');
    const shopBody = document.querySelector('.shop__body')
    let totalPrice = 0;
    let totalProduct = 0;
    shopBody.innerHTML='';
    let list_products = JSON.parse(products)||[];
    if(list_products.length > 0){
        console.log('list',list_products)
        list_products.forEach((product)=>{
            addProductsToCart(product)
            totalProduct += Number(product.cantidad);
            totalPrice += Number(product.price) * Number(product.cantidad);
        })
        addHeaderCart(totalProduct,totalPrice)
    }else{
        console.log('carro vacio1!')
        const div = document.createElement("div");
        div.className = 'cart__empty'
        div.innerText = 'Su carrito esta vacio !!'
        listShop.appendChild(div)
        addHeaderCart();
    }
    

    
}

const removeProductOfCart= () => {
    const currenTarget  = e.target;
    console.log('e',currenTarget)
}