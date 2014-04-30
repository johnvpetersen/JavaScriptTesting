/// <reference path="knockout-2.2.1.debug.js" />
/// <reference path="jquery-2.0.0.js" />
/// <reference path="jquery-2.0.0.intellisense.js" />
/// <reference path="productsAPI.js" />


 (function productsVM(productsAPI) {
    var self = this;

    productsAPI.getProducts(function (data) {
        self.products = ko.observableArray(data);
        ko.applyBindings(self);
    });

    this.addProduct = function (product) {
        self.products.push({
            Id: 0,
            Name: "",
            Price: 0
        });
    },

    this.updateProduct = function (product) {

        var method = (product.Id > 0) ? "PUT" : "POST";

        productsAPI.updateProduct(product, method, function (data) {
            if (method === "POST") {
                var product = ko.utils.arrayFirst(self.products(), function (item) {
                    return item.Name === data.Name;
                });

                if (product) {
                    self.products.replace(product, data);
                }
            }
        });
    },

    this.removeProduct = function (product) {
        productsAPI.deleteProduct(product.Id, function () {
            self.products.remove(product);
        });
    }
 }(new productsAPI("http://localhost:42280/api/products", makeAjaxCall)));


