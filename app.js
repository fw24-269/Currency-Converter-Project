

  

const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector("msg");




for (let select of dropdown) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected="selected";
        }
        if(select.name === "to" && currCode === "INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}


const updateFlag = (element)=> {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})


let updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

  
    const URL = `https://api.exchangerate.host/convert?from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`;
     let response = await fetch(URL);
     console.log(response);
     let data = await response.json();
     let rate = data[toCurr.value.toLowerCase()];
     console.log(data);

     let finalAmount = amtVal*rate;
     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
}

window.addEventListener("load",(evt)=>{
    updateExchangeRate();
})
