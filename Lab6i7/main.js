var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var form = document.querySelector("#reservation_form");
var submitButton = document.querySelector("input[type=submit]");
var resetButton = document.querySelector("input[type=reset]");
var nameInput = document.querySelector("input[name=name]");
var dateInput = document.querySelector("input[name=date]");
var fromInput = document.querySelector("select[name=origin]");
var toInput = document.querySelector("select[name=destination]");
var popupAlert = document.querySelector('#hide_square');
var popupMessege = document.querySelector('#popup_messege');
var closePopUpButton = document.querySelector('#close_popup');
var listOfFlights = document.querySelector('#flight_table');
var changesTable = document.querySelector('#flight_changes_table');
setDefaultsOnWebsite();
function setDefaultsOnWebsite() {
    // createDivAppendToBody("cześć wszystkim");
    resetButton.addEventListener("click", function (e) { return fillFormWithDefault(e); });
    closePopUpButton.onclick = function () {
        hideElement(popupAlert);
    };
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
function handleClickWithTarget(ev) {
    var target = event.target;
    if (changesTable.contains(target) || form.contains(target)) {
        colorRightColumn();
    }
}
function Zadanie7_2() {
    var wholeGrid = document.querySelector('#grid_container');
    wholeGrid.addEventListener("click", handleClickWithTarget);
}
function Zadanie7_3() {
    changesTable.addEventListener("click", colorRightColumn);
}
function Zadanie7_4() {
    var submitButtonListener = function () {
        if (valid_form()) {
            submitButton.removeAttribute('disabled');
        }
        else {
            submitButton.setAttribute('disabled', 'yes');
        }
    };
    submitButtonListener();
    form.addEventListener("input", submitButtonListener);
    submitButton.addEventListener("click", function (e) { return presentReservationForm(e); });
}
function presentReservationForm(e) {
    e.preventDefault();
    var wiadomosc = "Udało się\n" +
        ("Pasazer: " + nameInput.value + "\n") +
        ("Sk\u0105d: " + fromInput.value + "\n") +
        ("Dok\u0105d: " + toInput.value + "\n") +
        ("Data: " + dateInput.value + "\n");
    showPopUp(wiadomosc);
}
function fib(x) {
    if (x <= 1)
        return 1;
    return fib(x - 1) + fib(x - 2);
}
var clicks = 0;
function colorRightColumn() {
    console.log(fib(10 * clicks++)); // Zadanie 7_4
    // Przeglądarka po kilku kliknięciach się zawiesza, bo obliczenia trwają są zbyt kosztowne
    var currentColor = window.getComputedStyle(form).getPropertyValue('background-color');
    var _a = /rgb[a]?\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)[,]?[^0-9]*(\d*)\)/.exec(currentColor), _ = _a[0], colorsAsText = _a.slice(1);
    var colors = [];
    for (var i = 0; i < 3; i++)
        colors[i] = (Number(colorsAsText[i]) + 0x20) % 256;
    changesTable.style.backgroundColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
    form.style.backgroundColor = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
}
function fetchGithubPicture() {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl;
        return __generator(this, function (_a) {
            baseUrl = 'https://api.github.com/repos/Microsoft/TypeScript/commits';
            fetch(baseUrl).then(function (response) { return response.json(); })
                .then(function (data) {
                var imgUrl = data[0].author.avatar_url;
                createImgAppendToBody(imgUrl);
            })["catch"](function (error) { console.error("Error: ", error); });
            return [2 /*return*/];
        });
    });
}
function teczoweKolory(el) {
    set_timeout(1000)
        .then(function () { return console.log('red'); })
        .then(function () { return el.style.backgroundColor = 'red'; })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'orange'; }); })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'yellow'; }); })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'green'; }); })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'blue'; }); })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'indigo'; }); })
        .then(function () { return set_timeout(1000)
        .then(function () { return el.style.backgroundColor = 'purple'; }); })["catch"](function () { return console.log("coś nie tak"); });
}
function teczoweKolory2(el) {
    return __awaiter(this, void 0, void 0, function () {
        var colors, _i, colors_1, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    colors = ['red', 'orange', 'yellow', 'blue', 'indigo', 'purple'];
                    _i = 0, colors_1 = colors;
                    _a.label = 1;
                case 1:
                    if (!(_i < colors_1.length)) return [3 /*break*/, 4];
                    color = colors_1[_i];
                    el.style.backgroundColor = color;
                    return [4 /*yield*/, set_timeout(1000)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function set_timeout(timeOfTimeout) {
    return new Promise(function (resolve, reject) { return setTimeout(function () { resolve(); }, timeOfTimeout); });
}
function fillFormWithDefault(e) {
    e.preventDefault();
    nameInput.value = "";
    dateInput.value = getCurrentDate();
}
function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}
function valid_form() {
    if (dateInput.value === "" || dateInput.value < getCurrentDate()) {
        return false;
    }
    var nameSplit = nameInput.value.split(' ');
    if (nameSplit.length !== 2) {
        return false;
    }
    if (nameSplit[0] === "" || nameSplit[1] === "") {
        return false;
    }
    return true;
}
function showPopUp(messege) {
    popupMessege.innerHTML = messege;
    showElement(popupAlert);
}
function showElement(element) {
    element.style.visibility = 'visible';
    if (element instanceof HTMLInputElement)
        element.disabled = false;
}
function hideElement(element) {
    element.style.visibility = 'hidden';
    if (element instanceof HTMLInputElement)
        element.disabled = true;
}
function createDivAppendToBody(text) {
    var newElement = document.createElement('div');
    newElement.textContent = text;
    document.body.appendChild(newElement);
}
function createImgAppendToBody(sourceUrl) {
    var newElement = document.createElement('img');
    newElement.src = sourceUrl;
    document.body.appendChild(newElement);
}
