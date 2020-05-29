# ManageUserProducts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## To run the application please follow these steps:

1-Open the terminal then type: Cd server to navigate to server folder <br>
2-Type npm install to install server dependencies <br>
3-Type Node server.js to activate the server for fetching data <br>
4-Navigate back by typing cd .. then type npm install to install client dependencies <br>
5-Run the application by typing ng serve <br>

## To test the application flow please follow these steps:

1-When running the application you wil be redirected to the main route which is : /products <br>
2-Type in a product quantity inside the textbox that you will see on the table then click outside the textbox <br>
3-You must click outside the textbox in order for the application flow to be correct <br>
4-Then add your product by clicking on the plus sign then you will see that the number of products on top of the shopping cart logo increases <br>
5-Please note you can also add a product once or else you will get an error that you cant add a product more then once because you can adjust the quantity of this specific order but when you complete all the steps you can add a product having the same product name again because i assumed that the user can regard this as a new product (Better user experience)
6-When clicking on the price coloumn inside the table you can sort the table and you can also search for a product name also when using the search bar <br>
7-When the products price increase you can click on the shopping cart logo to open the modal in which you will find an order button to order your product <br>
8-You can also delete products from the table or from the modal<br>
9-Click on order button then fill in your details (Mobile must be a valid German number)<br>
10-Click on continue then fill in your payment details (Iban example: DE89370400440532013000)<br>
11-You can also delete products when you are on overview page and you can go back to previous steps by clicking on the circles that indicate your covered steps <br>
12-Click on submit then click on confirm to confirm your order <br>
13-Then you will have confirmed your order and you can continue shopping by clicking on the continue shopping button where your steps will be reset<br>
14-You will then be redirected again to the homepage but your previous orders will be saved so if you refresh the page you will find your previous orders preserved by opening the shopping cart modal<br>
15-Please note that your order will be saved only when you fully complete all the steps and click on submit button to confirm your order<br>

## Additional remarks:

1-Please note i have added a full documentation of the application by using a library called compodocs which you will find ina folder called documentation and you can see the whole application documentation by clicking on the index.html file which is inside the documentation folder and opening it with Google Chrome or Safari<br>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
