const baseURL = 'http://localhost:3000';
const inputs = document.querySelectorAll('[type="text"], [name="sayings"]');
const characterSelect = document.querySelector('[name=characters]');
const obj = {}
let currentCharacter;

document.querySelector('#submit').addEventListener('click', submitFields);

function submitFields() {
  inputs.forEach(input => {
    if (input.name == 'sayings') {
      obj[input.name] = input.value.split('; ');
    } else {
      obj[input.name] = input.value;
    }
  });

  let type;
  if (currentCharacter) {
    type = {
      type: 'PATCH',
      url: `${baseURL}/characters/${currentCharacter}`,
      data: JSON.stringify(obj),
      contentType: 'application/json'
    }
  } else {
    type = {
      type: 'POST',
      url: `${baseURL}/characters`,
      data: JSON.stringify(obj),
      contentType: 'application/json',
      beforeSend: () => {
        console.log('Sending Data');
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
      getAllCharacters();
    })
    .fail(error => {
      console.error(error);
    });
}

function loadAllCharacters(data) {
  characterSelect.innerHTML = '';
  data.map(char => {
    characterSelect.innerHTML += `<option value="${char.lastName}">${char.lastName}, ${char.firstName}</option>`;
  })
}

function getAllCharacters() {
  $.ajax({
      type: 'GET',
      url: `${baseURL}/characters`,
      contentType: 'application/json'
    })
    .done(loadAllCharacters)
    .fail(err => {
      console.log(err);
    });
}
getAllCharacters();

document.querySelector('#loadData').addEventListener('click', loadData);

function loadData(e) {
  e.preventDefault();
  const lastName = document.querySelector('[name=characters]').value;
  $.ajax({
      type: 'GET',
      url: `${baseURL}/characters?lastName=${lastName}`
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
      let output = '';
      info[input.name].forEach((val, i) => {
        output += (i < info[input.name].length - 1) ? `${val}; ` : val
      });
      input.value = output;
    }
  });
}