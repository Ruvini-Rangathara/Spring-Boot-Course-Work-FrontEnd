// // Hide the manage_user section when the website loads
document.getElementById("manage_guide").style.display = "none";

// Add a click event listener to the btn_view_guide1 button

// Get all elements with the "btn_guide_view" class
const elements = document.getElementsByClassName("btn_guide_view");

// Loop through the elements and attach the click event listener to each
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () {
        // Show the manage_user section
        const manageGuide = document.getElementById("manage_guide");
        manageGuide.style.display = "block";

        // Position it at the top of the currently visible display
        manageGuide.style.position = "absolute";
        manageGuide.style.top = window.scrollY + "px"; // Use window.scrollY to get the current scroll position
        manageGuide.style.left = "50%";
        manageGuide.style.transform = "translate(-50%, 0)";
    });
}


// Add a click event listener to the btn_close_guide_form button
document.getElementById("btn_close_guide_form").addEventListener("click", function () {
    // Hide the manage_user section
    const manageGuide = document.getElementById("manage_guide");
    manageGuide.style.display = "none";
});


// ===============================  add dynamically grid item  ===================================
// Function to add a new grid item
function addGridItem() {
    const container = document.querySelector(".guide_grid_container");

    // Create a new grid item
    const newItem = document.createElement("div");
    newItem.classList.add("guide_grid_item");

    // Add the content to the new item
    newItem.innerHTML = `
        <img src="assert/image/travelImage2.jpg" class="img_guide">
        <label class="guide_img_label">Ruvini Rangathara</label><br>
        <button class="btn_guide_view">View</button>
    `;

    // Append the new item to the container
    container.appendChild(newItem);
}

document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here
    console.log("In add grid item method")
    addGridItem();
});


document.getElementById("add_guide").addEventListener("click", function () {
    // Collect data from the frontend fields
    const guideData = {
        guideId: document.getElementById("guide_id").value
        // name: document.getElementById("guide_name").value,
        // age: parseInt(document.getElementById("guide_age").value),
        // gender: document.querySelector('input[name="guide_gender"]:checked').value,
        // address: document.getElementById("guide_address").value,
        // contactNo: document.getElementById("guide_contact").value,
        // manDayValue: parseFloat(document.getElementById("man_day_value").value),
        // experience: document.getElementById("guide_experience").value, // Add other fields as needed
    };

    // Send a POST request to the backend
    fetch("http://localhost:9095/guide/api/v1/guide", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(guideData),
    })
        .then(response => {
            console.log("in guide js");
            if (!response.ok) {
                throw new Error("Failed to add guide.");
            }
            return response.json();
        })
        .then(data => {
            // Handle the response from the server, e.g., show a success message
            console.log(data);
        })
        .catch(error => {
            // Handle any errors, e.g., display an error message
            console.error(error);
        });
});




