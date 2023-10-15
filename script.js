const scannedItems = [];
let totalPrice = 0;

const videoElement = document.getElementById('camera-feed');
const captureButton = document.getElementById('capture-button');

captureButton.disabled = true;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        videoElement.srcObject = stream;
        captureButton.disabled = false;
    })
    .catch(function (error) {
        console.error('Error accessing camera:', error);
    });

captureButton.addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert the data URL to a Blob
    const imageFile = canvas.toDataURL('image/jpeg');
    const base64Data = imageFile.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const blob = new Blob([byteNumbers], { type: 'image/jpeg' });

    try {
        readBarcodeFromCamera(blob)
            .then(barcode => {
                if (barcode) {
                    // Replace this with a lookup from your barcode database
                    const itemName = "Item Name"; 
                    const itemPrice = 10.00; // Replace with the actual price
                    scannedItems.push({ name: itemName, price: itemPrice });
                    totalPrice += itemPrice;
                    updateUI();
                } else {
                    alert("Barcode not detected.");
                }
            })
            .catch(error => {
                alert("Error reading barcode: " + error.message);
            });
    } catch (error) {
        alert("Error capturing image: " + error.message);
    }
});

document.getElementById('checkout-button').addEventListener('click', () => {
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

async function readBarcodeFromCamera(imageBlob) {
    var form = new FormData();
    form.append("imageFile", imageBlob, "file");
    
    var settings = {
         "url": "https://api.cloudmersive.com/barcode/scan/image",
         "method": "POST",
         "timeout": 0,
         "headers": {
              "Apikey": "693c8c06-fca9-44f6-bee5-f36cce501ed0"
         },
         "processData": false,
         "mimeType": "multipart/form-data",
         "contentType": false,
         "data": form
    };

    try {
        const response = await fetch("https://api.cloudmersive.com/barcode/scan/image", settings);
        const responseText = await response.text();
        
        // Check if the response is valid JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            throw new Error("Invalid JSON response from the API.");
        }

        if (data && data.Barcode) {
            return data.Barcode;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Failed to read barcode: " + error.message);
    }
}
