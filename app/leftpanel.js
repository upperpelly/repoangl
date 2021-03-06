"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var models_1 = require("./models");
var dealerService_1 = require("./dealerService");
var router_1 = require("@angular/router");
var leftPanelComponent = (function () {
    function leftPanelComponent(router, _service, shareservice) {
        this.router = router;
        this._service = _service;
        this.shareservice = shareservice;
        this.inventories = [];
        this.inventory = new models_1.inventory();
        this.isOpen = false;
    }
    leftPanelComponent.prototype.ngOnInit = function () {
    };
    leftPanelComponent.prototype.showLeftPanel = function () {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    };
    leftPanelComponent.prototype.nav = function (item) {
        sessionStorage.setItem('subscriptiontype', item);
        this.router.navigate(['/subscribe']);
    };
    return leftPanelComponent;
}());
leftPanelComponent = __decorate([
    core_1.Component({
        selector: 'l-panel',
        templateUrl: 'views/leftpanel.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, dealerService_1.dealerservice, models_1.shareService])
], leftPanelComponent);
exports.leftPanelComponent = leftPanelComponent;
//# sourceMappingURL=leftpanel.js.map