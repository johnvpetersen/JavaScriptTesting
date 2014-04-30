/// <reference path="../../scripts/helloWorld.js" />
/// <reference path="../../qunit/qunit-1.12.0.js" />

module("Module 1");

test("Hello World Test",1, function () {


    var result = helloWorld();
    var expected = "Hello World";

    ok(result === expected, "Passed!");
});