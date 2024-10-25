const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector(".btn");
const input = document.querySelector(".amount input");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

let updateExchangeRate = async ()=>{
    let amountDiv = document.querySelector(".amount input");
    let amount = amountDiv.value;
    if(amount === "" || amount < 0){
        amount = 1;
        amountDiv.value = "1";
    }
    const countryName1 = fromCurr.value.toLowerCase();
    const countryName2 = toCurr.value.toLowerCase();
    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${countryName1}.json`;
    let currency = await fetch(URL);
    let currencyData = await currency.json();
    let currencyObj = currencyData[countryName1];
    let finalAmount = amount * currencyObj[countryName2];
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}

const updateFlag = (element)=>{
    const currCode = element.value;
    let countryCode = countryList[currCode];
    let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flag;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", updateExchangeRate);

input.addEventListener("input", updateExchangeRate);

