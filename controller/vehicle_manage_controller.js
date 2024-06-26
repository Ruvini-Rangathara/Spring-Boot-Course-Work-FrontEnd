import {getNewDriverId, saveDriver, updateDriver} from "../model/driver_model.js";
import {
    updateVehicle, getNewVehicleId, saveVehicle, deleteVehicle, getVehicle, existsByVehiclesId
} from "../model/vehicle_model.js";


//---------------------------------------  regex patterns for vehicle data  --------------------------------
const vehicle_id_regex = /^V\d{3,}$/;
const vehicle_brand_regex = /^[A-Za-z0-9\\s-]+$/;

const driver_id_regex = /^D\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const vehicle_price_per_day_regex = /^\d+(\.\d{2})?$/;
const contact_number = /^\d{10}$/;


//-----------------------------------------  clear vehicle form  -------------------------------------------
function clearManageVehicleForm() {
    $('#vehicle_search_input').val("");
    $('#manage_vehicle_id').val("");
    $('#manage_vehicle_brand').val("");
    $('#manage_vehicle_category').val("");
    $('#manage_vehicle_price_per_day').val(0);
    $('#manage_vehicle_fuel_type').val("");
    $('#manage_vehicle_fuel_usage').val("");
    $('#manage_vehicle_seat_capacity').val(0);
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

    $('#manage_vehicle_image_file1').val("");
    $('#manage_vehicle_image_file2').val("");
    $('#manage_vehicle_image_file3').val("");
    $('#manage_vehicle_image_file4').val("");
    $('#manage_vehicle_image_file5').val("");

    $('#manage_vehicle_driver_license_front_file').val("");
    $('#manage_vehicle_driver_license_back_file').val("");
}

//------------------------------------ get new vehicle id --------------------------------------------------
function getNewVehicleIdForTextField() {
    let promise = getNewVehicleId();
    promise.then((data) => {
        console.log("vehicle id : " + data)
        $('#manage_vehicle_id').val(data);
    }).catch((e) => {
        alert("Error in getting vehicle details !");
    });
}

//-------------------------------------  get new driver id  -----------------------------------------------
function getNewDriverIdForTextField() {
    let promise = getNewDriverId();
    promise.then((data) => {
        console.log("driver id : " + data)
        $('#manage_vehicle_driver_id').val(data);
    }).catch((e) => {
        alert("Error in getting driver details !");
    });
}

//------------------------------------- new vehicle -------------------------------------------------------
$('#manage_vehicle_btn_new').on('click', (e) => {
    e.preventDefault()
    clearManageVehicleForm();
    getNewDriverIdForTextField();
    getNewVehicleIdForTextField();
})


//--------------------------------------  check images  ---------------------------------------------------
function checkImages() {
    let fileInputs = document.querySelectorAll('.vehicle_manage_image_file');
    // Convert NodeList to an array for easier manipulation
    let fileInputArray = Array.from(fileInputs);

    // Use the every() method to check if all file inputs have selected files
    let allSelected = fileInputArray.every(function (input) {
        return input.files.length > 0;
    });

    return allSelected; // Returns true if all file inputs have selected files, otherwise false
}


//---------------------------------------  validate vehicle details  --------------------------------------
function validateVehicleDetails() {
    if (vehicle_id_regex.test($('#manage_vehicle_id').val())) {
        if (vehicle_brand_regex.test($('#manage_vehicle_brand').val())) {
            if (vehicle_price_per_day_regex.test($('#manage_vehicle_price_per_day').val())) {
                if ($('#manage_vehicle_category').val() != null) {
                    if ($('#manage_vehicle_fuel_type').val() != null) {
                        if ($("input[name='manage_hybrid_or_non_hybrid']:checked").val() != null) {
                            if ($('#manage_vehicle_fuel_usage').val() > 0) {
                                // if (checkImages()) {
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
                                // } else {
                                //     alert("Select photos of your vehicle!")
                                // }
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

//---------------------------------------  validate driver details  --------------------------------------
function validateDriverDetails() {
    if (driver_id_regex.test($('#manage_vehicle_driver_id').val())) {
        if (name_pattern.test(($('#manage_vehicle_driver_name').val()))) {
            if (contact_number.test($('#manage_vehicle_driver_contact_no').val())) {
                const frontFileInput = document.getElementById('manage_vehicle_driver_license_front_file');
                const backFileInput = document.getElementById('manage_vehicle_driver_license_back_file');

                if (frontFileInput.files.item(0) && backFileInput.files.item(0)) {
                    return true;
                } else {
                    alert("Select driver license!");
                }

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

// -------------------------------------------  save vehicle  --------------------------------------------
$('#manage_vehicle_btn_save').on('click', (e) => {
    e.preventDefault()

    if (validateVehicleDetails()) {
        if (validateDriverDetails()) {
            let driver = {
                driverId: $('#manage_vehicle_driver_id').val(),
                name: $('#manage_vehicle_driver_name').val(),
                contactNo: $('#manage_vehicle_driver_contact_no').val()
            }
            let isSaved = saveDriver(driver);
            console.log("is saved driver : " + isSaved)
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
                    Swal.fire({
                        title: 'Success',
                        text: 'Vehicle details saved successfully!',
                        icon: 'success',
                        showCloseButton: true,
                        closeButton: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            clearManageVehicleForm();
                        }
                    });


                    console.log(resolve)

                }).catch((e) => {
                    console.log(e.message)
                    Swal.fire({
                        title: 'Error', text: 'Vehicle Not Saved!', // Replace 'This is the error message' with your actual error message
                        icon: 'warning', showCloseButton: true, closeButton: '#d33'
                    }).then((result) => {
                        // Handle the result if needed
                    })

                });
            }).catch((e) => {
                alert(e.message)
            });
        }
    }
})

// --------------------------------------  delete vehicle ------------------------------------------------
$("#manage_vehicle_btn_delete").on('click', (e) => {
    e.preventDefault();

    console.log("delete button clicked")
    let vehicle_id = $('#manage_vehicle_id').val();
    console.log("vehicle id : " + vehicle_id)
    if (vehicle_id_regex.test(vehicle_id)) {
        existsByVehiclesId(vehicle_id).then((resolve) => {
            console.log("exists : " + resolve)
            if (resolve) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true, // Added to allow cancellation
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'Yes, delete it'
                }).then((result) => {
                    console.log("then : " + result);
                    if (result.isConfirmed) {

                        console.log("confirmed : " + result)
                        deleteVehicle(vehicle_id)
                            .then((resolve) => {
                                console.log("after delete ")
                                // Handle the success or show a success message
                                Swal.fire({
                                    title: 'Success', text: resolve, icon: 'success'
                                }).then(() => {
                                    clearManageVehicleForm(); // Redirect to home page
                                });
                            })
                            .catch((e) => {
                                // Handle the error or show an error message
                                Swal.fire({
                                    title: 'Error', text: 'Error in deleting vehicle details', icon: 'error'
                                });
                            });
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error', text: 'Vehicle not found !', icon: 'error'
                });
            }
        }).catch((e) => {
            Swal.fire({
                title: 'Error', text: 'Error in deleting vehicle details', icon: 'error'
            });
        })
    }


});


//------------------------------------  update vehicle  --------------------------------------------------
$('#manage_vehicle_btn_update').on('click', (e) => {
    e.preventDefault()
    if (validateVehicleDetails()) {
        console.log("vehicle details validated")
        if (validateDriverDetails()) {

            console.log("driver details validated")
            let driver = {
                driverId: $('#manage_vehicle_driver_id').val(),
                name: $('#manage_vehicle_driver_name').val(),
                contactNo: $('#manage_vehicle_driver_contact_no').val(),

            }

            let isUpdated = updateDriver(driver);
            console.log("is updated driver : " + isUpdated)
            isUpdated.then((resolve) => {
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
                updateVehicle(vehicle).then((resolve) => {
                    console.log("updateVehicle  : " + resolve)
                    Swal.fire({
                        title: 'Success',
                        text: 'Vehicle details updated successfully!',
                        icon: 'success',
                        showCloseButton: true,
                        closeButton: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            clearManageVehicleForm();
                        }
                    });
                }).catch((e) => {
                    console.log(e.message)
                    Swal.fire({
                        title: 'Error',
                        text: 'Error in updating vehicle details',
                        icon: 'error',
                        showCloseButton: true,
                        closeButton: '#d33'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            clearManageVehicleForm();
                        }
                    });
                });
            }).catch((e) => {
                console.log(e.message)
            });
        }

    }

})

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

//------------------------   get Radio Button Value Manage Transmission Type  -----------------------------
function getRadioButtonValueManageTransmissionType() {
    if ($('#manage_vehicle_radio_manual').is(":checked")) {
        return 'Manual';
    } else if ($('#manage_vehicle_radio_auto').is(":checked")) {
        return 'Auto';
    }
}

//--------------------------  get Radio Button Value Manage Hybrid Or NonHybrid  -------------------------
function getRadioButtonValueManageHybridOrNonHybrid() {
    if ($('#manage_vehicle_radio_hybrid').is(":checked")) {
        return 'Hybrid';
    } else if ($('#manage_vehicle_radio_non_hybrid').is(":checked")) {
        return 'Non-Hybrid';
    }
}

//-------------------------- get Radio Button Value Manage Vehicle Availability  -------------------------
function getRadioButtonValueManageVehicleAvailability() {
    if ($('#manage_vehicle_radio_available').is(":checked")) {
        return 'Available';
    } else if ($('#manage_vehicle_radio_non_available').is(":checked")) {
        return 'Unavailable';
    }
}

//---------------------------------------  search vehicle  ------------------------------------------------
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

            // Set vehicle image previews
            setImages(data.images);

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
    } else {
        alert("Invalid vehicle id !");
    }
})


// ---------------------------------------  set images ----------------------------------------------------
function setImages(dataImageList) {

    let imageList = dataImageList;
    console.log("image list : " + imageList)
    $('#manage_vehicle_image_file1').attr('src', `data:image/png;base64,${imageList[0]}`);
    $('#manage_vehicle_image_file2').attr('src', `data:image/png;base64,${imageList[1]}`);
    $('#manage_vehicle_image_file3').attr('src', `data:image/png;base64,${imageList[2]}`);
    $('#manage_vehicle_image_file4').attr('src', `data:image/png;base64,${imageList[3]}`);
    $('#manage_vehicle_image_file5').attr('src', `data:image/png;base64,${imageList[4]}`);

}

//-------------------------------------------  initialize  ------------------------------------------------
$(document).ready(() => {
    clearManageVehicleForm();
})


//-------------------------------------------- add to package ------------------------------------
$('#manage_vehicle_btn_add_to_package').on('click', (e) => {
    e.preventDefault();
    $('#selected_vehicle').val($("#manage_vehicle_id").val());

    Swal.fire({
        icon: 'success',
        title: 'Vehicle Added Successfully!',
        showConfirmButton: true,
        timer: 0
    }).then((result) => {
        // Define the target section you want to scroll to
        const targetSection = $('#package_form');

        if (targetSection.length > 0) {
            // Scroll to the target section
            $('html, body').animate({
                scrollTop: targetSection.offset().top
            }, 1000); // You can adjust the duration (1000ms) as needed.
        }
    });
});


//----------------------------------------------- add event for image input  ----------------------------------------

const imageInput1 = document.getElementById('vehicle_manage_image_file1');
const imageContainer1 = document.getElementById('vehicle_manage_image1');

imageInput1.addEventListener('change', function () {
    const file = imageInput1.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer1.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

const imageInput2 = document.getElementById('vehicle_manage_image_file2');
const imageContainer2 = document.getElementById('vehicle_manage_image2');

imageInput2.addEventListener('change', function () {
    const file = imageInput2.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer2.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

const imageInput3 = document.getElementById('vehicle_manage_image_file3');
const imageContainer3 = document.getElementById('vehicle_manage_image3');

imageInput3.addEventListener('change', function () {
    const file = imageInput3.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer3.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});


const imageInput4 = document.getElementById('vehicle_manage_image_file4');
const imageContainer4 = document.getElementById('vehicle_manage_image4');

imageInput4.addEventListener('change', function () {
    const file = imageInput4.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer4.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});


const imageInput5 = document.getElementById('vehicle_manage_image_file5');
const imageContainer5 = document.getElementById('vehicle_manage_image5');

imageInput5.addEventListener('change', function () {
    const file = imageInput5.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer5.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

