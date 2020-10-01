const jsCode = document.getElementById('js-code');
const store = value => {
    chrome.storage.local.set({'js_transform': value});
}
chrome.storage.local.get('js_transform', (items) => {
    if (items['js_transform']) {
        jsCode.value = items['js_transform'];
    }
});

jsCode.addEventListener('input', () => {
    store(jsCode.value)
}, false);

const clear = document.getElementById('btn-clear');
clear.addEventListener('click', (e) => {
    jsCode.value = '';
    store(jsCode.value)
});