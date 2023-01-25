const MEAL_COST = JSON.parse(localStorage.getItem('mealCost'));

const date = document.querySelector('#date');
const costAmount = document.querySelector('#costAmount');
const costDescription = document.querySelector('#costDescription');
const addCostingBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#form');

if(!MEAL_COST) {
    localStorage.setItem('mealCost', JSON.stringify([]))
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addCostingToStorage();
    showCostingHistory();
})

function addCostingToStorage() {
    if(date.value != '' && costAmount.value != '' && costDescription.value != '') {
        const cost = {
            dateOfCost: date.value,
            amountOfCost: costAmount.value,
            descriptionOfCost: costDescription.value
        }
        MEAL_COST.push(cost)
        localStorage.setItem('mealCost', JSON.stringify(MEAL_COST))
    } else {
        alert('Please enter all data!')
    }
}

showCostingHistory();
function showCostingHistory() {
    let costHistoryHtml = ``;
    MEAL_COST.forEach(dailyCost => {
        costHistoryHtml += `
                        <tr>
                            <td>${dailyCost.dateOfCost}</td>
                            <td>${dailyCost.descriptionOfCost}</td>
                            <td>${dailyCost.amountOfCost}/-</td>
                        </tr>
                        `
    });
    document.querySelector('.table_body-costHistory').innerHTML = costHistoryHtml;
}

// localStorage.setItem('mealCost', JSON.stringify([]))