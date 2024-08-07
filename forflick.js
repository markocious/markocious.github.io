document.addEventListener('DOMContentLoaded', function() {
    var flkty = new Flickity('.carousel', {
        // options
        cellAlign: 'center',
        contain: true,
        pageDots: false
    });

    flkty.on('change', function(index) {
        // Remove black-and-white class from all images
        document.querySelectorAll('.carousel-cell img').forEach(img => {
            img.classList.add('black-and-white');
            img.classList.remove('color');
        });

        // Add color class to the center image
        var centerCell = flkty.getCellElements()[index];
        var centerImg = centerCell.querySelector('img');
        if (centerImg) {
            centerImg.classList.add('color');
            centerImg.classList.remove('black-and-white');
        }
    });

    // Trigger the initial change event to set the correct image state on load
    flkty.select(0);
});
