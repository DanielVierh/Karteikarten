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
"Weiß noch nicht",
0);

var k_8455 = new Karteikarte("Polymorphie","Polymorphie bedeutet Vielgestaltigkeit und beschreibt die Fähigkeit von Subklassen (abgeleiteten Klassen),die Methoden der Basisklasse mit unterschiedlichen Implementierungen zu verwenden.",
false,
"Kenne ich",
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
    document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff;
    document.getElementById('kartei_wissensstand').innerHTML = "Stapel: " + zufallsKarte.wissensstand;
}


function flipCard() {

    if(cardDiscovered == false) {
        //document.getElementById('btnCard').style.backgroundColor = "lightblue";
        document.getElementById('kartei_RuecksBegriff').innerHTML = zufallsKarte.begriff;
        document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.beschreibung;
        document.getElementById('btnCard').style.boxShadow = "9px 9px 16px black;";
        cardDiscovered = true;
    }else{
        //document.getElementById('btnCard').style.backgroundColor = "yellow";
        //document.getElementById('kartei_Begriff').innerHTML = uebertrag;
        document.getElementById('kartei_RuecksBegriff').innerHTML = ("");
        cardDiscovered = false;
        createCard();
    }
    
}


// Für Flip Card Effekt
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card