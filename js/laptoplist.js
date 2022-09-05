var token = "19a11dd8ae5819a2f4e295776ca2758c"
var array = []
fetch('https://pcfy.redberryinternship.ge/api/laptops?token=' + token)
.then((response)=> response.json())
.then((data)=> {
    array.push(data)
})
// axios GET Request
var myList = document.querySelector(".list")
axios.get('https://pcfy.redberryinternship.ge/api/laptops?token=' + token).then(resp => {
    //getting data
    for(var x of resp.data.data){
        // useing data
        var list = `
        <div class="list-card">
            <img src=https://pcfy.redberryinternship.ge${x.laptop.image} alt="">
            <div class="card-info">
                <h1>${x.user.name}</h1>
                <p>${x.laptop.name}</p>
                <a onclick="searchLaptop(${x.laptop.id})" >მეტის ნახვა</a>
            </div>
        </div>
        `
        myList.innerHTML += list
    }
})

/* axios GET Request
get and save data to local storage */
function searchLaptop(id){
    console.log(id)
    axios.get(`https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${token}`).then(resp => {
        localStorage.clear();
        localStorage.setItem("laptopInfo", JSON.stringify(resp.data.data))
        location.href = "../html/customlaptop.html"
    })
}
