
const sideBarEl = document.querySelector('.sidebar');
const SIDEBAR_ITEMS = [
    {icon: '', itemName: 'Dashboard', url: '/index.html'},
    {icon: '', itemName: 'Meal', url: '/meal.html'},
    {icon: '', itemName: 'Deposit', url: '/deposit.html'},
    {icon: '', itemName: 'Add Member', url: '/add-member.html'}
]

// insert sidebar item to sidebar element
SIDEBAR_ITEMS.forEach(item => {
    const { icon, itemName, url } = item;
    const anchorEl = document.createElement('a');
    anchorEl.setAttribute('href', `${url}`);
    anchorEl.innerText = `${itemName}`;
    sideBarEl.append(anchorEl);

    // Active open page
    if(document.location.pathname === item.url) {
        anchorEl.classList.add('active')
    }
})
