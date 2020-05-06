
var start = document.querySelector('.catchMe');
var chrono = document.querySelector('.timer');
var score = document.querySelector('.score');
var pointNextLevel = document.querySelector('.toNextLevel');
var level = document.querySelector('.level');
var noir = document.querySelector('.playground');
var missClick = document.querySelector('.missedClicks');
var formulaire = document.querySelector('#form');
var scoreFinal = document.querySelector('.bestPlayers');
var button = document.getElementById('button');
var prenom = document.querySelector('.prenom');
var nom = document.querySelector('.nom');
var S = 0;
var pros = []

start.addEventListener('click', myClick);

function myClick() {

    var time = 60;   //chronometre
    S = 0;   //score
    var PNL = 100;   //point to next level
    var L = 1;   //level
    var i = 300;   //vitesse du changement de position
    var v = 2000;  // vitesse de la rotation du click
    var counter = 0;  //nb de fois du click
    var perdu = 0;   //point perdu quand tu click hors de click me
    var counter_level = 0;   //il va compter le nb de niveau passer
    var survol = 0;   //sert a eviter le click me de bouger a chaque survol 
    chrono.innerHTML = time;
    score.innerHTML = S;
    missClick.innerHTML = perdu;
    pointNextLevel.innerHTML = PNL;
    formulaire.style.display = 'none';
    var click = document.querySelector('.click');
    var go = document.querySelector('.before');
    start.removeEventListener('click', myClick);
    click.style.animationDuration = v + "ms";


    click.style.animationName = "spin";   //le bouton tourne sur lui meme;

    click.addEventListener("click", count);   //chaque click = 1 point
    function count(e) {

        S += L * 10;
        counter++;
        e.stopPropagation();

        if (counter == 10) {
            L++;   //level qui augmente
            counter = 0;
            PNL += 100 * L;   //point necessaire pour passer au niveau suivant
            i = i - 50;   // accelere la vitesse du changement de position
            v = v - 250;   //accelere la vitesse de la rotation du click me
            click.style.animationDuration = v + "ms";
            time += 10;
            counter_level++;
            if (L == 6 || S > 1500) {
                L = 5;
                PNL = 1500;
                click.removeEventListener('click', count);
                click.removeEventListener('mouseover', mouse);
            }
        }
        score.innerHTML = S;
        level.innerHTML = L;
        pointNextLevel.innerHTML = PNL;

    }

    noir.addEventListener('click', miss);  // si tu click sur la boite noir tu perd un point
    function miss() {
        perdu = perdu + L;
        missClick.innerHTML = perdu;
    }

    click.addEventListener('mouseover', mouse); //au survol le bouton change de position
    function mouse() {
        survol++
        if (survol == 1) {  //si il ya d'autre survol qui se passe avant le temps i alor ne les prend pas en compte
            setTimeout(function () {
                click.style.top = (Math.random() * 600).toString() + 'px';
                click.style.left = (Math.random() * 850).toString() + 'px';
                survol = 0;
            }, i);
        }
    };


    var timer = setInterval(function () {   //fait le compteur et arriver a 0 il remet tout a zero
        time--;
        chrono.innerHTML = time;

        if (time == 0 || counter_level == 5) {

            noir.removeEventListener('click', miss);
            click.removeEventListener('mouseover', mouse);
            click.removeEventListener('click', count);

            clearInterval(timer);
            chrono.innerHTML = "C'est Terminer !";
            click.style.animationName = "none";
            go.innerHTML = "CATCH ME IF YOU CAN!";
            formulaire.style.display = 'block';
            S -= perdu;
            start.addEventListener('click', myClick);
            counter_level = 0;
            button.addEventListener('click', btn);
            function btn() {

                button.removeEventListener('click', btn);
                formulaire.style.display = "none";
                click.style.top = 0;
                click.style.left = 0;

                var newForm = new Form(prenom.value, nom.value, S);
                function Form(_prenom, _nom, _point) {
                    this.prenom = _prenom;
                    this.nom = _nom;
                    this.point = _point
                }

                pros.push(newForm);
                pros.sort(function (a, b) {
                    return b.point - a.point;
                })
                if (pros.length > 5) {
                    pros.pop();
                }
                prenom.innerHTML = "";
                nom.innerHTML = "";
                var newFormJSON = JSON.stringify(pros);

                localStorage.setItem('theUser', newFormJSON);
                getUser()

            };
        }

    }, 1000)


}
var toAppend = "";
getUser();

function getUser() {

    var proJson = localStorage.getItem('theUser');

    if (proJson != null) {
        pros = JSON.parse(proJson);
        toAppend = "";
        pros.forEach(createPros);
        scoreFinal.innerHTML = toAppend;
    }
}

function createPros(pro, i) {

        toAppend += '<div>' + pro.prenom + " " + pro.nom + " : " + pro.point + '</div>';
    
}


