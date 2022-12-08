var ScoreAnzeige = document.querySelector('.Score');
var HighScoreAnzeige = document.querySelector('.HighScore');
var score_e = localStorage.getItem("gameover_score");
var score_High = localStorage.getItem("HighScore");
ScoreAnzeige.textContent = "Du hast " + score_e + " Punkte Gesammelt";
HighScoreAnzeige.textContent = "Dein HighSore ist: " + score_High + " Punkte";
