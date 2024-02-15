//Section demarrer
let start = document.getElementById("start");

// ajouter question section
let ajouterQ = document.getElementById("ajouterQ")

//Section guide
let guide = document.getElementById("guide");
let exit = document.getElementById("exit");
let continueBtn = document.getElementById("continue");
//Section image
let img = document.getElementById("img");
//Section Quiz
let quiz = document.getElementById("quiz");
let time = document.getElementById("time");

//Section Questions 
let questionNo = document.getElementById("questionNo");
let questionText = document.getElementById("questionText");

//Multiple Choix des Questions
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");

//Bouton correct et suivant
let total_correct = document.getElementById("total_correct");
let next_question = document.getElementById("next_question");

//Section Résultat
let result = document.getElementById("result");
let points = document.getElementById("points");
let quit = document.getElementById("quit");
let startAgain = document.getElementById("startAgain");

//Obtenir tous les 'H4' de la section Quiz (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//total des points
let correct = 0;

//Stocker la valeur des réponses
let UserAns = undefined;

//Quand on click sur le bouton 'Demarrer'
start.addEventListener("click", () => {
    menu.style.display = "none";
    guide.style.display = "block";
	img.style.display = "none";
});

//Quand on click sur le bouton 'Sortir = Exit1' de la partie 'Ajouter une question'
exit1.addEventListener("click", () => {
    menu.style.display = "block";
    ajouterQ.style.display = "none";
    img.style.display = "block";	
});

//Quand on click sur le bouton 'Ajouter une question'
addQ.addEventListener("click", () => {
    menu.style.display = "none";
	img.style.display = "none";
    ajouterQ.style.display = "block";
});

//Quand on click sur le bouton 'sortir = Exit' de la partie Guide
exit.addEventListener("click", () => {
    menu.style.display = "block";
    guide.style.display = "none";
	img.style.display = "block";
});


//Creation du minuteur pour la section de reponse au Quiz

let countDown = () => {
    if (timer === 10) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

//Reglage d'interval en temps(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 0;
}

loadData();

//Quand on click sur le bouton 'Continuer'
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";
	img.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

//Spprimer toutes les classes actives losque on click sur le bouton 'Continuer'

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })
	total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //Vérifier la Réponse
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }

        //Désactiver toutes les autres réponses losque l'utilisateur sélectionne une réponse
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

//Quand on click sur le bouton 'Suivant'
next_question.addEventListener("click", () => {
    //    if index est inférieur à MCQS.length
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //questions
        loadData();

        //result
        total_correct.style.display = "block";
        //total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //Quand le Quiz est terminé afficher la section des résultat
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = ` votre score est de : ${correct} / ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//Quand on click sur le bouton 'Quitter le Quiz'
quit.addEventListener("click", () => {
    menu.style.display = "block";
    result.style.display = "none";
	img.style.display = "block";
	correct = 0;
});

//Quand on click sur le bouton 'Recommencer'
startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
	correct = 0;
});
