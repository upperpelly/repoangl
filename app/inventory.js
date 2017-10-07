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
var InventoryComponent = (function () {
    function InventoryComponent(router, _service, shareservice) {
        this.router = router;
        this._service = _service;
        this.shareservice = shareservice;
        this.inventories = [];
        this.inventory = new models_1.inventory();
        this.isOpen = false;
    }
    InventoryComponent.prototype.ngOnInit = function () {
        if (models_1.shareService != undefined)
            this.inventories = models_1.shareService.inventories;
    };
    InventoryComponent.prototype.showLeftPanel = function () {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    };
    InventoryComponent.prototype.addinventory = function () {
        this.router.navigate(['/addinventory']);
    };
    InventoryComponent.prototype.updateinventory = function (item) {
        sessionStorage.setItem('inventoryid', item.id);
        this.router.navigate(['/addinventory']);
    };
    InventoryComponent.prototype.deleteresource = function (item) {
        var _this = this;
        try {
            this._service.deleteresource(item.id).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                    _this.inventories = l_response;
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    InventoryComponent.prototype.getresources = function () {
        var _this = this;
        try {
            this._service.getresources(this.dealerId).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                    _this.inventories = l_response;
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    InventoryComponent.prototype.saveinventory = function () {
        var _this = this;
        try {
            this._service.saveinventory(this.dealerId).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                    _this.resources = l_response;
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    InventoryComponent.prototype.getrecentaccounts = function () {
        try {
        }
        catch (_err) {
            console.log(_err);
        }
    };
    return InventoryComponent;
}());
InventoryComponent = __decorate([
    core_1.Component({
        selector: 'inventory',
        templateUrl: 'views/inventory.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, dealerService_1.dealerservice, models_1.shareService])
], InventoryComponent);
exports.InventoryComponent = InventoryComponent;
//# sourceMappingURL=inventory.js.map