"use strict";
const fs = require("fs");
const proxyChain = require("proxy-chain");
const userAgent = require("user-agents");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
const axios = require("axios").default;
const randomDomains = require("random-domains");
const { default: ShortUniqueId } = require("short-unique-id");

const preloadFile = fs.readFileSync("./preload.js", "utf8");
const solve = require("./solve");
const registerFacebook = require("./registerFacebook");
const registerMail = require("./registerMail");
const { dataset } = require("./dataset");

const uid = new ShortUniqueId({ length: 8 });

(async () => {
  const oldProxyUrl = "http://3dlraqao:HkbqKhU7JcuFEJck@34.225.130.180:31112";
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

  puppeteer.use(StealthPlugin());
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: "2captcha",
        token: "00caba440f5ab93b914b5380a8c0df71",
      },
      visualFeedback: true,
    })
  );

  const browser = await puppeteer.launch({
    args: [
      `--proxy-server=${newProxyUrl}`,
      "--disable-notifications",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-infobars",
      "--window-position=0,0",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      "--disable-web-security",
    ],
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    slowMo: 10,
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.evaluateOnNewDocument(preloadFile);
  await page.setUserAgent(userAgent.toString());

  // TODO: Main
  try {
    const rnd = Math.floor(Math.random() * (dataset.length - 1));
    await registerMail(page, rnd, uid());
    // await registerFacebook(
    //   page,
    //   ["Jesus", "Jimenez"],
    //   "+524425517459",
    //   "Anix300Lost"
    // );
  } catch (error) {
    console.log(error);
  }
})();
