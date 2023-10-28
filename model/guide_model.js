
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