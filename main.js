const open__btn = document.getElementById("open-btn")
const user__modal = document.getElementById("user-modal")
const close = document.getElementById("close")
const save = document.getElementById("save")
const result = document.getElementById("result")
let form = {}
const users = JSON.parse(localStorage.getItem("task")) || []
let search = ""
document.addEventListener("DOMContentLoaded", function () {
    save.addEventListener("click", addUser)
    displayUsers()
    
})

open__btn.addEventListener("click", function () {
  toggleModal("block")
    
})

close.addEventListener("click", function () {
    toggleModal("none")
})

window.addEventListener("click", function (event) {
    if (event.target === user__modal ) {
        toggleModal("none")
    }
    
})

function handleChange(event) {
    const {name, value} = event.target
    form = {...form, [name]: value}
    
}

function toggleModal(status) {
    user__modal.style.display = status
}

function addUser() {
    console.log(form);
    users.push({...form})
    localStorageSave()
    displayUsers()
    toggleModal("none")
  
}

function handleSearch(event) {
    search = event.target.value.toLowerCase()
    displayUsers()
    
}

function displayUsers() {
    result.innerHTML = ""
    users.filter(item => {
        if (item.first__name.toLowerCase().includes(search)) {
            return item
        }
    }).forEach((item, index) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.first__name}</td>
            <td>${item.last__name}</td>
            <td>${item.age}</td>
            <td>${item.phone__number}</td>
            <td>${item.email}</td>
            <td><button onclick="delUser(${index})" class="btn btn-danger ">del</button></td>
            
        `
        result.appendChild(tr)

       
    })
}

function delUser(index) {
    users.splice(index, 1)
    displayUsers()
    localStorageSave()
    // localStorageSave()
}

function localStorageSave() {
    localStorage.setItem("task", JSON.stringify(users))
}
