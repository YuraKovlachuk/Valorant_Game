/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
class Unit {
    constructor(id, image, name, health, armor, damage) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.damage = damage;
    }

    getDamage(damage) {
        this.health = this.health - (damage - this.armor);
        if (this.armor >= 0) {
            this.armor = this.armor - Math.round(this.damage / 2);
        }
    }
}

class Display {
    constructor() {
        this.gameName = 'Valorant';
        this.listOfPng =
            [`https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf0200e1821b5b39f/5eb7cdc144bf8261a04d87f9/V_AGENTS_587x900_Phx.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6f1392b30784e029/618d9da0d380f814d61f001c/WebUpdate_Chamber_KeyArt.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8093ba7b5e84ed05/61d8a63ddea73a236fc56d12/Neon_KeyArt-Web.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt516d37c6c84fcda0/625db737c9aa404b76ddd594/Fade_Key_Art_587x900_for_Website.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltceaa6cf20d328bd5/5eb7cdc1b1f2e27c950d2aaa/V_AGENTS_587x900_Jett.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blte5aefeb26bee12c8/60ca5aa30ece0255888d7faa/KAYO_KeyArt_587x900.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt26fcf1b5752514ee/5eb7cdbfc1dc88298d5d3799/V_AGENTS_587x900_Brimstone.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6577b1f58530e6b2/5eb7cdc121a5027d77420208/V_AGENTS_587x900_Reyna.png`,
                `https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png`]
    }

    setGameName() {
        document.getElementsByTagName('header')[0].innerText = this.gameName;
    }

    clearListOfCharacter() {
        document.querySelector('.characters-list').innerHTML = '<div class="characters-list"></div>';
    }

    showBattleField(firstCharacter, secondCharacter) {
        this.clearListOfCharacter();
        let battle_field = document.querySelector('.battle-field');
        battle_field.innerHTML += `<div class="character-box-fight">
        <img src="${firstCharacter.image}" alt="2"
          class="character-fight-img">
        <div class="character-fight-info">
          <p class="name">${firstCharacter.name}</p>
        </div>
        <div class="character-fight-stats">
          <p class="health">Health: ${firstCharacter.health}</p>
        </div>
      </div>
      <h1 class="vs">VS</h1>
      <div class="character-box-fight">
        <img src="${secondCharacter.image}" alt="2"
          class="character-fight-img">
        <div class="character-fight-info">
          <p class="name">${secondCharacter.name}</p>
        </div>
        <div class="character-fight-stats">
          <p class="health">Health: ${secondCharacter.health}</p>
        </div>
      </div>
    </div>`
        document.querySelector('.fight').classList.remove('hidden');
    }

}

class Game {
    constructor(listOfCharacters) {
        this.listOfCharacters = listOfCharacters;
    }

    startGame(listOfCharacters) {
        alert('Choose your fighter');
        console.log(listOfCharacters);
        document.querySelector('.start').classList.add('hidden');
        for (let count = 0; count < listOfCharacters.length; count++) {
            document.querySelector('.characters-list').innerHTML += `<div class="character-box">
        <img src="${listOfCharacters[count].image}" alt="${count}"
          class="character-img">
            <div class="character-info">
                <p class="name">${listOfCharacters[count].name}</p>
            </div>
            <div class="character-stats">
                <p class="health">Health: ${listOfCharacters[count].health}</p>
                <p class="armor">Armor: ${listOfCharacters[count].armor}</p>
                <p class="damage">Damage: ${listOfCharacters[count].damage}</p>
                <button class="choose" id="${count}">Choose</button>
            </div>
            </div>`
        }
        let chooses = document.querySelectorAll('.choose');
        for (let item = 0; item < chooses.length; item++) {
            chooses[item].addEventListener('click', (event) => {
                this.firstCharacter = this.choosePlayersById(event, listOfCharacters);
                this.secondCharacter = this.randomPlayer(listOfCharacters);
                new Display().showBattleField(this.firstCharacter, this.secondCharacter);
                document.querySelector('.fight').addEventListener('click', () => {
                    this.startBattle(this.firstCharacter, this.secondCharacter)
                })
            });
        }
    }

    choosePlayersById(event, listOfCharacters) {
        for (let count = 0; count < listOfCharacters.length; count++) {
            if (listOfCharacters[count].id === +event.target.id) {
                return listOfCharacters[count]
            }
        }
    }

    randomPlayer(listOfCharacters) {
        return listOfCharacters[Math.floor(Math.random() * (listOfCharacters.length + 1 - 0))
            + 0]
    }

    startBattle(firstCharacter, secondCharacter) {
        let battle_field = document.querySelector('main');
        battle_field.innerHTML += `<div class="result hidden"></div>`;
        let result = document.querySelector('.result');

        let stopinterval = setInterval(() => {
            firstCharacter.getDamage(secondCharacter.damage);
            secondCharacter.getDamage(firstCharacter.damage);
            document.querySelectorAll('.health')[0].innerText = firstCharacter.health;
            document.querySelectorAll('.health')[1].innerText = secondCharacter.health
            if (firstCharacter.health <= 0) {
                clearInterval(stopinterval);
                result.innerText = secondCharacter.name + ' win!'
                result.classList.remove('hidden');
                document.querySelector('.fight').innerText = 'Reload'
            }
            if (secondCharacter.health <= 0) {
                clearInterval(stopinterval);
                result.innerText = firstCharacter.name + ' win!'
                result.classList.remove('hidden');
                document.querySelector('.fight').innerText = 'Reload'
            }
            if (firstCharacter.health <= 0 && secondCharacter.health <= 0) {
                clearInterval(stopinterval);
                result.innerText = 'Draw!!'
                result.classList.remove('hidden');
                document.querySelector('.fight').innerText = 'Reload'
            }
        }, 500)
        document.querySelector('.fight').addEventListener('click', () => {
            location.reload()
        });
    }
}

document.querySelector('.start').classList.remove('hidden');
let display = new Display();
display.setGameName();

let list = [new Unit(0, display.listOfPng[0], 'Phoenix', 350, 10, 22),
new Unit(1, display.listOfPng[1], 'Chamber', 400, 15, 25),
new Unit(2, display.listOfPng[2], 'Neon', 300, 9, 25),
new Unit(3, display.listOfPng[3], 'Fade', 330, 19, 22),
new Unit(4, display.listOfPng[4], 'Omen', 400, 20, 23),
new Unit(5, display.listOfPng[5], 'Jett', 350, 9, 30),
new Unit(6, display.listOfPng[6], 'KAY/O', 450, 20, 18),
new Unit(7, display.listOfPng[7], 'Brimstone', 400, 12, 20),
new Unit(8, display.listOfPng[8], 'Reyna', 350, 8, 28),
new Unit(9, display.listOfPng[9], 'Breach', 410, 13, 19)]

let game = new Game(list);

document.querySelector('.start').addEventListener('click', () => {
    game.startGame(list);
})

