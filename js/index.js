
let users = [{
    username:'betsi',
    password: '123',
    name:'Betsabet',
}]

const libros = [
    {
        id:1,
        name:'1980',
        autor:'Orwell',
        price: 30
    },
    {
        id:2,
        name:'Sangre de campeon',
        autor:'Cautemoc',
        price: 35
    },
    {
        id:3,
        name:'1980',
        autor:'Orwell',
        price: 30
    },
]

const mangas = [
    {
        id:1,
        name:'Monster',
        autor:'Naoki Urasawa',
        editorial:'Ivrea',
        price: 60
    },
    {
        id:2,
        name:'Sun ken Rock',
        autor:'Boichi',
        editorial:'Ivrea',
        price: 40
    },
    {
        id:3,
        name:'Tokyo Revengers',
        autor:'Wakui',
        editorial:'Norma',
        price: 75
    },
    {
        id:4,
        name:'Dorohedoro',
        autor:'Q-Hayashido',
        editorial:'Ivrea',
        price: 40
    },
]

let shoppingCart = [];
let userLogged = {}

/**
 * Funcion que permite a una persona loguearse y en caso no le permitira registrarse
 * @returns 
 */
const Login = () => {
    const username = prompt('Ingrese su usuario: ')
    const password = prompt('Ingrese su contraseña: ')
    let isRegister = false;

    for (let user of users) {
        if(user.username === username && user.password === password){
            isRegister = true;
            userLogged = {...user};
            alert(`Bienvenido ${user.name} 😺  `)
        }
    }

    if (!isRegister) {
        const toRegister = prompt('No estas registrado!😿, Desea registrarse ? SI/NO','si')
        if(toRegister.toLocaleUpperCase()=='SI'){
            return Register();
            
        }else{
            alert('ok!, Que tenga un buen dia!')
            return false
        }
    }
    return true;
    
}


/**
 * Funcion que permite registrarse
 * @returns 
 */
const Register = () => {
    const username = prompt('Ingrese un usuario: ')
    const password = prompt('Ingrese una contraseña: ')
    const name = prompt('Ingrese un nombre: ')

    const newUser = {
        username,
        password,
        name
    }

    users.push(newUser);
    alert('Su cuenta ha sido registrada! 😺 ')
    return false
}


/**
 * Funcion que permite ver las categorias a vender
 */
const seeCategories = () => {
    let option = parseInt(prompt(
        `Que categoria desea ver? 👾  
        1. Libros
        2. Mangas `,1
        )
    )

    switch (option) {
        case 1:
                seeProducts(libros,1);
            break;
        case 2:
                seeProducts(mangas,2);
            break;
    
        default:
            break;
    }


}


/**
 * Funcion que permite ver los productos por categoria
 * @param {*} products 
 * @param {*} idCategory 
 */
const seeProducts = (products,idCategory) => {
    let mensaje = idCategory==1? 'Lista de Libros \n':'Lista de Mangas \n' ;

    for(let product of products) {
        mensaje += `   ${product.id}. ${product.name} \n` 
    }
     mensaje += idCategory==1? 'Que libro desea ver?':'Que manga desea ver?';

     let idProduct = parseInt(prompt(mensaje))

     seeProduct(idProduct,idCategory)


}


/**
 * Funcion que permite ver un producto en especifico
 * @param {*} id 
 * @param {*} idCategory 
 */
const seeProduct = (id,idCategory) => {
    let mensaje = 'Detalle : \n';

    let product = idCategory==1 ? 
    libros.find(libro=>libro.id==id):
    mangas.find(manga=>manga.id==id);

    console.log('product',product)
    for(let item in product) {
        mensaje += item !='id'&& item !='price' && `${item}:  ${product[item]} \n`
        mensaje += item =='price' && `${item}: S/.${product[item]} \n`
    }

    mensaje += `\n Desea agregarlo al carrito? SI/NO`

    const inCart = prompt(mensaje);
    
    if(inCart.toLowerCase() == 'si')
    addCart(product)

}


/**
 * Funcion que permite agregar un producto al carrito de compras
 * @param {*} product 
 */
const addCart = (product) => {
    
    const cantidad = parseInt(prompt(`Que cantidad desea agregar? `,1));

    if(cantidad>0){
        shoppingCart.push({
            ...product,
            count:cantidad
        });
    }
}

/**
 * Funcion que permite ver el carrito de compras
 */
const seeShoppingCart = () => {
   
    if(shoppingCart.length>0){
        
        let salir = false;
        do {
            let mensaje= '';
            mensaje += `Carrito de compras \n\n`;
            let total = 0;
            console.log('entro do')
            console.log('cart',shoppingCart)
            shoppingCart.map((product,index) =>{
                const {name,price,count} = product;
    
                mensaje += `${index+1}. ${name} x ${count}              S/.${(Number(count)*Number(price))} \n`
                total += Number(count)*Number(price);
            })
            mensaje +=`\nTOTAL: ${total}\n
            -------------------
            1. Eliminar 
            2. Pagar
            3. Menu anterior` 
    
            const option = parseInt(prompt(mensaje));
    
            switch (option) {
                case 1:
                    removeProduct();
                    break;
                case 2:
                    toPayCart();
                    break;
                case 3:
                    salir = true;
                    break;
            
                default:
                    break;
            }
        } while (!salir);
        
    }else{
        mensaje += 'Su carrito esta vacio 😢'
        alert(mensaje);
    }

    
}

const removeProduct = () => {
    let mensaje = `Que producto desea eliminar del carrito? Indique el numero`;

    shoppingCart.map((product,index)=>{
        mensaje += `${index+1}. ${product.name}\n`
    })
    const id = parseInt(prompt(mensaje));
    shoppingCart.splice(id-1,1);
    alert('Se elimino correctamente')

}

const toPayCart = () => {

}

let isLogged = false;

do {

    let option = parseInt(prompt(
        `Mi tienda 👾  
        1. Iniciar sesion
        2. Registrarse
        `,1
        )
    ) 

    switch (option) {
        case 1:
                isLogged = Login();
            break;
        case 2:
                Register();
            break;
    
        default:
            break;
    }

} while (!isLogged);

do {
    
    let option = parseInt(prompt(
        `Que desea hacer?, ${userLogged.name} 🎈   
        1. Ver Productos
        2. Ver Carrito
        3. Cerrar sesion`,1
        )
    ) 

    switch (option) {
        case 1:
            seeCategories();
            break;
        case 2:
            seeShoppingCart();
            break;
        case 3:
            isLogged = false;
            break;
    
        default:
            break;
    }


} while (isLogged);

