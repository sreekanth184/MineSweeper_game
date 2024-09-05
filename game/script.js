let tbody = document.querySelector('tbody');
let scoreElement = document.getElementById('userScore');
let userScore = 0;

let over = document.getElementById('gameOver');
let won = document.getElementById('gameWon');

let lead = document.getElementById("ld")

const user = prompt("Enter your name")
document.getElementById("name").textContent = `Welcome, ${user}!`;


let btn1 = document.createElement('button');
let btn2 = document.createElement('button');
let btn3 = document.createElement('button');

btn1.innerText = "Easy"
btn2.innerText = "Medium"
btn3.innerText = "Hard"



btn1.setAttribute('data-value', 5);
btn2.setAttribute('data-value', 10);
btn3.setAttribute('data-value', 15);

[btn1, btn2, btn3].forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.style.border = '2px solid white';
    btn.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.5)';
    btn.onmouseover = () => btn.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
    btn.onmouseout = () => btn.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.5)';
});

let buttons = document.getElementById("level")
buttons.appendChild(btn1)
buttons.appendChild(btn2)
buttons.appendChild(btn3)

let allButtons = buttons.querySelectorAll('button');

allButtons.forEach(button => {
    button.style.padding = '10px';
    button.style.borderRadius = '10px';
    button.addEventListener('click', function () {
        let value = parseInt(button.getAttribute('data-value'));
        main(value)
    })

})
let fill;
function main(lv) {
    tbody.replaceChildren();
    let count = 0;
    fill = lv * lv
    let arr = []
    for (let i = 1; i <= fill; i++) arr.push(i)
    arr.sort(() => Math.random() - 0.5);


    for (let i = 1; i <= lv; i++) { //rows
        let tr = document.createElement('tr');

        for (let i = 1; i <= lv; i++) { //cols
            let td = document.createElement('td')
            // td.innerText = arr[count]
            td.style.color = 'white'
            td.id = arr[count]


            td.addEventListener('click', handleCellClick)

            count++;
            tr.appendChild(td)
        }

        tbody.appendChild(tr)

    }
}

function handleCellClick(e) {
    let numClicked = e.target.id;
    if (isPrime(Number(numClicked))) {
        over.play();
        setTimeout(() => {
            alert('You Lose the Game!!')
            window.location.reload();
        }, 3000)

    }
    else if (Number(numClicked) == 1) {
        won.play();
        setTimeout(() => {
            alert('You Win the Game!!')
            rankData({ userName: user, noOfAttempts: userScore })
            window.location.href = 'leaderboard.html'
        }, 3000)

    }
    else {
        e.target.removeEventListener('click', handleCellClick)
        removeMultiples(numClicked)

        userScore++;
        scoreElement.innerText = userScore;
    }
}

function removeMultiples(n) {
    for (let i = 1; i <= fill; i++) {
        if (i % n == 0) {
            let cell = document.getElementById(i);
                cell.style.backgroundImage = 'url("images/image.png")';
                cell.style.backgroundSize = 'cover'; 
                cell.style.backgroundRepeat = 'no-repeat';
                cell.style.backgroundPosition = 'center';
                cell.style.cursor='default'
        
            document.getElementById(i).removeEventListener('click', handleCellClick)
        }
    }
}

function isPrime(n) {
    if (n <= 1) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false
        }
    }
    return true
}



function rankData(input) {

    let ranks = JSON.parse(window.localStorage.getItem("ranks"))

    if (!ranks) {
        window.localStorage.setItem('ranks', JSON.stringify([]));
        ranks = []
    }

    let update = false;
    ranks.forEach(ele => {
        if (ele.attempts == input.noOfAttempts) {
            ele.players.push(input.userName);
            update = true;
        }
    });
    if (!update) {
        ranks.push({
            players: [input.userName],
            attempts: input.noOfAttempts
        })
    };

    ranks.sort((a, b) => a.attempts - b.attempts);
    window.localStorage.setItem("ranks", JSON.stringify(ranks))

}


