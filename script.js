const scannedItems = [];
let totalPrice = 0;

const checkoutButton = document.getElementById('checkout-button');
const itemAddButtons = document.querySelectorAll('.food-button');
const itemList = document.getElementById('item-list');
const totalElement = document.getElementById('total-price');

// Function to open the confirmation modal
function openConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Display the customer name and list of scanned items
    const customerName = document.getElementById('customer-name').value;
    const itemsList = scannedItems.map(item => `${item.name}: $${item.price.toFixed(2)}`).join('\n');
    
    modalContent.textContent = `Customer Name: ${customerName}\nItems:\n${itemsList}\nTotal Price: $${totalPrice.toFixed(2)}`;
    modal.style.display = 'block';
}

// Function to close the confirmation modal
function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

// Function to confirm purchase
function confirmPurchase() {
    alert("Purchase confirmed! Thank you.");
    resetGame(); // Clear the items after confirming the purchase
    closeConfirmationModal();
}

// Event listener for the checkout button
checkoutButton.addEventListener('click', () => {
    openConfirmationModal();
});

// Event listener for cancel button (No)
document.getElementById('cancel-button').addEventListener('click', closeConfirmationModal);

// Event listener for confirm button (Yes)
document.getElementById('confirm-button').addEventListener('click', confirmPurchase);

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
