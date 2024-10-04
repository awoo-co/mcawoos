const scannedItems = [];
let totalPrice = 0;

const checkoutButton = document.getElementById('checkout-button');
const itemAddButtons = document.querySelectorAll('.food-button');
const itemList = document.getElementById('item-list');
const totalElement = document.getElementById('total-price');

// Event listener for the checkout button
checkoutButton.addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value;
    alert(`Customer Name: ${customerName}\nTotal Price: $${totalPrice.toFixed(2)}`);
    resetGame();
});

// Event listener for adding items
itemAddButtons.forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        scannedItems.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;
        updateUI();
    });
});

// Function to update the UI and display items and total price
function updateUI() {
    itemList.innerHTML = scannedItems.map((item, index) => 
        `<li>${item.name}: $${item.price.toFixed(2)} 
        <button onclick="deleteItem(${index})">Delete</button>
        </li>`
    ).join('');
    totalElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Function to delete an item from the list
function deleteItem(index) {
    totalPrice -= scannedItems[index].price;  // Subtract the price of the deleted item
    scannedItems.splice(index, 1);            // Remove the item from the array
    updateUI();                               // Update the UI to reflect changes
}

// Function to clear all items
function clearAllItems() {
    scannedItems.length = 0;
    totalPrice = 0;
    updateUI();
}

// Function to reset the game (clear items and total price)
function resetGame() {
    scannedItems.length = 0;
    totalPrice = 0;
    document.getElementById('customer-name').value = ''; // Clear the input field
    updateUI();
}
