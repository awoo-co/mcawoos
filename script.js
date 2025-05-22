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
    
    // Clear the canvas and signature
    clearCanvas();

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

// Custom item add functionality
document.getElementById('item-enter').addEventListener('click', () => {
    const nameInput = document.getElementById('custom-item-name');
    const priceInput = document.getElementById('custom-item-price');
    const itemName = nameInput.value.trim();
    const itemPrice = parseFloat(priceInput.value);

    if (itemName === "" || isNaN(itemPrice) || itemPrice <= 0) {
        alert("Please enter a valid item name and price.");
        return;
    }

    scannedItems.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    updateUI();

    // Clear inputs after adding
    nameInput.value = '';
    priceInput.value = '';
});

// Function to update the UI and display items and total price
function updateUI() {
    itemList.innerHTML = scannedItems.map((item, index) => 
        `<li id="item-${index}">
            <span class="item-name" id="item-name-${index}">${item.name}</span>: $<span class="item-price" id="item-price-${index}">${item.price.toFixed(2)}</span> 
            <button onclick="deleteItem(${index})">Delete</button>
            <button onclick="editItem(${index})">Edit</button> <!-- Edit button -->
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

// Function to edit an item (name and price) in the list
function editItem(index) {
    const itemElementName = document.getElementById(`item-name-${index}`);
    const itemElementPrice = document.getElementById(`item-price-${index}`);
    const currentName = scannedItems[index].name;
    const currentPrice = scannedItems[index].price.toFixed(2);

    // Replace the item name and price with input fields
    itemElementName.innerHTML = `<input type="text" id="edit-name-${index}" value="${currentName}">`;
    itemElementPrice.innerHTML = `<input type="number" id="edit-price-${index}" value="${currentPrice}" min="0" step="0.01">`;

    // Change the edit button to a save button
    const editButton = document.querySelector(`#item-${index} button[onclick="editItem(${index})"]`);
    editButton.textContent = "Save";
    editButton.onclick = () => saveEdit(index); // Call saveEdit instead of editItem when clicked
}

// Function to save the edited item name and price
function saveEdit(index) {
    const newName = document.getElementById(`edit-name-${index}`).value;
    const newPrice = parseFloat(document.getElementById(`edit-price-${index}`).value);

    if (newName.trim() === "" || isNaN(newPrice) || newPrice <= 0) {
        alert("Please enter a valid name and price.");
        return;
    }

    // Adjust total price by removing old price and adding the new one
    totalPrice -= scannedItems[index].price;
    totalPrice += newPrice;

    // Update the item name and price in the scannedItems array
    scannedItems[index].name = newName;
    scannedItems[index].price = newPrice;

    // Update the UI with the new name and price
    updateUI();
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
    clearCanvas(); // Clear the canvas
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

// Function to start drawing (mouse and touch)
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    const { offsetX, offsetY } = getMousePosition(e);
    ctx.moveTo(offsetX, offsetY);
}

// Function to draw on the canvas (mouse and touch)
function draw(e) {
    if (drawing) {
        const { offsetX, offsetY } = getMousePosition(e);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
}

// Function to stop drawing (mouse and touch)
function stopDrawing() {
    drawing = false;
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to get mouse or touch position
function getMousePosition(e) {
    let x, y;
    if (e.touches) {
        const touch = e.touches[0];
        x = touch.clientX - canvas.getBoundingClientRect().left;
        y = touch.clientY - canvas.getBoundingClientRect().top;
    } else {
        x = e.offsetX;
        y = e.offsetY;
    }
    return { offsetX: x, offsetY: y };
}

// Event listeners for mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing); // Stops drawing if mouse leaves the canvas

// Event listeners for touch
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
    draw(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Clear canvas on button click
document.getElementById('clear-canvas-button').addEventListener('click', clearCanvas);
