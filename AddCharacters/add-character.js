// const baseURL = 'http://localhost:3000';
// const inputs = document.querySelectorAll('[type="text"], [name="sayings"]');
// const characterSelect = document.querySelector('[name=characters]');
// const obj = {}
// let currentCharacter;
//
// document.querySelector('#submit').addEventListener('click', submitFields);
//
// function submitFields() {
//   inputs.forEach(input => {
//     if (input.name == 'sayings') {
//       obj[input.name] = input.value.split('; ');
//     } else {
//       obj[input.name] = input.value;
//     }
//   });
//
//   let type;
//   if (currentCharacter) {
//     type = {
//       type: 'PATCH',
//       url: `${baseURL}/characters/${currentCharacter}`,
//       data: JSON.stringify(obj),
//       contentType: 'application/json'
//     }
//   } else {
//     type = {
//       type: 'POST',
//       url: `${baseURL}/characters`,
//       data: JSON.stringify(obj),
//       contentType: 'application/json',
//       beforeSend: () => {
//         console.log('Sending Data');
//       }
//     }
//   }
//
//   $.ajax(type)
//     .done(data => {
//       inputs.forEach(input => {
//         input.value = '';
//       });
//       document.querySelector('.results').innerText = JSON.stringify(data);
//       currentCharacter = null;
//       getAllCharacters();
//     })
//     .fail(error => {
//       console.error(error);
//     });
// }
//
// function loadAllCharacters(data) {
//   characterSelect.innerHTML = '';
//   data.map(char => {
//     characterSelect.innerHTML += `<option value="${char.lastName}">${char.lastName}, ${char.firstName}</option>`;
//   })
// }
//
// function getAllCharacters() {
//   $.ajax({
//       type: 'GET',
//       url: `${baseURL}/characters`,
//       contentType: 'application/json'
//     })
//     .done(loadAllCharacters)
//     .fail(err => {
//       console.log(err);
//     });
// }
// getAllCharacters();
//
// document.querySelector('#loadData').addEventListener('click', loadData);
//
// function loadData(e) {
//   e.preventDefault();
//   const lastName = document.querySelector('[name=characters]').value;
//   $.ajax({
//       type: 'GET',
//       url: `${baseURL}/characters?lastName=${lastName}`
//     })
//     .done(displayData)
//     .fail(err => console.log(err));
// }
//
// function displayData(data) {
//   const info = data[0];
//   currentCharacter = info.id
//
//   inputs.forEach(input => {
//     input.value = info[input.name];
//     if (input.name == 'sayings') {
//       let output = '';
//       info[input.name].forEach((val, i) => {
//         output += (i < info[input.name].length - 1) ? `${val}; ` : val
//       });
//       input.value = output;
//     }
//   });
// }
//

const inputs = document.querySelectorAll('[type="text"], [name="sayings"]');
const submitBtn = document.querySelector('#submit');
const results = document.querySelector('.results');
let obj = {};

submitBtn.addEventListener('click', getValues);

function getValues(e) {
  e.preventDefault();
  inputs.forEach(input => {
    if (input.name == 'sayings') {
      obj[input.name] = input.value.split('; ');
    } else {
      const keys = input.name.split('.');
      if (keys.length > 1) {
        if (!obj.hasOwnProperty(keys[0])) {
          obj[keys[0]] = {};
        }
        obj[keys[0]][keys[1]] = input.value.trim();
      } else {
        obj[keys[0]] = input.value.trim();
      }
    }
  });
  results.innerHTML = `<pre>${JSON.stringify(obj)}</pre>`
}

const displayBtn = document.querySelector('#display');
const fakeData = {
  name: {
    first: 'jermbo',
    middle: 't',
    last: 'last'
  },
  info: {
    age: 22,
    gender: 'm',
    species: 'human'
  },
  occupation: 'developer',
  sayings: ['this is a story all about how', 'my life got flipped, turned upside down', 'and id like to take a minute just sitting right there', 'ill tell you how i became the prince of bel air']
};

displayBtn.addEventListener('click', (e) => {
  inputs.forEach(input => {
    if( input.name == 'sayings' ){
      let output = '';
      fakeData[input.name].forEach((val, i) => {
        output += (i < fakeData[input.name].lenght - 1) ? `${val}; ` : val;
      });
      input.value = output;
    } else {
      const keys = input.name.split('.');
      if( keys.length > 1 ){
        input.value = fakeData[keys[0]][keys[1]];
      }else{
        input.value = fakeData[keys[0]];
      }
    }
  });
});
