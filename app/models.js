"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dealerLeads = (function () {
    function dealerLeads() {
    }
    return dealerLeads;
}());
exports.dealerLeads = dealerLeads;
var offering = (function () {
    function offering() {
    }
    return offering;
}());
exports.offering = offering;
var dealer = (function () {
    function dealer() {
        this.basicInfo = new basicInfo();
        this.contactDetails = new contactDetails();
        this.make = [];
        this.model = [];
        this.areaofOperation = new areaOperation();
    }
    return dealer;
}());
exports.dealer = dealer;
var dealerBasicInfo = (function () {
    function dealerBasicInfo() {
    }
    return dealerBasicInfo;
}());
exports.dealerBasicInfo = dealerBasicInfo;
var basicInfo = (function () {
    function basicInfo() {
        this.make = [];
        this.model = [];
    }
    return basicInfo;
}());
exports.basicInfo = basicInfo;
var Service = (function () {
    function Service() {
    }
    return Service;
}());
exports.Service = Service;
var Transport = (function () {
    function Transport() {
    }
    return Transport;
}());
exports.Transport = Transport;
var Finance = (function () {
    function Finance() {
        this.insVehicles = [];
    }
    return Finance;
}());
exports.Finance = Finance;
var Insurance = (function () {
    function Insurance() {
    }
    return Insurance;
}());
exports.Insurance = Insurance;
var contactDetails = (function () {
    function contactDetails() {
    }
    return contactDetails;
}());
exports.contactDetails = contactDetails;
var areaOperation = (function () {
    function areaOperation() {
        this.postCode = [];
        this.state = [];
        this.area = [];
    }
    return areaOperation;
}());
exports.areaOperation = areaOperation;
var resource = (function () {
    function resource() {
        this.contactDetails = new contactDetails();
        this.socialMedia = [];
    }
    return resource;
}());
exports.resource = resource;
var socialMedia = (function () {
    function socialMedia() {
    }
    return socialMedia;
}());
exports.socialMedia = socialMedia;
var inventory = (function () {
    function inventory() {
        this.features = [];
        this.banners = [];
        this.photos = [];
    }
    return inventory;
}());
exports.inventory = inventory;
var SellVehicle = (function () {
    function SellVehicle() {
        this.features = [];
        this.extras = [];
        this.photos = [];
    }
    return SellVehicle;
}());
exports.SellVehicle = SellVehicle;
var feature = (function () {
    function feature() {
    }
    return feature;
}());
exports.feature = feature;
var subscription = (function () {
    function subscription() {
        this.isNew = false;
        this.isPreOwned = false;
        this.isLease = false;
        this.isFinance = false;
        this.isInsurance = false;
        this.isSM = false;
        this.isTranssport = false;
        this.isSpares = false;
        this.isParking = false;
        this.isFuel = false;
        this.isOthers = false;
    }
    return subscription;
}());
exports.subscription = subscription;
var LeadDetails = (function () {
    function LeadDetails() {
        //public isNewCar: boolean;
        //public isUsedCar: boolean;
        this.makemodel = new MakeModel();
        this.userinfocheck = new UserInfoCheck();
        this.usercontext = new userContext();
        this.quotes = [];
    }
    return LeadDetails;
}());
exports.LeadDetails = LeadDetails;
var Quote = (function () {
    function Quote() {
        this.additions = [];
        this.documents = [];
        this.termsConditions = [];
        this.appointments = [];
    }
    return Quote;
}());
exports.Quote = Quote;
var dealerInfo = (function () {
    function dealerInfo() {
    }
    return dealerInfo;
}());
exports.dealerInfo = dealerInfo;
var UserInfoCheck = (function () {
    function UserInfoCheck() {
    }
    return UserInfoCheck;
}());
exports.UserInfoCheck = UserInfoCheck;
var MakeModel = (function () {
    function MakeModel() {
    }
    return MakeModel;
}());
exports.MakeModel = MakeModel;
var userContext = (function () {
    function userContext() {
    }
    return userContext;
}());
exports.userContext = userContext;
var shareService = (function () {
    function shareService() {
        this.isOpen = false;
        this.defaultSubs = new subscription();
        this.states = [
            "ACT",
            "NSW",
            "NT",
            "QLD",
            "SA",
            "TAS",
            "VIC",
            "WA"
        ];
    }
    shareService.prototype.nav = function () {
    };
    return shareService;
}());
shareService.resources = [];
shareService.subscriptions = [];
shareService.inventories = [];
shareService.makes = [
    "Abarth", "Audi",
    "BMW",
    "Ford",
    "Holden",
    "Holden SPV",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "LDV",
    "Lexus",
    "Maserati",
    "Mazda",
    "Mercedes-Benz",
    "MINI",
    "Mitsubishi",
    "Nissan",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo"
];
shareService.models = [
    "A1",
    "A3",
    "A4",
    "A6",
    "A7",
    "A8",
    "Q2",
    "Q3",
    "Q7",
    "R8",
    "RS",
    "RS6",
    "RS7",
    "S1",
    "S3",
    "S4",
    "S6",
    "S7",
    "S8",
    "SQ7",
    "TT"
];
shareService.regions = [
    "CANBERRA",
    "SOUTH CANBERRA",
    "NORTH CANBERRA",
    "WODEN VALLEY",
    "WESTON CREEK",
    "COREE",
    "BELCONNEN",
    "TUGGERANONG",
    "GUNGAHLIN"
];
shareService.postcodes = [
    221,
    2600,
    2603,
    2604,
    2609
];
exports.shareService = shareService;
//# sourceMappingURL=models.js.map