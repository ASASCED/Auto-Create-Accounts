const ProxyPlugin = require("selenium-chrome-proxy-plugin");
const webdriver = require("selenium-webdriver");

const proxyConfig = {
  host: "http://103.129.119.229",
  port: "21273",
  username: "adrianguti37850",
  password: "2mxt3n5spx",
};

return new ProxyPlugin({
  proxyConfig: proxyConfig,
  //chromeOptions: chromeOptions,
})
  .then((plugin) => {
    console.log("PLUGIN READY");
    return new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(plugin.chromeOptions)
      .build()
      .then((driver) =>
        plugin
          .cleanup()
          .then(() => driver.get("http://lumtest.com/myip.json"))
          .then(() => console.log("DONE"))
      );
  })
  .catch((err) => console.log("ERROR:", err));
