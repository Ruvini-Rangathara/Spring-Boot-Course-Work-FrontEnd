// Hide the manage_user section when the website loads
document.getElementById("manage_user").style.display = "none";

// Add a click event listener to the next_button
document.getElementById("next_button").addEventListener("click", function (e) {
    e.preventDefault()
    // Show the manage_user section
    const manageUserSection = document.getElementById("manage_user");
    manageUserSection.style.display = "block";

    // Position it at the center of the screen
    manageUserSection.style.position = "fixed";
    manageUserSection.style.top = "10%";
    manageUserSection.style.left = "50%";
    manageUserSection.style.transform = "translate(-50%, -50%)";
});

// Add a click event listener to the btn_close_user_form button
document.getElementById("btn_close_user_form").addEventListener("click", function (e) {
    e.preventDefault()
    // Hide the manage_user section
    const manageUserSection = document.getElementById("manage_user");
    manageUserSection.style.display = "none";
});
