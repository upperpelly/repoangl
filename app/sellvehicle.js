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
var SellVehicleComponent = (function () {
    function SellVehicleComponent(route, _service, formBuilder, router, shareservice) {
        this.route = route;
        this._service = _service;
        this.formBuilder = formBuilder;
        this.router = router;
        this.shareservice = shareservice;
        this.inventories = [];
        this.inventory = new models_1.SellVehicle();
        this.carExtraList = [];
        this.selectedBanners = [];
        this.featureList = [];
        this.isDriveAway = undefined;
        this.isPrice = undefined;
        this.pricingTypes = [];
        this.isFixed = true;
        this.isOpen = false;
        this.images = [];
    }
    SellVehicleComponent.prototype.ngOnInit = function () {
        this.states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
        this.formValidation();
        this.getVehicleExtras();
        this.edit();
        this.inventories = models_1.shareService.inventories;
        this.pricingTypes = [{ name: 'Fixed', displayName: 'Fixed' }, { name: 'Negotiable', displayName: 'Negotiable' }, { name: 'Range', displayName: 'Price Range' }];
    };
    SellVehicleComponent.prototype.tes = function () {
        //'email': ['', Validators.compose([Validators.required, Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)])],
        //    'phn': ['', Validators.compose([Validators.required, Validators.pattern(/^610[0-8]\d{8}$/g)])]
        //'txt': ['', Validators.compose([Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)])],
    };
    SellVehicleComponent.prototype.formValidation = function () {
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
            isVehicleUsed: [''],
            regNumber: [''],
            state: [null],
            regEndDate: [''],
            isNewCar: [],
            isUsedCar: [],
            isDemo: [],
            details: [],
            negotiablePercent: []
        }, { validator: this.validateNewUsed }); //, { validator: this.validatePriceRange }   Validators.compose([Validators.required, this.checkIfA])
    };
    SellVehicleComponent.prototype.validateNewUsed = function (formgroup) {
        return (formgroup.controls["isNewCar"]['_value'] == undefined || formgroup.controls["isUsedCar"]['_value'] == undefined)
            ? { 'required': true } : null;
    };
    SellVehicleComponent.prototype.validatePriceRange = function (formgroup) {
        return ((formgroup.controls["minPrice"]['_value'] != undefined && formgroup.controls["maxPrice"]['_value'] == undefined) || (formgroup.controls["minPrice"]['_value'] == undefined && formgroup.controls["maxPrice"]['_value'] != undefined))
            ? { 'required': true } : null;
    };
    SellVehicleComponent.prototype.edit = function () {
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
                    isVehicleUsed: this.inventory.isVehicleUsed,
                    regNumber: this.inventory.regNumber,
                    state: this.inventory.state,
                    regEndDate: this.inventory.regEndDate,
                    details: this.inventory.details,
                    isDemo: this.inventory.isDemo,
                    negotiablePercent: this.inventory.negotiablePercent
                    //registrationGroup: this.formBuilder.group({
                    //    regNumber: this.inventory.regNumber,
                    //    state: this.inventory.state,
                    //    regEndDate: this.inventory.regEndDate
                    //})
                });
                if (this.inventory.regNumber != undefined && this.inventory.regNumber != '')
                    this.isRego = true;
                for (var i = 0; i < this.carExtraList.length; i++) {
                    if (this.inventory.extras.indexOf(this.carExtraList[i].name) != -1) {
                        this.carExtraList[i].isChecked = true;
                    }
                }
            }
        }
    };
    SellVehicleComponent.prototype.carNewChanged = function ($event) {
        this.inventoryGroup.controls['isUsedCar'].setValue(!$event);
    };
    SellVehicleComponent.prototype.carOldChanged = function ($event) {
        this.inventoryGroup.controls['isNewCar'].setValue(!$event);
    };
    SellVehicleComponent.prototype.regoChangeYes = function ($event) {
        this.isRego = $event;
    };
    SellVehicleComponent.prototype.pricingCheck = function (name) {
        // clone the object for immutability
        //this.selectedPrice = Object.assign({}, this.selectedPrice, type);
        if (name == 'Fixed') {
            this.isNegotiable = false;
            this.isRange = false;
            this.isFixed = true;
        }
        else if (name == 'Negotiable') {
            this.isFixed = true;
            this.isNegotiable = true;
            this.isRange = false;
        }
        else if (name == 'Range') {
            this.isRange = true;
            this.isFixed = false;
            this.isNegotiable = false;
        }
    };
    SellVehicleComponent.prototype.getImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.images.push({ name: '', url: event.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    SellVehicleComponent.prototype.showLeftPanel = function () {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    };
    SellVehicleComponent.prototype.regoChange = function ($event) {
        var l_isRego = $event.target;
        if (l_isRego != undefined) {
            this.isRego = l_isRego.checked;
        }
        //throw new Error(`Expected validator to return Promise or Observable.`);
    };
    SellVehicleComponent.prototype.getVehicleExtras = function () {
        this.carExtraList = [{ name: 'Bull Bar', isChecked: false }, { name: 'Nudge Bar', isChecked: false }, { name: 'Side Step', isChecked: false },
            { name: 'Snorkel', isChecked: false }, { name: 'Tow Bar', isChecked: false },
            { name: 'Floor Mats', isChecked: false }, { name: 'Tinted Glass', isChecked: false },
            { name: 'Luggage & Cargo Accessories', isChecked: false }, { name: 'Applicable Roof Racks', isChecked: false },
            { name: 'Tow Accessories', isChecked: false }, { name: 'Seat Cover', isChecked: false },
            { name: 'Bonnet Protection', isChecked: false }, { name: 'Head Lamp Protection', isChecked: false },
            { name: 'Weather Shield', isChecked: false }, { name: 'Medical / first-aid Kit', isChecked: false }, { name: 'Safety Kit', isChecked: false }];
    };
    SellVehicleComponent.prototype.onbannerselect = function (banner) {
        var indx = this.selectedBanners.findIndex(function (p) { return p === banner.name; });
        if (indx != -1) {
            this.selectedBanners.splice(indx, 1);
        }
        else
            this.selectedBanners.push(banner.name);
    };
    SellVehicleComponent.prototype.updateinventory = function (item) {
        sessionStorage.setItem('reourceid', item.id);
    };
    SellVehicleComponent.prototype.deleteinventory = function (item) {
        try {
            this._service.deleteresource(item.id).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data['_body']);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    SellVehicleComponent.prototype.getinventory = function () {
        try {
            this._service.getresources(this.dealerId).subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data['_body']);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    SellVehicleComponent.prototype.setinventory = function () {
        this.inventory = this.inventoryGroup['_value'];
        this.inventory.condition = this.inventoryGroup.controls['isNewCar']['_value'] == false ? 'Used' : 'New';
        this.inventory.extras = this.selectedBanners;
    };
    SellVehicleComponent.prototype.saveinventory = function () {
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
                    var l_response = JSON.parse(data['_body']);
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    SellVehicleComponent.prototype.getrecentaccounts = function () {
        try {
        }
        catch (_err) {
            console.log(_err);
        }
    };
    return SellVehicleComponent;
}());
SellVehicleComponent = __decorate([
    core_1.Component({
        selector: 'add-inventory',
        templateUrl: 'views/sellinventory.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, dealerService_1.dealerservice, forms_1.FormBuilder, router_1.Router, models_1.shareService])
], SellVehicleComponent);
exports.SellVehicleComponent = SellVehicleComponent;
//# sourceMappingURL=sellvehicle.js.map