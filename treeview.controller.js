'use strict';

var app = angular.module("KendoDemos", ["kendo.directives"]);

//Get data from your service and put into your valiable (this will be used while processing data)
var jsondata = [{
        "id": 1,
        "text": "Furniture",
        "parentId": null
    },
    {
        "id": 2,
        "text": "Tables & Chairs",
        "parentId": null
    },
    {
        "id": 3,
        "text": "something",
        "parentId": 1
    },
    {
        "id": 4,
        "text": "Sofas",
        "parentId": null
    },
    {
        "id": 5,
        "text": "Occasional Furniture",
        "parentId": 2
    },
    {
        "id": 6,
        "text": "Decor",
        "parentId": null
    },
    {
        "id": 7,
        "text": "Bed Linen",
        "parentId": null
    },
    {
        "id": 8,
        "text": "Curtains & Blinds",
        "parentId": 1
    },
    {
        "id": 9,
        "text": "Carpets",
        "parentId": null
    }
];

app.controller("MyCtrl", function ($scope) {

       //This function will be used to traverse the tree and make changes to make it nested based on ParentId 
       $scope.traverseTree = function (jsondata) {
        var map = {},
            node, roots = [];
        for (var i = 0; i < jsondata.length; i += 1) {
            node = jsondata[i];
            //We'll add child records to items    
            node.items = [];
            //Adding flag to check if node has any child    
            node.hasChildren = false;
            map[node.id] = i; // use map to look-up the parents
            if (node.parentId !== null) {
                //When parent ID is available, push that node into parent's child node, and set hasChildren flag    
                jsondata[map[node.parentId]].items.push(node);
                jsondata[map[node.parentId]].hasChildren = true;
            } else {
                //If there is no parent, push node to root level    
                roots.push(node);
            }
        }
        $scope.things = roots;
        //Verify if your tree is properly nested.
        console.log(roots);
    };

    $scope.traverseTree(jsondata);

    $scope.thingsOptions = {
        dataSource: things
    };

});
