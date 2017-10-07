"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
require("rxjs/add/operator/debounceTime");
var app_1 = require("./app");
var models_1 = require("./models");
var navigation_1 = require("./navigation");
var subscribecomponent_1 = require("./subscribecomponent");
var router_1 = require("@angular/router");
var homecomponent_1 = require("./homecomponent");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var dealerService_1 = require("./dealerService");
var resources_1 = require("./resources");
var addresource_1 = require("./addresource");
var addinventory_1 = require("./addinventory");
var inventory_1 = require("./inventory");
var leftpanel_1 = require("./leftpanel");
var sellvehicle_1 = require("./sellvehicle");
var leadview_1 = require("./leadview");
var leaddetails_1 = require("./leaddetails");
var leadinfo_1 = require("./leadinfo");
var appRoutes = [
    //{path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home.html', component: homecomponent_1.HomeComponent },
    { path: 'home', component: homecomponent_1.HomeComponent },
    { path: 'subscribe', component: subscribecomponent_1.SubscribeComponent },
    { path: 'resources', component: resources_1.ResourceComponent },
    { path: 'addresource', component: addresource_1.AddResourceComponent },
    { path: 'addinventory', component: sellvehicle_1.SellVehicleComponent },
    { path: 'inventory', component: inventory_1.InventoryComponent },
    { path: 'lead-view', component: leadview_1.LeadView },
    { path: 'leads', component: leadinfo_1.Leads },
    { path: 'lead-info', component: leaddetails_1.LeadInformation },
    { path: '**', component: homecomponent_1.HomeComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes), ng_bootstrap_1.NgbModule.forRoot(), forms_1.ReactiveFormsModule],
        declarations: [app_1.AppComponent, navigation_1.navComponent, subscribecomponent_1.SubscribeComponent, homecomponent_1.HomeComponent, resources_1.ResourceComponent, addresource_1.AddResourceComponent, addinventory_1.AddInventoryComponent, inventory_1.InventoryComponent, leftpanel_1.leftPanelComponent,
            sellvehicle_1.SellVehicleComponent, leadview_1.LeadView, leaddetails_1.LeadInformation, leadinfo_1.Leads
        ],
        providers: [models_1.dealerLeads, dealerService_1.dealerservice, models_1.feature, models_1.shareService],
        bootstrap: [app_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=appmodule.js.map