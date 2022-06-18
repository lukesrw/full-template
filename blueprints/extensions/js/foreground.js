/*global browser*/

console.info("foreground.js");

browser.runtime.onMessage.addListener(async () => "Polo");
