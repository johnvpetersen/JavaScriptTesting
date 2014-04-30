/// <reference path="../../../ProductsClient/Scripts/test.ts" />
/// <reference path="../../qunit/qunit-1.12.0.js" />

module("Module 1");

test("Hello You Test",1, function () {


    var result = helloYou("John");
    var expected = "Hello John";

    ok(result === expected, "Passed!");
});