document.addEventListener('DOMContentLoaded', function() {
    loadScannedItems(); // Load previously scanned items on page load
    updateUI();
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
    saveScannedItems(); // Save scanned items to local storage when the UI is updated
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

function saveScannedItems() {
    localStorage.setItem('scannedItems', JSON.stringify(scannedItems));
}

function loadScannedItems() {
    const scannedItemsJson = localStorage.getItem('scannedItems');
    if (scannedItemsJson) {
        const loadedItems = JSON.parse(scannedItemsJson);
        scannedItems.length = 0; // Clear the current array
        scannedItems.push(...loadedItems); // Push the loaded items
        totalPrice = calculateTotalPrice(scannedItems); // Recalculate total price
    }
}

function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.price, 0);
}
