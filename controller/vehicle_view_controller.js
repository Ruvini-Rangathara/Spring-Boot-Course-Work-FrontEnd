import {
    getAllVehicles
} from "../model/vehicle_model.js";


//------------------------------------------------------------------------------------------
// get all vehicles ------------------------------------------------------------------------
function createVehicleCard(data) {

    const elementHTML = `
      <div class="col-auto col-sm-12 col-md-4 col-lg-4 col-xl-4"
                 style="padding-top: 15px;padding-bottom: 15px;padding-right: 15px;padding-left: 15px;">
                <div class="bg-light border rounded shadow card">
                    <img class="card-img-top" src="data:image/png;base64,${data.images[0]}" alt="Card image cap">
                    <div class="card-body">
                        <label class="form-label">Vehicle ID : V0001</label>
                        <label class="form-label">Vehicle Type : Van</label>
                        <!--                        <label class="form-label">Category : Luxury</label>-->
                        <label class="form-label">Brand : KDH</label>
                        <label class="form-label">Seat Capacity : 12</label>
                        <label class="form-label"></label>
                        <button class="btn btn-outline-success"
                                style="font-weight: normal;font-family: Antic, sans-serif;"
                                type="button">View More
                        </button>
                    </div>
                </div>
                <div class="bg-light border rounded shadow card"></div>
            </div>
           `;

    document.getElementsByClassName('vehicle_grid_container')[0].innerHTML += elementHTML;
}


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
    imgElement.src = `data:image/png;base64,${vehicleData.images[0]}`;

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

$(document).ready(() => {

    let promise = getAllVehicles();
    promise.then((data) => {

        console.log("array size: " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                setVehicleCards(ele);
                console.log(ele.images[0]);
            });
        } else alert("No vehicles found !")
    }).catch((e) => {
        // alert(e.message);
    });

})






