import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "selenium-webdriver/http";
import { HttpClientModule } from "@angular/common/http";

describe("ProductsService", () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClient, HttpClientModule]
    });
  });
});
