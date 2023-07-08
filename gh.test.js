let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 6000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 6000);
});

describe("New tests", () => {
  afterEach(() => {
    page.close();
  });

  test("GitHub Shop", async () => {
    await page.goto("https://www.thegithubshop.com/");
    const title = await page.title();
    expect(title).toContain("The GitHub Shop");
  }, 5000);

  test("Enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = "div.col-9-max.position-relative.z-2.ml-lg-4.ml-xl-0 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Build like the best");
  }, 5000);

  test("Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-7.mt-md-8.mt-lg-9.mb-5.mb-lg-9 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toMatch("Get the complete developer platform.");
    }, 6000);
  });