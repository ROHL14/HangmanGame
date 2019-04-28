//Elements from the html
var unsdiv= document.getElementById('underscore');
console.log(unsdiv);
var pointsdiv= document.getElementById('points');
console.log(pointsdiv);
var livesdiv= document.getElementById('lives');
console.log(livesdiv);
var pagainbtn= document.getElementById('playagain');
pagainbtn.disabled=true;
pagainbtn.hidden= true;

//Global variables
var categorie;
var words;
var obj_keys;
var wordtoguess;
var selectedword;
var hint;
var underscore= [];
var userKey;
var wordsplit;
var remainingletters;
var lives=10;
var points= 0;

//Create the words to guess
var categories = {
    "Heros":{
        "batman": ["He lost his parents","He doesn't kill","He is the Dark Knight"],
        "flash": ["He is really fast","He use a red suit","His logo is a thunder"],
        "superman": ["He can fly","He comes from other world","He is the Man of Steel"]},
    "Villains":{
        "joker": ["He is crazy","Has a big smile","He is the enemy of the Dark Knight"],
        "luthor":["He is smart","He use technology to fight","He is the enemy of the Man of Steel"],
        "darkseid": ["He is the Gobernor of Apokolips","He is immortal","He is the father of Orion"]}
    };

//Check if the user chose a category, pick the word and the hint
function goGame(){
    words= Object.values(categories); 
    selectcat = document.getElementById("mySelect").value;
    if(selectcat=="0"){
        alert("You need to choose a category first")
    }
    else if(selectcat=="Heros"){
        //Store the category chosen in a variable to use its values
        categorie= words[0];
        //Turns the object in an array to choose a word to guess
        obj_keys = Object.keys(categorie);
        //Choose the word to guess
        wordtoguess = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        //Turns the object in an array to choose the hint
        selectedword = categorie[wordtoguess];
        //choose the hint
        hint= selectedword[Math.floor(Math.random()*selectedword.length)]; 
        wordsplit= wordtoguess.split("");
        console.log(wordsplit);
        remainingletters= wordtoguess.length;
        console.log(remainingletters);
        document.getElementById('choose').hidden= true;
        play();
        createHint(hint);
    }
    else if(selectcat=="Villains"){
        categorie=words[1];
        obj_keys = Object.keys(categorie);
        wordtoguess = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        selectedword = categorie[wordtoguess];
        hint= selectedword[Math.floor(Math.random()*selectedword.length)];
        wordsplit= wordtoguess.split("");
        console.log(wordsplit);
        remainingletters= wordtoguess.length;
        console.log(remainingletters);
        document.getElementById('choose').hidden= true;
        play();
        createHint(hint);
    }
    
}

function createHint(hintword){
    let hinttext= document.createElement('h2');
    hinttext.innerText= hintword;
    document.getElementById('hintdiv').appendChild(hinttext);
};

function play(){
    document.getElementById('startplaying').disabled= true;
    document.getElementById('startplaying').hidden= true;
    
    //Create undescore based on the word
    //unsdiv.textContent= "";
    for(i= 0; i<wordtoguess.length; i++){
        let element= document.createElement('span');
        element.setAttribute("id", "Span" + i);
        element.innerText= '_ ';
        unsdiv.appendChild(element);
    }
    livesdiv.innerText= lives;
};

document.onkeyup = function (event){
    userKey = event.key;
    if (wordsplit.includes(userKey)){ 
        for(i= 0; i<wordsplit.length; i++){
            if(wordsplit[i]=== userKey){
                delete wordsplit[i]
                console.log(wordsplit);
                remainingletters-=1;
                console.log(remainingletters);
                document.getElementById('Span'+i).textContent=userKey;
                if(remainingletters==0){
                    document.getElementById('WinorLose').textContent= "You Win!!";
                    points=points+1;
                    pointsdiv.innerText= points;
                    pagainbtn.disabled= false;
                    pagainbtn.hidden= false;
                }
            }
        }
    } else{
        lives-=1;
        console.log(lives);
        livesdiv.innerText= lives;
        if(lives==0){
            document.getElementById('WinorLose').textContent= "You Lose!!";
            document.getElementById('hintdiv').textContent="";
            unsdiv.textContent= "";
            livesdiv.hidden= true;
            pagainbtn.disabled= false;
            pagainbtn.hidden= false;
        }
    }
};

function playagain(){
    
    unsdiv.textContent= "";
    pagainbtn.disabled=true;
    pagainbtn.hidden= true;
    document.getElementById('hintdiv').textContent="";
    document.getElementById('WinorLose').textContent= "";
    hint= "";
    wordtoguess= "";
    remainingletters= "";
    categorie= "";
    words= "";
    obj_keys= "";
    selectedword= "";
    underscore= [];
    userKey= "";
    wordsplit= "";
    lives=10;
    livesdiv.hidden= false;
    goGame();
}