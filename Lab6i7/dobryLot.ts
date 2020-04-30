let passengers_table = document.querySelectorAll("li");
let bestPassenger = passengers_table[0];
let currentId = bestPassenger.getAttribute('data-identyfikator-pasazera');

function najwiekszyLeksykograficznieId() : string {
    let passengerName = "default";
   
    for(let i = 0; i < passengers_table.length; i++){
        if (passengers_table[i].className == "passenger") {
            console.log(passengers_table[i].getAttribute('data-identyfikator-pasazera'));
        }
    }

    return passengerName;
}

passengers_table.forEach((passenger) => {
    if (passenger.className == "passenger") {
        let passengerId = passenger.getAttribute('data-identyfikator-pasazera');

        if (passengerId > currentId){
            currentId = passengerId;
            bestPassenger = passenger;
        }
    }
})

setTimeout(() => {

    console.log('No już wreszcie.');
  
}, 2000);

console.log(`Imię i nazwisko pasazera o największym id: ${bestPassenger.innerText}`);

