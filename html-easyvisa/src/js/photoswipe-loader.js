// read debug level from URL
var url = new URL(location.href);
var debug = false;
if (debug) console.log('Debug level ' + debug);

// Scan page to load links
var mswpScanPage = function (tag = 'mswp') {
    // create list and build DOM
    if (debug) console.log('Scan page using tag "' + tag + '"');
    let items = new Array();

    // extract items

    document.querySelectorAll("[data-js=photoswipe-item]").forEach(photoswipe_item => {
        let rel = photoswipe_item.getAttribute("data-photoswipe-group-id");
        if (!items[rel]) {
            if (debug) console.log('Create list ' + rel);
            items[rel] = new Array();
        }
        let width = photoswipe_item.getAttribute('width') || 0;
        let height = photoswipe_item.getAttribute('height') || 0;


        let idx = items[rel].length;
        items[rel][idx] = {src: photoswipe_item.href, title: photoswipe_item.title, w: width, h: height};

        photoswipe_item.addEventListener("click", e => {
            e.preventDefault();

            let element = document.querySelectorAll('.pswp')[0];
            let mswp = new MediaSwipe(element, PhotoSwipeUI_Default, items[rel], {index: idx, maxSpreadZoom: 4});
            mswp.init();

            return false
        })

    });


};


var video_n_thumb_player;

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    if (debug) console.log('onYouTubeIframeAPIReady');

    if (Boolean(document.querySelectorAll("[data-js=photoswipe-item]"))) {
        mswpScanPage();
    }

    video_n_thumb_player = new YT.Player('video-n-thumb__video-container', {
        events: {
            'onReady': function () {
                document.querySelectorAll("[data-js=video-n-thumb__thumb]").forEach(thumb => {
                    thumb.addEventListener("click", e => {
                        let video_n_thumb = thumb.closest("[data-js=video-n-thumb]");
                        let video_id = video_n_thumb.getAttribute("data-video-id");
                        // let video_container = video_n_thumb.querySelector("[data-js=video-n-thumb__video-container]");

                        // video_container.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + video_id + '?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        video_n_thumb_player.loadVideoById(video_id);
                        thumb.style.display = "none";
                    })
                });
            }
        }
    });


}