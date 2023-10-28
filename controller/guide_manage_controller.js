import {getGuide, saveGuide, updateGuide, checkGuideExists, getNewGuideId, deleteGuide
} from "../model/guide_model.js";

//----------------------------------------   regex patterns for guide  ----------------------------------------
const guide_id_regex= /^G\d{3,}$/;
const guide_name_regex= /^[A-Za-z.]+$/;
const contact_no_regex= /^\d{10}$/;
const age_regex= /^\d+$/;
const man_day_value_regex= /^\d+(\.\d+)?$/;


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
function getNewGuideIdForTextField(){
    let promise = getNewGuideId();
    promise.then((data)=>{
        $("#manage_guide_id").val(data);
    }).catch((error)=>{
        console.log(error);
    })
}

//---------------------------------------------  check guide exists  -------------------------------------------
function checkGuideExistsForTextField(){
    let promise = checkGuideExists($("#manage_guide_id").val());
    promise.then((data)=>{
        if(data){
            $("#manage_guide_id").val("");
            alert("Guide id already exists");
        }
    }).catch((error)=>{
        console.log(error);
    })
}

//---------------------------------------------  new guide  -------------------------------------------
$("#btn_new_guide").on('click' ,(e) => {
    e.preventDefault()
    clearGuideForm();
    getNewGuideIdForTextField();
});


//---------------------------------------------  check images  -------------------------------------------
function checkImages(){
    if($("#manage_guide_image_file").val() === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a photo',
        })
        return false;
    }
    if($("#manage_guide_nic_front_file").val() === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a nic front image',
        })
        return false;
    }
    if($("#manage_guide_nic_back_file").val() === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a nic back image',
        })
        return false;
    }
    if($("#manage_guide_id_front_file").val() === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a guide id front image',
        })
        return false;
    }
    if($("#manage_guide_id_back_file").val() === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a guide id back image',
        })

        return false;
    }
    return true;
}

//---------------------------------------------  validate guide  -------------------------------------------
function validateGuideDetails(){
    if(guide_id_regex.test($('#manage_guide_id').val())){
        if (guide_name_regex.test($('manage_guide_name').val())){
            if(contact_no_regex.test($('manage_guide_contact').val())){
                if($('input[name="manage_guide_gender"]:checked').val() != null){
                    if(age_regex.test($('manage_guide_age').val())){
                        if(man_day_value_regex.test($('manage_guide_man_day_value').val())){
                            return true;
                        }else {
                            alert("Please enter a valid value for man day value");
                            return false;
                        }
                    }else {
                        alert("Please enter a valid age");
                        return false;
                    }
                }else{
                    alert("select gender of guide!");
                    return false;
                }
            }else {
                alert("Please enter a valid contact number");
                return false;
            }
        }else{
            alert("Please enter a valid name");
            return false;
        }
    }else{
        alert("Please enter a valid guide id");
        return false;
    }
}

//---------------------------------------------  save guide  -------------------------------------------









