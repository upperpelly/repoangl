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
var AddResourceComponent = (function () {
    function AddResourceComponent(route, _service, formBuilder, router, shareservice) {
        this.route = route;
        this._service = _service;
        this.formBuilder = formBuilder;
        this.router = router;
        this.shareservice = shareservice;
        this.states = [];
        this.resources = [];
        this.titleList = [{ name: 'Mr', dName: 'Mr' }, { name: 'Mrs', dName: 'Mrs' }, { name: 'Ms', dName: 'Ms' }];
        this.socialList = ['Facebook', 'Google+', 'LinkedIn'];
        this.resource = new models_1.resource();
        this.quickDateBars = [];
        this.isOpen = false;
    }
    AddResourceComponent.prototype.ngOnInit = function () {
        this.formValidation();
        this.socialName = 'Select';
        this.states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
        this.edit();
        if (this.editresource != undefined || this.editresource != null) {
            if (this.resource.socialMedia == undefined) {
                this.resource.socialMedia = [];
            }
        }
        else {
            this.resource.socialMedia = [];
        }
        //this.getresources();
        //this.getrecentaccounts();
        this.resources = models_1.shareService.resources;
    };
    AddResourceComponent.prototype.showLeftPanel = function () {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    };
    AddResourceComponent.prototype.edit = function () {
        if (models_1.shareService.resources != undefined && models_1.shareService.resources.length) {
            var l_id = sessionStorage.getItem('resourceid');
            if (l_id != undefined) {
                this.editresource = models_1.shareService.resources[(l_id - 1)];
                sessionStorage.removeItem('resourceid');
                this.resourceGroup.setValue({
                    employeeCode: this.editresource.employeeCode,
                    contactDetails: {
                        title: this.editresource.contactDetails.title,
                        contactPerson: this.editresource.contactDetails.contactPerson,
                        lastName: this.editresource.contactDetails.lastName,
                        designation: this.editresource.contactDetails.designation,
                        contactNumber1: this.editresource.contactDetails.contactNumber1,
                        dob: this.editresource.contactDetails.dob,
                        additionalInfo: this.editresource.contactDetails.additionalInfo
                    }
                });
                this.resource.id = this.editresource.id;
                this.resource.socialMedia = this.editresource.socialMedia;
            }
        }
    };
    AddResourceComponent.prototype.formValidation = function () {
        this.resourceGroup = this.formBuilder.group({
            employeeCode: ['', forms_1.Validators.required],
            contactDetails: this.formBuilder.group({
                title: [null, forms_1.Validators.required],
                contactPerson: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                lastName: ['', forms_1.Validators.required],
                designation: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
                contactNumber1: ['', forms_1.Validators.required],
                dob: ['', forms_1.Validators.required],
                additionalInfo: ['']
                //lastName: ['', Validators.required],
            })
        });
        this.socialGroup = this.formBuilder.group({
            name: ['', [forms_1.Validators.required]],
            url: ['', [forms_1.Validators.required, forms_1.Validators.pattern('https?://.+')]]
        });
    };
    AddResourceComponent.prototype.addsociallink = function () {
        if (this.resource.socialMedia != undefined)
            this.resource.socialMedia.push({ name: this.socialGroup._value.name, url: this.socialGroup._value.url });
        this.socialName = '';
        this.socialGroup.reset();
    };
    AddResourceComponent.prototype.resetForm = function () {
        this.isanother = true;
        this.saveresource();
    };
    AddResourceComponent.prototype.updateresource = function (item) {
        sessionStorage.setItem('reourceid', item.id);
    };
    AddResourceComponent.prototype.saveresource = function () {
        var _this = this;
        try {
            this.resource.contactDetails = this.resourceGroup._value.contactDetails;
            this.resource.employeeCode = this.resourceGroup._value.employeeCode;
            if (models_1.shareService.resources == undefined)
                models_1.shareService.resources = [];
            if (this.resource.id == undefined) {
                this.resource.id = (models_1.shareService.resources.length + 1).toString();
                models_1.shareService.resources.push(this.resource);
            }
            else {
                models_1.shareService.resources.splice((this.resource.id - 1), 1, this.resource);
            }
            this.resourceGroup.reset();
            this.socialGroup.reset();
            this.resource = {};
            if (!this.isanother)
                this.router.navigate(['/resources']);
            this.isanother = false;
            return;
            this._service.saveresource(this.dealerId).subscribe(function (data) {
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
    AddResourceComponent.prototype.getresources = function () {
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
    AddResourceComponent.prototype.getrecentaccounts = function () {
        try {
        }
        catch (_err) {
            console.log(_err);
        }
    };
    return AddResourceComponent;
}());
AddResourceComponent = __decorate([
    core_1.Component({
        selector: 'add-resource',
        templateUrl: 'views/addresource.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, dealerService_1.dealerservice, forms_1.FormBuilder, router_1.Router, models_1.shareService])
], AddResourceComponent);
exports.AddResourceComponent = AddResourceComponent;
//# sourceMappingURL=addresource.js.map