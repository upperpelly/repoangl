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
var forms_1 = require("@angular/forms");
var AddInventoryComponent = (function () {
    function AddInventoryComponent(route, _service, formBuilder, router, shareservice) {
        this.route = route;
        this._service = _service;
        this.formBuilder = formBuilder;
        this.router = router;
        this.shareservice = shareservice;
        this.inventories = [];
        this.inventory = new models_1.inventory();
        this.bannerList = [];
        this.selectedBanners = [];
        this.featureList = [];
        this.isDriveAway = undefined;
        this.isPrice = undefined;
        this.isOpen = false;
        this.images = [];
    }
    AddInventoryComponent.prototype.ngOnInit = function () {
        this.states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
        this.formValidation();
        this.getBanners();
        this.edit();
        this.inventories = models_1.shareService.inventories;
    };
    AddInventoryComponent.prototype.tes = function () {
        //'email': ['', Validators.compose([Validators.required, Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)])],
        //    'phn': ['', Validators.compose([Validators.required, Validators.pattern(/^610[0-8]\d{8}$/g)])]
        //'txt': ['', Validators.compose([Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)])],
    };
    AddInventoryComponent.prototype.formValidation = function () {
        this.inventoryGroup = this.formBuilder.group({
            headerText: ['', forms_1.Validators.required],
            vinNumber: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            dealerStockNumber: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            inStock: [''],
            Price: [{ value: '' }],
            minPrice: [{ value: '' }],
            maxPrice: [{ value: '' }],
            extColour: [null],
            intColour: [null],
            isRoadWorthIncluded: [''],
            isRegistrationIncluded: [''],
            isVehicleUsed: [''],
            //registrationGroup: this.formBuilder.group({
            regNumber: [''],
            state: [null],
            regEndDate: [''],
            isNewCar: [],
            isUsedCar: []
        }, { validator: this.validateNewUsed }); //, { validator: this.validatePriceRange }   Validators.compose([Validators.required, this.checkIfA])
    };
    AddInventoryComponent.prototype.validateNewUsed = function (formgroup) {
        return (formgroup.controls["isNewCar"]['_value'] == undefined || formgroup.controls["isUsedCar"]['_value'] == undefined)
            ? { 'required': true } : null;
    };
    AddInventoryComponent.prototype.validatePriceRange = function (formgroup) {
        return ((formgroup.controls["minPrice"]['_value'] != undefined && formgroup.controls["maxPrice"]['_value'] == undefined) || (formgroup.controls["minPrice"]['_value'] == undefined && formgroup.controls["maxPrice"]['_value'] != undefined))
            ? { 'required': true } : null;
    };
    AddInventoryComponent.prototype.edit = function () {
        if (models_1.shareService.inventories != undefined && models_1.shareService.inventories.length) {
            var l_id = sessionStorage.getItem('inventoryid');
            if (l_id != undefined) {
                this.inventory.id = +l_id;
                this.id = +l_id;
                this.inventory = models_1.shareService.inventories[(l_id - 1)];
                sessionStorage.removeItem('inventoryid');
                this.inventoryGroup.setValue({
                    headerText: this.inventory.headerText,
                    vinNumber: this.inventory.vinNumber,
                    dealerStockNumber: this.inventory.dealerStockNumber,
                    isNewCar: this.inventory.condition,
                    isUsedCar: this.inventory.condition,
                    inStock: this.inventory.inStock,
                    Price: this.inventory.Price,
                    minPrice: this.inventory.minPrice,
                    maxPrice: this.inventory.maxPrice,
                    extColour: this.inventory.extColour,
                    intColour: this.inventory.intColour,
                    isRoadWorthIncluded: this.inventory.isRoadWorthIncluded,
                    isRegistrationIncluded: this.inventory.isRegistrationIncluded,
                    isVehicleUsed: this.inventory.isVehicleUsed,
                    regNumber: this.inventory.regNumber,
                    state: this.inventory.state,
                    regEndDate: this.inventory.regEndDate,
                });
                if (this.inventory.regNumber != undefined && this.inventory.regNumber != '')
                    this.isRego = true;
                for (var i = 0; i < this.bannerList.length; i++) {
                    if (this.inventory.banners.indexOf(this.bannerList[i].name) != -1) {
                        this.bannerList[i].isChecked = true;
                    }
                }
            }
        }
    };
    AddInventoryComponent.prototype.carNewChanged = function ($event) {
        this.inventoryGroup.controls['isUsedCar'].setValue(!$event);
    };
    AddInventoryComponent.prototype.carOldChanged = function ($event) {
        this.inventoryGroup.controls['isNewCar'].setValue(!$event);
    };
    AddInventoryComponent.prototype.regoChangeYes = function ($event) {
        this.isRego = $event;
    };
    AddInventoryComponent.prototype.pricingCheck = function (type) {
        if (type == 'drive' && (this.inventoryGroup.controls['Price']['_value'] != '' && this.inventoryGroup.controls['Price']['_value'] != null)) {
            this.inventoryGroup.controls["minPrice"].disable();
            this.inventoryGroup.controls["maxPrice"].disable();
            this.inventoryGroup.controls['Price'].enable();
        }
        else if (type == 'range' && (this.inventoryGroup.controls['minPrice']['_value'] != '' && this.inventoryGroup.controls['minPrice']['_value'] != null)) {
            this.inventoryGroup.controls['Price'].disable();
            this.inventoryGroup.controls["minPrice"].enable();
            this.inventoryGroup.controls["maxPrice"].enable();
        }
        else if (type == 'range' && (this.inventoryGroup.controls['maxPrice']['_value'] != '' && this.inventoryGroup.controls['maxPrice']['_value'] != null)) {
            this.inventoryGroup.controls['Price'].disable();
            this.inventoryGroup.controls["minPrice"].enable();
            this.inventoryGroup.controls["maxPrice"].enable();
        }
        else {
            this.inventoryGroup.controls['Price'].enable();
            this.inventoryGroup.controls["minPrice"].enable();
            this.inventoryGroup.controls["maxPrice"].enable();
        }
    };
    AddInventoryComponent.prototype.getImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.images.push({ name: '', url: event.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AddInventoryComponent.prototype.showLeftPanel = function () {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    };
    AddInventoryComponent.prototype.regoChange = function ($event) {
        var l_isRego = $event.target;
        if (l_isRego != undefined) {
            this.isRego = l_isRego.checked;
        }
        //throw new Error(`Expected validator to return Promise or Observable.`);
    };
    AddInventoryComponent.prototype.getBanners = function () {
        this.bannerList = [{ name: 'EOFYS', isChecked: false }, { name: 'Urgent', isChecked: false }, { name: 'Value for Money', isChecked: false },
            { name: 'New', isChecked: false }, { name: 'For Sale', isChecked: false },
            { name: 'Deal of the Year', isChecked: false }, { name: 'Final Call', isChecked: false }];
        this.featureList = [{ name: 'Auto Quote', isChecked: false }, { name: 'Classified', isChecked: false },
            { name: 'Best Deal In Australia', isChecked: false }];
    };
    AddInventoryComponent.prototype.onbannerselect = function (banner) {
        var indx = this.selectedBanners.findIndex(function (p) { return p === banner.name; });
        if (indx != -1) {
            this.selectedBanners.splice(indx, 1);
        }
        else
            this.selectedBanners.push(banner.name);
    };
    AddInventoryComponent.prototype.updateinventory = function (item) {
        sessionStorage.setItem('reourceid', item.id);
    };
    AddInventoryComponent.prototype.deleteinventory = function (item) {
        try {
            this._service.deleteresource(item.id).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    AddInventoryComponent.prototype.getinventory = function () {
        try {
            this._service.getresources(this.dealerId).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    AddInventoryComponent.prototype.setinventory = function () {
        this.inventory = this.inventoryGroup['_value'];
        this.inventory.condition = this.inventoryGroup.controls['isNewCar']['_value'] == false ? 'Used' : 'New';
        this.inventory.banners = this.selectedBanners;
    };
    AddInventoryComponent.prototype.saveinventory = function () {
        try {
            this.setinventory();
            if (this.id == undefined) {
                this.inventory.id = (models_1.shareService.inventories.length + 1).toString();
                models_1.shareService.inventories.push(this.inventory);
            }
            else {
                this.inventory.id = this.id;
                models_1.shareService.inventories.splice((this.inventory.id - 1), 1, this.inventory);
            }
            this.router.navigate(['/inventory']);
            return;
            this._service.saveinventory(this.dealerId).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data._body);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    AddInventoryComponent.prototype.getrecentaccounts = function () {
        try {
        }
        catch (_err) {
            console.log(_err);
        }
    };
    return AddInventoryComponent;
}());
AddInventoryComponent = __decorate([
    core_1.Component({
        selector: 'add-inventory',
        templateUrl: 'views/addinventory.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, dealerService_1.dealerservice, forms_1.FormBuilder, router_1.Router, models_1.shareService])
], AddInventoryComponent);
exports.AddInventoryComponent = AddInventoryComponent;
//# sourceMappingURL=addinventory.js.map