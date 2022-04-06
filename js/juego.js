
let dinero = 100 , ganancias = 0, apuesta = 10;

while (dinero > 0 && apuesta > 0) {
    let dado = getNumberRandom(1,6)

    let value = prompt('Quiere seguir jugando?','si')

    if(value.toUpperCase() == 'NO'){
        break;
    }

    let numero = parseInt(prompt('A que numero quiere apostar del 1 al 6','1'))

    apuesta = parseInt(prompt('Cantidad que quiere apostar','20'))
    alert('Salio el numero '+dado)
    
    if (numero == dado) {
        let dinero_ganado = apuesta*2
        dinero+=dinero_ganado
        alert(`Has ganado ${dinero_ganado} soles`)
        alert(`Tienes ${dinero} soles`)
    }else{
        dinero-=apuesta
        alert(`Has perdido ${apuesta}, ahora tienes ${dinero}`)
    }

    if(dinero==0){
        alert('Game Over')
        break;
    }

}

function getNumberRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }