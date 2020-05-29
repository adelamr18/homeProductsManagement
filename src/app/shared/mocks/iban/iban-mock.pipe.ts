import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "iban"
})
export class IbanMockPipe implements PipeTransform {
  transform(value: string): string {
    // remove existing spaces
    let lIban: string = value.replace(" ", "");
    // place a space after every 4th character
    lIban = lIban.replace(/(.{4})/g, "$1 ");
    return lIban;
  }
}
