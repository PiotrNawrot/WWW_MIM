var passengers_table = document.querySelectorAll("li");
var bestPassenger = passengers_table[0];
var currentId = bestPassenger.getAttribute('data-identyfikator-pasazera');
function najwiekszyLeksykograficznieId() {
    var passengerName = "default";
    for (var i = 0; i < passengers_table.length; i++) {
        if (passengers_table[i].className == "passenger") {
            console.log(passengers_table[i].getAttribute('data-identyfikator-pasazera'));
        }
    }
    return passengerName;
}
passengers_table.forEach(function (passenger) {
    if (passenger.className == "passenger") {
        var passengerId = passenger.getAttribute('data-identyfikator-pasazera');
        if (passengerId > currentId) {
            currentId = passengerId;
            bestPassenger = passenger;
        }
    }
});
setTimeout(function () {
    console.log('No już wreszcie.');
}, 2000);
console.log("Imi\u0119 i nazwisko pasazera o najwi\u0119kszym id: " + bestPassenger.innerText);
