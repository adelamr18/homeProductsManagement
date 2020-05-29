import { AppPage } from "./app.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    var originalTimeout;
    page = new AppPage();
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });

  it("should get the header title", () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual("Products Management");
  });

  it("should get first progress bar title", () => {
    page.navigateTo();
    expect(page.getProgressFirstText()).toEqual("Products");
  });

  it("should get second progress bar title", () => {
    page.navigateTo();
    expect(page.getProgressSecondText()).toEqual("Shipping");
  });

  it("should get third progress bar title", () => {
    page.navigateTo();
    expect(page.getProgressThirdText()).toEqual("Payment");
  });

  it("should get fourth progress bar title", () => {
    page.navigateTo();
    expect(page.getProgressFourthText()).toEqual("Overview");
  });

  it("should get fifth progress bar title", () => {
    page.navigateTo();
    expect(page.getProgressFifthText()).toEqual("Success");
  });

  it("should get the first coloumn in the table having the text Id", () => {
    page.navigateTo();
    expect(page.getTableFirstHeader()).toEqual("Id");
  });

  it("should get the second coloumn in the table having the text Product Name", () => {
    page.navigateTo();
    expect(page.getTableSecondHeader()).toEqual("Product Name");
  });

  it("should get the third coloumn in the table having the text Price", () => {
    page.navigateTo();
    expect(page.getTableThirdHeader()).toEqual("Price");
  });

  it("should get the fourth coloumn in the table having the text Quantity", () => {
    page.navigateTo();
    expect(page.getTableFourthHeader()).toEqual("Quantity");
  });
});
