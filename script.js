// document.getElementById('btnStart').addEventListener('click', startTheGame);
document.getElementById('btnStart').addEventListener('click', setCondiotion);

let minValue;
let maxValue;

function setCondiotion() {

    document.getElementById('btnStart').classList.add("d-none");
    document.getElementById('conditionField').classList.remove("d-none");

    const form = document.getElementById('conditionForm');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        minValue = parseInt(form.querySelector('[name="minNum"]').value);
        maxValue = parseInt(form.querySelector('[name="maxNum"]').value);

        if (isNaN(maxValue) || isNaN(minValue)){
            minValue = 0;
            maxValue = 100;
        }
    
        (minValue < -999) ? minValue = -999 : minValue;
        (maxValue > 999) ? maxValue = 999 : maxValue;

        document.getElementById('conditionField').classList.add("d-none");
        document.getElementById('newAlert').classList.remove("d-none");
        document.getElementById('alertText').innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

        document.getElementById('alertBtn').addEventListener("click", function() {
            startTheGame();
        })

    })  
} 


function startTheGame() {

    document.getElementById('newAlert').classList.add("d-none");
    document.getElementById('gameField').classList.remove("d-none");

    let answerNumber = Math.floor((minValue + maxValue) / 2);
    let orderNumber = 1;
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${(answerNumber)}?`;

    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun){
            if (minValue === maxValue){
                const phraseRandom = Math.round( Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1;
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                let phrases = [
                    'Я думаю, это число ', 
                    'Да это легко! Ты загадал ', 
                    'Наверное, это число ', 
                    'Ты загадал ',
                    'Дай подумать... Это ',
                    `Хм...\u{1F649} Пусть будет `, 
                ]
                answerField.innerText = `${phrases[Math.floor(Math.random()*6)]} ${answerNumber}`;
            }
        }
    })

    document.getElementById('btnLess').addEventListener('click', function (){
        if(gameRun){
            if (minValue === maxValue){
                const phraseRandom = Math.round( Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадали неправильное число!\n\u{1F914}` :
                    `Я сдаюсь..\n\u{1F92F}`;

                answerField.innerText = answerPhrase;
                gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue)/2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phrases = [
                'Я думаю, это число ', 
                'Да это легко! Ты загадал ', 
                'Наверное, это число ', 
                'Ты загадал ',
                'Дай подумать... Это ',
                `Хм... \n\u{1F649} Пусть будет `, 
            ]
            answerField.innerText = `${phrases[Math.floor(Math.random()*6)]} ${answerNumber}`;

        }
    }});

    document.getElementById('btnEqual').addEventListener('click', function () {
        if (gameRun){
            let phrases = [
                `Я всегда угадываю\n\u{1F60E}`, 
                'Изи! Сыграем еще? ', 
                'Это было интересно. Еще раз?', 
                `У тебя не быдл шансов\n\u{1F60E}`,
                'Как два пальца..Еще раз?', 
            ]
            answerField.innerText = `${phrases[Math.floor(Math.random()*5)]} ${answerNumber}`;
            gameRun = false;
        }
    })

    document.getElementById('btnRetry').addEventListener('click', function () {
        orderNumber = 0;
        document.getElementById('gameField').classList.add("d-none");
        setCondiotion();
    })
}

