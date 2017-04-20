var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Stats = createReactClass({
    render: function() {
        var custom = this.props.custom;
        var items = JSON.parse(custom.items);
        if(custom.type == "CLASS" || custom.type == "0") {
            return (
                <div>
                    {items[0].Response.data.inventoryItem.itemTypeName} - {items[0].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "HELM" || custom.type == "1") {
            return (
                <div>
                   {items[1].Response.data.inventoryItem.tierTypeName} {items[1].Response.data.inventoryItem.itemTypeName} - {items[1].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "ARM" || custom.type == "2") {
            return (
                <div>
                    {items[2].Response.data.inventoryItem.tierTypeName} {items[2].Response.data.inventoryItem.itemTypeName} - {items[2].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "CHEST" || custom.type == "3") {
            return (
                <div>
                    {items[3].Response.data.inventoryItem.tierTypeName} {items[3].Response.data.inventoryItem.itemTypeName} - {items[3].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "LEG" || custom.type == "4") {
            return (
                <div>
                    {items[4].Response.data.inventoryItem.tierTypeName} {items[4].Response.data.inventoryItem.itemTypeName} - {items[4].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "CLASSITEM" || custom.type == "5") {
            return (
                <div>
                    {items[5].Response.data.inventoryItem.tierTypeName} {items[5].Response.data.inventoryItem.itemTypeName} - {items[5].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "PRIMARY" || custom.type == "6") {
            return (
                <div>
                    {items[6].Response.data.inventoryItem.tierTypeName} {items[6].Response.data.inventoryItem.itemTypeName} - {items[6].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "SECONDARY" || custom.type == "7") {
            return (
                <div>
                    {items[7].Response.data.inventoryItem.tierTypeName} {items[7].Response.data.inventoryItem.itemTypeName} - {items[7].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else if(custom.type == "HEAVY" || custom.type == "8") {
            return (
                <div>
                    {items[8].Response.data.inventoryItem.tierTypeName} {items[8].Response.data.inventoryItem.itemTypeName} - {items[8].Response.data.inventoryItem.itemName}
                </div>
            );
        }
        else {
            return (
                <div>
                    Please set valid type paramater. Example: &amp;type=CLASS
                </div>
            );
        }
    }
});

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(Stats);
