var cardDiscovered = false;
var arrKarteikarten = [];
var arrLength = arrKarteikarten.length;
var zufallsZahl = 0;
var zufallsKarte = "";
var Card_Id = "";
var filterOpt = "Alle";
var gefilterteKarteikarten = [];
var filterzaehler = 0;
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

const filterOption = document.querySelector('.filter-liste');
filterOption.addEventListener('click', filterListe);

var buttonCard = document.getElementById('btnCard');
if(buttonCard) {
    buttonCard.addEventListener('click', flipCard);
}

// Load Content
document.addEventListener('DOMContentLoaded', loadCont);
function loadCont() {
    if(localStorage.getItem('storedCards') === null){
        console.log("Laden hat NICHT geklappt");
    }else{
        console.log("Laden hat geklappt");
        loadCards();
        arrLength = arrKarteikarten.length;
        document.getElementById('anzKarten').innerHTML = "Karteikarten (" + arrLength + ")";
        document.getElementById('filterAnzahl').innerHTML = "( " + arrKarteikarten.length + " )";
    }
    console.log(arrKarteikarten);
    createCard();
}

// Erstellt neue Random Card
function createCard() {
    try{
        // Filter = Alle
        if (filterOpt == "Alle") {
            console.log("In CreateCard ALLE");
            const arrLength = arrKarteikarten.length;
            zufallsZahl = parseInt(Math.random() * arrLength);
            zufallsKarte = arrKarteikarten[zufallsZahl];
            wissensstandAbfrage();
            var x_1 = document.getElementById('kartei_Begriff');
            if(x_1){
            document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff; 
            }
            // Filter = NEU
        }else if(filterOpt == "Neu" || filterOpt == "level1" || filterOpt == "level2" || filterOpt == "level3" || filterOpt == "level4") {
            if(filterzaehler <= gefilterteKarteikarten.length -1) {
                zufallsKarte = arrKarteikarten[gefilterteKarteikarten[filterzaehler]];
                wissensstandAbfrage();
                document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff; 
                filterzaehler += 1;
            }else{
                const nochmal = window.confirm("Das waren alle Karteikarten aus dem gefilterten Stapel. Nochmal von vorne?");
                if (nochmal == true) {
                    filterzaehler = 0;
                    createCard();
                }else{
                    location.reload();
                }
            }
        }

    }catch (error){
        document.getElementById('kartei_Begriff').innerHTML = "LEER";
        console.log(error);
    }
}


// Flip Card
function flipCard() {

    if(cardDiscovered == false) {
        try{
            scroll_to_Card();
            document.getElementById('kartei_RuecksBegriff').innerHTML = zufallsKarte.begriff;
            document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.beschreibung;
            cardDiscovered = true;
        }catch(error){
            console.log("Karte konnte nicht umgedreht werden");
            console.log(error);
        }
    }else{
        try {
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            document.getElementById('kartei_Begriff').innerHTML = zufallsKarte.begriff;
            //createCard();
            cardDiscovered = false;
        } catch (error) {
            console.log(error);
        }
    }
}

// Gewusst
function gewusst() {
    try {
        zufallsKarte.wissenstandZaehler += 1;
        document.getElementById('kartei_Begriff').innerHTML = "";
        document.getElementById('kartei_RuecksBegriff').innerHTML = "";
        cardDiscovered = false;
        wissensstandAbfrage();
        saveCards();
        createCard();
    } catch (error) {
        console.log(error);
    }
}

// Nicht gewusst 
function nichtGewusst() {
    try {
        if(zufallsKarte.wissenstandZaehler >= 1) {
            zufallsKarte.wissenstandZaehler -= 1;
            document.getElementById('kartei_Begriff').innerHTML = "";
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            cardDiscovered = false;
            zufallsKarte.abgefragt = true;
            wissensstandAbfrage();
            saveCards();
            createCard();
        }else{
            document.getElementById('kartei_Begriff').innerHTML = "";
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            cardDiscovered = false;
            zufallsKarte.abgefragt = true;
            createCard();
        }
        
    } catch (error) {
        console.log(error);
    }
}



// Aktualisiert Wissensstand
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
function save_New_Card() {
    var newTerm = document.getElementById('txtBegriff').value;
    var newDescr = document.getElementById('txtBeschreibung').value;

    if(checkWort(newTerm) && checkWort(newDescr)) {
        if(arrKarteikarten == null) {
          arrKarteikarten = [];
          arrKarteikarten.push(new Karteikarte(newTerm,newDescr,false,"NEU",0));     
        }else{
          arrKarteikarten.push(new Karteikarte(newTerm,newDescr,false,"NEU",0));  
        }
        document.getElementById('txtBegriff').value = "";
        document.getElementById('txtBeschreibung').value = "";
         // Save
        saveCards();
        alert("Die Karteikarte wurde erfolgreich gespeichert");
        document.getElementById("txtBegriff").focus();           
    }else{
        alert("Bitte beide Textfelder ausfüllen!");
    }
}

    function checkWort(wrt) {
        if (wrt == "") {
            return false;
        }else{
            return true;
        }
    }
// Save Cards
    function saveCards() {
        localStorage.setItem("storedCards", JSON.stringify(arrKarteikarten));
        console.log("Card´s saved");
    }
//Load Cards
    function loadCards() {
        arrKarteikarten = JSON.parse(localStorage.getItem("storedCards"));
        console.log("Card´s loaded");
    }

// //=====================================================================================================================================
    // Scroll up / Down
function scroll_UP() {
    window.scrollTo(0, 0);
    console.log("ScrollUP");
}

function scroll_to_New() {
    window.scrollTo(0, 1150);
}

function scroll_to_Card() {
    window.scrollTo(0, 420);
}

//=====================================================================================================================================

// Refresh Page
function refresh_Page() {
    location.reload();
}


// Delete current word
function deleteCurrent(){
    try {
        const decision = window.confirm("Karteikarte: (" + zufallsKarte.begriff + ") wirklich löschen?");
        if(decision) {
            arrKarteikarten.splice(zufallsZahl, 1);
            saveCards();
            alert("Karteikarte wurde gelöscht");
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}


//=======================================================================================================================

// Filtern  

/*Abfrageb bei switch ob filter existiert, wenn ja, ausgeben wenn nein Fehlermeldung und Filter auf Alle setzen */

function filterListe(e) {
        check_Amount_of_Elements_in_Wissensstand();
        switch(e.target.value){
            case "Alle":
                document.getElementById('filterAnzahl').innerHTML = "( " + arrKarteikarten.length + " ) Karteikarten";
                document.getElementById('filterAnzahl').style.color = "white";
                filterOpt = "Alle";
                createCard();
                break;
            case "Neu":
                checkFilterElemente("NEU");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " ) Karteikarten";
                    document.getElementById('filterAnzahl').style.color = "white";
                    filterzaehler = 0;
                    filterOpt = "Neu";
                    createCard();
                }else{
                    document.getElementById('filterAnzahl').innerHTML = "Es gibt keine Karteikarten im Stapel (NEU)";
                    document.getElementById('filterAnzahl').style.color = "red";
                }
                break;
            case "level1":
                checkFilterElemente("Kann ich noch nicht");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " ) Karteikarten";
                    document.getElementById('filterAnzahl').style.color = "white";
                    filterzaehler = 0;
                    filterOpt = "level1";
                    createCard();
                }else{
                    document.getElementById('filterAnzahl').innerHTML = "Es gibt keine Karteikarten im Stapel (Kann ich noch nicht)";
                    document.getElementById('filterAnzahl').style.color = "red";
                }
                break;
            case "level2":
                checkFilterElemente("Habe ich ein bisschen drauf");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " ) Karteikarten";
                    document.getElementById('filterAnzahl').style.color = "white";
                    filterzaehler = 0;
                    filterOpt = "level2";
                    createCard();
                }else{
                    document.getElementById('filterAnzahl').innerHTML = "Es gibt keine Karteikarten im Stapel (Habe ich ein bisschen drauf)";
                    document.getElementById('filterAnzahl').style.color = "red";
                }
                break;
            case "level3":
                checkFilterElemente("Kann ich schon ganz gut");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " ) Karteikarten";
                    document.getElementById('filterAnzahl').style.color = "white";
                    filterzaehler = 0;
                    filterOpt = "level3";
                    createCard();
                }else{
                    document.getElementById('filterAnzahl').innerHTML = "Es gibt keine Karteikarten im Stapel (Kann ich schon ganz gut)";
                    document.getElementById('filterAnzahl').style.color = "red";
                }
                break;
            case "level4":
                checkFilterElemente("Voll verstanden");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " ) Karteikarten";
                    document.getElementById('filterAnzahl').style.color = "white";
                    filterzaehler = 0;
                    filterOpt = "level4";
                    createCard();
                }else{
                    document.getElementById('filterAnzahl').innerHTML = "Es gibt keine Karteikarten im Stapel (Voll verstanden)";
                    document.getElementById('filterAnzahl').style.color = "red";
                }
                break;
            default:
                console.log("Error bei Switch");
        }    
        // Delete Button (In)visible
        if (filterOpt == "Alle") {
            document.getElementById("btnDel").style.display="block";
        }else{
            document.getElementById("btnDel").style.display="none";
        }
    }

// Funktion um vorhandensein des Filters zu checken
    function checkFilterElemente(filterParameter) {
        // var isAvailable = false;
        var vergleichswort = "";
        gefilterteKarteikarten = [];
        for(var i= 0 ; i < arrKarteikarten.length; i++) {
            vergleichswort = arrKarteikarten[i].wissensstand;
            if(vergleichswort == filterParameter) {
                // isAvailable = true;
                gefilterteKarteikarten.push(i);
            }
        }  
    }
        // Anzahl an vorhandenen Elementen anzeigen
        // opt1 = NEU // opt2 = Kann ich noch nicht // opt3 = Habe ich ein bisschen drauf // opt4 = Kann ich schon ganz gut // opt5 = Voll verstanden
    function check_Amount_of_Elements_in_Wissensstand() {
        let options = ["NEU","Kann ich noch nicht","Habe ich ein bisschen drauf","Kann ich schon ganz gut","Voll verstanden"];
        var currentAmount = 0;
        var vergleichswort = "";
        var suchwort = "";
        var amount_opt1 = 0;
        var amount_opt2 = 0;
        var amount_opt3 = 0;
        var amount_opt4 = 0;
        var amount_opt5 = 0;

        for(var i = 0; i < options.length; i++) {
            suchwort = options[i];
            
            for(var j= 0 ; j < arrKarteikarten.length; j++) {
                vergleichswort = arrKarteikarten[j].wissensstand;
                if(vergleichswort == suchwort) {
                    currentAmount += 1;
                }
            }
                switch (i) {
                    case 0:
                        amount_opt1 = currentAmount;
                        currentAmount = 0;
                        break;
                    case 1:
                        amount_opt2 = currentAmount;
                        currentAmount = 0;
                        break;
                    case 2:
                        amount_opt3 = currentAmount;
                        currentAmount = 0;
                        break;
                    case 3:
                        amount_opt4 = currentAmount;
                        currentAmount = 0;
                        break;
                    case 4:
                        amount_opt5 = currentAmount;
                        currentAmount = 0;
                        break;
                    default:
                        break;
                }
        }
        document.getElementById('opt1').innerHTML = "NEU (" + amount_opt1 + ")";
        document.getElementById('opt2').innerHTML = "Kann ich noch nicht (" + amount_opt2 + ")";
        document.getElementById('opt3').innerHTML = "Habe ich ein bisschen drauf (" + amount_opt3 + ")";
        document.getElementById('opt4').innerHTML = "Kann ich schon ganz gut (" + amount_opt4 + ")";
        document.getElementById('opt5').innerHTML = "Voll verstanden (" + amount_opt5 + ")";
    }