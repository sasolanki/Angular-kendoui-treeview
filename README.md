# Angular-kendoui-treeview
Provide your list data to Angular &amp; Kendo, code will manage the tree structure based on parentId

## Step-1
Get your data from service, keep it in scope variable

## Step-2
According to your properties, update node values in below code snippet
Values that you may need to change. 
 - node.id : Your PK field
 - node.parentId : Your FK field

```sh
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
```
