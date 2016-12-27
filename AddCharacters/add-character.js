const inputs = document.querySelectorAll('[type="text"], [name="sayings"]');
const sayings = document.querySelector('[name=sayings]');
let currentCharacter;
const obj = {}
const baseURL = 'http://localhost:3000';

document.querySelector('#submit').addEventListener('click', submitFields);

function submitFields() {
  inputs.forEach(input => {
    if (input.name == 'sayings') obj[input.name] = input.value.split('; ')
    else obj[input.name] = input.value;
  });

  let type;
  if (currentCharacter) {
    type = {
      type: 'PUT',
      url: baseURL + '/characters/' + currentCharacter,
      data: JSON.stringify(obj),
      contentType: 'application/json',
      beforeSend: () => {
        console.log('Upating the information for id : ' + currentCharacter)
      }
    }
  } else {
    type = {
      type: 'POST',
      url: baseURL + '/characters',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      beforeSend: () => {
        console.log('Sending Data')
      }
    }
  }

  $.ajax(type)
    .done(data => {
      inputs.forEach(input => {
        input.value = '';
      });
      document.querySelector('.results').innerText = JSON.stringify(data);
      currentCharacter = null;
    })
    .fail(error => {
      console.error(error);
    });
}


function loadAllCharacters(data) {
  data.map(char => {
    document.querySelector('[name=characters]').innerHTML += `<option value="${char.lastName}">${char.firstName} ${char.lastName}</option>`;
  })
}

$.ajax({
    type: 'GET',
    url: baseURL + '/characters',
    contentType: 'application/json',
    beforeSend: () => {
      console.log('Getting Characters')
    }
  })
  .done(loadAllCharacters)
  .fail(err => {
    console.log(err)
  });

document.querySelector('#loadData').addEventListener('click', loadData);

function loadData(e) {
  e.preventDefault();
  const lastName = document.querySelector('[name=characters]').value;
  $.ajax({
      type: 'GET',
      url: baseURL + '/characters?lastName=' + lastName
    })
    .done(displayData)
    .fail(err => console.log(err));
}

function displayData(data) {
  const info = data[0];
  currentCharacter = info.id

  inputs.forEach(input => {
    input.value = info[input.name];
    if (input.name == 'sayings') {
      var output = '';
      info[input.name].forEach((val, i) => {
        output += (i < info[input.name].length - 1) ? `${val}; ` : val
      });
      input.value = output
    }
  });
}