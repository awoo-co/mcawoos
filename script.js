const scannedItems = [];
let totalPrice = 0;

const scanButton = document.getElementById('scan-button');
const checkoutButton = document.getElementById('checkout-button');
const barcodeInput = document.getElementById('barcode-input');

scanButton.addEventListener('click', () => {
    const barcode = barcodeInput.value;
    if (barcode) {
        // Replace this with a lookup from your barcode database
        const itemName = "Item Name";
        const itemPrice = 10.00; // Replace with the actual price
        scannedItems.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;
        updateUI();
        barcodeInput.value = ''; // Clear the input field
    }
});

checkoutButton.addEventListener('click', () => {
    alert(`Total Price: $${totalPrice.toFixed(2)}`);
    resetGame();
});

function updateUI() {
    const itemList = document.getElementById('item-list');
    const totalElement = document.getElementById('total-price');
    itemList.innerHTML = '<ul>' + scannedItems.map(item => `<li>${item.name}: $${item.price.toFixed(2)}</li>`).join('') + '</ul>';
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    updateUI();
}
