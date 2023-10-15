const scannedItems = [];
let totalPrice = 0;

const scanButton = document.getElementById('scan-button');
const checkoutButton = document.getElementById('checkout-button');
const barcodeInput = document.getElementById('barcode-input');

// Define a map of barcodes to prices (you can fetch this from a database)
const barcodeToPriceMap = {
    "2221": 10.00,
    "2222": 20.00,
    "2223": 30.00,
    "2224": 40.00,
};

scanButton.addEventListener('click', () => {
    const barcode = barcodeInput.value;
    if (barcode) {
        const itemPrice = barcodeToPriceMap[barcode];
        if (itemPrice) {
            const itemName = "Item Name"; // Replace with actual item name
            scannedItems.push({ name: itemName, price: itemPrice });
            totalPrice += itemPrice;
            updateUI();
            barcodeInput.value = ''; // Clear the input field
        } else {
            alert("Barcode not found. Please check the barcode.");
        }
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
