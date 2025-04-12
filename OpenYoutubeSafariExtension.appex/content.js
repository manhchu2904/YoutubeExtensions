browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "OYT")
        window.location.href = window.location.href.replace(
            window.location.protocol,
            "youtube:"
        );

    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationPath = window.location.pathname;
    var ytLocation = window.location.href.replace(
        window.location.protocol,
        "youtube:"
    );
    const check = ["/watch", "/live", "/shorts", "/clip", "/channel"];
    if (
        check.some((keyword) => locationPath.includes(keyword)) ||
        /\/@\w+/.test(locationPath)
    )
        window.location.href = ytLocation;
}

(document.body || document.documentElement).addEventListener(
    "transitionend",
    function (event) {
        if (event.propertyName === "width" && event.target.id === "progress") {
            afterNavigate();
        }
    },
    true
);
afterNavigate();