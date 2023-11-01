import {
    savePackage, updatePackage, getPackageDetails, getNewPackageId, existsByPackageId
} from '../model/package_model.js';
import {getHotel} from "../model/hotel_model";

// --------------------------------------------- regex for package details ---------------------------------------------
const regexPackageId = /^P\d{3,}$/;
const regexPrice = /^\d+(\.\d+)?$/;
const regexNumber = /^\d+$/;


// --------------------------------------------- clear package form---------------------------------------------
function clearPackageForm() {
    $('#packageId').val('');
    $('#package_username').val('');
    $('#package_category').val('');
    $('#travel_area').val('');
    $('#head_count').val('');
    $('#no_of_adults').val('');
    $('#no_of_children').val('');
    $('#start_date').val('');
    $('#end_date').val('');
    $('#no_of_days').val('');
    $('#no_of_nights').val('');
    $('#selected_vehicle').val('');
    $('#selected_guide').val('');
    $('#selected_hotel').val('');
    $('#opt_1_price').val('');
    $('#opt_2_price').val('');
    $('#opt_3_price').val('');
    $('#opt_4_price').val('');
    $('#opt_1_count').val('');
    $('#opt_2_count').val('');
    $('#opt_3_count').val('');
    $('#package_value').val('');
    $('#available_promotion').val('');
    $('#available_discount').val('');
    $('#net_total').val('');
    $('#paid_value').val('');
    $('#payment_slip_1').val('');
    $('#payment_slip_2').val('');
    $('#package_remark').val('');
    $('#package_search_input').val('');


    $('#need_guide').prop('checked', false);
    $('#no_need_guide').prop('checked', false);
    $('#with_pet').prop('checked', false);
    $('#without_pet').prop('checked', false);

}


// --------------------------------------------- get new package id---------------------------------------------
function getNewPackageId() {
    let promise = getNewPackageId();
    promise.then((data) => {
        $("#packageId").val(data);
    }).catch((error) => {
        console.log(error);
    });
}

//--------------------------------------------- button new  ---------------------------------------------
$('#package_btn_new').on('click', (e) => {
    e.preventDefault()
    clearPackageForm();
    getNewPackageId();
});

//--------------------------------------------- validate package ---------------------------------------------
function validatePackage() {
    if (regexPackageId.test($('#packageId').val())) {
        if (regexNumber.test($('#head_count').val())) {
            if (regexNumber.test($('#no_of_adults').val())) {
                if (regexNumber.test($('#no_of_children').val())) {
                    if (regexNumber.test($('#no_of_days').val())) {
                        if (regexNumber.test($('#no_of_nights').val())) {
                            if (regexPrice.test($('#opt_1_price').val())) {
                                if (regexPrice.test($('#opt_2_price').val())) {
                                    if (regexPrice.test($('#opt_3_price').val())) {
                                        if (regexPrice.test($('#opt_4_price').val())) {
                                            if (regexPrice.test($('#package_value').val())) {
                                                if (regexPrice.test($('#available_promotion').val())) {
                                                    if (regexPrice.test($('#available_discount').val())) {
                                                        if (regexPrice.test($('#net_total').val())) {
                                                            if (regexPrice.test($('#paid_value').val())) {
                                                                if ($("input[name='package_need_guide']:checked").val() != null) {
                                                                    if ($("input[name='package_with_pet_or_not']:checked").val() != null) {
                                                                        return true;
                                                                    } else {
                                                                        alert('Select Pet needness');
                                                                        return false;
                                                                    }
                                                                } else {
                                                                    alert('Select Guide needness');
                                                                    return false;
                                                                }
                                                            } else {
                                                                alert('Invalid Paid Value');
                                                                return false;
                                                            }
                                                        } else {
                                                            alert('Invalid Net Total');
                                                            return false;
                                                        }
                                                    } else {
                                                        alert('Invalid Available Discount');
                                                        return false;
                                                    }
                                                } else {
                                                    alert('Invalid Available Promotion');
                                                    return false;
                                                }
                                            } else {
                                                alert('Invalid Package Value');
                                                return false;
                                            }
                                        } else {
                                            alert('Invalid Option 4 Price');
                                            return false;
                                        }
                                    } else {
                                        alert('Invalid Option 3 Price');
                                        return false;
                                    }
                                } else {
                                    alert('Invalid Option 2 Price');
                                    return false;
                                }
                            } else {
                                alert('Invalid Option 1 Price');
                                return false;
                            }
                        } else {
                            alert('Invalid Number of Nights');
                            return false;
                        }
                    } else {
                        alert('Invalid Number of Days');
                        return false;
                    }
                } else {
                    alert('Invalid Number of Children');
                    return false;
                }
            } else {
                alert('Invalid Number of Adults');
                return false;
            }
        }
    } else {
        alert('Invalid Package ID');
        return false;
    }
}


//---------------------------------  get Radio Button Value guide need ---------------------------------
function getRadioButtonValueGuideNeed() {
    if ($('#need_guide').is(':checked')) {
        return 'Need-Guide';
    } else if ($('#no_need_guide').is(':checked')) {
        return 'No-Need_Guide';
    }
}

//---------------------------------------------  select Radio Button Manage guide need  -------------------------------------------
function selectRadioButtonManageGuideNeed(value) {
    if (value === 'Need-Guide') {
        $('#need_guide').prop('checked', true);
    } else if (value === 'No-Need_Guide') {
        $('#no_need_guide').prop('checked', true);
    }
}


//---------------------------------  get Radio Button Value pet need ---------------------------------
function getRadioButtonValuePetNeed() {
    if ($('#with_pet').is(':checked')) {
        return 'With-Pet';
    } else if ($('#without_pet').is(':checked')) {
        return 'Without-Pet';
    }
}

//---------------------------------------------  select Radio Button Manage pet need  -------------------------------------------
function selectRadioButtonManagePetNeed(value) {
    if (value === 'With-Pet') {
        $('#with_pet').prop('checked', true);
    } else if (value === 'Without-Pet') {
        $('#without_pet').prop('checked', true);
    }
}

//---------------------------------------------  save package  -------------------------------------------
$('#btn_save_package').on('click', (e) => {
    e.preventDefault();

    if (validatePackage()) {
        let packageDto = {
            packageId: $('#packageId').val(),
            username: $('#package_username').val(),
            category: $('#package_category').val(),
            travelArea: $('#travel_area').val(),
            withPetsOrNo: getRadioButtonValuePetNeed(),
            needAGuideOrNo: getRadioButtonValueGuideNeed(),
            selectedDateTime: $('#selected_date_time').val(),

            headCount: $('#head_count').val(),
            noOfAdults: $('#no_of_adults').val(),
            noOfChildren: $('#no_of_children').val(),
            startDate: $('#start_date').val(),
            endDate: $('#end_date').val(),
            noOfDays: $('#no_of_days').val(),
            noOfNights: $('#no_of_nights').val(),
            vehicleId: $('#selected_vehicle').val(),
            guideId: $('#selected_guide').val(),
            hotelCode: $('#selected_hotel').val(),
            opt1_price: $('#opt_1_price').val(),
            opt2_price: $('#opt_2_price').val(),
            opt3_price: $('#opt_3_price').val(),
            opt4_price: $('#opt_4_price').val(),
            opt1_count: $('#opt_1_count').val(),
            opt2_count: $('#opt_2_count').val(),
            opt3_count: $('#opt_3_count').val(),
            opt4_count: $('#opt_4_count').val(),
            packageValue: $('#package_value').val(),
            promotion: $('#available_promotion').val(),
            discount: $('#available_discount').val(),
            netTotal: $('#net_total').val(),
            paidValue: $('#paid_value').val(),
            remark: $('#package_remark').val(),
        }

        savePackage(packageDto).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Package added successfully!',
                icon: 'success',
                showCloseButton: true,
                closeButton: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearPackageForm();
                }
            });
            console.log(resolve)

        }).catch((e) => {
            console.log(e.message)
            Swal.fire({
                title: 'Error', text: 'Package Not Added!', icon: 'warning', showCloseButton: true, closeButton: '#d33'
            }).then((result) => {
                // Handle the result if needed
            })

        });



    }
})


//---------------------------------------------  update package  -------------------------------------------
$('#package_btn_update').on('click', (e) => {
    e.preventDefault();

    if (validatePackage()) {
        let packageDto = {
            packageId: $('#packageId').val(),
            username: $('#package_username').val(),
            category: $('#package_category').val(),
            travelArea: $('#travel_area').val(),
            withPetsOrNo: getRadioButtonValuePetNeed(),
            needAGuideOrNo: getRadioButtonValueGuideNeed(),
            selectedDateTime: $('#selected_date_time').val(),

            headCount: $('#head_count').val(),
            noOfAdults: $('#no_of_adults').val(),
            noOfChildren: $('#no_of_children').val(),
            startDate: $('#start_date').val(),
            endDate: $('#end_date').val(),
            noOfDays: $('#no_of_days').val(),
            noOfNights: $('#no_of_nights').val(),
            vehicleId: $('#selected_vehicle').val(),
            guideId: $('#selected_guide').val(),
            hotelCode: $('#selected_hotel').val(),
            opt1_price: $('#opt_1_price').val(),
            opt2_price: $('#opt_2_price').val(),
            opt3_price: $('#opt_3_price').val(),
            opt4_price: $('#opt_4_price').val(),
            opt1_count: $('#opt_1_count').val(),
            opt2_count: $('#opt_2_count').val(),
            opt3_count: $('#opt_3_count').val(),
            opt4_count: $('#opt_4_count').val(),
            packageValue: $('#package_value').val(),
            promotion: $('#available_promotion').val(),
            discount: $('#available_discount').val(),
            netTotal: $('#net_total').val(),
            paidValue: $('#paid_value').val(),
            remark: $('#package_remark').val(),
        }

        updatePackage(packageDto).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Package Updated!',
                icon: 'success',
                showCloseButton: true,
                closeButton: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    clearPackageForm();
                }
            });
            console.log(resolve)

        }).catch((e) => {
            console.log(e.message)
            Swal.fire({
                title: 'Error', text: 'Package Not Updated!', icon: 'warning', showCloseButton: true, closeButton: '#d33'
            }).then((result) => {
                // Handle the result if needed
            })

        });

    }
})

//---------------------------------------------  search package  -------------------------------------------
$('#package_search_button').on('click', (e) => {
    e.preventDefault();
    let packageId = $('#package_search_input').val();
    if (regexPackageId.test(packageId)) {
        let promise = getPackageDetails(packageId);
        promise.then((data) => {
            if (data != null) {
                $('#packageId').val(data.packageId);
                $('#package_username').val(data.username);
                $('#package_category').val(data.category);
                $('#travel_area').val(data.travelArea);
                $('#head_count').val(data.headCount);
                $('#no_of_adults').val(data.noOfAdults);
                $('#no_of_children').val(data.noOfChildren);
                $('#start_date').val(data.startDate);
                $('#end_date').val(data.endDate);
                $('#no_of_days').val(data.noOfDays);
                $('#no_of_nights').val(data.noOfNights);
                $('#selected_vehicle').val(data.vehicleId);
                $('#selected_guide').val(data.guideId);
                $('#selected_hotel').val(data.hotelCode);
                $('#opt_1_price').val(data.opt1_price);
                $('#opt_2_price').val(data.opt2_price);
                $('#opt_3_price').val(data.opt3_price);
                $('#opt_4_price').val(data.opt4_price);
                $('#opt_1_count').val(data.opt1_count);
                $('#opt_2_count').val(data.opt2_count);
                $('#opt_3_count').val(data.opt3_count);
                $('#opt_4_count').val(data.opt4_count);
                $('#package_value').val(data.packageValue);
                $('#available_promotion').val(data.promotion);
                $('#available_discount').val(data.discount);
                $('#net_total').val(data.netTotal);
                $('#paid_value').val(data.paidValue);
                $('#package_remark').val(data.remark);
                selectRadioButtonManageGuideNeed(data.needAGuideOrNo);
                selectRadioButtonManagePetNeed(data.withPetsOrNo);

                alert('Package Found')

            } else {
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: 'Package Not Found!',
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    } else {
        clearPackageForm();
    }
});

//-------------------------------------------- initialize ------------------------------------
$(document).ready(function () {
    clearPackageForm();
})

//---------------------------------------------  get hotel option price -------------------------------------------
// $("#hotel_search_button").on('click', (e) => {
//     e.preventDefault();
//      getHotel($('#selected_hotel').val()).then((data) => {
//
//             $("#opt_1_price").val(data.opt1_price);
//             $("#opt_2_price").val(data.opt2_price);
//             $("#opt_3_price").val(data.opt3_price);
//             $("#opt_4_price").val(data.opt4_price);
//
//         }).catch((error) => {
//             console.log(error);
//         });
// })


// ------------------------Add event listeners to the radio buttons-----------------------------------------
$("#no_need_guide").addEventListener("change", function() {
    if ($('#no_need_guide').checked) {
        $('#btn_select_guide').disable();
    }
});




