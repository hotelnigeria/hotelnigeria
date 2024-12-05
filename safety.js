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

// Predefined hotels data (for demonstration purposes)
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

function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            let width = img.width;
            let height = img.height;

            // Maintain aspect ratio
            if (width > height && width > maxWidth) {
                height = Math.round((height *= maxWidth / width));
                width = maxWidth;
            } else if (height > maxHeight) {
                width = Math.round((width *= maxHeight / height));
                height = maxHeight;
            }

            // Resize the image using a canvas
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // Return the Base64 string
            callback(canvas.toDataURL("image/jpeg", 0.7)); // Adjust quality (0.7 = 70%)
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}



function sendMail() {
    // Retrieve form values
    let hotel = document.getElementById('hotel').value;
    let checkin = document.getElementById('checkin').value;
    let checkout = document.getElementById('checkout').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let name = document.getElementById('name').value;

    // Get the uploaded receipt file
    let receiptupload = document.getElementById('receiptupload').files[0];

    if (!receiptupload) {
        alert('Please upload a receipt image.');
        return;
    }

    // Resize the image and send the email
    resizeImage(receiptupload, 800, 800, function (base64Image) {
        let parms = {
            hotel: hotel,
            checkin: checkin,
            checkout: checkout,
            phonenumber: phonenumber,
            name: name,
            // Directly pass the Base64 string for the image
            receiptupload: base64Image
        };

        let data = {
            service_id: 'service_uju6m1s',
            template_id: 'template_x5ozjcr',
            user_id: 'MV-F5_VpfKs05_rVs',
            template_params: parms
        };

        // Send the email
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
            .done(function () {
                alert('Your email with the receipt has been sent successfully!');
            })
            .fail(function (error) {
                alert('Oops! Something went wrong: ' + JSON.stringify(error));
            });
    });
}
