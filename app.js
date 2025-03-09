let points = 0; // Points earned by the user
let streak = 0; // Current streak of consecutive recycling days
let lastRecycleDate = null;

// QR Code Scanner Initialization
function onScanSuccess(decodedText) {
    document.getElementById("result").innerText = decodedText; // Display scanned result
    addPoints(50); // Add points for scanning
    updateStreak(); // Update streak
}

function onScanFailure(error) {
    console.warn(`QR Code scan failed. Error details: ${error}`);
}

// Initialize QR Code Reader
const qrReader = new Html5Qrcode("qr-reader");
qrReader.start(
   { facingMode: "environment" },
   { fps: 10, qrbox:{ width :250} },
   onScanSuccess,
);

// Add Points Functionality
function addPoints(amount) {
   points += amount;
   document.getElementById("points").innerText = points; // Update points display
}

// Update Streak Functionality
function updateStreak() {
   const today = new Date().toDateString();
   if (lastRecycleDate !== today) {
       if (lastRecycleDate === new Date(Date.now() - 86400000).toDateString()) {
           streak++;
       } else if (lastRecycleDate !== null) {
           streak = 1; // Reset streak if not consecutive days
       } else {
           streak = 1; // First recycle action
       }
       lastRecycleDate = today;

       document.getElementById("streak").innerText = streak; // Update streak display
       localStorage.setItem("recycleStreak", streak);
       localStorage.setItem("lastRecycleDate", lastRecycleDate);
   }
}

// Load Streak Data from Local Storage
function loadStreakData() {
   const savedStreak = localStorage.getItem("recycleStreak");
   const savedDate = localStorage.getItem("lastRecycleDate");

   if (savedStreak && savedDate) {
       streak = parseInt(savedStreak);
       lastRecycleDate = savedDate;

       document.getElementById("streak").innerText = streak;

       const today = new Date().toDateString();
       if (
           lastRecycleDate !== today &&
           lastRecycleDate !== new Date(Date.now() - 86400000).toDateString()
       ) {
           streak = 0; // Reset streak if not consecutive days
           lastRecycleDate = null;

           document.getElementById("streak").innerText = streak; // Reset display
           localStorage.removeItem("recycleStreak");
           localStorage.removeItem("lastRecycleDate");
       }
   }
}

// Initialize OpenStreetMap with Leaflet.js
function initMap() {
   const map = L.map('map').setView([51.505, -0.09], 13); // Default location and zoom level

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution:
           '&copy; OpenStreetMap contributors',
   }).addTo(map);

   // Example marker for a recycling location
   L.marker([51.505, -0.09]).addTo(map)
       .bindPopup('Recycling Center')
       .openPopup();
}

// Redeem Points Functionality
function redeemPoints() {
   if (points >= 100) {
       alert("Congratulations! You redeemed your points.");
       points -= 100; // Deduct redeemed points
       document.getElementById("points").innerText = points; // Update display
   } else {
       alert("You need at least 100 points to redeem rewards.");
   }
}

// Login and Signup Functions
function login() {
   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("password").value.trim();

   if (email && password) alert(`Welcome back, ${email}!`);
   else alert("Please fill in all fields.");
}

function signup() {
   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("password").value.trim();

   if (email && password) alert(`Account created for ${email}!`);
   else alert("Please fill in all fields.");
}

// Load data when the page loads
window.onload = function () {
   loadStreakData();
   initMap(); // Initialize the map when the page loads
};
