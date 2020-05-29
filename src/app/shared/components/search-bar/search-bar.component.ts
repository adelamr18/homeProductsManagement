import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { placeholders } from "../../constants/defines";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  @Output() onSearchChange = new EventEmitter();
  searchPlaceholder: string = "";
  constructor() {}

  ngOnInit(): void {
    this.configureSearchbar();
  }
  configureSearchbar = (): void => {
    this.searchPlaceholder = placeholders.search;
  };

  onSearch = (event: any): void => {
    this.onSearchChange.emit(event);
  };
}
