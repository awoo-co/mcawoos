const video = document.getElementById('webcam');
const totalDisplay = document.getElementById('total');
const itemList = document.getElementById('item-list');

let total = 0;

(async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
    } catch (error) {
        console.error("Error accessing the webcam:", error);
    }

    const codeReader = new ZXing.BrowserQRCodeReader();
    
    try {
        const result = await codeReader.decodeOnceFromVideoDevice(null, 'webcam');
        const barcode = result.text;
        const itemName = getItemNameByBarcode(barcode);
        if (itemName) {
            addItem(itemName, getItemPrice(itemName));
            playBeepSound(); // Play a beep sound
        }
    } catch (err) {
        console.error("Barcode scanning error:", err);
    }
})();

// Functions for handling item scanning, similar to previous examples
// ...
