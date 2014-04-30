function productsAPI(url,ajaxCall) {
    var self = this;
    var _url = url;
    var _ajaxCall = ajaxCall;

    self.getProducts = function (callback) {
        _ajaxCall(_url,"GET", "", callback);
    };
    
    self.getProduct = function (id, callback) {
        _ajaxCall(_url, "GET", id, callback);

    };

    self.deleteProduct = function (id, callback) {
        _ajaxCall(_url, "DELETE", id, callback);

    };

    self.updateProduct = function (product, method, callback) {
        _ajaxCall(_url, method, product, callback);
    };
}

function makeAjaxCall(url, method, data, callback) {

    var options = { url: url, method: method };
    if (data != null && data != "") {
        options.data = data;
    }

    if (method === "GET") {

        options.dataType = "json";
    }

    //options.success = callback;
    options.success = callback;
    options.error = function (jqXHR, textStatus, errorthrown) {
        console.log(errorthrown);
    };

    $.ajax(options);

};

function makeXHRCall(url, method, data, callback) {

    var xhr = new XMLHttpRequest();
    
    if (method === "DELETE" || method === "GET") {

        url += "/" + data;
    }

    xhr.open(method, url, true);

    if (method === "POST" || method === "PUT") {

        xhr.setRequestHeader("content-type", "application/json");
        data = JSON.stringify(data);
    }


    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 204)) {

            var responseData = (method === "GET" || method === "POST") ? JSON.parse(xhr.responseText) : null;

            callback(responseData);
        }
    };
    
    xhr.send(data);

};
