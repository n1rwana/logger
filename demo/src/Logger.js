export function getNavigatorObject() {
    const navigatorPropsToString = {};
    for (const prop in navigator) {
        try {
            const value = JSON.stringify(navigator[prop]);
            navigatorPropsToString[prop] = value;
        } catch (e) {
            continue;
        }
    }
    return JSON.stringify(navigatorPropsToString);
}
export function getScreenInfo() {
    const properties = ['availHeight', 'availLeft', 'availTop', 'availWidth', 'colorDepth', 'height', 'pixelDepth', 'width'];
    return JSON.stringify(properties.reduce((acc, prop) => ({ ...acc, [prop]: window.screen[prop] }), {}));
}
export function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: fileName, textContent: 'Download' });
    document.body.appendChild(link);
    link.click();
    link.remove();
}
export function getFileData(consoleHistory) {
    const prefix = "Company Name | Project Name";
    const device = getNavigatorObject();
    const screen = getScreenInfo();
    const params = window.location.search;
    return `${prefix} | ${new Date().toISOString()} | КОНФИДЕНЦИАЛЬНО\n\n${consoleHistory.join('\n')}\n\nLaunch params: ${params}\nDevice: ${device}\nScreen: ${screen}`;
}
export function exportLogs(consoleHistory) {
    const fileData = getFileData(consoleHistory);
    const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
    const fileName = `logs.${Date.now()}.txt`;
    downloadBlob(blob, fileName);
}
