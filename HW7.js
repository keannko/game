"use strict";


let resultHuman = 0
let resultComputer = 0
const humanRes = document.querySelector('.human-result')
const computerRes = document.querySelector('.computer-result')
const newGameButton = document.querySelector('.new-game_button')
const startModalWindow = document.querySelector('.modal-level')

newGameButton.addEventListener('click', e => {
    document.location.reload();
})

const winnerCheck = (human, computer) => {
    if (human === 50) {
        humanRes.textContent = `Your result: ${human}`
        computerRes.textContent = `Computer result: ${computer}`
        modal.style.display = "block";
    }else if (computer === 50) {
        modal.style.display = "block";
        humanRes.textContent = `Your result: ${human}`
        computerRes.textContent = `Computer result: ${computer}`
    }
}

const results = (num) => {
    if(num === 1) {
        resultHuman ++
    }else{
        resultComputer ++
    }
}

const getNotRepeatRandomNumber = (min, max) => {
    const shuffle = (arr) => {
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    let array = [];
    for (let index = min; index <= max; index++) {
      array.push(index);
    }
    array = shuffle(array);
    return () => array.shift();
  };

document.addEventListener('click', e => {
    if(!!e.target.id) {
        if(e.target.style.backgroundColor === 'blue') {
            e.target.style.backgroundColor = 'green'
            results(1)
        }
    }
})

const getRandomNumber = getNotRepeatRandomNumber(1, 100);

const tableColor = (speed) => {
    const table = document.querySelector('.table')
    const tdId = table.querySelectorAll('[id]')
    setInterval(() => {
        if (modal.style.display === "block"){
            return
        }else{
        const randomNumber = getRandomNumber()
        tdId.forEach(item => {
            if(randomNumber == item.id) {
                item.style.backgroundColor = 'blue';
                setInterval(() => {
                    if(item.style.backgroundColor === 'blue') {
                        item.style.backgroundColor = 'red'
                        results(2)
                    }
                }, speed);
            }
        })
        winnerCheck(resultHuman, resultComputer)
    }}, speed);
}



document.addEventListener('click', e => {
    if(e.target.classList.contains('button')) {
        tableColor(e.target.getAttribute("id"))
        startModalWindow.style.display = 'none'
    }
    
})

