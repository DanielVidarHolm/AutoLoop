document.addEventListener('DOMContentLoaded', () => {
    const InitButton = document.getElementById('InitButton');
    console.log(InitButton);

    InitButton.addEventListener('click', () => {
        // Find the current tab where the button was pushed on
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            if (!tabs || tabs.length === 0) {
                return;
            }
            const activeTab = tabs[0]
            console.log(activeTab);
            // Send a message to the content.js to start the autoloop
            chrome.tabs.sendMessage(activeTab.id, {type: "INIT_AUTOLOOP"});
            chrome.action.setBadgeBackgroundColor({color: "green", tabId: activeTab.id});
            chrome.action.setBadgeText({text: "ON", tabId: activeTab.id});
        });
    });


})

