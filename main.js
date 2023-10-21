const startSharingButton = document.getElementById('startSharing');
const payButton = document.getElementById('pay-button');
const sharedTabVideo = document.getElementById('sharedTabVideo');
let localStream;

startSharingButton.addEventListener('click', () => {
    // Code to start sharing the tab with the customer
});

payButton.addEventListener('click', () => {
    // When the "Pay" button is clicked, send a message to the cashier interface
    const message = { action: 'initiatePayment' };
    window.parent.postMessage(message, '*'); // Send a message to the parent window (cashier.html)
});

// Code for capturing and displaying the shared tab video
