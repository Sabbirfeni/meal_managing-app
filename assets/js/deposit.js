const MEMBER_LIST = JSON.parse(localStorage.getItem('memberList'));

const nameListEl = document.querySelector('#memberName');
window.addEventListener('load', () => {
    let html = ``;
    MEMBER_LIST.forEach(member => {
        html += `
                <option value='${member.id}'>${member.name}</option>
                `
    });
    nameListEl.innerHTML = html;
})


const formEl = document.querySelector('#form');
const dateEl = document.querySelector('#date');
const memberIdEl = document.querySelector('#memberName');
const depositAmountEl = document.querySelector('#depositAmount');
const depositHistoryBody = document.querySelector('.deposit_history-body');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addDepositToStorage();
})


function addDepositToStorage() {
    if(dateEl.value != '' && memberIdEl.value != '' && depositAmountEl.value != '') {
        const depositData = {
            date: dateEl.value,
            depositAmount: Number(depositAmountEl.value)
        }
        const member = MEMBER_LIST.find(member => member.id == memberIdEl.value);
        member.deposit.push(depositData);
        localStorage.setItem('memberList', JSON.stringify(MEMBER_LIST))
        showDepositHistory();
    }
}

if(MEMBER_LIST) {
    showDepositHistory();
}

function showDepositHistory() {
    let html = ``;
    MEMBER_LIST.forEach(member => {
        member.deposit.forEach(singleDeposit => {
            const { date, depositAmount } = singleDeposit;
            html += `<tr>
                        <td>${date}</td>
                        <td>${member.name}</td>
                        <td>${depositAmount}/-</td>
                    </tr>
                    `
        })
    })
    depositHistoryBody.innerHTML = html;
}