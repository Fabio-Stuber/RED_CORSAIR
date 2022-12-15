let spieler = document.querySelector('.player')
spieler.style.left = '50%'
let spielfeld = document.querySelector('.playground')
let punkteAnzeige = document.querySelector('.punkte')
let HealthAnzeige = document.querySelector('.heal')
let ScoreAnzeige = document.querySelector('.score')
let bg_sound = document.querySelector('.bg_sound')
let score = 0;
let Health = 5;
let Geschwindikeit = 5;

let audio_coin = new Audio('Sound/effects/coin_2.mp3');
let audio_gameover = new Audio('Sound/effects/last_life.wav');
let audio_Start = new Audio('Sound/effects/pirate-arr.mp3');

bg_sound.volume = 0.2;
audio_coin.volume = 1.0;
audio_gameover.volume = 1.0;
audio_gameover.volume = 1.0;
audio_Start.play()

let timer = new Timer(30)

function move_object(objects) {
    for (let object of objects) {
        object.style.top = parseInt(object.style.top) + Geschwindikeit + 'px'
        if (parseInt(object.style.top) > 2000) {
            object.parentNode.removeChild(object)
        }

    }

}

function minus_health(item, menge) {
    if (anyCollision(spieler, item)) {
        Health = Health - menge
        HealthAnzeige.textContent = Health + " Leben"
        audio_gameover.currentTime = 0;
        audio_gameover.play();

        // Kommentar: sobald der Spieler mit item kollidiert, werden diese gelöscht
        let collisions = allCollisions(spieler, item)
        // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
        for (let collision of collisions) {
            collision.parentNode.removeChild(collision)
        }

    }

    if (Health <= 0) {
        localStorage.setItem("gameover_score", score);
        location.replace("gameover.html");
    }

}

function plus_coin(item, menge) {
    if (anyCollision(spieler, item)) {
        score = score + menge
        punkteAnzeige.textContent = score + " Punkte"
        localStorage.setItem("gameover_score", score);
        audio_coin.currentTime = 0;
        audio_coin.play();
        console.log(score)

        // Kommentar: sobald der Spieler mit item kollidiert, werden diese gelöscht
        let collisions = allCollisions(spieler, item)
        // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
        for (let collision of collisions) {
            collision.parentNode.removeChild(collision)
        }
        if (score > localStorage.getItem("HighScore")) {
            localStorage.setItem("HighScore", score);

        }
    }

}

function Key_Control() {

    if (keyboard(39)) { // Right (➡️)
        spieler.style.left = parseInt(spieler.style.left) + 1 + '%'
    }
    if (keyboard(37)) { // Left (⬅️)
        spieler.style.left = parseInt(spieler.style.left) - 1 + '%'
    }
    if (keyboard(68)) { // Right (a)
        spieler.style.left = parseInt(spieler.style.left) + 1 + '%'
    }
    if (keyboard(65)) { // Left (d)
        spieler.style.left = parseInt(spieler.style.left) - 1 + '%'
    }
    if (keyboard(27)) { // Exit (Esc)
        location.assign("index.html")
    }

}

function Create_Item() {

    if (timer.ready()) {
        let h = document.createElement('div');

        let aitem = Math.round(Math.random() * 4);
        if (aitem == 1) {
            h.classList.add('coin')

        } else if (aitem == 2) {
            h.classList.add('octo')

        } else if (aitem == 3) {
            h.classList.add('bomb')

        } else if (aitem == 4) {
            h.classList.add('rum')

        }

        h.style.top = '-' + (Math.floor(Math.random() * 10) + 'px')
        h.style.left = (Math.floor(Math.random() * 100) + '%')

        spielfeld.appendChild(h)


    }
}

function loop() {

    // Steuerung (Links[A][<] / Rechts[D][>])
    Key_Control();


    const posplayer = spieler.style.left;

    // Links durchlaufen nach rechts
    if (parseInt(posplayer) == 0) {
        spieler.style.left = "99%";
    }
    // Rechts durchlaufen nach links
    if (parseInt(posplayer) == 100) {
        spieler.style.left = "1%";
    }

    // Erstellt Items
    Create_Item();

    // selektiert die Items
    let item_coin = document.querySelectorAll('.coin')
    move_object(item_coin);

    let item_octo = document.querySelectorAll('.octo')
    move_object(item_octo);

    let item_rum = document.querySelectorAll('.rum')
    move_object(item_rum);

    let item_bomb = document.querySelectorAll('.bomb')
    move_object(item_bomb);

    minus_health(item_bomb, 2);
    minus_health(item_octo, 1);
    plus_coin(item_rum, 2);
    plus_coin(item_coin, 1)

    // Reload all (Loop)
    window.requestAnimationFrame(loop)
}



window.requestAnimationFrame(loop)
