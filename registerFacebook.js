async function registerFacebook(page, fullName, email, secret) {
  console.log({ fullName });
  await page.goto("https://www.facebook.com/", {
    waitUntil: "load",
    timeout: 0,
  });
  await page.waitForSelector("a[data-testid='open-registration-form-button']");
  await page.click("a[data-testid='open-registration-form-button']");
  // await page.waitForSelector("img[src*='/static.xx']");
  await page.waitForSelector("input[name='firstname']");
  await page.type("input[name='firstname']", fullName[0]);
  await page.type("input[name='lastname']", fullName[1]);
  await page.type("input[name='reg_email__']", email);
  // await page.waitForSelector("input[name='reg_email_confirmation__']");
  // await page.type("input[name='reg_email_confirmation__']", email);
  await page.type("input[name='reg_passwd__']", secret);
  await page.select("#year", "1998");
  await page.click("input[value='1']", { clickCount: 1 });
  await page.click("button[name='websubmit']");
}

module.exports = registerFacebook;
