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

    const clone = templateProduct.cloneNode(true);
    return clone;
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
    
    templateProductShop.querySelector('img').setAttribute('src',img);
    templateProductShop.querySelector('.product-details strong').textContent = cantidad;
    templateProductShop.querySelector('.price').textContent = price;
    templateProductShop.querySelector('.product-name a').textContent = name;

    const clone = templateProductShop.cloneNode(true);
    fragment.appendChild(clone)
    listShop.appendChild(fragment)
}

function addHeaderCart({cantidad=0,total=0}){
    
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