document.addEventListener("DOMContentLoaded", function () {
    const codeInput = document.getElementById('code-input');
    const saveCodeButton = document.getElementById('save-code-button');
    const loadCodeButton = document.getElementById('load-code-button');

    // Load the code from localStorage when the page loads
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        codeInput.value = savedCode;
    }

    saveCodeButton.addEventListener('click', function () {
        const code = codeInput.value;
        localStorage.setItem('savedCode', code);
        alert('Code saved to localStorage.');
    });

    loadCodeButton.addEventListener('click', function () {
        const savedCode = localStorage.getItem('savedCode');
        if (savedCode) {
            codeInput.value = savedCode;
            alert('Code loaded from localStorage.');
        } else {
            alert('No code found in localStorage.');
        }
    });
});

const scannedItems = [];
let totalPrice = 0;

const checkoutButton = document.getElementById('checkout-button');
const customerNameInput = document.getElementById('customer-name-input');

checkoutButton.addEventListener('click', () => {
    const customerName = customerNameInput.value;
    alert(`Customer Name: ${customerName}\nTotal Price: $${totalPrice.toFixed(2)}`);
    resetGame();
});

function addQuickAccessItem(itemName, itemPrice) {
    scannedItems.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    updateUI();
}

const clearAllButton = document.getElementById('clear-all-button');
const removeLastOrderButton = document.getElementById('remove-last-order-button');

clearAllButton.addEventListener('click', clearAllItems);

removeLastOrderButton.addEventListener('click', removeLastOrder);

function updateUI() {
    const itemList = document.getElementById('item-list');
    const totalElement = document.getElementById('total-price');
    itemList.innerHTML = '<ul>' + scannedItems.map(item => `<li>${item.name}: $${item.price.toFixed(2)}</li>`).join('') + '</ul>';
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function clearAllItems() {
    scannedItems.length = 0;
    totalPrice = 0;
    updateUI();
}

function removeLastOrder() {
    if (scannedItems.length > 0) {
        const lastItem = scannedItems.pop();
        totalPrice -= lastItem.price;
        updateUI();
    }
}

function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    customerNameInput.value = '';
    updateUI();
}
