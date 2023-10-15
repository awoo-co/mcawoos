function showScannedBarcodes() {
    const barcodeList = document.getElementById('barcode-list');

    // Retrieve the saved barcodes from localStorage
    const scannedBarcodes = JSON.parse(localStorage.scannedBarcodes || '[]');

    // Loop through saved barcodes and add them to the list
    scannedBarcodes.forEach(barcode => {
        const listItem = document.createElement('li');
        listItem.textContent = barcode;
        barcodeList.appendChild(listItem);
    });
}

// Call this function whenever you want to display the saved barcodes
showScannedBarcodes();
