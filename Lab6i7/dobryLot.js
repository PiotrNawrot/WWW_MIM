var passengersTable = document.querySelectorAll("li");
var bestPassenger = passengersTable[0];
var currentId = bestPassenger.getAttribute('data-identyfikator-pasazera');
passengersTable.forEach(function (passenger) {
    if (passenger.className === "passenger") {
        var passengerId = passenger.getAttribute('data-identyfikator-pasazera');
        if (passengerId > currentId) {
            currentId = passengerId;
            bestPassenger = passenger;
        }
    }
});
console.log("Imi\u0119 i nazwisko pasazera o najwi\u0119kszym id: " + bestPassenger.innerText);
