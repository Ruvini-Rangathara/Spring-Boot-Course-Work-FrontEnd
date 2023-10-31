//---------------------------------------------  in user controller -------------------------------------------
import {saveUser, existsById} from '../model/user_model.js';


//--------------------------------------------- regex patterns for user ------------------------------------------------
const username_regex = /^(?!\s).{8,}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const age_regex = /^\d+$/;
const email_regex = /^([a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;
const contact_regex = /^\d{10}$/;


//--------------------------------------------- validate username and password ------------------------------------------------
// Your checkUserExists function remains the same

// Define an async function to handle user validation
function validateUsernamePassword() {
    const username = $('#register_username').val();

    // // Use await to wait for the result of checkUserExists
    // const userExists = existsById(username);
    // console.log("user exists : " + userExists);

    if (!username_regex.test(username)) {
        console.log("Invalid username");
        alert("Invalid username");
        return false;
    // } else if (!password_regex.test($('#register_password').val())) {
    //     console.log("Invalid password");
    //     alert("Invalid password");
    //     return false;
    } else if (existsById(username)) {
        console.log("Username already exists");
        $('#register_password').val("");
        $("#register_username").val("");
        alert("Username already exists");
        return false;
    } else {
        console.log("valid username and password")
        return true;
    }
}


//--------------------------------------------- validate user ------------------------------------------------
function validateUser() {
    if (!contact_regex.test($('#register_user_contact').val())) {
        alert("Invalid username");
        return false;
    } else if (!nic_regex.test($('#register_user_nic_no').val())) {
        alert("Invalid nic");
        return false;
    } else if (!age_regex.test($('#register_user_age').val())) {
        alert("Invalid age");
        return false;
    } else if (!email_regex.test($('#register_email').val())) {
        alert("Invalid email");
        return false;
    } else if ($('#manage_user_nic_front_file').val() == null) {
        alert("Enter NIC Front Image");
        return false;
    } else if ($('#manage_user_nic_back_file').val() == null) {
        alert("Enter NIC Back Image");
        return false;
    } else if ($('input[name="register_user_gender"]:checked').val() == null) {
        alert("Select Gender!");
        return false;
    } else if ($('input[name="register_user_role"]:checked').val() == null) {
        alert("Select User Type!");
        return false;
    } else {
        return true;
    }
}

//--------------------------------------------- clear user form ------------------------------------------------
function clearUserForm() {
    $('#register_name').val("");
    $('#register_address').val("");
    $('#register_user_age').val("");
    $('#register_email').val("");
    $('#register_user_contact').val("");
    $('#register_user_nic_no').val("");
    $('#manage_user_nic_front_file').val("");
    $('#manage_user_nic_back_file').val("");
    // $('#manage_user').modal('hide');

    $('#register_user_male').prop('checked', false);
    $('#register_user_female').prop('checked', false);
    $('#register_radio_admin').prop('checked', false);
    $('#register_radio_user').prop('checked', false);


}


//---------------------------------  get Radio Button Value Gender ---------------------------------
function getRadioButtonValueGender() {
    if ($('#register_user_male').is(':checked')) {
        return 'Male';
    } else if ($('#register_user_female').is(':checked')) {
        return 'Female';
    }
}

//---------------------------------------------  select Radio Button Manage gender  -------------------------------------------
function selectRadioButtonManageGender(gender) {
    if (gender === 'Female') {
        $('#register_user_female').prop('checked', true);
    } else if (gender === 'Male') {
        $('#register_user_male').prop('checked', true);
    }
}


//---------------------------------  get Radio Button Value Gender ---------------------------------
function getRadioButtonValueRole() {
    if ($('#register_radio_admin').is(':checked')) {
        return 'Admin';
    } else if ($('#register_radio_user').is(':checked')) {
        return 'User';
    }
}

//---------------------------------------------  select Radio Button Manage gender  -------------------------------------------
function selectRadioButtonManageRole(role) {
    if (role === 'Admin') {
        $('#register_user_female').prop('checked', true);
    } else if (role === 'User') {
        $('#register_user_male').prop('checked', true);
    }
}


//---------------------------------------------- next button ----------------------------------------------
$('#next_button').on('click', (e) => {
    e.preventDefault();
    console.log("next button clicked");
    if (validateUsernamePassword()) {
        console.log("validate username and password");
        document.getElementById('user_profile').style.display = 'block';
    }
});


//----------------------------------------------  save user  ------------------------------------------------
$('#btn_register_user').on('click', (e) => {
    e.preventDefault();

    if (validateUsernamePassword()) {
        if (validateUser()) {
            console.log("validate user");

            let user = {
                username: $("#register_username").val(),
                password: $("#register_password").val(),
                name: $("#register_name").val(),
                email: $("#register_email").val(),
                age: $("#register_user_age").val(),
                gender: getRadioButtonValueGender(),
                contactNo: $("#register_user_contact").val(),
                address: $("#register_address").val(),
                nicOrPassportNo: $("#register_user_nic_no").val(),
                role: getRadioButtonValueRole(),
                remark: $("#manage_guide_remark").val()
            }

            console.log(user);

            saveUser(user).then((resolve) => {
                Swal.fire({
                    title: 'Success',
                    text: 'User Registered successfully!',
                    icon: 'success',
                    showCloseButton: true,
                    closeButton: '#d33'
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearUserForm();
                    }
                });
                console.log(resolve)

            }).catch((e) => {
                console.log(e.message)
                Swal.fire({
                    title: 'Error', text: 'User Not Registered!', icon: 'warning', showCloseButton: true, closeButton: '#d33'
                }).then((result) => {
                    // Handle the result if needed
                })

            });
        }
    } else {
        alert("Invalid username or password");

    }
});

//-------------------------------------------  initialize user manage page  -------------------------------------------
$(document).ready(() => {
    clearUserForm();
    document.getElementById('user_profile').style.display = 'none';
    $("#user_profile").hide();
})

//-----------------------------------------------  cancel button -----------------------------------------------
$('#btn_cancel_user').on('click', (e) => {
    clearUserForm();
    document.getElementById('user_profile').style.display = 'none';
});
