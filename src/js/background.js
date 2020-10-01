chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({})],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    let func;
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            if (typeof changes['js_transform'] !== 'undefined') {
                func = changes['js_transform'].newValue;
            }
        }
    });

    chrome.extension.onMessage.addListener(async (msg, sender, sendResponse) => {
        if (!msg.data) {
            return;
        }

        let response;

        try {
            let transformed = eval(`
                (function (data) {
                    ${func}
                    return data;
                })('${msg.data}')`
            );

            response = {
                ok: true,
                data: transformed
            }
        } catch (err) {
            response = {
                ok: false,
                error: err.message
            }
        }

        sendResponse(response)
    });
});
