$(document).ready(function () {
    // Use $.getJSON to load the data from the JSON file
    $.getJSON('assets/data/data.json', function (data) {
        // Loop through each spot in the data
        data.forEach(function (spot) {
            // Create a Google Maps link using the location coordinates
            var mapLink = 'https://www.google.com/maps?q=' + spot.location[0] + ',' + spot.location[1];

            // Create a new row for the table with the spot information
            var row = '<tr>' +
                '<td>' + spot.name + '</td>' +
                '<td>' + spot.description + '</td>' +
                '<td><a href="' + mapLink + '" target="_blank">Open in Google Maps</a></td>' +
                '</tr>';

            // Append the new row to the table body
            $('#table-body').append(row);
        });
    });
});