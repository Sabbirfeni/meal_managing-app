
const sideBarEl = document.querySelector('.sidebar');
const SIDEBAR_ITEMS = [
    {icon: '', itemName: 'Dashboard', url: '/index.html', title: 'Dashboard'},
    {icon: '', itemName: 'Meal', url: '/meal.html', title: 'Meal'},
    {icon: '', itemName: 'Cost of Meal', url: '/meal-costing.html', title: 'Meal cost'},
    {icon: '', itemName: 'Deposit', url: '/deposit.html', title: 'Deposit'},
    {icon: '', itemName: 'Add Member', url: '/add-member.html', title: 'Add Member'}
]

// insert sidebar item to sidebar element
SIDEBAR_ITEMS.forEach(item => {
    const {icon, itemName, url, title } = item;
    const anchorEl = document.createElement('a');
    anchorEl.setAttribute('href', `${url}`);
    anchorEl.innerText = `${itemName}`;
    sideBarEl.append(anchorEl);

    // Active open page
    if(document.location.pathname === item.url) {
        anchorEl.classList.add('active');
        document.title = title;
    }
})
