var cardDiscovered = false;
var arrKarteikarten = [];

var arrLength = arrKarteikarten.length;
var zufallsZahl = 0;
var zufallsKarte = "";
var Card_Id = "";

//============================================================================================================================
// Klasse Karteikarte

class Karteikarte {
    constructor(begriff, beschreibung, abgefragt, wissensstand, wissenstandZaehler) {
        this.begriff = begriff;
        this.beschreibung = beschreibung;
        this.abgefragt = abgefragt;
        this.wissensstand = wissensstand;
        this.wissenstandZaehler = wissenstandZaehler;
    }
}

//============================================================================================================================

var buttonCard = document.getElementById('btnCard');
if(buttonCard) {
    buttonCard.addEventListener('click', flipCard);
}

// Load Content
document.addEventListener('DOMContentLoaded', loadCont);
function loadCont() {
    if(localStorage.getItem('karteikarten') === null){
        console.log("Laden hat NICHT geklappt");
    }else{
        console.log("Laden hat geklappt");
        loadCards();
    }
    console.log(arrKarteikarten);
    createCard();
}

// Erstellt neue Random Card
function createCard() {
    try{
        const arrLength = arrKarteikarten.length;
        zufallsZahl = parseInt(Math.random() * arrLength);
        zufallsKarte = arrKarteikarten[zufallsZahl];
        wissensstandAbfrage();
        var x_1 = document.getElementById('kartei_Begriff');
        if(x_1){
           document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff; 
        }
    }catch{
        document.getElementById('kartei_Begriff').innerHTML = "LEER";
    }


}


// Flip Card
function flipCard() {

    if(cardDiscovered == false) {
        try{
            document.getElementById('kartei_RuecksBegriff').innerHTML = zufallsKarte.begriff;
            document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.beschreibung;
            cardDiscovered = true;
        }catch{
            console.log("Karte konnte nicht umgedreht werden");
        }
    }else{
        try {
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            //document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff;
            createCard();
            cardDiscovered = false;
        } catch (error) {
            console.log(error);
        }

    }
    
}


// Gewusst  
var buttonGewusst = document.getElementById('btn_Gewusst');
if(buttonGewusst) {
    buttonGewusst.addEventListener('click', gewusst);
}

function gewusst() {
    zufallsKarte.wissenstandZaehler += 1;
    document.getElementById('kartei_Begriff').innerHTML = "";
    document.getElementById('kartei_RuecksBegriff').innerHTML = "";
    cardDiscovered = false;
    saveCards();
    createCard();
}

// Nicht gewusst 
var buttonNichtGewusst = document.getElementById('btn_NichtGewusst');
if(buttonNichtGewusst) {
    buttonNichtGewusst.addEventListener('click', nichtGewusst);
}

function nichtGewusst() {
    if(zufallsKarte.wissenstandZaehler >= 1) {
        zufallsKarte.wissenstandZaehler -= 1;
        document.getElementById('kartei_Begriff').innerHTML = "";
        document.getElementById('kartei_RuecksBegriff').innerHTML = "";
        cardDiscovered = false;
        saveCards();
    }
    createCard();
}


function wissensstandAbfrage() {
    if(zufallsKarte.wissenstandZaehler == 0 && zufallsKarte.abgefragt == false) {
        zufallsKarte.wissensstand = "NEU";
    }else if(zufallsKarte.wissenstandZaehler == 0 && zufallsKarte.abgefragt == true) {
        zufallsKarte.wissensstand = "Kann ich noch nicht";
        zufallsKarte.abgefragt = true;
    }else if(zufallsKarte.wissenstandZaehler > 0 && zufallsKarte.wissenstandZaehler <= 4) {
        zufallsKarte.wissensstand = "Habe ich ein bisschen drauf";
        zufallsKarte.abgefragt = true;
    }else if(zufallsKarte.wissenstandZaehler > 4 && zufallsKarte.wissenstandZaehler <= 8) {
        zufallsKarte.wissensstand = "Kann ich schon ganz gut";
        zufallsKarte.abgefragt = true;
    }else if(zufallsKarte.wissenstandZaehler > 8) {
        zufallsKarte.wissensstand = "Voll verstanden";
        zufallsKarte.abgefragt = true;
    }
    var x_1 = document.getElementById('kartei_wissensstand');
    if(x_1) {
       document.getElementById('kartei_wissensstand').innerHTML = "Stapel: " + zufallsKarte.wissensstand + " [" + zufallsKarte.wissenstandZaehler + " mal gewusst]"; 
    }
}

// ===================================================================================================================================================================
// NEUE KARTEIKARTE
// Neue Karteikarte speichern
var buttonSaveNewKarteikarte = document.getElementById('btnSaveNewKarteikarte');
if(buttonSaveNewKarteikarte) {
    buttonSaveNewKarteikarte.addEventListener('click', function() {
        var newTerm = document.getElementById('txtBegriff').value;
        var newDescr = document.getElementById('txtBeschreibung').value;

        if(checkWort(newTerm) && checkWort(newDescr)) {
            //let k_47851 = new Karteikarte(newTerm,newDescr,false,"NEU",0);
            if(arrKarteikarten == null) {
              arrKarteikarten = [];
              arrKarteikarten.push(new Karteikarte(newTerm,newDescr,false,"NEU",0));     
            }else{
              arrKarteikarten.push(new Karteikarte(newTerm,newDescr,false,"NEU",0));  
            }
            document.getElementById('txtBegriff').value = "";
            document.getElementById('txtBeschreibung').value = "";
            // // Save
            saveCards();           
        }else{
            alert("Bitte beide Textfelder ausfüllen!");
        }
    }
    )};

    function checkWort(wrt) {
        if (wrt == "") {
            return false;
        }else{
            return true;
        }
    }

    function saveCards() {
        localStorage.setItem("storedCards", JSON.stringify(arrKarteikarten));
    }

    function loadCards() {
        arrKarteikarten = JSON.parse(localStorage.getItem("storedCards"));
    }
