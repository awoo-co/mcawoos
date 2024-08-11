console.log('Main.js loaded');

const startSharingButton = document.getElementById('startSharing');
const sharedTabVideo = document.getElementById('sharedTabVideo');
let localStream;

startSharingButton.addEventListener('click', () => {
    console.log('Share Screen button clicked'); // Add this
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
        .then(stream => {
            localStream = stream;
            sharedTabVideo.srcObject = stream;
            sharedTabVideo.style.display = 'block';
        })
        .catch(error => {
            console.error('Error accessing shared tab:', error);
        });
});



// Code for capturing and displaying the shared tab video
