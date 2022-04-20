const products = [
    {id:1, name:'Tokyo Revengers 4', editorial:'Norma', price:72, img:'TR4.jpg'},
    {id:2, name:'Tokyo Revengers 5', editorial:'Norma',  price:72, img:'TR5.jpg'},
    {id:3, name:'Tokyo Revengers 6', editorial:'Norma',  price:72, img:'TR6.jpg'},
    {id:4, name:'Chainsawman 1', editorial:'Ivrea',  price:25, img:'chainsawman01.jpg'},
    {id:5, name:'Chainsawman 2', editorial:'Ivrea', price:25, img:'chainsawman02.jpg'},
    {id:6, name:'Chainsawman 3', editorial:'Ivrea', price:25, img:'chainsawman03.jpg'},
    {id:7, name:'Chainsawman 4', editorial:'Ivrea', price:25, img:'chainsawman04.jpg'},
    {id:8, name:'Chainsawman 5', editorial:'Ivrea', price:25, img:'chainsawman05.jpg'},
    {id:9, name:'Chainsawman 6', editorial:'Ivrea', price:25, img:'chainsawman06.jpg'},
    {id:10, name:'Chainsawman 7', editorial:'Ivrea', price:25, img:'chainsawman07.jpg'},
    {id:11, name:'Chainsawman 8', editorial:'Ivrea', price:25, img:'chainsawman08.jpg'},
    {id:12, name:'Chainsawman 9', editorial:'Ivrea', price:25, img:'chainsawman09.jpg'},
    {id:13, name:'Chainsawman 10', editorial:'Ivrea', price:25, img:'chainsawman10.jpg'},
    {id:14, name:'Chainsawman 11', editorial:'Ivrea', price:25, img:'chainsawman11.jpg'},

]

const list = document.querySelector('.products__list')

for(let product of products) {
    const div = document.createElement('div');
    div.className = "product";
    div.innerHTML = `
        <div class="product__figure">
            <img src="../../assets/images/Mangas/${product.img}" alt="" />
        </div>
        <div class="product__title">${product.name}</div>
        <div class="product__price">S/. ${product.price}</div>
    `
    list.appendChild(div)
}