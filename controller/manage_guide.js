// Hide the manage_user section when the website loads
document.getElementById("manage_user").style.display = "none";

// Add a click event listener to the btn_view_guide1 button
document.getElementById("btn_view_guide1").addEventListener("click", function () {
    // Show the manage_user section
    const manageGuide = document.getElementById("manage_user");
    manageGuide.style.display = "block";

    // Position it at the top of the currently visible display
    manageGuide.style.position = "absolute";
    manageGuide.style.top = window.scrollY + "px"; // Use window.scrollY to get the current scroll position
    manageGuide.style.left = "50%";
    manageGuide.style.transform = "translate(-50%, 0)";
});

// Add a click event listener to the btn_close_guide_form button
document.getElementById("btn_close_guide_form").addEventListener("click", function () {
    // Hide the manage_user section
    const manageGuide = document.getElementById("manage_user");
    manageGuide.style.display = "none";
});


