var $startingHtml = null;

// execute the code when page is loaded
$(document).ready(function () {    
    $(function () {
        // Grab a copy of the initial state.
        $startingHtml = $('#html-content').clone();
        displayHtml();
    });

    highlightHtml();
});

function resetHtml() {
    // Replace the current content with a copy of the initial state
    $('#html-content').replaceWith($startingHtml.clone());
}

function displayHtml(data) {
    // default to the entire group
    if (data === undefined) data = '#html-content';

    // loop through all data
    $.each($(data).children(), function () {
        createHtml(this);
    });
}

function createHtml(element) {
    // ensure it's a jQuery object
    element = $(element);

    // if there are children, recurse
    if (element.children().length > 0) {
        displayHtml(element);
    }

    var startingTag = element.prop('outerHTML').substring(0, element.prop('outerHTML').indexOf('>') + 1);
    var tagName = '';
    if (startingTag.indexOf(' ') > -1)
        tagName = startingTag.substring(1, startingTag.indexOf(' '));
    else
        tagName = startingTag.substring(1, startingTag.indexOf('>'));
    var formattedTag = '&lt;<span class="tag">' + tagName + '</span>attributes&gt;';

    attributesString = '';
    $.each(element.prop('attributes'), function () {
        attributesString += ' ' + this.nodeName + '=';
        attributesString += '<span class="attribute-value">"' + this.nodeValue + '"</span>';
    });

    startingTag = formattedTag.replace('attributes', attributesString);
    element.prepend(startingTag);
    element.append(formattedTag.replace('attributes', '').replace('&lt;', '&lt;/'));

    element.css('padding-left', '20px');
}

function highlightHtml() {
    $('#section-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('section').addClass('highlight');
        displayHtml();
    });

    $('#nav-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('nav').addClass('highlight');
        displayHtml();
    });

    $('#first-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('.first').addClass('highlight');
        displayHtml();
    });

    $('#second-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('.second').addClass('highlight');
        displayHtml();
    });

    $('#div-second-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('div.second').addClass('highlight');
        displayHtml();
    });

    $('#span-second-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('span.second').addClass('highlight');
        displayHtml();
    });

    $('#navdivdescendent-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('nav div').addClass('highlight');
        displayHtml();
    });

    $('#navdivdirect-button').click(function (e) {
        e.preventDefault();
        resetHtml();
        $('nav > div').addClass('highlight');
        displayHtml();
    });

    $('#attribute-equality-button').click(function (e) { 
        e.preventDefault();
        resetHtml();
        $('[data-bind="demo"]').addClass('highlight');
        displayHtml();
    });

    $('#attribute-starts-button').click(function (e) { 
        e.preventDefault();
        resetHtml();
        $('[data-bind^="another"]').addClass('highlight');
        displayHtml();
    });

    $('#attribute-contains-button').click(function (e) { 
        e.preventDefault();
        resetHtml();
        $('[data-bind*="demo"]').addClass('highlight');
        displayHtml();
    });
}