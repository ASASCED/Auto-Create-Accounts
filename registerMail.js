const { dataset } = require("./dataset");

async function registerMail(page, rnd, secret) {
  await page.goto("https://mail.protonmail.com/create/new?language=en", {
    waitUntil: "load",
    timeout: 0,
  });

  // Username
  await page.waitForSelector(".signupIframe-loaded");
  const iFrame_Name = await page.$("iframe[class='top']");
  const name = await iFrame_Name.contentFrame();
  await name.type(
    "#username",
    `${dataset[rnd].nombre.replace(/\s/g, "").toLowerCase()}.${secret}`
  );

  // Password
  await page.type("#password", secret);
  await page.type("#passwordc", secret);

  // Create Account
  const iFrame_Btn = await page.$("iframe[class='bottom']");
  const btn = await iFrame_Btn.contentFrame();
  const submit = await btn.$("button[type='submit']");
  await submit.click();

  // Skip - Recovery Email
  await page.waitForSelector(".appConfigBody-modalOpen");
  const confirm = await page.$("#confirmModalBtn");
  await confirm.click();

  // Captcha
  await page.waitForSelector("iframe[id='pm_captcha']");
  const iFrame_CPT = await page.$("iframe[id='pm_captcha']");
  const cpt = await iFrame_CPT.contentFrame();
  await cpt.waitForSelector('iframe[src*="api2/anchor"]');
  const { captchas, solutions, solved, error } = await cpt.solveRecaptchas();
  console.log({ captchas, solutions, solved, error });
}

module.exports = registerMail;
