import {
    saveHotel, updateHotel, deleteHotel, getAllHotels, getHotel, getNewHotelCode, existsById
} from '../model/hotel_model.js';

//--------------------------------------- regex for hotel  -----------------------------------------
const hotelCodeRegex = /^H\d{3,}$/;
const hotelEmailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
const hotelContactNumberRegex = /^-?\d+$/;
const starRateRegex = /[1-5]/;
const optionPriceRegex = /^\d+(\.\d+)?$/;

//--------------------------------------- clear hotel form ---------------------------------------
function clearHotelForm() {
    $('#hotel_search_input').val("");

    $("#manage_hotel_code").val("");
    $("#manage_hotel_name").val("");
    $("#manage_hotel_category").val("");
    $("#manage_hotel_location").val("");
    $("#manage_hotel_star_rate").val("");
    $("#manage_hotel_email").val("");
    $("#manage_hotel_contact_no").val("");
    $("#manage_hotel_cancellation_criteria").val("");
    $("#manage_hotel_opt1_price").val("");
    $("#manage_hotel_opt2_price").val("");
    $("#manage_hotel_opt3_price").val("");
    $("#manage_hotel_opt4_price").val("");

    $('#manage_hotel_allowed_pet').prop('checked', false);
    $('#manage_hotel_not_allowed_pet').prop('checked', false);

}

//--------------------------------------- get new hotel code  ---------------------------------------
function getNewHotelCodeForUI() {
    let promise = getNewHotelCode();
    promise.then((data) => {
        $("#manage_hotel_code").val(data);
    }).catch((error) => {
        console.log(error);
    });
}

//--------------------------------------- new hotel  ---------------------------------------
$('#manage_hotel_btn_new').on('click', (e) => {
    e.preventDefault()
    clearHotelForm();
    getNewHotelCodeForUI();
});


//-------------------------------------  check images ---------------------------------------
function checkImages() {
    if ($('#manage_hotel_img1').val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please select an image for hotel',
        })
        return false;
    }

    if ($('#manage_hotel_img2').val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please select an image for hotel',
        })
        return false;
    }

    if ($('#manage_hotel_img3').val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please select an image for hotel',
        })
        return false;
    }

    if ($('#manage_hotel_img4').val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please select an image for hotel',
        })
        return false;
    }
    return true;

}

//--------------------------------------- validate hotel detail ---------------------------------------
function validateHotelDetails() {
    if (hotelCodeRegex.test($("#manage_hotel_code").val())) {
        if (hotelEmailRegex.test($("#manage_hotel_email").val())) {
            if (hotelContactNumberRegex.test($("#manage_hotel_contact_no").val())) {
                if (starRateRegex.test($("#manage_hotel_star_rate").val())) {
                    if (optionPriceRegex.test($("#manage_hotel_opt1_price").val())) {
                        if (optionPriceRegex.test($("#manage_hotel_opt2_price").val())) {
                            if (optionPriceRegex.test($("#manage_hotel_opt3_price").val())) {
                                if (optionPriceRegex.test($("#manage_hotel_opt4_price").val())) {
                                    // if (!checkImages()) {
                                        return true;
                                    // } else {
                                    //     alert("Please select images for hotel");
                                    // }
                                } else {
                                    alert("Invalid option 4 price");
                                    return false;
                                }
                            } else {
                                alert("Invalid option 3 price");
                                return false;
                            }
                        } else {
                            alert("Invalid option 2 price");
                            return false;
                        }
                    } else {
                        alert("Invalid option 1 price");
                        return false;
                    }

                } else {
                    alert("Invalid star rate");
                    return false;
                }
            } else {
                alert("Invalid contact no");
                return false;
            }
        } else {
            alert("Invalid email");
            return false;
        }

    } else {
        alert("Invalid hotel code");
        return false;
    }
}


//---------------------------------  get Radio Button Value pet allow ---------------------------------
function getRadioButtonValuePetAllow() {
    if ($('#manage_hotel_allowed_pet').is(':checked')) {
        return 'Allow';
    } else if ($('#manage_hotel_not_allowed_pet').is(':checked')) {
        return 'NotAllow';
    }
}

//---------------------------------------------  select Radio Button Manage pet allow  -------------------------------------------
function selectRadioButtonManagePetAllow(gender) {
    if (gender === 'Allow') {
        $('#manage_hotel_allowed_pet').prop('checked', true);
    } else if (gender === 'NotAllow') {
        $('#manage_hotel_not_allowed_pet').prop('checked', true);
    }
}


//-------------------------------------------- save hotel --------------------------------------------
$('#hotel_manage_btn_add').on('click', (e) => {
    e.preventDefault();

    if (validateHotelDetails()) {
        // Create an object to store the hotel details and options
        let requestHotel = {
            hotelCode: $("#manage_hotel_code").val(),
            name: $("#manage_hotel_name").val(),
            category: $("#manage_hotel_category").val(),
            location: $("#manage_hotel_location").val(),
            starRate: $("#manage_hotel_star_rate").val(),
            email: $("#manage_hotel_email").val(),
            contactNo: $("#manage_hotel_contact_no").val(),
            cancellationCriteria: $("#manage_hotel_cancellation_criteria").val(),
            petsAllowedOrNot: getRadioButtonValuePetAllow(),
            opt1_price: $("#manage_hotel_opt1_price").val(),
            opt2_price: $("#manage_hotel_opt2_price").val(),
            opt3_price: $("#manage_hotel_opt3_price").val(),
            opt4_price: $("#manage_hotel_opt4_price").val(),

        };

        console.log("star rate : "+$('#manage_hotel_star_rate').val());

        saveHotel(requestHotel).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Hotel details saved successfully!',
                icon: 'success',
                showCloseButton: true,
                closeButton: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearHotelForm();
                }
            });
            console.log(resolve)

        }).catch((e) => {
            console.log(e.message)
            Swal.fire({
                title: 'Error', text: 'Hotel Not Saved!', icon: 'warning', showCloseButton: true, closeButton: '#d33'
            }).then((result) => {
                // Handle the result if needed
            })

        });
    }
});

//--------------------------------------- update hotel ---------------------------------------
$('#hotel_manage_btn_update').on('click', (e) => {
    e.preventDefault();

    if (validateHotelDetails()) {

        console.log("validate hotel");
        let requestHotel = {
            hotelCode: $("#manage_hotel_code").val(),
            name: $("#manage_hotel_name").val(),
            category: $("#manage_hotel_category").val(),
            location: $("#manage_hotel_location").val(),
            starRate: $("#manage_hotel_star_rate").val(),
            email: $("#manage_hotel_email").val(),
            contactNo: $("#manage_hotel_contact_no").val(),
            cancellationCriteria: $("#manage_hotel_cancellation_criteria").val(),
            petsAllowedOrNot: getRadioButtonValuePetAllow(),

            opt1_price: $("#manage_hotel_opt1_price").val(),
            opt2_price: $("#manage_hotel_opt2_price").val(),
            opt3_price: $("#manage_hotel_opt3_price").val(),
            opt4_price: $("#manage_hotel_opt4_price").val(),
        };

        updateHotel(requestHotel).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Hotel details updated successfully!',
                icon: 'success',
                showCloseButton: true,
                closeButton: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearHotelForm();
                }
            });
            console.log(resolve)

        }).catch((e) => {
            console.log(e.message)
            Swal.fire({
                title: 'error', text: 'Hotel Not Updated!', icon: 'warning', showCloseButton: true, closeButton: '#d33'
            }).then((result) => {
                // Handle the result if needed
            })

        });
    }
})


//--------------------------------------- delete hotel ---------------------------------------
$('#hotel_manage_btn_delete').on('click', (e) => {
    e.preventDefault();

    if (!existsById($("#guide_search_input").val())) {
    } else {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Hotel not found!',
        });
    }

    let hotelCode = $("#manage_hotel_code").val();
    if (hotelCodeRegex.test(hotelCode)) {
        deleteHotel(hotelCode).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Hotel deleted successfully!',
                icon: 'success',
                showCloseButton: true,
                confirmButtonText: 'OK!',
            }).then((result) => {
                if (result.isConfirmed) {
                    clearHotelForm();
                }
            });

        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Hotel not found!',
            });
        });


    } else {
        alert("Please enter a valid hotel code");
    }
})


//--------------------------------------- get hotel ---------------------------------------
$("#hotel_search_button").on('click', (e) => {
    e.preventDefault();

    if (hotelCodeRegex.test($("#hotel_search_input").val())) {
        getHotel($('#hotel_search_input').val()).then((data) => {

            $("#manage_hotel_code").val(data.hotelCode);
            $("#manage_hotel_name").val(data.name);
            $("#manage_hotel_category").val(data.category);
            $("#manage_hotel_location").val(data.location);
            $("#manage_hotel_star_rate").val(data.starRate);
            console.log("Star Rate : "+data.starRate);

            $("#manage_hotel_email").val(data.email);
            $("#manage_hotel_contact_no").val(data.contactNo);
            console.log("Contact No : "+data.contactNo);

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

})

//-------------------------------------------- initialize ------------------------------------
$(document).ready(function () {
    clearHotelForm();
})















