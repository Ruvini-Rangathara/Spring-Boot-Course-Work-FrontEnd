import {getAllVehicles, getVehicle} from "../model/vehicle_model.js";


//------------------------------------------------------------------------------------------
// get all vehicles ------------------------------------------------------------------------

function createDynamicCard(vehicleData) {
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


    const labels = ["Vehicle ID : " + vehicleData.vehicleId, "Vehicle Type : " + vehicleData.vehicleType, "Brand : " + vehicleData.brand, "Seat Capacity : " + vehicleData.seatCapacity,];


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
        viewOnVehicleCard(vehicleData.vehicleId);
    });


    cardBodyDiv.appendChild(viewMoreButton);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function setVehicleCards(data) {
    const sampleVehicleData = {
        vehicleId: data.vehicleId, vehicleType: data.vehicleType, brand: data.brand, seatCapacity: data.seatCapacity
    };

    const dynamicCard = createDynamicCard(sampleVehicleData);
// Append the dynamicCard to your container element
    const container = document.getElementById("vehicle_view_sub_div");
    container.appendChild(dynamicCard);
}

function viewOnVehicleCard(id) {
    console.log("view on vehicle card clicked : " + id)


    getVehicle(id).then(data => {

        console.log("search")
        // Set the vehicle data into form elements
        $('#manage_vehicle_id').val(data.vehicleId);
        $('#manage_vehicle_brand').val(data.brand);
        $('#manage_vehicle_category').val(data.category);
        $('#manage_vehicle_price_per_day').val(data.pricePerDay);

        console.log(data.pricePerDay)

        $('#manage_vehicle_fuel_type').val(data.fuelType);
        $('#manage_vehicle_fuel_usage').val(data.fuelUsage);

        selectRadioButtonManageTransmissionType(data.transmissionType);
        selectRadioButtonManageHybridOrNonHybrid(data.hybridOrNon);
        selectRadioButtonManageVehicleAvailability(data.availability);

        $('#manage_vehicle_seat_capacity').val(data.seatCapacity);
        $('#manage_vehicle_type').val(data.vehicleType);
        $('#vehicle_remark').val(data.remark);

        // Set vehicle image previews
        // setImages(data.images);

        const driverData = data.driver;

        // Set the driver data into the form elements
        $('#manage_vehicle_driver_id').val(driverData.driverId);
        $('#manage_vehicle_driver_name').val(driverData.name);
        $('#manage_vehicle_driver_contact_no').val(driverData.contactNo);


        alert("Vehicle found !");
    }).catch(e => {
        console.log(e.message)
        alert("Error in getting vehicle details !" + e);
    })
}


//-----------------------  select Radio Button Manage TransmissionT ype  ---------------------------------
function selectRadioButtonManageTransmissionType(transmissionType) {
    if (transmissionType === 'Manual') {
        $('#manage_vehicle_radio_manual').prop('checked', true);
    } else if (transmissionType === 'Auto') {
        $('#manage_vehicle_radio_auto').prop('checked', true);
    }
}

//----------------------  select Radio Button Manage Hybrid Or NonHybrid  --------------------------------
function selectRadioButtonManageHybridOrNonHybrid(hybridOrNon) {
    if (hybridOrNon === 'Hybrid') {
        $('#manage_vehicle_radio_hybrid').prop('checked', true);
    } else if (hybridOrNon === 'Non-Hybrid') {
        $('#manage_vehicle_radio_non_hybrid').prop('checked', true);
    }
}

//------------------------  select Radio Button Manage Vehicle Availability  -----------------------------
function selectRadioButtonManageVehicleAvailability(availability) {
    if (availability === 'Available') {
        $('#manage_vehicle_radio_available').prop('checked', true);
    } else if (availability === 'Unavailable') {
        $('#manage_vehicle_radio_non_available').prop('checked', true);
    }
}



$(document).ready(() => {
    console.log("ready in vehicle view");

    let promise = getAllVehicles();
    promise.then((data) => {

        console.log("array size of vehicle : " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                setVehicleCards(ele);
            });
        } else alert("No vehicles found !")
    }).catch((e) => {
        alert(e.message);
    });

})


