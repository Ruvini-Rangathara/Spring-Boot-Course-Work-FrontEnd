document.getElementById("next-button").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});


//
// document.getElementById("popupButton").addEventListener("click", function() {
//     document.getElementById("popup").style.display = "block";
// });
//
// document.getElementById("closeButton").addEventListener("click", function() {
//     document.getElementById("popup").style.display = "none";
// });
//
// // Close the pop-up if the user clicks outside the pop-up
// window.onclick = function(event) {
//     var popup = document.getElementById("popup");
//     if (event.target === popup) {
//         popup.style.display = "none";
//     }
// };
