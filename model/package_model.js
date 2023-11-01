//--------------------------------------------- save package ---------------------------------------------
export function savePackage(packageData) {
    return new Promise((resolve, reject) => {
        const packageBlob = new Blob([JSON.stringify(packageData)], {type: 'application/json'});
        let form = new FormData();

        form.append("package", packageBlob);
        form.append("paymentSlip1", $('#payment_slip_1')[0].files[0],);
        form.append("paymentSlip2", $('#payment_slip_2')[0].files[0],);

        let settings = {
            "url": "http://localhost:9098/package/api/v1/package/save",
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

//--------------------------------------------- update package ---------------------------------------------
export function updatePackage(packageData) {
    return new Promise((resolve, reject) => {
        const packageBlob = new Blob([JSON.stringify(packageData)], {type: 'application/json'});
        let form = new FormData();

        form.append("package", packageBlob);
        form.append("paymentSlip1", $('#payment_slip_1')[0].files[0],);
        form.append("paymentSlip2", $('#payment_slip_2')[0].files[0],);

        let settings = {
            "url": "http://localhost:9098/package/api/v1/package/update",
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

//--------------------------------------------- get package details ---------------------------------------------
export function getPackageDetails(packageId) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9098/package/api/v1/package/get",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": packageId,
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


//--------------------------------------------- get new package id ---------------------------------------------
export function getNewPackageId() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9098/package/api/v1/package/get/lastId",
            "method": "GET", "timeout": 0,
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });

    });
}


//--------------------------------------------- exists by package id ---------------------------------------------
export function existsByPackageId(packageId) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:9098/package/api/v1/package/check/",
            "method": "GET", "timeout": 0,
            "headers": {
                "id": packageId,
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












