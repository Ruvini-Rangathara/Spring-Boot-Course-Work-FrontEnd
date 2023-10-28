
//----------------------------------------   save guide  ----------------------------------------
export function saveGuide (guide){
    console.log("save guide " + JSON.stringify(guide));
    return new Promise((resolve, reject) => {
        const guideBlob = new Blob([JSON.stringify(guide)], {type: "application/json"});
        let formData = new FormData();
        formData.append("guide", guideBlob);
        formData.append("photo", $('#manage_guide_image_file')[0].files[0]);
        formData.append("nicFrontImage", $('#manage_guide_nic_front_file')[0].files[0]);
        formData.append("nicBackImage", $('#manage_guide_nic_back_file')[0].files[0]);
        formData.append("guidIdFrontImage", $('#manage_guide_id_front_file')[0].files[0]);
        formData.append("guidIdBackImage", $('#manage_guide_id_back_file')[0].files[0]);

        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/save",
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
            reject("Error while saving guide");
        });
    });
}

//----------------------------------------   update guide  ----------------------------------------
export function updateGuide (guide){
    console.log("update guide " + JSON.stringify(guide));
    return new Promise((resolve, reject) => {
        const guideBlob = new Blob([JSON.stringify(guide)], {type: "application/json"});
        let formData = new FormData();
        formData.append("guide", guideBlob);
        formData.append("photo", $('#manage_guide_image_file')[0].files[0]);
        formData.append("nicFrontImage", $('#manage_guide_nic_front_file')[0].files[0]);
        formData.append("nicBackImage", $('#manage_guide_nic_back_file')[0].files[0]);
        formData.append("guidIdFrontImage", $('#manage_guide_id_front_file')[0].files[0]);
        formData.append("guidIdBackImage", $('#manage_guide_id_back_file')[0].files[0]);

        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/update",
            "method": "PUT",
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
            reject("Error while updating guide");
        });
    });
}

//----------------------------------------   delete guide  ----------------------------------------
export function deleteGuide (guideId){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/delete",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "id": guideId,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(true);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while deleting guide");
        });
    });
}

//----------------------------------------   get guide  ----------------------------------------
export function getGuide (guideId){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/get",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": guideId,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while getting guide");
        });
    });
}

//----------------------------------------   get all guides  ----------------------------------------
export function getAllGuides (){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/getAll",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while getting guides");
        });
    });
}

//----------------------------------------   get last guide id  ----------------------------------------
export function getLastGuideId (){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/get/lastId",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while getting last guide id");
        });
    });
}

//----------------------------------------   check guide exists  ----------------------------------------
export function checkGuideExists (guideId){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9095/guide/api/v1/guide/check",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": guideId,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while checking guide exists");
        });
    });
}