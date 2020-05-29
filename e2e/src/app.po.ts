import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getHeaderText(): Promise<string> {
    return element(by.css("nav .header-title span ")).getText() as Promise<
      string
    >;
  }

  getProgressFirstText(): Promise<string> {
    return element(by.css("app-progress-bar ul li ")).getText() as Promise<
      string
    >;
  }

  getProgressSecondText(): Promise<string> {
    return element(
      by.css("app-progress-bar ul li:nth-of-type(2) ")
    ).getText() as Promise<string>;
  }

  getProgressThirdText(): Promise<string> {
    return element(
      by.css("app-progress-bar ul li:nth-of-type(3) ")
    ).getText() as Promise<string>;
  }

  getProgressFourthText(): Promise<string> {
    return element(
      by.css("app-progress-bar ul li:nth-of-type(4) ")
    ).getText() as Promise<string>;
  }

  getProgressFifthText(): Promise<string> {
    return element(
      by.css("app-progress-bar ul li:nth-of-type(5) ")
    ).getText() as Promise<string>;
  }

  getTableFirstHeader(): Promise<string> {
    return element(by.css(".table thead th")).getText() as Promise<string>;
  }

  getTableSecondHeader(): Promise<string> {
    return element(
      by.css(".table thead th:nth-of-type(2)")
    ).getText() as Promise<string>;
  }

  getTableThirdHeader(): Promise<string> {
    return element(
      by.css(".table thead th:nth-of-type(3)")
    ).getText() as Promise<string>;
  }

  getTableFourthHeader(): Promise<string> {
    return element(
      by.css(".table thead th:nth-of-type(4)")
    ).getText() as Promise<string>;
  }
}
