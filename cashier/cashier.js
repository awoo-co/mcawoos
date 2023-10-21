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


window.addEventListener('message', event => {
    if (event.data.action === 'initiatePayment') {
        // Handle the payment process here
        const paymentAmount = totalPrice; // Get the total price from your existing code
        if (paymentAmount > 0) {
            // Simulate a successful payment
            simulatePayment(paymentAmount);
        } else {
            alert('No items in the cart.');
        }
    }
});

function simulatePayment(amount) {
    // Simulate a payment process with fake virtual money
    const virtualMoney = 100; // Initial virtual money balance
    if (virtualMoney >= amount) {
        // Sufficient virtual money
        virtualMoney -= amount;
        alert(`Payment successful! Remaining virtual money: $${virtualMoney.toFixed(2)}`);
        resetGame();
    } else {
        alert('Insufficient virtual money. Please add funds.');
    }
}

function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    document.getElementById('customer-name').value = ''; // Clear the input field
    updateUI();
}
