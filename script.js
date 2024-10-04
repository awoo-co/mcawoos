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

// Function to confirm purchase with signature check
function confirmPurchase() {
    // Check if the canvas is blank (no signature)
    const blankCanvas = document.createElement('canvas');
    blankCanvas.width = canvas.width;
    blankCanvas.height = canvas.height;
    if (canvas.toDataURL() === blankCanvas.toDataURL()) {
        alert("Please provide a signature to confirm the order.");
    } else {
        alert("Purchase confirmed! Thank you.");
        resetGame(); // Clear the items after confirming the purchase
        closeConfirmationModal();
    }
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

// Close modal if clicked outside of modal content
window.onclick = function(event) {
    const modal = document.getElementById('confirmation-modal');
    if (event.target === modal) {
        closeConfirmationModal();
    }
};

// Canvas for drawing signature
const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Function to start drawing (for mouse and touch)
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling when drawing
    drawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
});

// Function to draw on the canvas (for mouse and touch)
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (drawing) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
    }
});

// Function to stop drawing (for mouse and touch)
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('touchend', () => {
    drawing = false;
});

// Function to clear the canvas
document.getElementById('clear-canvas-button').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
