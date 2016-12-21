$(document).ready(function() {
    init();
    // Add event handlers
    enable();
});

function init() {
    getColors();
    getSizes();
}

function enable() {
    // Set up event handlers
}

/*
 * --- COLORS & SIZES ---
 */

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
    var htmlString = '';
    options.forEach(function(opt) {
        htmlString += '<option value="' + opt.id + '">' + opt[type] + '</option>';
    });
    $('.' + type + '-select').html(htmlString);
}

function ajaxError(error) {
    console.log('AJAX error:', error);
}
