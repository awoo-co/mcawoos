const scannedItems = [];
let totalPrice = 0;

const scanButton = document.getElementById('scan-button');
const checkoutButton = document.getElementById('checkout-button');
const barcodeInput = document.getElementById('barcode-input');

// Define a map of barcodes to prices (you can fetch this from a database)
const barcodeToPriceMap = {
    "123456": 5.00,
    "789012": 10.00,
    "456789": 2.50,
    "987654": 3.00,
    "321654": 8.00,
    "741852": 4.50,
    "369258": 6.00,
    "852963": 2.00,
    // Add more barcode-price pairs as needed
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

// Add an event listener for quick access buttons
const quickButtons = document.querySelectorAll('.quick-button');
quickButtons.forEach(button => {
    button.addEventListener('click', () => {
        const barcode = button.getAttribute('data-barcode');
        const itemPrice = barcodeToPriceMap[barcode];
        if (itemPrice) {
            const itemName = "Item Name"; // Replace with actual item name
            scannedItems.push({ name: itemName, price: itemPrice });
            totalPrice += itemPrice;
            updateUI();
        } else {
            alert("Quick access item not found. Please check the barcode.");
        }
    });
});
