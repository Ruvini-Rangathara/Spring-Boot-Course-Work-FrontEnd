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
