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
var Leads = (function () {
    function Leads(route, _service, formBuilder, router, shareservice) {
        //private userinfocheck: UserInfoCheck, private usercontext: userContext, private makemodel: MakeModel, private leaddetails:
        this.route = route;
        this._service = _service;
        this.formBuilder = formBuilder;
        this.router = router;
        this.shareservice = shareservice;
        this.leads = [];
        this.userinfocheck = new models_1.UserInfoCheck();
        this.leaddetails = new models_1.LeadDetails();
    }
    Leads.prototype.ngOnInit = function () {
        this.getleadinfo();
        this.gettempData();
    };
    Leads.prototype.getleadinfo = function () {
        try {
            return;
            this._service.getresources('dealerId').subscribe(function (data) {
                if (data != undefined) {
                    var l_response = JSON.parse(data['_body']);
                    //this.resources = l_response;
                }
            }, function (err) {
                console.log(err);
            });
        }
        catch (_err) {
            console.log(_err);
        }
    };
    Leads.prototype.gettempData = function () {
        this.leaddetails.leadId = 'LD1000001';
        this.leaddetails.generatedDate = '09/18/2017';
        this.leaddetails.newused = 'New';
        this.leaddetails.makemodel.year = 2017;
        this.leaddetails.makemodel.make = 'Honda';
        this.leaddetails.makemodel.model = 'City';
        this.leaddetails.makemodel.autoscoopTrim = 'City | VTi | GM Series  | 1497 Eng | 4 Cyl | 1 Gr | Petro ULP | 2WD | 5 Seats | 4 Drs  | Sedan | Auto CVT | 2017';
        this.leaddetails.mainColour = 'White';
        this.leaddetails.mainColour = 'Grey';
        this.leaddetails.additionalDetails = 'Additional text goes here';
        this.leaddetails.estimatedDate = '12/10/2017';
        this.leaddetails.userinfocheck.creditcardCheck = 'No';
        this.leaddetails.userinfocheck.idCheck = 'Yes';
        this.leaddetails.userinfocheck.mobileCheck = 'Yes';
        this.leaddetails.userinfocheck.finance = 'Yes';
        this.leaddetails.userinfocheck.vehicleSellSwap = 'No';
        var quote = new models_1.Quote();
        quote.quoteId = 'ASC000000007';
        this.leaddetails.quotes.push(quote);
        this.leads.push(this.leaddetails);
        quote = new models_1.Quote();
        quote.quoteId = 'ASC000000008';
        this.leaddetails.leadId = 'LD1000002';
        this.leaddetails.quotes.push(quote);
        this.leads.push(this.leaddetails);
        quote = new models_1.Quote();
        quote.quoteId = 'ASC000000009';
        this.leaddetails.quotes.push(quote);
        this.leaddetails.leadId = 'LD1000003';
        this.leads.push(this.leaddetails);
    };
    return Leads;
}());
Leads = __decorate([
    core_1.Component({
        selector: 'lead-s',
        templateUrl: 'views/lead.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, dealerService_1.dealerservice, forms_1.FormBuilder, router_1.Router, models_1.shareService])
], Leads);
exports.Leads = Leads;
//# sourceMappingURL=leadinfo.js.map