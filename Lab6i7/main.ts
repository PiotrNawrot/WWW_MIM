let form = document.querySelector("#reservation_form") as HTMLFormElement;
let submitButton = document.querySelector("input[type=submit]") as HTMLInputElement;
let resetButton = document.querySelector("input[type=reset]") as HTMLInputElement;

let nameInput = document.querySelector("input[name=name]") as HTMLInputElement;
let dateInput = document.querySelector("input[name=date]") as HTMLInputElement;
let fromInput = document.querySelector("select[name=origin]") as HTMLInputElement;
let toInput = document.querySelector("select[name=destination]") as HTMLInputElement;

let popupAlert = document.querySelector('#hide_square') as HTMLElement;
let popupMessege = document.querySelector('#popup_messege') as HTMLElement;
let closePopUpButton = document.querySelector('#close_popup') as HTMLButtonElement;

let listOfFlights = document.querySelector('#flight_table') as HTMLElement;

let changesTable = document.querySelector('#flight_changes_table') as HTMLTableElement;

setDefaultsOnWebsite();

function setDefaultsOnWebsite() {
    // createDivAppendToBody("cześć wszystkim");

    resetButton.addEventListener("click", (e:Event) => fillFormWithDefault(e));
    closePopUpButton.onclick = () => {
        hideElement(popupAlert);
    }

    // teczoweKolory2(listOfFlights);
    fetchGithubPicture();
    // Zadanie7_1();
    // Zadanie7_2();
    // Zadanie7_3();
    Zadanie7_4();
}

function Zadanie7_1() {
    changesTable.addEventListener("click", colorRightColumn);
    form.addEventListener("click", colorRightColumn);

    // Czy kliknięcie w pole input formularza zmienia kolor tła? Ilu handlerów potrzeba do zrobienia zadania?
    // Tak, 2, jeden dla formularza, jeden dla tabeli opoznien
}

function handleClickWithTarget(ev: MouseEvent) {
    const target = event.target as Node;

    if (changesTable.contains(target) || form.contains(target)){
        colorRightColumn();
    }
}

function Zadanie7_2() {
    const wholeGrid = document.querySelector('#grid_container') as HTMLElement;

    wholeGrid.addEventListener("click", handleClickWithTarget);
}

function Zadanie7_3() {
    changesTable.addEventListener("click", colorRightColumn);
}

function Zadanie7_4() {
    const submitButtonListener = () => {
        if (valid_form()) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'yes');
        }
    }

    submitButtonListener();

    form.addEventListener("input", submitButtonListener);
    submitButton.addEventListener("click", (e:Event) => presentReservationForm(e));
}

function presentReservationForm(e : Event) {
    e.preventDefault();

    const wiadomosc = "Udało się\n" +
    `Pasazer: ${nameInput.value}\n` +
    `Skąd: ${fromInput.value}\n` +
    `Dokąd: ${toInput.value}\n` +
    `Data: ${dateInput.value}\n`;

    showPopUp(wiadomosc);
}

function fib(x : number) : number {
    if (x <= 1) return 1;

    return fib(x - 1) + fib(x - 2);
}

let clicks = 0;

function colorRightColumn() {
    console.log(fib(10 * clicks++)); // Zadanie 7_4
    // Przeglądarka po kilku kliknięciach się zawiesza, bo obliczenia trwają są zbyt kosztowne

    const currentColor = window.getComputedStyle(form).getPropertyValue('background-color');
    const [_,...colorsAsText] =/rgb[a]?\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)[,]?[^0-9]*(\d*)\)/.exec(currentColor);
    const colors: number[] = [];
    for(let i = 0; i < 3; i++) colors[i] = (Number(colorsAsText[i]) + 0x20) % 256;

    changesTable.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
    form.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

async function fetchGithubPicture() {
    const baseUrl = 'https://api.github.com/repos/Microsoft/TypeScript/commits';

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

function fillFormWithDefault(e : Event) {
    e.preventDefault();
    nameInput.value = ""
    dateInput.value = getCurrentDate();
}

function getCurrentDate() : string {
    return new Date().toISOString().slice(0, 10);
}

function valid_form() : boolean {
    if (dateInput.value === "" || dateInput.value < getCurrentDate()) {
        return false;
    }

    const nameSplit : string[] = nameInput.value.split(' ');

    if (nameSplit.length !== 2) {
        return false;
    }

    if (nameSplit[0] === "" || nameSplit[1] === "") {
        return false;
    }

    return true;
}

function showPopUp(messege : string) {
    popupMessege.innerHTML = messege;
    showElement(popupAlert);
}

function showElement(element : HTMLElement) {
    element.style.visibility = 'visible';

    if (element instanceof HTMLInputElement)
        element.disabled = false;
}

function hideElement(element : HTMLElement) {
    element.style.visibility = 'hidden';

    if (element instanceof HTMLInputElement)
        element.disabled = true;
}

function createDivAppendToBody(text: string) {
    const newElement = document.createElement('div');
    newElement.textContent = text;
    document.body.appendChild(newElement);
}

function createImgAppendToBody(sourceUrl: string) {
    const newElement = document.createElement('img');
    newElement.src = sourceUrl;
    document.body.appendChild(newElement);
}
