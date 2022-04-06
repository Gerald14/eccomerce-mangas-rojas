
const users = [{
    username:'betsi',
    password: '123',
    name:'Betsabet',
}]

const libros = [
    {
        id:1,
        name:'1980',
        autor:'Orwell',
        price:'S/.30'
    },
    {
        id:2,
        name:'Sangre de campeon',
        autor:'Cautemoc',
        price:'S/.35'
    },
    {
        id:3,
        name:'1980',
        autor:'Orwell',
        price:'S/.30'
    },
]

const mangas = [
    {
        id:1,
        name:'Monster',
        autor:'Naoki Urasawa',
        editorial:'Ivrea',
        price:'S/.60'
    },
    {
        id:2,
        name:'Sun ken Rock',
        autor:'Boichi',
        editorial:'Ivrea',
        price:'S/.40'
    },
    {
        id:3,
        name:'Tokyo Revengers',
        autor:'Wakui',
        editorial:'Norma',
        price:'S/.75'
    },
    {
        id:4,
        name:'Dorohedoro',
        autor:'Q-Hayashido',
        editorial:'Ivrea',
        price:'S/.40'
    },
]

let userLogged = {}

const Login = () => {
    const username = prompt('Ingrese su usuario: ')
    const password = prompt('Ingrese su contraseña: ')
    let isRgister = false;
    console.log(users)

    for (let user of users) {
        if(user.username === username && user.password === password){
            isRgister=true;
            userLogged = {...user};
            alert(`Bienvenido ${user.name} 😺  `)
        }
    }

    if (!isRgister) {
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

const seeProducts = (products,idCategory) => {
    let mensaje = idCategory==1? 'Lista de Libros \n':'Lista de Mangas \n' ;

    for(let product of products) {
        mensaje += `   ${product.id}. ${product.name} \n` 
    }
     mensaje += idCategory==1? 'Que libro desea ver?':'Que manga desea ver?';

     let idProduct = parseInt(prompt(mensaje))

     seeProduct(idProduct,idCategory)


}

const seeProduct = (id,idCategory) => {
    let mensaje = 'Detalle : \n';

    let product = idCategory==1 ? 
    libros.find(libro=>libro.id==id):
    mangas.find(manga=>manga.id==id);

    console.log('product',product)
    for(let item in product) {
        mensaje += item !='id' && `${item}:  ${product[item]} \n`
    }

    alert(mensaje)

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
    console.log(isLogged)

} while (!isLogged);

do {
    
    let option = parseInt(prompt(
        `Que desea hacer?, ${userLogged.name} 🎈   
        1. Productos
        2. Cerrar sesion`,1
        )
    ) 

    switch (option) {
        case 1:
            seeCategories();
            break;
        case 2:
            isLogged = false;
            break;
    
        default:
            break;
    }
    console.log(isLogged)


} while (isLogged);

