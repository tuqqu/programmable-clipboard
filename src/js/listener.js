document.addEventListener('copy', (e) => {
    const selection = document.getSelection().toString();
    const msg = {
        data: selection
    };

    if (typeof chrome.app.isInstalled !== 'undefined'){
        chrome.runtime.sendMessage(chrome.runtime.id, msg, (response) => {

            if (!response) {
                console.error('Error: no response from an extension.')
                return;
            }

            if (!response.ok) {
                console.error('Error occured whilst trying to transform data, check syntax.')
                return;
            }

            navigator.clipboard.writeText(response.data).then(
                () => {},
                (err) => {
                    console.error('Error occurred whilst trying to copy data to the clipboard: ', err);
                }
            );
        })
    }
});

