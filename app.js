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

document.getElementById('btnCard').addEventListener('click', flipCard);
document.addEventListener('DOMContentLoaded', createCard);

// Objekte erstellen
var k_4711 = new Karteikarte(
 "Unified Modeling Language",
 "Die UML ist eine standardisierte Notation zur Darstellung von Informationen über Symbole und Texte. Sie dient der Modellierung objektorientierter Softwaresysteme.",
 false,
 "NEU",
 0);

var k_0815 = new Karteikarte(
"Shared-Methoden",
"Freigegebene Methoden. Können aufgerufen werden, ohne dass eine Instanz der Klasse erstellt wird. Beispiele sind die Methoden Format, Compare, Concat der Klasse String.",
false,
"NEU",
0);

var k_8455 = new Karteikarte("Polymorphie","Polymorphie bedeutet Vielgestaltigkeit und beschreibt die Fähigkeit von Subklassen (abgeleiteten Klassen),die Methoden der Basisklasse mit unterschiedlichen Implementierungen zu verwenden.",
false,
"NEU",
0);

// Noch manuelles hinzufügen zum Array
arrKarteikarten.push(k_4711);
arrKarteikarten.push(k_0815);
arrKarteikarten.push(k_8455);

// Erstellt neue Random Card
function createCard() {
    const arrLength = arrKarteikarten.length;
    zufallsZahl = parseInt(Math.random() * arrLength);
    zufallsKarte = arrKarteikarten[zufallsZahl];
    wissensstandAbfrage();
    document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff;
    
}


// Flip Card
function flipCard() {

    if(cardDiscovered == false) {
        document.getElementById('kartei_RuecksBegriff').innerHTML = zufallsKarte.begriff;
        document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.beschreibung;
        cardDiscovered = true;
    }else{
        document.getElementById('kartei_RuecksBegriff').innerHTML = "";
        document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff;
        cardDiscovered = false;
    }
    
}


// Gewusst  
document.getElementById('btn_Gewusst').addEventListener('click', function() {
    zufallsKarte.wissenstandZaehler += 1;
    document.getElementById('kartei_Begriff').innerHTML = "";
    document.getElementById('kartei_RuecksBegriff').innerHTML = "";
    cardDiscovered = false;

    createCard();
});

// Nicht gewusst 
document.getElementById('btn_NichtGewusst').addEventListener('click', function() {
    if(zufallsKarte.wissenstandZaehler >= 1) {
        zufallsKarte.wissenstandZaehler -= 1;
        document.getElementById('kartei_Begriff').innerHTML = "";
        document.getElementById('kartei_RuecksBegriff').innerHTML = "";
        cardDiscovered = false;

    }
    createCard();
});


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
    document.getElementById('kartei_wissensstand').innerHTML = "Stapel: " + zufallsKarte.wissensstand + " [" + zufallsKarte.wissenstandZaehler + " mal gewusst]";
}

// Für Flip Card Effekt
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card