// div who contain all the dishes
const elShowData = document.getElementById("show-data");

// button who can add a new dish
const elAddData = document.getElementById("add-data");
elAddData.addEventListener("click", addData);

// input who contain the name of the dish
const elInputData = document.getElementById("input-data");

// button who can reset the local storage of the page   
const elResetLocal = document.getElementById("reset-local");
elResetLocal.addEventListener("click", () => {
    localStorage.clear();
    showAllValue();
})

const elGenDishList = document.getElementById("gen-dish-list");
elGenDishList.addEventListener("click", genDishList);

const elNbDays = document.getElementById("nb-days");

const elDishList = document.getElementById("dish-list");

const elRemoveDish = document.getElementById("rm-data");
elRemoveDish.addEventListener("click", removeDish);

const elInputRmData = document.getElementById("input-rm-data");

function showAllValue(){
    // Clear the div, remove child until there is none
    while (elShowData.firstChild != null){
        elShowData.removeChild(elShowData.firstChild);
    }
    // Add a p tag for each value in local storage
    for(let i=0; i < localStorage.length; i++){
        let pTag = document.createElement("p");
        pTag.textContent = i + 1 + ". " + localStorage.getItem(i);
        elShowData.appendChild(pTag);
    }
}

function addData(){
    if (elInputData.value != ""){
        localStorage.setItem(localStorage.length, elInputData.value);
        elInputData.value = "";
        showAllValue();
    }
}

function genDishList(){
    elDishList.textContent = "Your dish list is ";
    let maxDays = elNbDays.value != "" ? elNbDays.value : 7;
    let dishListIndex = [];
    for(let i=0; i<maxDays ; i++){
        let Duplicate;
        let randomIndex;
        do{
            Duplicate = false;
            randomIndex = Math.floor(Math.random() * localStorage.length);
            for(let j=0; j<dishListIndex.length; j++){
                if(randomIndex === dishListIndex[j]){
                    console.log("duplicate");
                    Duplicate = true;
                    break;
                }
            }
        }while(Duplicate);
        dishListIndex.push(randomIndex);
    }
    for (let i=0; i<dishListIndex.length; i++){
        let msg = i === dishListIndex.length - 1 ? localStorage.getItem(dishListIndex[i]) : localStorage.getItem(dishListIndex[i]) + ", "; 
        elDishList.textContent += msg;
    }
}

function removeDish(){
    if (elInputRmData.value != "" && elInputRmData.value <= localStorage.length){
        localStorage.removeItem(elInputRmData.value - 1);
    }
    elInputRmData.value = "";
    showAllValue();
}

showAllValue();
