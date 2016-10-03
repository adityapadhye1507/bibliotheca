var ua = navigator.userAgent.toLowerCase();
var check = function(r) {
    return r.test(ua);
}
var isMac = check(/mac/);
var isChrome = check(/chrome/);
var isSafari = !isChrome && check(/safari/);

function checkBrowser(){

    if (!document.getElementById || (isMac && isSafari)) {				
        var choice = confirm("This website may not work properly with your current browser. Please download a modern browser e.g. Firefox. Press OK to download Firefox or Press Cancel to continue anyways");

        if(choice == true){
            window.location = "https://www.mozilla.org/en-US/firefox/new/";
        }
    }
}