/// <reference path="../../qunit/qunit.js" />
/// <reference path="../../jquery/jquery-2.0.3.js" />
/// <reference path="../../sinon/sinon-1.7.3.js" />
/// <reference path="../../sinon/sinon-qunit-1.0.0.js" />
/// <reference path="../../../ProductsClient/Scripts/productsAPI.js" />

module("Sinon Spys", {
    setup: function () {
        sinon.spy(jQuery, "ajax");
    },
    teardown: function () {
        jQuery.ajax.restore();
    }
})

test("GetProducts", 4, function () {
    var sut = new productsAPI("api/products", makeAjaxCall);
    sut.getProducts(function () {
    });
    ok(jQuery.ajax.calledOnce, "jQuery Ajax was called");
    equal("api/products", jQuery.ajax.getCall(0).args[0].url, "url is correct");
    equal("json", jQuery.ajax.getCall(0).args[0].dataType, "datatype is json");
    equal("GET", jQuery.ajax.getCall(0).args[0].method, "method is correct");
});

test("GetProduct", 5, function () {
    var sut = new productsAPI("api/products", makeAjaxCall);
    sut.getProduct(1, function () {
    });
    ok(jQuery.ajax.calledOnce);
    equal("api/products", jQuery.ajax.getCall(0).args[0].url);
    equal("json", jQuery.ajax.getCall(0).args[0].dataType);
    equal("1", jQuery.ajax.getCall(0).args[0].data);
    equal("GET", jQuery.ajax.getCall(0).args[0].method, "method is correct");
});

test("DeleteProduct", 4, function () {
    var sut = new productsAPI("api/products", makeAjaxCall);
    sut.deleteProduct(1, function () {
    });
    ok(jQuery.ajax.calledOnce);
    equal("api/products", jQuery.ajax.getCall(0).args[0].url);
    equal("1", jQuery.ajax.getCall(0).args[0].data);
    equal("DELETE", jQuery.ajax.getCall(0).args[0].method, "method is correct");
});

test("UpdateProduct-PUT", 4, function () {
    var sut = new productsAPI("api/products", makeAjaxCall);
    var product = {"Id": 1, "Name": "Gizmo 1", "Price": 1.99}

    sut.updateProduct(product, "PUT", function () {
    });
    ok(jQuery.ajax.calledOnce);
    equal("api/products", jQuery.ajax.getCall(0).args[0].url);
    deepEqual(product, jQuery.ajax.getCall(0).args[0].data);
    equal("PUT", jQuery.ajax.getCall(0).args[0].method, "method is correct");
});

test("UpdateProduct-POST", 4, function () {
    var sut = new productsAPI("api/products", makeAjaxCall);
    var product = { "Id": 0, "Name": "Gizmo 4", "Price": 4.99 }

    sut.updateProduct(product, "POST", function () {
    });
    ok(jQuery.ajax.calledOnce);
    equal("api/products", jQuery.ajax.getCall(0).args[0].url);
    deepEqual(product, jQuery.ajax.getCall(0).args[0].data);
    equal("POST", jQuery.ajax.getCall(0).args[0].method, "method is correct");
});

module("Sinon Stubs - jQuery Ajax", {
    setup: function () {
        var fakeData = JSON.parse('[ { "Id": 1, "Name": "Gizmo 1", "Price": 1.99 }, { "Id": 2, "Name": "Gizmo 2", "Price": 2.99 }, { "Id": 3, "Name": "Gizmo 3", "Price": 3.99 } ]');
        sinon.stub(jQuery, "ajax").yieldsTo("success", fakeData);
    },
    teardown: function () {

        jQuery.ajax.restore();
    }
})

test("GetProducts", 1, function () {

    var sut = new productsAPI("/api/products", makeAjaxCall);
    sut.getProducts(function (data) {
        equal(data.length, 3, "Data length is correct");
    });
});

module("Sinon Stubs - XMLHttpRequest", {
    setup: function () {
        var fakeData = JSON.parse('[ { "Id": 1, "Name": "Gizmo 1", "Price": 1.99 }, { "Id": 2, "Name": "Gizmo 2", "Price": 2.99 }, { "Id": 3, "Name": "Gizmo 3", "Price": 3.99 } ]');

        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];

        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };

    },
    teardown: function () {

        this.xhr.restore();
    }
});


test("Test", 1, function () {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {

            var x = xhr.responseText;
            console.log(x);

            
        }
    };


    xhr.open("GET", "http://localhost:42280/api/products", true);
    xhr.send();

    ok(true);

});


