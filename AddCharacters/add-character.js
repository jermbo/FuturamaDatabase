const inputs = document.querySelectorAll('[type="text"]');
const sayings = document.querySelector('[name=sayings]')

document.querySelector('#submit').addEventListener('click', submitFields);
const obj = {}

const baseURL = 'http://localhost:3000';
// const baseURL = 'https://basic-rest-api-dqtvypvski.now.sh';

function submitFields() {
  inputs.forEach(input => {
    obj[input.name] = input.value;
  });
  obj['sayings'] = sayings.value.split(', ');


  // $.ajax({
  //     type: 'POST',
  //     url: baseURL + '/characters',
  //     data: obj,
  //     cpntentType: 'application/json',
  //     beforeSend: () => {
  //       console.log('Sending Data')
  //     }
  //   })
  //   .done(data => {
  //     console.log(data);
  //     inputs.forEach(input => {
  //       input.value = '';
  //     });
  //     document.querySelector('.results').innerText = JSON.stringify(data);
  //   })
  //   .fail(error => {
  //     console.error(error);
  //   })
}





/*
var $lawInput = $('#law');
var $statesInput = $('#states');
var $submitBtn = $('.submit');
 
// var baseURL = 'http://localhost:3000';
var baseURL = 'https://basic-rest-api-dqtvypvski.now.sh';
 
$submitBtn.on('click', function(e){
    e.preventDefault();
 
    var law = $lawInput.val();
    var state = $statesInput.val();
 
    if( !law || !state ){
        alert( 'You need to fill out a law and select a state' );
        return;
    }
 
    var saveData = {
        law: law,
        state: state
    }
    console.table(saveData);
 
    $.ajax({
        method: 'POST',
        url: baseURL + '/laws',
        data: JSON.stringify(saveData),
        contentType: 'application/json',
        beforeSend: function(){
            console.log('sending data')
        }
    })
    .done(function(data){
        console.log(data);
        $lawInput.val('');
        $statesInput.val('');
        $lawInput.focus();
        $('.results').html(JSON.stringify(data));
    })
    .fail(function(error){
        console.log(error);
        $('.results').html(JSON.stringify(error));
    })
});
*/