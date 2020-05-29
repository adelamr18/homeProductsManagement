'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">manage-user-products documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' : 'data-target="#xs-components-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' :
                                            'id="xs-components-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckoutOverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckoutOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigateButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigateButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderSuccessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderSuccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductsTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProgressBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProgressBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShippingDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShippingDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShoppingModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' : 'data-target="#xs-injectables-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' :
                                        'id="xs-injectables-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' : 'data-target="#xs-pipes-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' :
                                            'id="xs-pipes-links-module-AppModule-86db12b856dcd462e1ca562130e22690"' }>
                                            <li class="link">
                                                <a href="pipes/IbanMockPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IbanMockPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddProductAction.html" data-type="entity-link">AddProductAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductAction.html" data-type="entity-link">DeleteProductAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProductsAction.html" data-type="entity-link">LoadProductsAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProductsFailureAction.html" data-type="entity-link">LoadProductsFailureAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProductsSuccessAction.html" data-type="entity-link">LoadProductsSuccessAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreserveAddedProducts.html" data-type="entity-link">PreserveAddedProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShipmentInfo.html" data-type="entity-link">ShipmentInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAddedProducts.html" data-type="entity-link">UpdateAddedProducts</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/InteractionMockService.html" data-type="entity-link">InteractionMockService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InteractionService.html" data-type="entity-link">InteractionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationMockService.html" data-type="entity-link">NavigationMockService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link">NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsEffects.html" data-type="entity-link">ProductsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsMockService.html" data-type="entity-link">ProductsMockService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PaymentDetails.html" data-type="entity-link">PaymentDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductsState.html" data-type="entity-link">ProductsState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/IbanPipe.html" data-type="entity-link">IbanPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});