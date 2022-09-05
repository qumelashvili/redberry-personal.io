var customLaptop = JSON.parse(localStorage.getItem("laptopInfo"))
var main = document.querySelector(".laptop-main")

// custom full info about laptop html code
var custom = `
<div class="main">
<div class="about-laptop">
    <img src=https://pcfy.redberryinternship.ge${customLaptop.laptop.image} alt="">
    <div class="about-person">
        <div class="left-side">
            <p>სახელი:</p>
            <p>თიმი:</p>
            <p>პოზიცია:</p>
            <p>მეილი:</p>
            <p>ტელ. ნომერი:</p>

        </div>
        <div class="right-side">
            <p>${customLaptop.user.name}</p>
            <p>${customLaptop.user.team_id}</p>
            <p>${customLaptop.user.position_id}</p>
            <p>${customLaptop.user.email}</p>
            <p>${customLaptop.user.phone_number}</p>
        </div>
    </div>
</div>
<div class="custom-line"></div>
<div class="about-laptop_data">
    <div class="flex">
        <div class="left-side">
            <p>ლეპტოპის სახელი:</p>
            <p>ლეპტოპის ბრენდი:</p>
            <p>RAM:</p>
            <p>მეხსიერების ტიპი:</p>
        </div>
        <div class="right-side first">
            <p>${customLaptop.laptop.name}</p>
            <p>${customLaptop.laptop.brand_id}</p>
            <p>${customLaptop.laptop.ram}</p>
            <p>${customLaptop.laptop.hard_drive_type}</p>
        </div>
    </div>
    <div class="flex second" >
        <div class="left-side "  >
            <p>CPU:</p>
            <p>CPU-ს ბირთვი:</p>
            <p>CPU-ს ნაკადი:</p>
        </div>
        <div class="right-side" >
            <p>${customLaptop.laptop.cpu.name}</p>
            <p>${customLaptop.laptop.cpu.cores}</p>
            <p>${customLaptop.laptop.cpu.threads}</p>
        </div>
    </div>
</div>
<div class="custom-line"></div>
<div class="about-laptop_purchase">
    <div class="flex">
        <div class="left-side" >
            <p>მდგომარეობა</p>
            <p>ლეპტოპის ფასი</p>
        </div>
        <div class="right-side">
            <p>${customLaptop.laptop.state}</p>
            <p>${customLaptop.laptop.price}</p>
        </div>
    </div>
    <div class="flex purchase" >
        <div class="left-side" >
            <p>შეძენის რიცხვი:</p>
        </div>
        <div class="right-side ">
            <p>${customLaptop.laptop.purchase_date}</p>
        </div>
    </div>
</div>
</div>
`

main.innerHTML += custom
