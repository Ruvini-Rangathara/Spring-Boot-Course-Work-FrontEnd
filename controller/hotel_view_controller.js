import {getAllHotels, getHotel} from "../model/hotel_model.js";

//------------------------------------------------------------------------------------------
// get all vehicles ------------------------------------------------------------------------

function createDynamicHotelCard(hotelData) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-auto col-sm-12 col-md-4 col-lg-4 col-xl-4";
    colDiv.style.padding = "15px";
    colDiv.style.width = "250px";
    colDiv.style.height = "350px";


    const cardDiv = document.createElement("div");
    cardDiv.className = "bg-light border rounded shadow card";
    cardDiv.style.width = "250px";

    const imgElement = document.createElement("img");
    imgElement.className = "card-img-top";
    imgElement.src = "assert/image/img.png";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    cardBodyDiv.style.display = "flex";
    cardBodyDiv.style.flexDirection = "column";
    cardBodyDiv.style.justifyContent = "center";
    cardBodyDiv.style.alignItems = "center"


    const labels = ["Hotel Code : " + hotelData.hotelCode,
        "Location : " + hotelData.location, "Category : " + hotelData.category,
        "Star Rate : " + hotelData.starRate,];


    labels.forEach((labelText) => {
        const labelDiv = document.createElement("div"); // Create a <div> for each label
        labelDiv.className = "form-label";
        labelDiv.textContent = labelText;
        labelDiv.style.margin = "0px";


        cardBodyDiv.appendChild(labelDiv); // Append the <div> to the card body
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
        viewOnHotelCard(hotelData.hotelCode);
    });


    cardBodyDiv.appendChild(viewMoreButton);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function setHotelCards(data) {
    const sampleHotelData = {
        hotelCode: data.hotelCode, category: data.category, location: data.location,
        starRate: data.starRate
    };

    const dynamicCard = createDynamicHotelCard(sampleHotelData);
// Append the dynamicCard to your container element
    const container = document.getElementById("hotel_view_sub_div");
    container.appendChild(dynamicCard);
}


function viewOnHotelCard(hotelCode) {
    e.preventDefault()
    getHotel(hotelCode).then((data) => {

        $("#manage_hotel_code").val(data.hotelCode);
        $("#manage_hotel_name").val(data.name);
        $("#manage_hotel_category").val(data.category);
        $("#manage_hotel_location").val(data.location);
        $("#manage_hotel_star_rate").val(data.starRate);

        $("#manage_hotel_email").val(data.email);
        $("#manage_hotel_contact_no").val(data.contactNo);

        $("#manage_hotel_cancellation_criteria").val(data.cancellationCriteria);
        selectRadioButtonManagePetAllow(data.petsAllowedOrNot);
        $("#manage_hotel_opt1_price").val(data.opt1_price);
        $("#manage_hotel_opt2_price").val(data.opt2_price);
        $("#manage_hotel_opt3_price").val(data.opt3_price);
        $("#manage_hotel_opt4_price").val(data.opt4_price);

        alert("Hotel found!");

    }).catch((error) => {
        console.log(error);
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Hotel Not Found!',
        });

    });
}


//---------------------------------------------  select Radio Button Manage pet allow  -------------------------------------------
function selectRadioButtonManagePetAllow(gender) {
    if (gender === 'Allow') {
        $('#manage_hotel_allowed_pet').prop('checked', true);
    } else if (gender === 'NotAllow') {
        $('#manage_hotel_not_allowed_pet').prop('checked', true);
    }
}

$(document).ready(function () {
    console.log("ready in hotel view");

    let promise = getAllHotels();
    promise.then((data) => {

        console.log("array size of hotel : " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                setHotelCards(ele);
                console.log(ele.hotelCode);
            });
        } else alert("No vehicles found !")
    }).catch((e) => {
        alert(e.message);
    });

})

