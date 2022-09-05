// script for image preview and upload 

var // where files are dropped + file selector is opened
    dropRegion = document.getElementById("drop-region"),
    // where images are previewed
    imagePreviewRegion = document.getElementById("image-preview");

var dropMessage = document.querySelector(".drop-message")
var imageName = ""
var button = document.querySelector(".photo-button")
var realButton = document.getElementById("real")
var photoSize = 0
var valueRadio1 = ""
var valueRadio2 = ""
// create fake input 
var fakeInput = document.createElement("input");
fakeInput.type = "file"
fakeInput.accept = "image/*";
fakeInput.multiple = true;
dropRegion.addEventListener('click', function() {
    fakeInput.click(); 
});
fakeInput.addEventListener("change", function(e) {
    var files = fakeInput.files;
    handleFiles(files);
});
button.addEventListener('click',function(){
    fakeInput.click()
    var files = realButton.files;
    handleFiles(files)
} )
button.addEventListener("mouseout", function(){
    var files = realButton.files;
    handleFiles(files)
})
function preventDefault(e){
    e.preventDefault();
    e.stopPropagation();
}
dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);
function handleDrop(e) {
    var data = e.dataTransfer,
        files = data.files;
    handleFiles(files);
}
dropRegion.addEventListener('drop', handleDrop, false);
// handle files
function handleFiles(files) {
    var mb = 0.000001
    for(var i = 0, len = files.length; i < len; i++) {
        if(validateImage(files[i])){
            previewAnduploadImage(files[i]);
        }
    }
    for(var x of files){
        imageName = x.name
        photoSize = (x.size * mb).toFixed(1)
    }
}
// function to validate uploaded image
function validateImage (image) {
    var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validTypes.indexOf( image.type ) === -1) {
        alert("Invalid File Type");
        return false;
    }
    return true;
}
var photoName = document.querySelector(".photo-name")
/* preview AND upload image 
 show uploaded image */
function previewAnduploadImage(image) {
    dropMessage.style.display = "none"
    var photoText = document.querySelector(".photo-text")
    var photoSizeText = document.querySelector(".photo-size")
    var reader = new FileReader();
    var button = document.querySelector(".photo-button")
    button.classList.add("show")
    reader.onload = function(e){
        dropRegion.style.backgroundImage = `url(${e.target.result})`
        dropRegion.classList.add("notEmpty")
        photoText.innerHTML = imageName
        photoSizeText.innerHTML = photoSize + "mb"
    }
    photoName.classList.add('add')
    reader.readAsDataURL(image)
}

// check if there is a photo 
var submit = document.querySelector(".submit")
var checkPhoto = document.querySelector("#image-preview")
submit.addEventListener('click', function(){
    if(dropMessage.className !== "notEmpty"){
       var noPhotoDropRegion = document.querySelector("#drop-region")
       noPhotoDropRegion.classList.add("noPhoto")
    }
})
dropRegion.addEventListener('dragenter', highlight, false);
dropRegion.addEventListener('dragover', highlight, false);
dropRegion.addEventListener('dragleave', unhighlight, false);
dropRegion.addEventListener('drop', unhighlight, false);
function highlight() {
    dropRegion.classList.add('highlighted');
}
function unhighlight() {
    dropRegion.classList.remove("highlighted");
}

// get laptop brand data from api
var laptopBrandSelect = document.querySelector(".laptop-brand_select")
fetch('https://pcfy.redberryinternship.ge/api/brands')
.then((response)=> response.json())
.then((data)=> {
    for(var x of data.data){
        var laptopBrandOption = document.createElement('option');
        laptopBrandOption.value = x.name;
        laptopBrandOption.innerHTML = x.name;
        laptopBrandOption.id = x.id;
        laptopBrandSelect.appendChild(laptopBrandOption)
    }
})

// get laptop cpu data from api
var laptopCpuSelect = document.querySelector(".laptop-cpu_select")
fetch('https://pcfy.redberryinternship.ge/api/cpus')
.then((response)=> response.json())
.then((data)=> {
    for(var x of data.data){
        var laptopCpuOption = document.createElement('option')
        laptopCpuOption.value = x.name
        laptopCpuOption.innerHTML = x.name
        laptopCpuOption.id = x.id
        laptopCpuSelect.appendChild(laptopCpuOption)
    }
})
var validationCustom0 = document.getElementById("validationCustom0")
// function to validate form
var checkInput = document.querySelectorAll(".checkValidity")
var myForm = document.querySelector('.myForm')
myForm.addEventListener('submit', function(e){
    e.preventDefault()
    var letter = /[A-Za-z0-9!@#$%^&*()_+=]+/
    var radioCheck = document.querySelectorAll(".checkValidityRadio2")
    var radioLabel1 = document.querySelector(".radio-label1")
    var check1 = 0;
    var check2 = 0;
    var radioCheck2 = document.querySelectorAll(".checkValidityRadio0")
    var radioLabel2 = document.querySelector(".radio-label2")
    var label = document.querySelectorAll(".label")
    var laptopName = document.querySelector(".laptop-name")
    var number = /[0-9]/
    laptopBrandSelect.classList.remove('notcorrect')
    laptopCpuSelect.classList.remove('notcorrect')
    // for loop for get acces of all input
    for(var i = 0; i < checkInput.length; i++){
        // return all inputs to beginning styles
        checkInput[i].classList.remove('alert');
        label[i].classList.remove('red');
        validationCustom0.classList.remove('invalid')
        laptopName.classList.remove('red')
       
        // checking all inputs for various validation 
        if(!validationCustom0.value.match(letter)){
            validationCustom0.classList.add('invalid');
            laptopName.classList.add('red')
            return false;
        }
        if(laptopBrandSelect.value == "false"){
            laptopBrandSelect.classList.add('notcorrect')
            return false;
        }
        else{
            laptopBrandSelect.classList.remove('notcorrect')
        }
        if(laptopCpuSelect.value == "false"){
            laptopBrandSelect.classList.add('notcorrect')
            return false;
        }
        else{
            laptopCpuSelect.classList.remove('notcorrect')
        }
        if(!checkInput[0].value.match(number) || checkInput[0].value.length == 0){
            checkInput[0].classList.add('notcorrect')
            return false
        }
        else{
            checkInput[0].classList.remove('notcorrect')
        }
        if(!checkInput[1].value.match(number) || checkInput[1].value.length == 0 ){
            checkInput[1].classList.add('notcorrect')
            return false;
        }
        else{
            checkInput[1].classList.remove('notcorrect')
        }
        if(!checkInput[2].value.match(number) || checkInput[2].value.length == 0 ){
            checkInput[2].classList.add('notcorrect')
            return false;
        }
        else{
            checkInput[2].classList.remove('notcorrect')
        }
        if(!checkInput[3].value.match(number) || checkInput[3].value.length == 0 ){
            checkInput[3].classList.add('notcorrect')
            return false;
        }
        else{
            checkInput[3].classList.remove('notcorrect')
        }
        if(!checkInput[4].value.match(number) || checkInput[4].value.length == 0 ){
            checkInput[4].classList.add('notcorrect')
            return false;
        }
        else{
            checkInput[4].classList.remove('notcorrect')
        }
    }
    for(var x of radioCheck){
        if(!x.checked){
            check1++
            if(check1 == 2){
                radioLabel1.classList.add("radio-notchecked")
                return false;
            }
            else{
                radioLabel1.classList.remove("radio-notchecked")
            }
        }
    }
    for(var j of radioCheck2){
        if(!j.checked){
            check2++
            if(check2 == 2){
                radioLabel2.classList.add("radio-notchecked")
                return false;
            }
            else{
                radioLabel2.classList.remove("radio-notchecked")
            } 
        }
    }
    // if everything is okey send info
    sendInformation()
    location.href = "../html/popup.html"
    // clean all saved values
    localStorage.clear();
    return true;
})

//function for save input values
function store(){
    for(var i = 0; i < checkInput.length; i++){
        localStorage.setItem(`saveLaptopValue${[i]}`, checkInput[i].value )
    }
}
// function to get saved input values
function getValue(){
    for(var j = 0; j < checkInput.length; j++){
        var storedText = localStorage.getItem(`saveLaptopValue${j}`);
        // check if there are saved input values
        if(storedText != null){
            checkInput[j].value = storedText 
        }
        else{
            checkInput.value = 0
        }
    }
}
//function to save select values
var laptopBrandId;
var laptopNameSelect = document.getElementById("laptop_brand_id")
var laptopCpuSelect = document.querySelector(".laptop-cpu_select")
function storeSelect(){
    localStorage.setItem("saveSelectName", laptopNameSelect.options[laptopNameSelect.selectedIndex].value)
    localStorage.setItem("saveSelectCpu", laptopCpuSelect.options[laptopCpuSelect.selectedIndex].value)
    laptopBrandId = laptopNameSelect.options[laptopNameSelect.selectedIndex].id 
}

// function to get saved select values
function getValueSelect(){
    // variables for saved values
    var storedSelect1 = localStorage.getItem("saveSelectName");
    var storedSelect2 = localStorage.getItem("saveSelectCpu");
    // checking if there are saved values
    if(storedSelect1 != null){
        laptopNameSelect.options[laptopNameSelect.selectedIndex].text = storedSelect1;
        laptopNameSelect.options[laptopNameSelect.selectedIndex].value = storedSelect1;   
    }
    if(storedSelect2 != null){
        laptopCpuSelect.options[laptopCpuSelect.selectedIndex].text = storedSelect2;
        laptopCpuSelect.options[laptopCpuSelect.selectedIndex].value = storedSelect2;
    }
}
// functions store and get laptop name value 
function storeLaptopName(){
    localStorage.setItem("laptopName", validationCustom0.value)
}
function getStoreLaptopName(){
    var storedValue = localStorage.getItem("laptopName")
    if(storedValue != null){
        validationCustom0.value = storedValue
    }
    else{
        validationCustom0.value = ""
    }
}
// function to save radio value 
var radio = document.getElementsByName("laptop_state")
var radioStorage = document.getElementsByName("laptop_hard_drive_type")
function storeRadio2(){
    for(var i = 0; i < radio.length; i++){
        // checking if radio is selected
        if(radio[i].checked){
            localStorage.setItem("saveRadioValue2", radio[i].value )
        }
    }
}

// function to save radio value
function storeRadio1(){
    for(var i = 0; i < radioStorage.length; i++){
        if(radioStorage[i].checked){
            localStorage.setItem("saveRadioValue1", radioStorage[i].value )
        }
    }
}
// function to get saved radio value
function getValueRadio1(){
    for(var i = 0; i < radioStorage.length; i++){
        var storedValue = localStorage.getItem("saveRadioValue1");
        // check if there are saved input values
        if(storedValue != null){
            valueRadio1 = storedValue
            if(storedValue == "SSD"){
                radioStorage[0].checked = "true"
            }
            else{
                radioStorage[1].checked = "true"
            }
        }
        else{
            radioStorage.value = 0
        }
    }
}
// function to get saved radio value
function getValueRadio2(){
    for(var i = 0; i < radio.length; i++){
        var storedValue = localStorage.getItem("saveRadioValue2");
        // check if there are saved input values
        if(storedValue != null){
            valueRadio2 = storedValue
            if(storedValue == "ახალი"){
                radio[0].checked = "true"
            }
            else{
                radio[1].checked = "true"
            }
        }
        else{
            radio.value = 0
        }
    }
}

// load function when DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    // get all elements for save value
    laptopNameSelect.addEventListener("change", storeSelect, false);
    laptopCpuSelect.addEventListener("change", storeSelect, false);
    for(var x of radio){
        x.addEventListener("change", storeRadio2, false);
    }
    for(var x of radioStorage){
        x.addEventListener("change", storeRadio1, false);
    }
    for(var x of checkInput){
        x.addEventListener("keyup", store, false);  
    }
    validationCustom0.addEventListener("change", storeLaptopName,false)
    getValue();
    getValueSelect();
    getValueRadio1();
    getValueRadio2();
    getStoreLaptopName();
});
// send info on server
var apiToken = "19a11dd8ae5819a2f4e295776ca2758c"
function sendInformation(){
    var form = document.querySelector(".myForm")
    var laptopInfo = new FormData(form)
    var personInfo = JSON.parse(localStorage.getItem("personData"))

    laptopInfo.append("token", apiToken)
    laptopInfo.append('laptop_image', fakeInput.files[0])
    laptopInfo.append('laptop_brand_id', laptopBrandId)
    laptopInfo.append('name', personInfo.name)
    laptopInfo.append('phone_number', personInfo.mobile)
    laptopInfo.append('surname', personInfo.surname)
    laptopInfo.append('email', personInfo.email)
    laptopInfo.append('position_id', personInfo.position)
    laptopInfo.append('team_id', personInfo.team)
    //axios POST REQUEST
    axios.post('https://pcfy.redberryinternship.ge/api/laptop/create', laptopInfo)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
  