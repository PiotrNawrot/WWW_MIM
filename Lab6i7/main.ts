let form = document.querySelector("#reservation_form") as HTMLFormElement;
let submitButton = document.querySelector("input[type=submit]") as HTMLInputElement;
let resetButton = document.querySelector("input[type=reset]") as HTMLInputElement;

let nameInput = document.querySelector("input[name=name]") as HTMLInputElement;
let dateInput = document.querySelector("input[name=date]") as HTMLInputElement;

let popupAlert = document.querySelector('#hide_square') as HTMLElement;
let popupMessege = document.querySelector('#popup_messege') as HTMLElement;
let closePopUpButton = document.querySelector('#close_popup') as HTMLButtonElement;

let listOfFlights = document.querySelector('#flight_table') as HTMLElement;

let changesTable = document.querySelector('#flight_changes_table') as HTMLTableElement;

setDefaultsOnWebsite();

function setDefaultsOnWebsite() {
    createDivAppendToBody("cześć wszystkim");

    submitButton.addEventListener("click", (e:Event) => preventDefaultAndRun(e, checkForm));
    resetButton.addEventListener("click", (e:Event) => preventDefaultAndRun(e, fillFormWithDefault));   
    closePopUpButton.onclick = () => {
        hideElement(popupAlert);
    }

    // teczoweKolory2(listOfFlights);
    fetchGithubPicture();
    // Zadanie7_1();
    Zadanie7_2();
}

function Zadanie7_1() {
    changesTable.addEventListener("click", colorRightColumn);    
    form.addEventListener("click", colorRightColumn);

    // Czy kliknięcie w pole input formularza zmienia kolor tła? Ilu handlerów potrzeba do zrobienia zadania?
    // Tak, 2, jeden dla formularza, jeden dla tabeli opoznien
}

function handleClickWithTarget(ev: MouseEvent) {
    let target = event.target as Node;

    if (changesTable.contains(target) || form.contains(target)){
        colorRightColumn();
    }
}

function Zadanie7_2() {
    let wholeGrid = document.querySelector('#grid_container') as HTMLElement;

    wholeGrid.addEventListener("click", handleClickWithTarget);
}

function colorRightColumn() {
    let currentColor = window.getComputedStyle(form).getPropertyValue('background-color');
    let [_,...colorsAsText] =/rgb[a]?\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)[,]?[^0-9]*(\d*)\)/.exec(currentColor);
    let colors: number[] = [];
    for(let i = 0; i < 3; i++) colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;

    changesTable.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
    form.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

async function fetchGithubPicture() {
    let baseUrl = 'https://api.github.com/repos/Microsoft/TypeScript/commits';

    fetch(baseUrl).then((response) => response.json())
    .then(data => {
        const imgUrl = data[0].author.avatar_url;
        createImgAppendToBody(imgUrl);
    })
    .catch((error) => {console.error(`Error: `, error)});
}

function teczoweKolory(el: HTMLElement) {
    set_timeout(1000)
    .then(() => console.log('red'))
        .then(() => el.style.backgroundColor = 'red')
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'orange'))
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'yellow'))
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'green'))
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'blue'))
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'indigo'))
    .then(() => set_timeout(1000)
        .then(() => el.style.backgroundColor = 'purple'))
    .catch(() => console.log("coś nie tak"));
}

async function teczoweKolory2(el : HTMLElement) {
    const colors = ['red', 'orange', 'yellow', 'blue', 'indigo', 'purple'];

    for (const color of colors) {
        el.style.backgroundColor = color;
        await set_timeout(1000);
    }
}

function set_timeout(timeOfTimeout : number) {
    return new Promise((resolve, reject) => setTimeout(() => {resolve()}, timeOfTimeout));
}

function preventDefaultAndRun(e:Event, someFunction) {
    e.preventDefault();
    someFunction();
}

function fillFormWithDefault() {
    nameInput.value = "Tutaj wpisz imię"
    dateInput.value = getCurrentDate();
}

function getCurrentDate() : string {
    return new Date().toISOString().slice(0, 10);
}

function checkForm() {
    if (dateInput.value == "" || dateInput.value < getCurrentDate()) { 
        showInvalidPopUp("Niepoprawna data");
        return;
    }

    if (nameInput.value == "") {
        showInvalidPopUp("Wpisz imię i nazwisko");
        return;
    }
}

function showInvalidPopUp(messege : string) {
    popupMessege.innerHTML = messege;
    showElement(popupAlert);
}

function showElement(element : HTMLElement) {
    element.style.visibility = 'visible';
}

function hideElement(element : HTMLElement) {
    element.style.visibility = 'hidden';
}

function createDivAppendToBody(text: string) {
    let newElement = document.createElement('div');
    newElement.textContent = text;
    document.body.appendChild(newElement);
}

function createImgAppendToBody(sourceUrl: string) {
    let newElement = document.createElement('img');
    newElement.src = sourceUrl;
    document.body.appendChild(newElement);
}
