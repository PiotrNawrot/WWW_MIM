let passengersTable = document.querySelectorAll("li");
let bestPassenger = passengersTable[0];
let currentId = bestPassenger.getAttribute('data-identyfikator-pasazera');

passengersTable.forEach((passenger) => {
    if (passenger.className === "passenger") {
        const passengerId = passenger.getAttribute('data-identyfikator-pasazera');

        if (passengerId > currentId){
            currentId = passengerId;
            bestPassenger = passenger;
        }
    }
})

console.log(`Imię i nazwisko pasazera o największym id: ${bestPassenger.innerText}`);

