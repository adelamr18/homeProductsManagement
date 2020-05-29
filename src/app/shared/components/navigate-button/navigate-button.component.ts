import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "navigate-button",
  templateUrl: "./navigate-button.component.html",
  styleUrls: ["./navigate-button.component.css"]
})
export class NavigateButtonComponent implements OnInit {
  @Input() buttonText: string = "";
  @Output() onRouteChange = new EventEmitter();
  @Input() enableFullWidth: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  navigateToRoute = (): void => {
    this.onRouteChange.emit(true);
  };
}
