import { getAllGuides, getGuide } from "../model/guide_model.js";

function createDynamicGuideCard(guideData) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-auto col-sm-12 col-md-4 col-lg-4 col-xl-4";
    colDiv.style.padding = "15px";
    colDiv.style.width = "250p !important";
    colDiv.style.height = "350px !important";

    const cardDiv = document.createElement("div");
    cardDiv.className = "bg-light border rounded shadow card";
    cardDiv.style.width = "250px";

    const imgElement = document.createElement("img");
    imgElement.className = "card-img-top";
    imgElement.src = "assert/image/img.png"; // Assuming the correct path to your image

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardBodyDiv.style.display = "flex";
    cardBodyDiv.style.flexDirection = "column";
    cardBodyDiv.style.justifyContent = "center";
    cardBodyDiv.style.alignItems = "center";

    const labels = [
        "Guide ID : " + guideData.guideId,
        "Name : " + guideData.name,
        "Price Per Day : " + guideData.pricePerDay,
        "Experience : " + guideData.experience,
    ];

    labels.forEach((labelText) => {
        const labelDiv = document.createElement("div");
        labelDiv.className = "form-label";
        labelDiv.textContent = labelText;
        labelDiv.style.margin = "0px";
        cardBodyDiv.appendChild(labelDiv);
    });

    const viewMoreButton = document.createElement("button");
    viewMoreButton.className = "btn btn-outline-success";
    viewMoreButton.style.fontWeight = "normal";
    viewMoreButton.style.fontFamily = "Antic, sans-serif";
    viewMoreButton.type = "button";
    viewMoreButton.textContent = "View";
    viewMoreButton.style.width = "75px";
    viewMoreButton.style.height = "25px";
    viewMoreButton.style.fontSize = "13px";
    viewMoreButton.style.marginTop = "10px";
    viewMoreButton.style.display = "flex";
    viewMoreButton.style.justifyContent = "center";
    viewMoreButton.style.alignItems = "center";

    viewMoreButton.addEventListener("click", function () {
        viewOnGuideCard(guideData.guideId); // Pass the guideId to the function
    });

    cardBodyDiv.appendChild(viewMoreButton);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function setGuideCards(data) {
    const sampleGuideData = {
        guideId: data.guideId, name: data.name,
        pricePerDay: data.pricePerDay,
        experience: data.experience
    };

    const dynamicCard = createDynamicGuideCard(sampleGuideData);
// Append the dynamicCard to your container element
    const container = document.getElementById("guide_view_sub_div");
    container.appendChild(dynamicCard);
}



function viewOnGuideCard(guideId) {
    console.log("View on guide card clicked: " + guideId);
    getGuide(guideId)
        .then((data) => {
            // Update the UI with guide data, e.g., form fields
            document.getElementById("manage_guide_name").value = data.name;
            document.getElementById("manage_guide_id").value = data.guideId;
            document.getElementById("manage_guide_age").value = data.age;
            document.getElementById("manage_guide_address").value = data.address;
            document.getElementById("manage_guide_contact").value = data.contactNo;
            document.getElementById("manage_guide_experience").value = data.experience;
            document.getElementById("manage_guide_man_day_value").value = data.manDayValue;
            document.getElementById("manage_guide_remark").value = data.remark;
            selectRadioButtonManageGender(data.gender);
            alert("Guide found!");
        })
        .catch((error) => {
            console.error(error);
            // Display an error message, e.g., using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        });
}

function selectRadioButtonManageGender(gender) {
    if (gender === 'Female') {
        document.getElementById("manage_guide_radio_female").checked = true;
    } else if (gender === 'Male') {
        document.getElementById("manage_guide_radio_male").checked = true;
    }
}


$(document).ready(() => {

    console.log("ready in guide view");
    let promise = getAllGuides();
    promise.then((data) => {

        console.log("array size of guide : " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                setGuideCards(ele)
                console.log(ele.guideId);
            });
        } else alert("No guide found !")
    }).catch((e) => {
        alert(e.message);
    });
})