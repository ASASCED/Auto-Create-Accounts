const chalk = require("chalk");
const log = console.log;
let webdriver = require("selenium-webdriver"),
  By = webdriver.By;
let chrome = require("selenium-webdriver/chrome");
let opts = new chrome.Options().addArguments([
  "--disable-notifications",
  // "--proxy-server=http://103.129.119.229:21273",
]);

const emails = ["yisussanto6@gmail.com", "jesus_heaven117@outlook.com"];
const passwords = ["Anix300Lost", "Anix300Lost"];
let counter = 0;

(function example() {
  let driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(opts)
    .build();
  try {
    for (const email of emails) {
      console.log({ email });
      driver.get("http://lumtest.com/myip.json");

      driver
        .findElement(By.css("pre"))
        .getText()
        .then((txt) => {
          log(chalk.bgBlue(txt));
        });

      driver.get("https://facebook.com");
      driver.findElement(By.id("email")).sendKeys(email);
      driver.findElement(By.id("pass")).sendKeys(passwords[counter]);
      driver.findElement(By.name("login")).click();

      driver.sleep(6000);

      driver.get(
        "https://m.facebook.com/story.php?story_fbid=2908443036097222&id=100007946619619#_=_"
      );
      driver
        .findElement(By.id("composerInput"))
        .sendKeys("Eeeeeeeeeoooooooo :o");
      driver.findElement(By.css("button[type='submit']")).click();
      driver.sleep(3000);
      driver.quit();
      counter++;
      console.log({ counter });
    }

    // setTimeout(async () => {
    //   driver
    //     .findElements(By.css("form > div[data-visualcompletion='ignore']"))
    //     .then((articles) => {
    //       console.log({ articles });
    //       console.log(articles[0].sendKeys("Holis bolis :D"));
    //     });
    // }, 10000);
  } finally {
  }
})();

// host = "http://103.129.119.229:21273";
// pass = "2mxt3n5spx";
// user = "adrianguti37850";
// url = "http://lumtest.com/myip.json";
// credentials = adrianguti37850:2mxt3n5spx@
// https://m.facebook.com/story.php?story_fbid=2908443036097222&id=100007946619619#_=_

// pr0616480@gmail.com
// Holaguapos123456

// br6485201@gmail.com
// Hugo12345

// guadaju066@gmail.com
// Hugo12345
