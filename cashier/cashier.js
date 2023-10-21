const scannedItems = [];
let totalPrice = 0;

const customerNameInput = document.getElementById('customer-name-input');
const checkoutButton = document.getElementById('checkout-button');
const itemAddButtons = document.querySelectorAll('.food-button');
const itemList = document.getElementById('item-list');
const totalElement = document.getElementById('total-price');

checkoutButton.addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value;
    alert(`Customer Name: ${customerName}\nTotal Price: $${totalPrice.toFixed(2)}`);
    resetGame();
});

itemAddButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        scannedItems.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;
        updateUI();
    });
});

function updateUI() {
    itemList.innerHTML = '<ul>' + scannedItems.map(item => `<li>${item.name}: $${item.price.toFixed(2)}</li>`).join('') + '</ul>';
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function clearAllItems() {
    scannedItems.length = 0;
    totalPrice = 0;
    updateUI();
}

function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    document.getElementById('customer-name').value = '';
    updateUI();
}

function removeLastOrder() {
    if (scannedItems.length > 0) {
        const lastItem = scannedItems.pop();
        totalPrice -= lastItem.price;
        updateUI();
    }
}


checkoutButton.addEventListener('click', () => {
    const customerName = customerNameInput.value;
    alert(`Customer Name: ${customerName}\nTotal Price: $${totalPrice.toFixed(2)}`);
    resetGame();
});




function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    document.getElementById('customer-name').value = ''; // Clear the input field
    updateUI();
}
