$(function(){

    let $videoPlayer = $('video:visible').first()

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        console.log(msg);
        if (msg.type === "INIT_AUTOLOOP"){

            console.log($videoPlayer);
            $videoPlayer.attr("loop", true);
            $videoPlayer.get(0).play();

        }
    });


})



