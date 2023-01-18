const MEMBER_LIST = JSON.parse(localStorage.getItem('memberList'));

const form = document.querySelector('#form');

const submitBtn = document.querySelector('#submitBtn');


// Insert all member with input field
let html = ``;
MEMBER_LIST.forEach(member => {
    html += `
            <label for="mealNumber">${member.name}</label>
            <input type="number" id="mealContainer" data-id='${member.id}'><br>
            `
});
submitBtn.insertAdjacentHTML('beforebegin', html);




const mealContainer = document.querySelectorAll('#mealContainer');
let allMealInserted = false;
const dateEl = document.querySelector('#date');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(isAllMealInserted() && dateEl.value != '') {
        addMeal(dateEl.value);
    } else {
        alert('Please insert all data!')
    }
})


function isAllMealInserted() {
    mealContainer.forEach(mealInput => {
        if(mealInput.value != '') {
            allMealInserted = true;
        } else {
            allMealInserted = false;
        }
    })
    return allMealInserted;
}

function addMeal(date) {

    mealContainer.forEach(mealEl => {
        const memberId = Number(mealEl.dataset.id);
        const mealData = {
            mealDate: date,
            mealQuantity: Number(mealEl.value)
        }

        MEMBER_LIST.forEach(member => {
            if(member.id === memberId) {
                member.meal.push(mealData);
            }
        })
        mealEl.value = dateEl.value = '';
    })
    localStorage.setItem('memberList', JSON.stringify(MEMBER_LIST));
    alert('Meal added')
}