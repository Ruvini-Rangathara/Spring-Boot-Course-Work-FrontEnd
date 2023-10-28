export function saveVehicle(vehicle) {
    return new Promise((resolve, reject) => {

        const vehicleBlob = new Blob([JSON.stringify(vehicle)], {type: 'application/json'});
        let form = new FormData();

        form.append("vehicle", vehicleBlob);
        form.append("vehicle_img1", $('#vehicle_manage_image_file1')[0].files[0],);
        form.append("vehicle_img2", $('#vehicle_manage_image_file2')[0].files[0],);
        form.append("vehicle_img3", $('#vehicle_manage_image_file3')[0].files[0],);
        form.append("vehicle_img4", $('#vehicle_manage_image_file4')[0].files[0],);
        form.append("vehicle_img5", $('#vehicle_manage_image_file5')[0].files[0],);

        form.append("driver_id",$('#manage_vehicle_driver_id').val(),);

        console.log($("#manage_vehicle_driver_id").val());

        let settings = {
            "url": "http://localhost:9096/vehicle/api/v1/vehicle/save",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function deleteVehicle(vehicle_id) {
    console.log("deleted id in vehicle model : "+vehicle_id)
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9096/vehicle/api/v1/vehicle/delete",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "id": vehicle_id,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function getVehicle(vehicle_id) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9096/vehicle/api/v1/vehicle/get",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "vehicle_id": vehicle_id,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            // get data from response & return vehicle + driver objects
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function getAllVehicles(){
    return new Promise((resolve,reject)=>{
            let settings = {
                "url": "http://localhost:9096/vehicle/api/v1/vehicle/getAll",
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response, textStatus, jqXHR) {
                resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                reject(errorThrown);
            });
        }
    )
}

export function getLastOnGoingVehicleId(){
    return new Promise((resolve,reject)=>{
            let settings = {
                "url": "http://localhost:9096/vehicle/api/v1/vehicle/get/lastId",
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response, textStatus, jqXHR) {
                resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                reject(errorThrown);
            });
        }
    )
}

export function existsByVehiclesId(vehicle_id){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9096/vehicle/api/v1/vehicle/check/",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "vehicle_id": vehicle_id,
            },
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function updateVehicle(vehicle){
    return new Promise((resolve, reject) => {
        const vehicleBlob = new Blob([JSON.stringify(vehicle)], {type: 'application/json'});
        let form = new FormData();

        form.append("vehicle", vehicleBlob);
        form.append("vehicle_img1", $('#vehicle_manage_image_file1')[0].files[0],);
        form.append("vehicle_img2", $('#vehicle_manage_image_file2')[0].files[0],);
        form.append("vehicle_img3", $('#vehicle_manage_image_file3')[0].files[0],);
        form.append("vehicle_img4", $('#vehicle_manage_image_file4')[0].files[0],);
        form.append("vehicle_img5", $('#vehicle_manage_image_file5')[0].files[0],);

        form.append("driver_id",$('#manage_vehicle_driver_id').val(),);
        console.log($("#manage_vehicle_driver_id").val())
        let settings = {
            "url": "http://localhost:9096/vehicle/api/v1/vehicle/update",
            "method": "PUT",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}



