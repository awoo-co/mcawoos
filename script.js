const video = document.getElementById('webcam');
const totalDisplay = document.getElementById('total');
const itemList = document.getElementById('item-list');
const vegButton = document.getElementById('classify-veg');
const fruitButton = document.getElementById('classify-fruit');
const beep = document.getElementById('beep');

let total = 0;

vegButton.addEventListener('click', () => classifyItem('vegetable'));
fruitButton.addEventListener('click', () => classifyItem('fruit'));

async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
    } catch (error) {
        console.error("Error accessing the webcam:", error);
    }
}

const codeReader = new ZXing.BrowserQRCodeReader();

codeReader.getVideoInputDevices()
    .then(devices => {
        if (devices.length > 0) {
            codeReader.decodeFromVideoDevice(devices[0].deviceId, 'webcam', (result, err) => {
                if (result) {
                    const barcode = result.text;
                    const itemName = getItemNameByBarcode(barcode);
                    if (itemName) {
                        addItem(itemName, getItemPrice(itemName));
                        playBeepSound(); // Play a beep sound
                    }
                } else {
                    console.error("Barcode scanning error:", err);
                }
            });
        } else {
            console.error("No video input devices found.");
        }
    })
    .catch(err => console.error("Error accessing video input devices:", err));

function getItemNameByBarcode(barcode) {
    // Simulated product database
    const products = {
        '1234567890123': 'Product 1',
        '9876543210987': 'Product 2',
        // Add more products as needed
    };

    return products[barcode] || 'Unknown Product';
}

function getItemPrice(itemName) {
    // Simulated price lookup
    const prices = {
        'Product 1': 2.99,
        'Product 2': 1.99,
        // Add more prices as needed
    };

    return prices[itemName] || 0;
}

function addItem(itemName, itemPrice) {
    const li = document.createElement('li');
    li.innerText = `${itemName} - $${itemPrice.toFixed(2)}`;
    itemList.appendChild(li);
    total += itemPrice;
    totalDisplay.innerText = total.toFixed(2);
}

function playBeepSound() {
    beep.play();
}

function classifyItem(category) {
    // Add code to classify the currently scanned item as "vegetable" or "fruit"
    // You can update the UI or perform further actions based on the classification.
}
