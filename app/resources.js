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
var ResourceComponent = (function () {
    function ResourceComponent(route, _service, router, shareservice) {
        this.route = route;
        this._service = _service;
        this.router = router;
        this.shareservice = shareservice;
        this.resources = [];
        this.isOpen = false;
    }
    ResourceComponent.prototype.showLeftPanel = function () {
        this.isOpen = (this.isOpen) ? false : true;
    };
    ResourceComponent.prototype.ngOnInit = function () {
        if (models_1.shareService != undefined)
            this.resources = models_1.shareService.resources;
        //this.getresources();
        //this.getrecentaccounts();
    };
    ResourceComponent.prototype.updateresource = function (item) {
        sessionStorage.setItem('resourceid', item.id);
        this.router.navigate(['/addresource']);
    };
    ResourceComponent.prototype.deleteresource = function (index) {
        var _this = this;
        this.resources.splice(index, 1);
        //shareService.resources.splice(index, 1);
        return;
        try {
            this._service.deleteresource(item.id).subscribe(function (data) {
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
    ResourceComponent.prototype.getresources = function () {
        var _this = this;
        try {
            this._service.getresources(this.dealerId).subscribe(function (data) {
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
    ResourceComponent.prototype.getrecentaccounts = function () {
        try {
        }
        catch (_err) {
            console.log(_err);
        }
    };
    return ResourceComponent;
}());
ResourceComponent = __decorate([
    core_1.Component({
        selector: 'resource',
        templateUrl: 'views/resource.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, dealerService_1.dealerservice, router_1.Router, models_1.shareService])
], ResourceComponent);
exports.ResourceComponent = ResourceComponent;
//# sourceMappingURL=resources.js.map