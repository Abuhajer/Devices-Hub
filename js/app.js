'use strict';

getDevicesList();
if (Device.list === null)
  Device.list = [];
const tableSection = document.getElementById('tableSection');



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function Device(name, category, quantity, price) {

  this.name = name;
  this.category = category;
  this.quantity = quantity;
  this.price = price;
  Device.list.push(this);

}

const formElm = document.getElementById('form');
formElm.addEventListener('submit', addDevice);

function addDevice(event) {
  event.preventDefault();
  let name, category, quantity, price;
  name = document.getElementById('ItemName').value;
  category = document.getElementById('Category').value;
  quantity = document.getElementById('Quanttity').value;
  price = getRandomInt(350, 750);
  new Device(name, category, quantity, price);
  updateDevicesList();
  render();

}









function updateDevicesList() {
  localStorage.setItem('Devices', JSON.stringify(Device.list));

}

function getDevicesList() {
  Device.list = JSON.parse(localStorage.getItem('Devices'));
}



function render() {

  let tableElm = document.createElement('table');
  tableSection.appendChild(tableElm);
  let trElm;
  trElm = document.createElement('tr');
  tableElm.appendChild(trElm);



  for (let k = 0; k < 4; k++) {
    let tdElm = document.createElement('td');
    if (k === 0){
      trElm.appendChild(tdElm);
      tdElm.textContent =' Device name';

    }
    if (k === 1){
      trElm.appendChild(tdElm);
      tdElm.textContent ='quantity';

    }
    if (k === 2){
      trElm.appendChild(tdElm);
      tdElm.textContent = 'unit Price';


    }
    if (k === 3){

      trElm.appendChild(tdElm);
      tdElm.textContent = 'category';

    }
  }

  for (let i = 0; i < Device.list.length; i++) {
    trElm = document.createElement('tr');
    tableElm.appendChild(trElm);
    for (let k = 0; k < 4; k++) {
      let tdElm = document.createElement('td');
      if (k === 0){
        tdElm.textContent = Device.list[i].name;
        trElm.appendChild(tdElm);

      }
      if (k === 1){
        tdElm.textContent = Device.list[i].quantity;
        trElm.appendChild(tdElm);

      }
      if (k === 2){
        tdElm.textContent = Device.list[i].price;
        trElm.appendChild(tdElm);


      }
      if (k === 3){
        tdElm.textContent = Device.list[i].category;
        trElm.appendChild(tdElm);

      }

    }
  }
  let pElm = document.createElement('p');
  pElm.textContent = totalPrice();
  tableSection.appendChild(pElm);
}


function totalPrice() {
  let total = 0;
  for (let i = 0; i < Device.list.length; i++)
    total += Device.list[i].price*Device.list[i].quantity;

  return total;
}



render();
