
const MEMBER_LIST = JSON.parse(localStorage.getItem('memberList'));
const MEAL_COST = JSON.parse(localStorage.getItem('mealCost'));
const MEAL_DATA = JSON.parse(localStorage.getItem('mealData'));

const totalDepositContainer = document.querySelector('.total_deposit_container');
const totalCostContainer =  document.querySelector('.total_costing_container');
const currentBalanceContainer = document.querySelector('.current_balance_container');
const totalMealContainer = document.querySelector('.total_meal_container');
const mealRateContainer = document.querySelector('.meal_rate_container');

if(MEMBER_LIST && MEAL_COST && MEAL_DATA) {
    updateDashboard(totalCost(), totalMeal())
}

function updateDashboard(totalCost, totalMeal) {
    let totalDeposit = 0
    MEMBER_LIST.forEach(member => {

        // Get total deposit
        if(member.deposit.length != 0) {
            member.deposit.forEach(singleDeposit => {
                totalDeposit += singleDeposit.depositAmount
            })
        }

        // Get members
        const { id, name, phoneNumber, department, session } = member;
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id', id)
        tableRow.setAttribute('class', 'member')
        const nameEl = document.createElement('input');
        nameEl.value = name;
        const phoneEl = document.createElement('input');
        phoneEl.value = phoneNumber;
        const departmentEl = document.createElement('input');
        departmentEl.value = department;
        const sessionEl = document.createElement('input');
        sessionEl.value = session;

        const buttonContainer = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';

        buttonContainer.append(editBtn, deleteBtn);
        tableRow.append(nameEl, phoneEl, departmentEl, sessionEl, buttonContainer);
        document.querySelector('#memberContainer').append(tableRow);


        editBtn.addEventListener('click', (e) => {
            const targetEl = e.target;
            if(targetEl.innerText == 'Edit') {
                targetEl.innerText = 'Save';
                tableRow.classList.add('editable');
            } else {
                targetEl.innerText = 'Edit';
                tableRow.classList.remove('editable');
                updateMemberStorage(id, nameEl, phoneEl, departmentEl, sessionEl);
            }

        })

        deleteBtn.addEventListener('click', () => {
            let isConfirm = confirm('Are you sure!');
            if(isConfirm) {
                tableRow.style.display = 'none';
                deleteMemberOnStorage(id);
            }

        }) 

        // Insert total deposit to element
        totalDepositContainer.innerHTML = totalDeposit +'/-';
        // Insert total cost to element
        totalCostContainer.innerHTML = totalCost +'/-';
        // Insert current balance to element
        currentBalanceContainer.innerHTML = totalDeposit - totalCost +'/-';
        // Insert total meal to element
        totalMealContainer.innerHTML = totalMeal;
        // Insert meal rate to element
        const mealRate = parseFloat(totalCost / totalMeal).toFixed(2)
        mealRateContainer.innerHTML = mealRate+'/-';
        showMembersMealInfo(mealRate);
    });


}

function updateMemberStorage(id, nameEl, phoneEl, departmentEl, sessionEl) {
    MEMBER_LIST.forEach(member => {
        if(member.id === id) {
            member.name = nameEl.value;
            member.phoneNumber = phoneEl.value;
            member.department = departmentEl.value;
            member.session = sessionEl.value;
        }
    })
    localStorage.setItem('memberList', JSON.stringify(MEMBER_LIST));
}

function deleteMemberOnStorage(id) {

    MEMBER_LIST.forEach((member, index) => {
        if(member.id == id) {
            MEMBER_LIST.splice(index, 1)
        }
    })

    localStorage.setItem('memberList', JSON.stringify(MEMBER_LIST))
}

function totalCost() {
    let totalCost = 0;
    if(MEMBER_LIST.length != 0) {
        MEAL_COST.forEach(dailyCost => {
            totalCost += Number(dailyCost.amountOfCost);
        })
    }
    return totalCost;
}

function totalMeal() {
    let totalMeal = 0;
    MEAL_DATA.forEach(dailyMeal => {
        dailyMeal.mealData.forEach(meal => {
            totalMeal += meal.mealQuantity;
        })
    })
    return totalMeal;
}

function showMembersMealInfo(mealRate) {
    let html = ``;
    MEMBER_LIST.forEach(member => {
        let memberTotalDeposit = 0;
        member.deposit.forEach(singleDeposit => {
            memberTotalDeposit += singleDeposit.depositAmount
        })

        let totalMemberMeal = 0;
        MEAL_DATA.forEach(dailyMeal => {
            dailyMeal.mealData.forEach(singleMemberMeal => {
                if(singleMemberMeal.id == member.id) {
                    totalMemberMeal += singleMemberMeal.mealQuantity;
                }
            })
            // console.log(dailyMeal.mealData)
        })
        
        const memberMealCost = parseFloat(totalMemberMeal * mealRate).toFixed(2);
        const willHave = parseFloat(memberTotalDeposit - memberMealCost).toFixed(2);
        const haveToGive = parseFloat(memberMealCost - memberTotalDeposit).toFixed(2);
        html += `
                <tr>
                    <td>${member.name}</td>
                    <td>${memberTotalDeposit}</td>
                    <td>${memberMealCost}</td>
                    <td>${memberTotalDeposit < memberMealCost ? haveToGive : 0}</td>
                    <td>${memberTotalDeposit > memberMealCost ? willHave : 0}</td>
                </tr>
                `
    })

    document.querySelector('.member_meal-data--tableBody').innerHTML = html;
}
