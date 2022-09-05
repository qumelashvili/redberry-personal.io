var positionSelect = document.querySelector(".select--position")
var teamSelect = document.querySelector(".select--team")
var myInput = document.querySelectorAll(".saveValue")
var myForm = document.querySelector("form")
var forms = document.querySelectorAll('.needs-validation')

// getting data about teams with api
fetch('https://pcfy.redberryinternship.ge/api/teams')
.then((response)=> response.json())
.then((data)=> {
   for(var x of data.data){
    var teamOption = document.createElement('option')
    teamOption.value = x.id
    teamOption.innerHTML = x.name
    teamOption.id = x.id
    teamSelect.appendChild(teamOption)
   }
})
// getting data about position with api
teamSelect.addEventListener('change', function(){
    let selectedId = teamSelect[teamSelect.selectedIndex].id
    fetch('https://pcfy.redberryinternship.ge/api/positions')
    .then((response)=> response.json())
    .then((data)=> {
    for(var x of data.data){
        if(x.team_id == selectedId){
            var positionOption = document.createElement('option')
            positionOption.value = x.id
            positionOption.innerHTML = x.name
            positionOption.id = x.id
            positionSelect.appendChild(positionOption)
        }
    }
})
})

var letter = /[ა-ჰ]/
// whitespace check function
function containsWhitespace(str) {
    return /\s/.test(str);
}

// function to validation
function validate(){
    var firstNameText = document.querySelector(".fname--p")
    var firstNameInput = document.querySelector(".fname--input")
    var lastNameInput = document.querySelector(".lname--input")
    var lastNameText = document.querySelector(".lname--p")
    var emailInput = document.querySelector(".email--input")
    var emailText = document.querySelector(".email--text")
    var numberInput = document.querySelector(".mobile--number")
    var mobileText = document.querySelector(".mobile--text")

    // return all inputs to beginning styles
    firstNameInput.style.borderColor = "#8AC0E2"
    firstNameText.style.color = "#2E2E2E"
    firstNameText.innerHTML = "მინიმუმ 2 სიმბოლო, ქართული ასოები"
    lastNameInput.style.borderColor = "#8AC0E2"
    lastNameText.style.color = "#2E2E2E"
    lastNameText.innerHTML = "მინიმუმ 2 სიმბოლო, ქართული ასოები"
    emailInput.style.borderColor = "#8AC0E2"
    emailText.innerHTML = ""
    numberInput.style.borderColor = "#8AC0E2"
    mobileText.style.color = "#2E2E2E"
   

    //  checking all inputs for various validation
    if(positionSelect.value == "false"){
        positionSelect.style.border = "1px solid red"
        return false;
    }  
    else{
        positionSelect.style.border = "0"
    }
    if(teamSelect.value == "false"){
        teamSelect.style.border = "none"
    }
    else{
        teamSelect.style.border = "0px"
    }
    if(firstNameInput.value.length < 2){
        firstNameInput.style.borderColor = "red"
        firstNameText.innerHTML = "მინიმუმ 2 სიმბოლო!"
        firstNameText.style.color = "red"
        return false;
    }
    if(!firstNameInput.value.match(letter)){
        firstNameInput.style.borderColor = "red"
        firstNameText.innerHTML = "გამოიყენე ქართული ასოები!"
        firstNameText.style.color = "red"
        return false;
    }
    if(lastNameInput.value.length < 2){
        lastNameInput.style.borderColor = "red"
        lastNameText.innerHTML = "მინიმუმ 2 სიმბოლო!"
        lastNameText.style.color = "red"
        return false;
    }
    if(!lastNameInput.value.match(letter)){
        lastNameInput.style.borderColor = "red"
        lastNameText.innerHTML = "გამოიყენე ქართული ასოები!"
        lastNameText.style.color = "red"
        return false;
    }
    if(emailInput.value == ""){
        emailInput.style.borderColor = "red"
        emailText.innerHTML = "ველის შევსება სავალდებულოა!"
        emailText.style.color = "red"
        return false;
    }
    if(emailInput.value !== "" && !emailInput.value.includes("@redberry.ge")){
        emailInput.style.borderColor = "red"
        emailText.innerHTML = "უნდა მთავრდებოდეს @redberry.ge-ით"
        emailText.style.color = "red"
        return false;
    }
    if(!numberInput.value.startsWith("+995") ){
        numberInput.style.borderColor = "red"
        mobileText.style.color = "red"
        return false;
    }
    if(!containsWhitespace(numberInput)){
        numberInput.style.borderColor = "red"
        mobileText.style.color = "red"
        return false;
    }
    if(numberInput.value.length < 12){
        numberInput.style.borderColor = "red"
        mobileText.style.color = "red"
        return false;
    }
   
    sendData();
    location.replace("../html/laptop.html")
    return true;
}

Array.prototype.slice.call(forms)
  .forEach(function (myForm) {
    myForm.addEventListener('submit', function (event) {
      if (!myForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        for(var x of myInput){
            x.classList.add("invalid")
        }
      }
      myForm.classList.add('was-validated')
    }, false)
  })

//function for save input values
function store(){
    for(var i = 0; i < myInput.length; i++){
        localStorage.setItem(`saveValue${[i]}`, myInput[i].value )
    }
}
// function to get saved input values
function getValue(){
    for(var j = 0; j < myInput.length; j++){
        var storedText = localStorage.getItem(`saveValue${j}`);
        // check if there are saved input values
        if(storedText != null){
            myInput[j].value = storedText 
        }
        else{
            myInput.value = 0
        }
    }
}
var positionId;
var teamId;
// function for save select values
function storeSelect(){
    localStorage.setItem("saveSelectTeam", teamSelect.options[teamSelect.selectedIndex].innerHTML)
    localStorage.setItem("saveSelectPosition", positionSelect.options[positionSelect.selectedIndex].innerHTML) 
    positionId = positionSelect.options[positionSelect.selectedIndex].id
    teamId = teamSelect.options[teamSelect.selectedIndex].id
}
// function for get saved select values
function getValueSelect(){
    // variables for saved values
    var storedSelect1 = localStorage.getItem("saveSelectTeam");
    var storedSelect2 = localStorage.getItem("saveSelectPosition");
    // checking if there are saved values
    if(storedSelect1 != null){
        teamSelect.options[teamSelect.selectedIndex].text = storedSelect1;
        teamSelect.options[teamSelect.selectedIndex].value = storedSelect1
    }
    if(storedSelect2 != null){
        positionSelect.options[positionSelect.selectedIndex].text = storedSelect2;
        positionSelect.options[positionSelect.selectedIndex].value = storedSelect2;
    }
}
// load function when DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // get all elements for save value
    var input = document.querySelectorAll(".saveValue")
    teamSelect.addEventListener("change", storeSelect, false);
    positionSelect.addEventListener("change", storeSelect, false);
    for(var x of input){
        x.addEventListener("keyup", store, false);  
    }
    getValue();
    getValueSelect(); 
});

function sendData(){
    var firstNameInput = document.querySelector(".fname--input")
    var lastNameInput = document.querySelector(".lname--input")
    var emailInput = document.querySelector(".email--input")
    var numberInput = document.querySelector(".mobile--number")

    var person = {
        name : firstNameInput.value,
        surname : lastNameInput.value,
        email : emailInput.value,
        mobile : numberInput.value,
        team: teamId,
        position : positionId

    }
   //SENDING Data to laptop.js !!
    localStorage.setItem("personData", JSON.stringify(person))
}





















