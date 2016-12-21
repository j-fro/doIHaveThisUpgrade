$(document).ready(function() {
    init();
    // Add event handlers
    enable();
});

function init() {
    getColors();
    getSizes();
    getItems();
}

function enable() {
    // Set up event handlers
    $('#newColorButton').on('click', addColor);
    $('#newSizeButton').on('click', addSize);
    $('#newItemButton').on('click', addItem);
    $('#removeColorButton').on('click', removeColor);
    $('#removeSizeButton').on('click', removeSize);
    $('#removeItemButton').on('click', removeItem);
}

/*
 * --- ITEMS ---
 */

/* --- GET & DISPLAY --- */

function getItems() {
    console.log('Getting items');
    $.ajax({
        url: '/items',
        success: function(response) {
            console.log('Received items:', response);
            displayItemSelect(response);
        },
        error: ajaxError
    });
}

function displayItemSelect(items) {
    // Adds all items to a select box
    var htmlString = '';
    items.forEach(function(item) {
        htmlString += '<option value="' + item.id + '">' + item.name + '</option>';
    });
    $('.item-select').html(htmlString);
}

/* --- CREATE NEW --- */

function addItem() {
    var name = $('#newItemNameIn').val();
    var color = $('#newItemColorIn').val();
    var size = $('#newItemSizeIn').val();
    console.log('Add a new item:', name, color, size);
    $.ajax({
        url: '/items',
        type: 'POST',
        data: {
            name: name,
            colorId: color,
            sizeId: size
        },
        success: function(response) {
            console.log('Received from server:', response);
            // Clear the input
            $('#newItemNameIn').val('');
            $('#newItemColorIn').val('');
            $('#newItemSizeIn').val('');
            getItems();
        }
    });
}

/* --- DELETE EXISTING --- */

function removeItem() {
    var itemId = $('#itemToRemove').val();
    console.log('Deleting an item:', itemId);
    $.ajax({
        url: '/items',
        type: 'DELETE',
        data: {
            id: itemId
        },
        success: function(response) {
            console.log('Received from server:', response);
            getItems();
        },
        error: ajaxError
    });
}

/*
 * --- COLORS & SIZES ---
 */

/* --- GET & DISPLAY --- */

function getColors() {
    console.log('Getting colors from server');
    $.ajax({
        url: '/colors',
        success: function(response) {
            console.log('Received from server:', response);
            displayOptions(response, 'color');
        },
        error: ajaxError
    });
}

function getSizes() {
    console.log('Getting sizes from server');
    $.ajax({
        url: '/sizes',
        success: function(response) {
            console.log('Received from server:', response);
            displayOptions(response, 'size');
        },
        error: ajaxError
    });
}

function displayOptions(options, type) {
    // Add all [options] to select with the class .[type]-select
    var htmlString = '<option disabled default>Choose One</option>';
    options.forEach(function(opt) {
        htmlString += '<option value="' + opt.id + '">' + opt[type] + '</option>';
    });
    $('.' + type + '-select').html(htmlString);
}

/* --- CREATE NEW --- */

function addColor() {
    // Send a user defined color to the server
    var color = $('#newColorIn').val();
    console.log('Adding a new color:', color);
    $.ajax({
        url: '/colors',
        type: 'POST',
        data: {
            color: color
        },
        success: function(response) {
            console.log('Received from server:', response);
            // Clear the input
            $('#newColorIn').val('');
            getColors();
        }
    });
}

function addSize() {
    // Send a user defined size to the server
    var size = $('#newSizeIn').val();
    console.log('Adding a new size:', size);
    $.ajax({
        url: '/sizes',
        type: 'POST',
        data: {
            size: size
        },
        success: function(response) {
            console.log('Received from server:', response);
            // Clear the input
            $('#newSizeIn').val('');
            getSizes();
        }
    });
}

/* --- DELETE EXISTING --- */

function removeColor() {
    // Remove a user defined color from the server
    var colorId = $('#colorToRemove').val();
    console.log('Removing a color:', colorId);
    $.ajax({
        url: '/colors',
        type: 'DELETE',
        data: {
            id: colorId
        },
        success: function(response) {
            console.log('Received from server:', response);
            getColors();
        }
    });
}

function removeSize() {
    // Remove a user defined size from the server
    var sizeId = $('#sizeToRemove').val();
    console.log('Removing a size:', sizeId);
    $.ajax({
        url: '/sizes',
        type: 'DELETE',
        data: {
            id: sizeId
        },
        success: function(response) {
            console.log('Received from server:', response);
            getSizes();
        }
    });
}

function ajaxError(error) {
    console.log('AJAX error:', error);
}
