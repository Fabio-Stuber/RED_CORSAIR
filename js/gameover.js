var ScoreAnzeige = document.querySelector('.score')
var score = localStorage['score_gameover']
ScoreAnzeige.textContent = "Du hast " + score + " Punkte Gesammelt"
