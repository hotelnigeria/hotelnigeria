document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("navbar-toggle");
    const navbarMenu = document.getElementById("navbar-menu");

    // Toggle menu visibility
    toggleButton.addEventListener("click", () => {
        if (navbarMenu.classList.contains("show")) {
            navbarMenu.classList.remove("show");
            navbarMenu.classList.add("hide");
            toggleButton.innerHTML = "<i class='bx bx-menu'></i>"; // Change to menu icon
        } else {
            navbarMenu.classList.remove("hide");
            navbarMenu.classList.add("show");
            toggleButton.innerHTML = "<i class='bx bx-x' style='color:white'></i>"; // Change to close icon
        }
    });
});
// Get references to the elements
const greeting = document.getElementById('greeting');
const description = document.getElementById('description');

// Get the current hour
const currentHour = new Date().getHours();

// Set the text based on the time of day
if (currentHour >= 5 && currentHour < 12) {
    greeting.textContent = "Hotel Nigeria Got's You Covered!";
    description.textContent = "Start your day with a perfect hotel stay!";
} else if (currentHour >= 12 && currentHour < 18) {
    greeting.textContent = "Sit Back And Book from Your Comfort Zone!!";
    description.textContent = "Relax and book your ideal afternoon getaway!";
} else {
    greeting.textContent = "We Are Open 24/7";
    description.textContent = "Unwind with a luxurious evening stay!";
}


let hotels = [
    {
        name: "Beach Resort",
        price: "$200/night",
        amenities: [ "Pool", "Restaurant", "Gym"],
        image: "img/hotel1.jpg",
        location: "Miami, FL",
        rate: 4.5
    },
    {
        name: "Mountain View Lodge",
        price: "$150/night",
        amenities: ["Wi-fi", "Hot Tub", "Restaurant", "Bar"],
        image: "img/hotel1.jpg",
        location: "Aspen, CO",
        rate: 4.7
    },
    {
        name: "City Center Hotel",
        price: "$120/night",
        amenities: ["Wi-Fi", "Parking", "Restaurant"],
        image: "img/hotel3.jpg",
        location: "New York, NY",
        rate: 4.3
    },
    // Add more hotels as needed
];

// Load initial data
window.onload = () => {
    loadHotelsForPage(); // Load the first page of hotels
};

// Pagination variables
const itemsPerPage = 6; // Number of hotels per page
let currentPage = 1; // Current page number
let filteredHotels = hotels; // Default to showing all hotels

// Function to load hotels for the current page
function loadHotelsForPage(page = 1) {
    const startIndex = (page - 1) * itemsPerPage; // Calculate start index
    const endIndex = startIndex + itemsPerPage; // Calculate end index
    const hotelsToDisplay = filteredHotels.slice(startIndex, endIndex); // Get the hotels for the current page
    renderHotels(hotelsToDisplay); // Render the hotels
    renderPagination(); // Render pagination buttons
}

// Function to render hotels
function renderHotels(hotelsToDisplay) {
    const hotelList = document.getElementById("hotel-list");
    hotelList.innerHTML = "";

    hotelsToDisplay.forEach(hotel => {
        const card = document.createElement("div");
        card.className = "hotel-card";
        card.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="info">
                <h3>${hotel.name}</h3>
                <p><b>Amenities:</b> ${hotel.amenities.join(", ")}</p>
                <p><b>Price:</b> ${hotel.price}</p>
                <p><b>Ratings:</b> ${hotel.rate}<i class='bx bxs-star'></i></p>
                <p><b>Location:</b> ${hotel.location}</p>
                <button class="book-now" data-hotel-name="${hotel.name}" style="font-size:14px; font-weight:400">Book Now</button>
            </div>
        `;
        hotelList.appendChild(card);
    });

    // Add event listeners for "Book Now" buttons
    document.querySelectorAll(".book-now").forEach(button => {
        button.addEventListener("click", (event) => {
            const hotelName = event.target.dataset.hotelName;
            document.getElementById("hotel").value = hotelName; // Autofill hotel name in booking form
            document.getElementById("booking").scrollIntoView({ behavior: "smooth" }); // Scroll to booking section
        });
    });
}

// Function to render pagination buttons
function renderPagination() {
    const paginationContainer = document.getElementById("pagination"); // Get pagination container
    paginationContainer.innerHTML = ""; // Clear existing buttons
    const totalPages = Math.ceil(filteredHotels.length / itemsPerPage); // Calculate total pages

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i; // Button text is the page number
        button.className = i === currentPage ? "active" : ""; // Highlight the active page
        button.onclick = () => {
            currentPage = i; // Update current page
            loadHotelsForPage(currentPage); // Reload hotels for the new page
        };
        paginationContainer.appendChild(button); // Append button to the container
    }
}

// Function to handle search input
function searchHotels() {
    const search = document.getElementById("search").value.toLowerCase(); // Get the search input value
    filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search) // Filter by hotel name
    );
    currentPage = 1; // Reset to the first page after filtering
    loadHotelsForPage(currentPage); // Load the filtered hotels for the first page
    scrollToResults(); // Scroll to results section
}

// Function to filter hotels by amenities
function filterHotels() {
    const amenity = document.getElementById("amenities").value.toLowerCase(); // Get the selected amenity filter
    filteredHotels = hotels.filter(hotel =>
        amenity === "" || hotel.amenities.map(a => a.toLowerCase()).includes(amenity) // Check if the hotel matches the selected amenity
    );
    currentPage = 1; // Reset to the first page after filtering
    loadHotelsForPage(currentPage); // Load the filtered hotels for the first page
    scrollToResults(); // Scroll to results section
}

// Function to scroll to the results section
function scrollToResults() {
    const resultsSection = document.getElementById("hotel-list");
    resultsSection.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the hotel list section
}
function collectdata(event) {
    event.preventDefault(); // Prevent form submission

    let hotel = document.getElementById('hotel').value;
    let checkin = document.getElementById('checkin').value;
    let checkout = document.getElementById('checkout').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let name = document.getElementById('name').value;

    // Populate modal with user details
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-hotel').textContent = hotel;
    document.getElementById('modal-checkin').textContent = checkin;
    document.getElementById('modal-checkout').textContent = checkout;
    document.getElementById('modal-phone').textContent = phonenumber;

    // Show the modal
    document.getElementById('booking-modal').style.display = 'flex';
}

// Close modal
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('booking-modal').style.display = 'none';
});

// Modify sendMail to retrieve modal data
function sendMail() {
    let parms = {
        hotel: document.getElementById('modal-hotel').textContent,
        checkin: document.getElementById('modal-checkin').textContent,
        checkout: document.getElementById('modal-checkout').textContent,
        phonenumber: document.getElementById('modal-phone').textContent,
        name: document.getElementById('modal-name').textContent
    };

    let data = {
        service_id: 'service_uju6m1s',
        template_id: 'template_x5ozjcr',
        user_id: 'fk6h5h0BetU3aqChR',
        template_params: parms
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    })
    .done(function () {
        alert('Your booking has been confirmed and an email has been sent.');
        document.getElementById('booking-modal').style.display = 'none'; // Hide modal
    })
    .fail(function (error) {
        alert('Error: ' + JSON.stringify(error));
    });
}


// Add event listener for file input
document.getElementById('receiptupload').addEventListener('change', handleFileUpload);
