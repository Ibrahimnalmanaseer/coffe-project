'use strict';

let formEl = document.getElementById("formId");
var allDrinks = [];
let tableEl = document.getElementById("tableID");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    // the default behaviour of submitting the form is to refresh the page

    event.preventDefault();
    // for text input
    let drinkName = event.target.drinkName.value;
    let ingredients = event.target.ingredients.value;
    let image = event.target.image.value;
    let price = event.target.price.value;
    // for checkbox input
    let cold = event.target.cold.checked; // true or false
    let hot = event.target.hot.checked;
    let ingredientsArr = ingredients.split(",");

    // create a new drink

    new Drink(drinkName, ingredientsArr, image, cold, hot, price);
    

    saveData(allDrinks);
  
    console.log(allDrinks)

    getData();
   
    
}

function Drink(name, ingredients, image, isCold, isHot, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.image = image;
    this.isCold = isCold;
    this.isHot = isHot;
    this.price = price;
    allDrinks.push(this);
    this.render();
    this.renderTable();

    
}
Drink.prototype.render = function () {
    // createing h3 for the name of the drink
    let sectionEl = document.getElementById("cardSection");
    let name = document.createElement('h3');// <h3> </h3>
    name.textContent = this.name; // <h3> the name of the drink </h3>
    sectionEl.appendChild(name) // I can see the name inside the section

    // create the images :
    let imageEl = document.createElement('img');
    imageEl.src = this.image;
    sectionEl.appendChild(imageEl);

    // price:
    let price = document.createElement('p');
    price.textContent = `${this.price} JD`;
    sectionEl.appendChild(price);

    // Ingredients: // array as list
    let orderListEl = document.createElement("ol");
    sectionEl.appendChild(orderListEl);

    for (let i = 0; i < this.ingredients.length; i++) {
        let list = document.createElement("li");
        list.textContent = this.ingredients[i];
        orderListEl.appendChild(list)
    }
}
Drink.prototype.renderTable = function () {
    let trTag = document.createElement("tr");
    tableEl.appendChild(trTag);

    let nameTd = document.createElement("td");
    nameTd.textContent = this.name;
    trTag.appendChild(nameTd);

    let priceTd = document.createElement("td");
    priceTd.textContent = this.price;
    trTag.appendChild(priceTd);
}

let latte = new Drink("Latte", ["milk", "ice", "sugar"], "./assets/latte.png", true, true, 1);
let mocha = new Drink("mocha", ["milk", "coffee", "ice", "sugar"], "./assets/mocha.png", true, false, 2);
let hotChocalte = new Drink("hot chocalte", ["milk", "coffee", "ice", "sugar"], "./assets/mocha.png", true, false, 2);





// local storage:
function saveData(data) {

    let stringfiyData = JSON.stringify(data);
    localStorage.setItem("drinks", stringfiyData);
}


function getData() {
    let retrievedData = localStorage.getItem("drinks");
    let arrayData = JSON.parse(retrievedData);
    // each object doesn't has access to render method
    if (arrayData != null) {
        for (let i = 3; i < arrayData.length; i++) {
            if(allDrinks[i]?.name!== arrayData[i].name){
            
            // reinstantiation: re creating instance
            new Drink(arrayData[i].name, arrayData[i].ingredients, arrayData[i].image, arrayData[i].isCol, arrayData[i].isHot, arrayData[i].price);
           
            }

        }


    }
  

}




