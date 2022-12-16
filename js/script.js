// El código es una implementación de un juego de memoria, también conocido como "memorama" o "parejas". El juego consta de un tablero con imágenes ocultas en tarjetas que el jugador debe intentar descubrir emparejando dos tarjetas a la vez.

// La clase Memorama representa una instancia del juego. En su constructor, se inicializan las variables necesarias para llevar a cabo el juego. Estas incluyen:

// canPlay: una bandera que indica si el jugador puede volver a girar las cartas.
// card1 y card2: las dos tarjetas que el jugador ha girado en la jugada actual.
// availableImages: una lista de identificadores de imágenes que se pueden usar en el juego.
// orderForThisRound: una lista con el orden en que se mostrarán las imágenes en el tablero en la ronda actual.
// cards: una lista de elementos HTML que representan las tarjetas en el tablero.
// maxPairNumber: el número máximo de parejas que se pueden encontrar en el juego.

// La clase Memorama tiene varios métodos que se encargan de llevar a cabo diferentes acciones en el juego:
// startGame(): inicializa una nueva ronda del juego.
// setNewOrder(): establece un nuevo orden para las imágenes en el tablero en la ronda actual.
// setImagesInCards(): asigna las imágenes a las tarjetas en el tablero en función del orden establecido por setNewOrder().
// openCards(): muestra todas las tarjetas en el tablero durante un período de tiempo determinado.
// closeCards(): oculta todas las tarjetas en el tablero y agrega eventos de clic a cada una de ellas.
// addClickEvents(): agrega un evento de clic a cada una de las tarjetas en el tablero.
// removeClickEvents(): elimina el evento de clic de cada una de las tarjetas en el tablero.
// flipCard(): gira la tarjeta seleccionada por el jugador y comprueba si hay una pareja.
// checkPair(): comprueba si las dos tarjetas seleccionadas por el jugador forman una pareja.
// resetOpenedCards(): vuelve a ocultar las dos tarjetas seleccionadas por el jugador si no forman una pareja.
// checkIfWon(): para comprobar si se ha ganado la partida.


class MemoramaGame {
  constructor() {
    console.log('building game...');
    this.canPlay = false

    this.card1 = null
    this.card2 = null

    this.availableImages = [102, 16, 103, 7]
    this.orderForThisRound = []
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
    this.foundPairs = 0
    this.maxPairNumber = this.availableImages.length

    this.startGame()
  }

  startGame() {
    console.log('start game');
    this.setNewOrder()
    this.setImagesInCards()
    this.openCards()
  }

  setNewOrder() {
    console.log('set order');
    this.orderForThisRound = this.availableImages.concat(this.availableImages)
    this.orderForThisRound.sort(() => Math.random() - 0.5)
  }

  setImagesInCards() {
    console.log('set images on card');
    for (const key in this.cards) {

      const card = this.cards[key]
      const image = this.orderForThisRound[key]
      const imgLabel = card.children[1].children[0]

      card.dataset.image = image;
      imgLabel.src = `https://randomfox.ca/images/${image}.jpg`
    }
  }

  openCards() {
    console.log('open cards');
    this.cards.forEach(card => card.classList.add('opened'))

    setTimeout(() => {
      this.closeCards()
    }, 3000);
  }

  closeCards() {
    console.log('close cards');
    this.cards.forEach(card => card.classList.remove('opened'))
    this.addClickEvents()
    this.canPlay = true
  }

  addClickEvents() {
    console.log('add click events');
    this.cards.forEach(card => {
      card.addEventListener('click', this.flipCard.bind(this))
    });
  }

  removeClickEvents() {
    console.log('remove click events');
    this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));
  }

  flipCard(event) {
    console.log('flip card');
    const clickedCard = event.target

    if (this.canPlay && !clickedCard.classList.contains('opened')) {
      clickedCard.classList.add('opened')

      this.checkPair(clickedCard.dataset.image)
    }
  }

  checkPair(image) {
    console.log('compare par');
    if (!this.card1) {
      this.card1 = image
    } else {
      this.card2 = image
    }

    if (this.card1 && this.card2) {
      this.canPlay = false
      if (this.card1 == this.card2) {
        setTimeout(this.checkIfWon.bind(this), 2000)
      } else {
        setTimeout(this.resetOpenedCards.bind(this), 2000)
      }
    }
  }

  resetOpenedCards() {
    console.log('reset open');
    const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
    const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

    firstOpened.classList.remove("opened");
    secondOpened.classList.remove("opened");

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;
  }

  checkIfWon() {
    console.log('check If won');

    this.foundPairs++;
    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;

    if (this.maxPairNumber == this.foundPairs) {
      alert("¡Ganaste!");
      this.setNewGame();
    }
  }

  setNewGame() {
    console.log('inicia un nuevo juego');
    this.removeClickEvents();
    this.cards.forEach(card => card.classList.remove("opened"));

    setTimeout(this.startGame.bind(this), 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MemoramaGame()
})





