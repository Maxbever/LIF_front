import Data from "./ts/data";

const button_floor0 = document.getElementById('floor0') as HTMLButtonElement;
const button_floor2 = document.getElementById('floor2') as HTMLButtonElement;
const button_floor2Eco = document.getElementById('floor2Eco') as HTMLButtonElement;
const button_floor3 = document.getElementById('floor3') as HTMLButtonElement;
const button_floor4 = document.getElementById('floor4') as HTMLButtonElement;
const div_back_ground = document.getElementById('back_ground') as HTMLDivElement;

button_floor0.addEventListener("click",function (){
    removeClass()
    div_back_ground.classList.add("floor0")
})

button_floor2.addEventListener("click",function (){
    removeClass()
    div_back_ground.classList.add("floor2")
})

button_floor2Eco.addEventListener("click",function (){
    removeClass()
    div_back_ground.classList.add("floor2Eco")
})

button_floor3.addEventListener("click",function (){
    removeClass()
    div_back_ground.classList.add("floor3")
})

button_floor4.addEventListener("click",function (){
    removeClass()
    div_back_ground.classList.add("floor4")
})

function removeClass(){
    div_back_ground.classList.remove("floor2","floor2Eco","floor3","floor4","floor0");
}

Data.getData()