//--------------------------------------------- save user ------------------------------------------------
export function saveUser(user) {
    console.log("save user " + JSON.stringify(user));
    return new Promise((resolve, reject) => {
        const userBlob = new Blob([JSON.stringify(user)], { type: "application/json" });
        let formData = new FormData();
        formData.append("user", userBlob);
        formData.append("nic_front", $('#manage_user_nic_front_file')[0].files[0]);
        formData.append("nic_back", $('#manage_user_nic_back_file')[0].files[0]);

        let settings = {
            "url": "http://localhost:9099/user/api/v1/user/register",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(true);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while saving user");
        });
    });
}


//----------------------------------------   update user  ----------------------------------------
export function updateUser(user) {
    console.log("update user " + JSON.stringify(user));
    return new Promise((resolve, reject) => {

        const userBlob = new Blob([JSON.stringify(user)], { type: "application/json" });
        let formData = new FormData();
        formData.append("user", userBlob);
        formData.append("nic_front", $('#manage_user_nic_front_file')[0].files[0]);
        formData.append("nic_back", $('#manage_user_nic_back_file')[0].files[0]);

        let settings = {
            "url": "http://localhost:9099/user/api/v1/user/update",
            "method": "PUT",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };

        console.log("update user in user model : " + JSON.stringify(settings));
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while updating user");
        });
    });
}


//--------------------------------------------- get all users ------------------------------------------------
export function getAllUsers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:9099/user/api/v1/user/getAll",
            method: "GET",
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}


//--------------------------------------------- get user by id ------------------------------------------------
export function getUserById(id) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9099/user/api/v1/user/get",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": id,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while getting user");
        });
    });
}

//--------------------------------------------- delete user ------------------------------------------------
export function deleteUser (username){
    console.log("deleted id in user model : "+username)
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9099/user/api/v1/user/delete",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "id": username,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while deleting user");
        });
    });
}

//--------------------------------------------- get exists by id ------------------------------------------------
export function checkUserExists (username){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9099/user/api/v1/user/check/",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": username,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while checking user exists");
        });
    });
}

