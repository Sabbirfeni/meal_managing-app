function Member(name, phoneNumber, department, session) {
    const randomNumber = Math.floor(Math.random() * 5000);
    this.id = randomNumber;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.department = department;
    this.session =session;
}
if(!localStorage.getItem('memberList')) {
    localStorage.setItem('memberList', JSON.stringify([]))
}
const MEMBER_LIST = JSON.parse(localStorage.getItem('memberList'));

const formEl = document.querySelector('#form');
const nameEl = document.querySelector('#name');
const phoneNumberEl = document.querySelector('#phoneNumber');
const departmentEl = document.querySelector('#department');
const sessionEl = document.querySelector('#session');

// Submit to add member to the list
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(nameEl.value != '' && phoneNumberEl.value != 0 && departmentEl.value != '' && sessionEl.value != '') {
        addMember()
    } else {
        alert('Please add all data!');
    }
});

// Function of adding member to the list
function addMember() {
    const newMember = new Member(nameEl.value, phoneNumberEl.value, departmentEl.value, sessionEl.value)
    MEMBER_LIST.push(newMember);
    localStorage.setItem('memberList', JSON.stringify(MEMBER_LIST))
    nameEl.value = phoneNumberEl.value = departmentEl.value = sessionEl.value = '';
    alert('Member added')
}


// localStorage.setItem('memberList', JSON.stringify([]))