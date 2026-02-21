const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtm = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_+-=[]:;<>';


let password = "";
let passwordLength = 10;
let checkCount = 0;

//set strength circle to gray

handleSlider();

//set indicator call
setIndicator("#ccc");


//set password length through slider
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}


function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min) + min);

}

function getRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}


function generateSymbols(){
    const randomNo = getRndInteger(0,symbols.length);
    return symbols.charAt(randomNo);
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbols = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbols = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbols) && passwordLength >= 8) setIndicator("#0f0");
    else if((hasLower || hasUpper) && (hasSymbols||hasNumber) && passwordLength >=6) setIndicator("#ff0");
    else setIndicator("#f00");
}

function shufflePassword(array){
    //fisher yates method

    for(let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=>(str += el));
    return str;
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText = "Copied!";
    }
    catch(c){
        copymsg.innerText = "Failed";
    }

    //to make copy popup disable
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active")
    }, 3000);
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = Number(e.target.value);
    handleSlider();
});


copybtm.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
});

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
});



handleCheckBoxChange();


generateBtn.addEventListener('click',()=>{
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //finding new password
    //remove old assword
    password = "";

    //put the stuff mentioned in checkboxes




    //no need this logic better logic are below;

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += getRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbols();
    // }

    
    let funcArr = [];
    
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);     
    }
    if(numbersCheck.checked){
        funcArr.push(getRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbols);
    }


    //compalsury addition

    for(let i = 0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    //remaning additipon

    for(let i = 0; i<(passwordLength - funcArr.length); i++){
        let randonIDX = getRndInteger(0 , funcArr.length);
            
        password += funcArr[randonIDX]();

    }



    //shuffle the password

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    //update the password in ui
    calcStrength();

});
