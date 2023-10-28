import {
    getGuide, saveGuide, updateGuide, checkGuideExists, getNewGuideId, deleteGuide
} from "../model/guide_model.js";

//----------------------------------------   regex patterns for guide  ----------------------------------------
const guide_id_regex = /^G\d{3,}$/;
const guide_name_regex = /^[A-Za-z.]+$/;
const contact_no_regex = /^\d{10}$/;
const age_regex = /^\d+$/;
const man_day_value_regex = /^\d+(\.\d+)?$/;


//--------------------------------------------   clear guide form  --------------------------------------------
function clearGuideForm() {
    $("#manage_guide_id").val("");
    $("#manage_guide_name").val("");
    $("#manage_guide_age").val("");
    $("#manage_guide_address").val("");
    $("#manage_guide_contact").val("");
    $("#manage_guide_man_day_value").val("");
    $("#manage_guide_experience").val("");

    $("#manage_guide_image_file").val("");
    $("#manage_guide_nic_front_file").val("");
    $("#manage_guide_nic_back_file").val("");
    $("#manage_guide_id_front_file").val("");
    $("#manage_guide_id_back_file").val("");
    $("#manage_guide_remark").val("");
    $('#manage_guide_radio_male').prop('checked', false);
    $('#manage_guide_radio_female').prop('checked', false);

}

//---------------------------------------------  get new guide id  -------------------------------------------
function getNewGuideIdForTextField() {
    let promise = getNewGuideId();
    promise.then((data) => {
        $("#manage_guide_id").val(data);
    }).catch((error) => {
        console.log(error);
    })
}


//---------------------------------------------  new guide  -------------------------------------------
$("#btn_new_guide").on('click', (e) => {
    e.preventDefault()
    clearGuideForm();
    getNewGuideIdForTextField();
});


//---------------------------------------------  check images  -------------------------------------------
function checkImages() {
    if ($("#manage_guide_image_file").val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please upload a photo',
        })
        return false;
    }
    if ($("#manage_guide_nic_front_file").val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please upload a nic front image',
        })
        return false;
    }
    if ($("#manage_guide_nic_back_file").val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please upload a nic back image',
        })
        return false;
    }
    if ($("#manage_guide_id_front_file").val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please upload a guide id front image',
        })
        return false;
    }
    if ($("#manage_guide_id_back_file").val() === "") {
        Swal.fire({
            icon: 'error', title: 'Oops...', text: 'Please upload a guide id back image',
        })

        return false;
    }
    return true;
}

//---------------------------------------------  validate guide  -------------------------------------------
function validateGuideDetails() {
    if (guide_id_regex.test($('#manage_guide_id').val())) {
        if (guide_name_regex.test($('manage_guide_name').val())) {
            if (contact_no_regex.test($('manage_guide_contact').val())) {
                if ($('input[name="manage_guide_gender"]:checked').val() != null) {
                    if (age_regex.test($('manage_guide_age').val())) {
                        if (man_day_value_regex.test($('manage_guide_man_day_value').val())) {
                            if (checkImages()) {
                                return true;
                            } else {
                                alert("Please upload all images");
                                return false;
                            }
                        } else {
                            alert("Please enter a valid value for man day value");
                            return false;
                        }
                    } else {
                        alert("Please enter a valid age");
                        return false;
                    }
                } else {
                    alert("select gender of guide!");
                    return false;
                }
            } else {
                alert("Please enter a valid contact number");
                return false;
            }
        } else {
            alert("Please enter a valid name");
            return false;
        }
    } else {
        alert("Please enter a valid guide id");
        return false;
    }
}

//---------------------------------------------  save guide  -------------------------------------------
$('#guide_manage_btn_add').on('click', (e) => {
    e.preventDefault();

    if (validateGuideDetails()) {
        let guide = {
            guideId: $("#manage_guide_id").val(),
            name: $("#manage_guide_name").val(),
            age: $("#manage_guide_age").val(),
            address: $("#manage_guide_address").val(),
            gender: getRadioButtonValueGender(),
            contact: $("#manage_guide_contact").val(),
            experience: $("#manage_guide_experience").val(),
            manDayValue: $("#manage_guide_man_day_value").val(),
            remark: $("#manage_guide_remark").val()
        }
        saveGuide(guide).then((resolve) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Guide saved successfully!',
                showCloseButton: true,
                confirmButtonText: 'OK!',
            }).then((result) => {
                if (result.isConfirmed) {
                    clearGuideForm();
                }
            });
        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Something went wrong!',
            });
        });
    }
});

//---------------------------------------------  update guide  -------------------------------------------
$('#guide_manage_btn_update').on('click', (e) => {
    e.preventDefault();

    if (validateGuideDetails()) {

        let guide = {
            guideId: $("#manage_guide_id").val(),
            name: $("#manage_guide_name").val(),
            age: $("#manage_guide_age").val(),
            address: $("#manage_guide_address").val(),
            gender: getRadioButtonValueGender(),
            contact: $("#manage_guide_contact").val(),
            experience: $("#manage_guide_experience").val(),
            manDayValue: $("#manage_guide_man_day_value").val(),
            remark: $("#manage_guide_remark").val()
        }
        updateGuide(guide).then((resolve) => {
            Swal.fire({
                title: 'Success',
                text: 'Guide updated successfully!',
                icon: 'success',
                showCloseButton: true,
                confirmButtonText: 'OK!',
            }).then((result) => {
                if (result.isConfirmed) {
                    clearGuideForm();
                }
            });

        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Something went wrong!',
            });
        });
    }
});

//---------------------------------  get Radio Button Value Gender ---------------------------------
function getRadioButtonValueGender(){
    if($('#manage_guide_radio_male').is(':checked')){
        return 'Male';
    }else if($('#manage_guide_radio_female').is(':checked')){
        return 'Female';
    }
}

//---------------------------------------------  select Radio Button Manage gender  -------------------------------------------
function selectRadioButtonManageGender(gender) {
    if (gender === 'Female') {
        $('#manage_guide_radio_female').prop('checked', true);
    } else if (gender === 'Male') {
        $('#manage_guide_radio_male').prop('checked', true);
    }
}


//---------------------------------------------  delete guide  -------------------------------------------
$('#guide_manage_btn_delete').on('click', (e) => {
    e.preventDefault();

    let guideId = $("#manage_guide_id").val();
    if (guide_id_regex.test(guideId)) {
        checkGuideExists(guideId).then((resolve) => {
            deleteGuide(guideId).then((resolve) => {
                Swal.fire({
                    title: 'Success',
                    text: 'Guide deleted successfully!',
                    icon: 'success',
                    showCloseButton: true,
                    confirmButtonText: 'OK!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearGuideForm();
                    }
                });

            }).catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: 'Something went wrong!',
                });
            });
        }).catch((error) => {
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Something went wrong!',
            });
        });

    } else {
        alert("Please enter a valid guide id");
    }
});

//---------------------------------------------  search guide  -------------------------------------------
$('#guide_manage_btn_search').on('click', (e) => {
  e.preventDefault();
  if(guide_id_regex.test($("#manage_guide_id").val())){
      getGuide($('#manage_guide_id').val()).then((data) => {

          $('#manage_guide_name').val(data.name);
          $('#manage_guide_id').val(data.guideId);
            $('#manage_guide_age').val(data.age);
            $('#manage_guide_address').val(data.address);
            $('#manage_guide_contact').val(data.contact);
            $('#manage_guide_experience').val(data.experience);
            $('#manage_guide_man_day_value').val(data.manDayValue);
            $('#manage_guide_remark').val(data.remark);
            selectRadioButtonManageGender(data.gender);

            alert("Guide found!");

      }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Something went wrong!',
            });

      });

  }
})



//-------------------------------------------  initialize guide manage page  -------------------------------------------
$(document).ready(() => {
    clearGuideForm();
})