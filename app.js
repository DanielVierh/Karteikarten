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

const filterOption = document.querySelector('.filter-todo');
filterOption.addEventListener('click', filterTodo);

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
    console.log("In CreateCard");
    try{
        console.log("In CreateCard Try");
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
            window.scrollTo(0, 130);
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
    try {
        zufallsKarte.wissenstandZaehler += 1;
        document.getElementById('kartei_Begriff').innerHTML = "";
        document.getElementById('kartei_RuecksBegriff').innerHTML = "";
        cardDiscovered = false;
        saveCards();
        createCard();
    } catch (error) {
        console.log(error);
    }
}

// Nicht gewusst 
var buttonNichtGewusst = document.getElementById('btn_NichtGewusst');
if(buttonNichtGewusst) {
    buttonNichtGewusst.addEventListener('click', nichtGewusst);
}

function nichtGewusst() {
    try {
        if(zufallsKarte.wissenstandZaehler >= 1) {
            zufallsKarte.wissenstandZaehler -= 1;
            document.getElementById('kartei_Begriff').innerHTML = "";
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            cardDiscovered = false;
            saveCards();
            createCard();
        }else{
            document.getElementById('kartei_Begriff').innerHTML = "";
            document.getElementById('kartei_RuecksBegriff').innerHTML = "";
            cardDiscovered = false;
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
var buttonSaveNewKarteikarte = document.getElementById('btnSaveNewKarteikarte');
if(buttonSaveNewKarteikarte) {
    buttonSaveNewKarteikarte.addEventListener('click', function() {
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
        console.log("Card´s saved");
    }

    function loadCards() {
        arrKarteikarten = JSON.parse(localStorage.getItem("storedCards"));
        console.log("Card´s loaded");
    }


    // Scroll up
function scroll_UP() {
    window.scrollTo(0, 0);
    console.log("ScrollUP");
}

function scroll_to_New() {
    window.scrollTo(0, 900);
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

function filterTodo(e) {
        switch(e.target.value){
            case "Alle":
                document.getElementById('filterAnzahl').innerHTML = "( " + arrKarteikarten.length + " )";
                filterOpt = "Alle";
                createCard();
                break;
            case "Neu":
                checkFilterElemente("NEU");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " )";
                    filterzaehler = 0;
                    filterOpt = "Neu";
                    createCard();
                }else{
                    alert("Es gibt keine Karteikarten im Stapel (NEU)");
                    location.reload();
                }
                break;
            case "level1":
                checkFilterElemente("Kann ich noch nicht");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " )";
                    filterzaehler = 0;
                    filterOpt = "level1";
                    createCard();
                }else{
                    alert("Es gibt keine Karteikarten im Stapel (Kann ich noch nicht)");
                    location.reload();
                }
                break;
            case "level2":
                checkFilterElemente("Habe ich ein bisschen drauf");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " )";
                    filterzaehler = 0;
                    filterOpt = "level2";
                    createCard();
                }else{
                    alert("Es gibt keine Karteikarten im Stapel (Habe ich ein bisschen drauf)");
                    location.reload();
                }
                break;
            case "level3":
                checkFilterElemente("Kann ich schon ganz gut");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " )";
                    filterzaehler = 0;
                    filterOpt = "level3";
                    createCard();
                }else{
                    alert("Es gibt keine Karteikarten im Stapel (Kann ich schon ganz gut)");
                    location.reload();
                }
                break;
            case "level4":
                checkFilterElemente("Voll verstanden");
                if( gefilterteKarteikarten.length >= 1) {
                    document.getElementById('filterAnzahl').innerHTML = "( " + gefilterteKarteikarten.length + " )";
                    filterzaehler = 0;
                    filterOpt = "level4";
                    createCard();
                }else{
                    alert("Es gibt keine Karteikarten im Stapel (Voll verstanden)");
                    location.reload();
                }
                break;
            default:
                console.log("Error bei Switch");
        }    
    }

// Funktion um vorhandensein des Filters zu checken
    function checkFilterElemente(filterParameter) {
        var isAvailable = false;
        var vergleichswort = "";
        gefilterteKarteikarten = [];
        for(var i= 0 ; i < arrKarteikarten.length; i++) {
            vergleichswort = arrKarteikarten[i].wissensstand;
            if(vergleichswort == filterParameter) {
                isAvailable = true;
                gefilterteKarteikarten.push(i);
            }
        }  
    }