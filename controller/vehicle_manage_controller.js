import {getLastOnGoingDriverId, saveDriver} from "../model/driver_model.js";
import {
    getAllVehicles, updateVehicle, getLastOnGoingVehicleId, saveVehicle, deleteVehicle, getVehicle, existsByVehiclesId
} from "../model/vehicle_model.js";

const vehicle_id_regex = /^V\d{3,}$/;
const vehicle_brand_regex = /^[A-Za-z0-9\\s-]+$/;

const driver_id_regex = /^D\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const vehicle_price_per_day_regex = /^\d+(\.\d{2})?$/;
const contact_number = /^\d{10}$/;

function clearManageVehicleForm() {
    $('#vehicle_search_input').val("");
    $('#manage_vehicle_id').val("");
    $('#manage_vehicle_brand').val("");
    $('#manage_vehicle_category').val("");
    $('#manage_vehicle_price_per_day').val("");
    $('#manage_vehicle_fuel_type').val("");
    $('#manage_vehicle_fuel_usage').val("");
    $('#manage_vehicle_seat_capacity').val("");
    $('#manage_vehicle_type').val("");
    $('#vehicle_remark').val("");

    $('#manage_vehicle_driver_id').val("");
    $('#manage_vehicle_driver_name').val("");
    $('#manage_vehicle_driver_contact_no').val("");

    $('#manage_vehicle_radio_manual').prop('checked', false);
    $('#manage_vehicle_radio_auto').prop('checked', false);
    $('#manage_vehicle_radio_hybrid').prop('checked', false);
    $('#manage_vehicle_radio_non_hybrid').prop('checked', false);
    $('#manage_vehicle_radio_available').prop('checked', false);
    $('#manage_vehicle_radio_non_available').prop('checked', false);
}


// get last vehicle id -------------------------------------------------------------
function getLastVehicleId() {
    let promise = getLastOnGoingVehicleId();
    promise.then((data) => {
        console.log("vehicle id : " + data)
        $('#manage_vehicle_id').val(data);
    }).catch((e) => {
        alert("Error in getting vehicle details !");
    });
}


function getLastDriverId() {
    let promise = getLastOnGoingDriverId();
    promise.then((data) => {
        console.log("driver id : " + data)
        $('#manage_vehicle_driver_id').val(data);
    }).catch((e) => {
        alert("Error in getting driver details !");
    });
}

$('#manage_vehicle_btn_new').on('click', (e) => {
    e.preventDefault()
    clearManageVehicleForm();
    getLastVehicleId();
    getLastDriverId();
})


// -----------------------------------------------------------------------------------------
// save vehicle & driver -------------------------------------------------------------------
function checkImages() {
//     let fileInputs = document.querySelectorAll('.vehicle_manage_image_file');
// // Check if all five file inputs are used (have a selected file)
//     for (let i = 0; i < fileInputs.length; i++) {
//         if (fileInputs[i].files.length === 0) {
//             return false; // At least one file input has no selected file
//         }
//     }
//     return true; // All file inputs have selected files
}

function validateVehicleDetails() {
    if (vehicle_id_regex.test($('#manage_vehicle_id').val())) {
        if (vehicle_brand_regex.test($('#manage_vehicle_brand').val())) {
            if (vehicle_price_per_day_regex.test($('#manage_vehicle_price_per_day').val())) {
                if ($('#manage_vehicle_category').val() != null) {
                    if ($('#manage_vehicle_fuel_type').val() != null) {
                        if ($("input[name='manage_hybrid_or_non_hybrid']:checked").val() != null) {
                            if ($('#manage_vehicle_fuel_usage').val() > 0) {
                                if (checkImages()) {
                                    if ($("#manage_vehicle_type").val() != null) {
                                        if ($("input[name='manage_vehicle_availability']:checked").val() != null) {
                                            if ($("input[name='manage_transmission_type']:checked").val() != null) {
                                                if ($('#manage_vehicle_seat_capacity').val() > 0 & $("#manage_vehicle_seat_capacity").val() < 60) {
                                                    return true;
                                                } else {
                                                    alert("Invalid seat capacity!");
                                                }
                                            } else {
                                                alert("Select vehicle transmission type!");
                                            }
                                        } else {
                                            alert("Select vehicle availability!");
                                        }
                                    } else {
                                        alert("Select type of your vehicle!");
                                    }
                                } else {
                                    alert("Select photos of your vehicle!")
                                }
                            } else {
                                alert("Input Vehicle Fuel usage!")
                            }
                        } else {
                            alert("Select Vehicle Type!")
                        }
                    } else {
                        alert("Select Fuel Type!")
                    }
                } else {
                    alert("Select Vehicle Category !");
                }
            } else {
                alert("Invalid Vehicle Price !");
            }
        } else {
            alert("Invalid Vehicle Brand !");
        }
    } else {
        alert("Invalid Vehicle ID Pattern !");
    }
    return false;
}

function validateDriverDetails() {
    if (driver_id_regex.test($('#manage_vehicle_driver_id').val())) {
        if (name_pattern.test(($('#manage_vehicle_driver_name').val()))) {
            if (contact_number.test($('#manage_vehicle_driver_contact_no').val())) {
                // if (document.getElementById('manage_vehicle_driver_license_front_file').files.length !== 0 && document.getElementById('manage_vehicle_driver_license_back_file').files.length !== 0) {
                return true;
                // } else {
                //     alert("select driver license ! ")
                // }
            } else {
                alert("invalid driver contact number ! ")
            }
        } else {
            alert("invalid driver name ! ")
        }
    } else {
        alert("invalid driver id type! ")
    }
    return false;
}

// ------------------------------------------------------------------------------------------------------------------
$('#manage_vehicle_btn_save').on('click', (e) => {
    e.preventDefault()
    //
    // if (validateVehicleDetails()) {
    //     if (validateDriverDetails()) {
    let driver = {
        driverId: $('#manage_vehicle_driver_id').val(),
        name: $('#manage_vehicle_driver_name').val(),
        contactNo: $('#manage_vehicle_driver_contact_no').val()
    }
    let isSaved = saveDriver(driver);
    isSaved.then((resolve) => {
        let vehicle = {
            vehicleId: $('#manage_vehicle_id').val(),
            brand: $('#manage_vehicle_brand').val(),
            category: $('#manage_vehicle_category').val(),
            fuelType: $('#manage_vehicle_fuel_type').val(),
            hybridOrNon: getRadioButtonValueManageHybridOrNonHybrid(),
            fuelUsage: $('#manage_vehicle_fuel_usage').val(),
            seatCapacity: $("#manage_vehicle_seat_capacity").val(),
            vehicleType: $("#manage_vehicle_type").val(),
            transmissionType: getRadioButtonValueManageTransmissionType(),
            availability: getRadioButtonValueManageVehicleAvailability(),
            pricePerDay: $('#manage_vehicle_price_per_day').val(),
            remark: $('#vehicle_remark').val(),
        }
        saveVehicle(vehicle).then((resolve) => {
            swal("Good job!", "Vehicle details saved successfully !", "success");
        }).catch((e) => {
            console.log(e.message)
            swal("Oops!", "Error in saving vehicle details !", "error");
        });
    }).catch((e) => {
        alert(e.message)
    });
    //     }
    // }
})

// -----------------------------------------------------------------------------------------
// delete vehicle & driver -----------------------------------------------------------------
$('#manage_vehicle_btn_delete').on('click', (e) => {
    e.preventDefault()
    let vehicle_id = $('#manage_vehicle_id').val()
    if (vehicle_id_regex.test(vehicle_id)) {
        let isDeleted = deleteVehicle(vehicle_id);
        isDeleted.then((resolve) => {
            alert(resolve)
            // window.location.href = "index.html"; //redirect to home page
        }).catch((e) => {
            alert("Error in deleting vehicle details !")
        });
        document.getElementById('save_vehicle_data').disabled = true;
    } else {
        alert("Invalid vehicle id or driver id !")
    }
})

//------------------------------------------------------------------------------------------
// get all vehicles ------------------------------------------------------------------------
function createVehicleCard(data) {

    const elementHTML = `
                    <div class="col-auto col-sm-12 col-md-4 col-lg-4 col-xl-4"
                 style="padding-top: 15px;padding-bottom: 15px;padding-right: 15px;padding-left: 15px;">
                <div class="bg-light border rounded shadow card">
                    <img class="card-img-top" src="data:image/png;base64,${data.images[0]}">
                    <div class="card-body">
                        <label class="form-label">Vehicle ID : ${data.vehicleId}</label>
                        <label class="form-label">Vehicle Type : ${data.vehicleType}</label>
                        <label class="form-label">Brand : ${data.brand}</label>
                        <label class="form-label">Seat Capacity : ${data.seatCapacity}</label>
                        <button class="btn btn-outline-success"
                                style="font-weight: normal;font-family: Antic, sans-serif;"
                                type="button">View More</button>
                    </div>
                </div>
                <div class="bg-light border rounded shadow card"></div>
            </div>
    `;

    document.getElementsByClassName('vehicle_grid_container')[0].innerHTML += elementHTML;
}

$(document).ready(() => {
    clearManageVehicleForm();
})

// -----------------------------------------------------------------------------------------
// get vehicle & driver --------------------------------------------------------------------
function setImages(dataImageList) {
    let fileInputs = document.querySelectorAll('.vehicle_manage_img_div');

    // if (dataImageList.length >= fileInputs.length) {
    //     dataImageList.slice(0, fileInputs.length).forEach((imageData, index) => {
    //         // Create a Blob object from the image data
    //         const blob = new Blob([imageData], {type: 'image/png'});
    //
    //         // Create a File object from the Blob
    //         const file = new File([blob], 'image.png', {type: 'image/png'});
    //
    //         // Simulate setting the selected file in the file input
    //         fileInputs[index].files = new FileList([file]);
    //     });
    //     return true; // All file inputs have selected files
    // } else {
    //     return false; // Not enough images for all file inputs
    // }
}


//------------------------------------------------------------------------------------------
// update vehicle details ------------------------------------------------------------------
$('#update_btn').on('click', (e) => {
    e.preventDefault()
    if (validate_Vehicle_details()) {
        if (validate_driver_details()) {
            let driver = {
                id: $('#driver_id').val(), name: $('#driver_name').val(), contact_no: $('#driver_contact').val()
            }
            let isUpdated = update_driver(driver);
            isUpdated.then((resolve) => {
                let vehicle = {
                    id: $('#vehicle_id').val(),
                    brand: $('#vehicle_brand').val(),
                    category: $('#category').val(),
                    fuel_type: $('#fuel_type').val(),
                    hybrid_or_non: $("input[name='radio-group-type']:checked").val(),
                    fuel_usage: $('#fuel_usage').val(),
                    transmission_type: $("input[name='transmission-group']:checked").val(),
                    vehicle_type: $("#vehicle_type").val(),
                    seat_capacity: $("#seat_capacity").val(),
                    availability: $("input[name='vehicle-availability-group']:checked").val(),
                    fee_per_day: $('#fee_per_day').val(),
                    fee_per_km: $('#fee_per_km').val(),
                }
                update_vehicle(vehicle).then((resolve) => {
                    alert(resolve)
                    // window.location.href = "index.html"; //redirect to home page
                    alert("Vehicle details updated successfully !");
                }).catch((e) => {
                    console.log(e.message)
                    alert(e.message)
                });
            }).catch((e) => {
                alert(e.message)
            });
        }
    }
});

function selectRadioButtonManageTransmissionType(transmissionType) {
    if (transmissionType === 'Manual') {
        $('#manage_vehicle_radio_manual').prop('checked', true);
    } else if (transmissionType === 'Auto') {
        $('#manage_vehicle_radio_auto').prop('checked', true);
    }
}

function selectRadioButtonManageHybridOrNonHybrid(hybridOrNon) {
    if (hybridOrNon === 'Hybrid') {
        $('#manage_vehicle_radio_hybrid').prop('checked', true);
    } else if (hybridOrNon === 'Non-Hybrid') {
        $('#manage_vehicle_radio_non_hybrid').prop('checked', true);
    }
}

function selectRadioButtonManageVehicleAvailability(availability) {
    if (availability === 'Available') {
        $('#manage_vehicle_radio_available').prop('checked', true);
    } else if (availability === 'Unavailable') {
        $('#manage_vehicle_radio_non_available').prop('checked', true);
    }
}

function getRadioButtonValueManageTransmissionType() {
    if ($('#manage_vehicle_radio_manual').is(":checked")) {
        return 'Manual';
    } else if ($('#manage_vehicle_radio_auto').is(":checked")) {
        return 'Auto';
    }
}

function getRadioButtonValueManageHybridOrNonHybrid() {
    if ($('#manage_vehicle_radio_hybrid').is(":checked")) {
        return 'Hybrid';
    } else if ($('#manage_vehicle_radio_non_hybrid').is(":checked")) {
        return 'Non-Hybrid';
    }
}

function getRadioButtonValueManageVehicleAvailability() {
    if ($('#manage_vehicle_radio_available').is(":checked")) {
        return 'Available';
    } else if ($('#manage_vehicle_radio_non_available').is(":checked")) {
        return 'Unavailable';
    }
}

$('#vehicle_search_button').on('click', (e) => {
    e.preventDefault()

    if (vehicle_id_regex.test($('#vehicle_search_input').val())) {
        getVehicle($("#vehicle_search_input").val()).then(data => {

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


            const driverData = data.driver;

            // Set the driver data into the form elements
            $('#manage_vehicle_driver_id').val(driverData.driverId);
            $('#manage_vehicle_driver_name').val(driverData.name);
            $('#manage_vehicle_driver_contact_no').val(driverData.contactNo);

            // // Set driver image previews
            // $('#manage_vehicle_driver_license_front_file').attr('src', `data:image/png;base64,${driverData.licenseFront}`);
            // $('#manage_vehicle_driver_license_back_file').attr('src', `data:image/png;base64,${driverData.licenseBack}`);

            // $('#manage_vehicle_btn_save').prop('disabled', true);
            alert("Vehicle found !");
        }).catch(e => {
            console.log(e.message)
            alert("Error in getting vehicle details !" + e);
        })
    } else {
        alert("Invalid vehicle id !");
        $('#manage_vehicle_btn_save').prop('disabled', false);
    }
})

// ============================================================================================


$('#manage_vehicle_btn_delete').on('click', (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

    })
})
