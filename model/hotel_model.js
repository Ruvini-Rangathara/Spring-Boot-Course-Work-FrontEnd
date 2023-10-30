//--------------------------------------- save hotel ---------------------------------------
export function saveHotel(hotel) {
    return new Promise((resolve, reject) => {

        const hotelBlob = new Blob([JSON.stringify(hotel)], {type: 'application/json'});
        let form = new FormData();

        form.append("requestHotel", hotelBlob);
        form.append("hotel_img1", $('#hotel_manage_photo_file1')[0].files[0],);
        form.append("hotel_img2", $('#hotel_manage_photo_file2')[0].files[0],);
        form.append("hotel_img3", $('#hotel_manage_photo_file3')[0].files[0],);
        form.append("hotel_img4", $('#hotel_manage_photo_file4')[0].files[0],);


        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/save",
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

//--------------------------------------  update hotel --------------------------------------
export function updateHotel(hotel) {
    return new Promise((resolve, reject) => {
        const hotelBlob = new Blob([JSON.stringify(hotel)], {type: 'application/json'});
        let form = new FormData();

        form.append("requestHotel", hotelBlob);
        form.append("hotel_img1", $('#hotel_manage_photo_file1')[0].files[0],);
        form.append("hotel_img2", $('#hotel_manage_photo_file2')[0].files[0],);
        form.append("hotel_img3", $('#hotel_manage_photo_file3')[0].files[0],);
        form.append("hotel_img4", $('#hotel_manage_photo_file4')[0].files[0],);

        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/update",
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

//--------------------------------------- delete hotel ---------------------------------------
export function deleteHotel(hotelId) {
    return new Promise((resolve, reject) => {

        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/delete", "method": "DELETE", "timeout": 0, "headers": {
                "id": hotelId,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}


//--------------------------------------- get hotel ---------------------------------------
export function getHotel(hotelCode) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/get", "method": "GET", "timeout": 0, "headers": {
                "id": hotelCode,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}


//--------------------------------------- get new hotel code  ---------------------------------------
export function getNewHotelCode() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/get/lastId", "method": "GET", "timeout": 0,
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}

//--------------------------------------- exists by id ---------------------------------------
export function existsById(hotelId) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/check/",
            "method": "GET", "timeout": 0,
            "headers": {
                "hotel_code": hotelId,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}


//--------------------------------------- get all hotels ---------------------------------------
export function getAllHotels() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9097/hotel/api/v1/hotel/getAll", "method": "GET", "timeout": 0,
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}
