$(document).ready(function() {
    // Load data and initialize spots
    $.getJSON('assets/data/data.json', function(data) {
        // Loop through each spot in the data
        data.forEach(function(spot, index) {
            // Create a Google Maps link using the location coordinates
            var mapLink = 'https://www.google.com/maps?q=' + spot.location[0] + ',' + spot.location[1];
            
            // Create a card for each spot
            var card = $('<div class="spot-card"></div>');
            
            // Add categories as data attributes for filtering
            card.attr('data-categories', spot.categories.join(' '));
            
            // Add content to the card
            var content = $('<div class="spot-content"></div>');
            content.append('<h3 class="spot-title">' + spot.name + '</h3>');
            content.append('<p class="spot-description">' + spot.description + '</p>');
            
            // Add category tags if categories exist
            if (spot.categories && spot.categories.length > 0) {
                var categoryTags = $('<div class="category-tags"></div>');
                spot.categories.forEach(function(category) {
                    categoryTags.append('<span class="category-tag ' + category + '">' + 
                        category.charAt(0).toUpperCase() + category.slice(1) + '</span>');
                });
                content.append(categoryTags);
            }
            
            content.append('<a href="' + mapLink + '" class="map-link" target="_blank">View on Map</a>');
            
            // Add the content to the card
            card.append(content);
            
            // Add the card to the spots container
            $('.spots-container').append(card);
        });
        
        // Initialize filter functionality
        initializeFilters();
    });
    
    // Toggle filter panel
    $('.filter-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.filter-panel').toggleClass('active');
    });
    
    // Initialize filter buttons
    function initializeFilters() {
        $('.filter-btn').on('click', function() {
            // Update active state on buttons
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            // Get the selected filter
            const filter = $(this).data('filter');
            
            // Filter the spots
            if (filter === 'all') {
                $('.spot-card').show();
            } else {
                $('.spot-card').hide();
                $('.spot-card[data-categories*="' + filter + '"]').show();
            }
            
            // Update category description
            $('.category-description').removeClass('active');
            $('#' + filter + '-info').addClass('active');
        });
    }
});