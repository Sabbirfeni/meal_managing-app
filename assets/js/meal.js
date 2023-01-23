if(!localStorage.getItem('mealData')) {
    localStorage.setItem('mealData', JSON.stringify([]));
}


const MEMBER_LIST = JSON.parse(localStorage.getItem('memberList'));
const MEMBER_MEAL = JSON.parse(localStorage.getItem('mealData'))

const form = document.querySelector('#form');
const submitBtn = document.querySelector('#submitBtn');


// Insert all member with input field
let inputLabelHtml = ``;
let tableHeadRowHtml = `<th>Date</th>`;
MEMBER_LIST.forEach(member => {
    inputLabelHtml += `
            <label for="mealNumber">${member.name}</label>
            <input type="number" id="mealContainer" data-id='${member.id}' data-member_name='${member.name}'><br>
            `
    tableHeadRowHtml += `
                        <th data-id='${member.id}' id='members'>${member.name}</th>
                        `
});
submitBtn.insertAdjacentHTML('beforebegin', inputLabelHtml);
document.querySelector('.meal_table-head--row').innerHTML = tableHeadRowHtml;




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
    const dailyMeal = {
        date: date
    };
    const memberMeal = []
    mealContainer.forEach(mealEl => {
        const mealData = {
            id: Number(mealEl.dataset.id),
            name: mealEl.dataset.member_name,
            mealQuantity: Number(mealEl.value)
        }
    memberMeal.push(mealData);
    mealEl.value = dateEl.value = '';
    })
    dailyMeal.mealData = memberMeal;
    MEMBER_MEAL.push(dailyMeal)

    localStorage.setItem('mealData', JSON.stringify(MEMBER_MEAL));
    showMealHistory();
    alert('Meal added');
}

if(MEMBER_MEAL) {
    showMealHistory()
}
function showMealHistory() {
    const mealMembers = document.querySelectorAll('#members');
    let mealRow = ``;
    MEMBER_MEAL.forEach(dailyMeal => {
        mealRow += `<tr>
                    <td>${dailyMeal.date}</td>
                    `
            dailyMeal.mealData.forEach(singleManMeal => {
            mealMembers.forEach(member => {
                if(singleManMeal.id == member.dataset.id) {
                    mealRow += `<td>${singleManMeal.mealQuantity}</td>`
                }
            })
        })
        mealRow += `</tr>`
    })
    document.querySelector('.meal_table-body').innerHTML = mealRow;
}



// localStorage.setItem('mealData', JSON.stringify([]))
