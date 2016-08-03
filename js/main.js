// ----------------------------------------------------------------//
// ---------------// Variables //---------------//
// ----------------------------------------------------------------//
var unsplashAPI = "https://api.unsplash.com/users/nathananderson/photos/?client_id=1fc3cf0554dd08f8491af5cd37ac945bebde6b5032613d61419f2b92ddde1d9a&per_page=20";
var popularPhotos = {
  order_by: "popular",
  format: "json"
};
var latestPhotos = {
  order_by: "latest",
  format: "json"
};
var oldestPhotos = {
  order_by: "oldest",
  format: "json"
};

// ----------------------------------------------------------------//
// ---------------// Unsplash Photos //---------------//
// ----------------------------------------------------------------//
var gallery;

function displayPhotos(data) {
    var photoData = '';
    var photoInfo = '';
    $.each(data, function(i, photo) {
      photoData += '<a class="tile"' + 'data-sub-html="#' + photo.id + '"' + 'data-src="' + photo.urls.regular + '">' + '<img alt class="photo" src="' + photo.urls.regular + '">';
			photoInfo += '<div class="caption-box" id="' + photo.id + '">' + '<h1 class="photo-title">' + 'Photo By: ' + photo.user.name + '</h1>' + '<p class="photo-description"> Description: Awesome photo by ' + photo.user.name + ' (aka:' + '<a target="_blank" href="' + photo.links.html + '">' + photo.user.username + ')</a>' + ' So far this photo has ' + '<span>' + photo.likes + '</span>' + ' Likes.' + ' You can download this photo if you wish, it has a free <a target="_blank" href="https://unsplash.com/license"> Do whatever you want </a> license. <a target="_blank" href="' + photo.links.download + '"><i class="fa fa-download" aria-hidden="true"></i> </a> </p>';
    });
    // Putitng into HTML
		photoData += '</a>';
		photoInfo += '</div>';
    $('#photoBox').html(photoData + photoInfo);
    //-----------------------------------//
    // -------  Calling Lightbox ------- //
    //-----------------------------------//
				// If gallery exists already, destroy it (needed for sorting)
    if (gallery) {gallery.data('lightGallery').destroy(true);}
    gallery = $('#photoBox').lightGallery({
      selector: '.tile',
      download: false,
      counter: false,
      zoom: false,
      thumbnail: false,
      mode: 'lg-fade'
    });
  } // End Displayphotos function

// Show popular photos on pageload
$.getJSON(unsplashAPI, popularPhotos, displayPhotos);


// Button Click Changes
$('button').click(function() {
  $('button').removeClass("active");
  $(this).addClass("active");
}); // End button

// Show Popular Photos
$('#popular').click(function() {
  $.getJSON(unsplashAPI, popularPhotos, displayPhotos);
}); // End button
// Show latest Photos
$('#latest').click(function() {
  $.getJSON(unsplashAPI, latestPhotos, displayPhotos);
}); // End button
// Show oldest Photos
$('#oldest').click(function() {
  $.getJSON(unsplashAPI, oldestPhotos, displayPhotos);
}); // End button
