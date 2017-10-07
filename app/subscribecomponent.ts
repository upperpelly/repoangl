import { Component, OnInit } from '@angular/core'
import { HttpModule } from '@angular/http';
import { dealerLeads, dealerBasicInfo, shareService, dealer } from './models';
import {
    Dealer, VehicleDealerAreaOfOperPostCode, VehicleDealerAreaOfOperRegion, VehicleDealerAreaOfOperState, VehicleDealerDetails
    , VehicleDealerFinanceDetails, VehicleDealerInsuranceDetails, VehicleDealerMakeList, VehicleDealerServMaintDetails
} from './servermodels';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
    selector: 'subscribe',
    templateUrl: 'views/subscribe.html'
})


export class SubscribeComponent {

    private subscriptionType: string;
    private isMakeModeltab: boolean = false;
    private isBasicInfo: boolean = true;
    private isAreaOperation: boolean = false;
    private isRoutes: boolean = false;
    private isSubscription: boolean = false;
    private isPayment: boolean = false;
    private vehicleTypes: any = [];
    private selectedVehicleTypes: any = [];
    private states: any = [];
    private selectedState: string;
    private selectedstates: any = [];
    private aostates: any = [];
    private makes: any = [];
    private selectedmakes: any = [];
    private selectedmodels: any = [];
    private models: any = [];
    private regions: any = [];
    private fromRegions: any = [];
    private toRegions: any = [];
    private selectedregions: any = [];
    private postcodes: any = [];
    private fromPostcodes: any = [];
    private toPostcodes: any = [];
    private selectedpostcodes: any = [];
    private dealerBasicInfo: Dealer = new Dealer();
    private isOpen: boolean = false;
    basicGroup: FormGroup;
    transportGroup: FormGroup;
    private isVehicle: boolean;
    //private isSellVehicle: boolean;
    //private isLeaseVehicle: boolean;
    private isInsurance: boolean;
    private isFinance: boolean;
    private isSM: boolean;
    private isFuel: boolean;
    private isSpares: boolean;
    private isTransport: boolean;
    private isOthers: boolean;
    private insVehicleList: any = [];
    private headNo: string;


    constructor(private route: ActivatedRoute, private _service: dealerservice, private formBuilder: FormBuilder, private router: Router, private shareservice: shareService) {
        //this.route
        //    .queryParams
        //    .subscribe(params => {
        //        this.subscriptionType = params['name'];
        //    });

    }

    ngOnInit() {
        this.insVehicleList = [{ name: 'Cars', selected: false }, { name: 'Boats', selected: false }, { name: 'Bikes', selected: false }, { name: 'Caravan', selected: false }, { name: 'Commercial', selected: false }, { name: 'Agri', selected: false }];
        this.vehicleTypes = [{ name: 'Cars', selected: false }, { name: 'Bikes', selected: false }, { name: 'Boats', selected: false }, { name: 'Caravans', selected: false }, { name: 'Commercial Vehicle', selected: false }, { name: 'Sports Vehicle', selected: false }, { name: 'Agricultural Vehicle', selected: false }];
        this.basicInfoValidate();
        let type = sessionStorage.getItem('subscriptiontype');
        if (type != undefined && type != null) {
            this.subscriptionType = type;
            this.setType(true);
            sessionStorage.removeItem('subscriptiontype');
        }
        if (shareService.subscriptions.length) {
            let l_subs = shareService.subscriptions.filter(p => p.subscriptionType == this.subscriptionType);
            if (l_subs != undefined && l_subs.length > 0) {
                this.setGroup(l_subs[0]);
            }
        }
        this.states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

        this.getStates();
        this.getmakes();
        this.getmodels();
        this.getRegion();
        this.getPostCodes();
    }

    showLeftPanel() {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    }

    basicInfoValidate() {
        this.transportGroup = this.formBuilder.group({
            transport: this.formBuilder.group({
                fromState: [null],
                toState: [null],
                fromRegion: [null],
                toRegion: [null],
                fromPost: [null],
                toPost: [null],
                stateRate: [''],
                regionRate: [''],
                postRate: [''],
                isStateRoute: [''],
                isRegionRoute: [''],
                isPostRoute: ['']
            })
        });
        //this.financeGroup = this.formBuilder.group({
        //    afslNo: [''],
        //    authRepNo: [''],
        //    aclNo: [''],
        //    brokerLicenceNo: [''],
        //    insVehicles: [''],
        //    isLoanNewVeh: [''],
        //    isLoanUsedVeh: [''],
        //    allselected: []
        //});
        //this.insuranceGroup = this.formBuilder.group({
        //    afslNo: [''],
        //    authRepNo: [''],
        //    aclNo: [''],
        //    brokerLicenceNo: [''],
        //    insVehicles: [''],
        //    isComprehensive: [''],
        //    isThirdParty: [''],
        //    isThirdProperty: [''],
        //    allselected: []
        //});
        this.basicGroup = this.formBuilder.group({
            basicInfo: this.formBuilder.group({
                vehicleType: ['Car'],
                ABNNumber: [''],
                licenceNumber: [''],
                streetName: [''],
                suborb: [''],
                postcode: [''],
                state: [null],
                website: [''],
                isNew: [''],
                isUsed: [''],
                dealerGroupName: [''],


                contactNumber2: [''],
                dealername: [''],
                designation: [''],
                delmobile: [''],
                landLine1: [],
                dob: [''],
                additionalInfo: [''],
                email: ['']
            }),

            serviceM: this.formBuilder.group({
                isPetrol: [''],
                isDiesel: [''],
                isElectric: [''],
                All: [''],
                clientPlaceDriveMaybe: [''],
                clientPlaceDriveYes: [''],
                roadAssistance: [''],
                clientPlaceDriveNo: ['']
            }),
            finance: this.formBuilder.group({
                afslNo: [''],
                authRepNo: [''],
                aclNo: [''],
                brokerLicenceNo: [''],
                insVehicles: [''],
                isLoanNewVeh: [''],
                isLoanUsedVeh: [''],
                allselected: []
            }),
            insurance: this.formBuilder.group({
                afslNo: [''],
                authRepNo: [''],
                aclNo: [''],
                brokerLicenceNo: [''],
                insVehicles: [''],
                isComprehensive: [''],
                isThirdParty: [''],
                isThirdProperty: [''],
                allselected: []
            })
        });
    }

    setGroup(dealer: Dealer) {
        this.basicGroup.patchValue({
            basicInfo: dealer,
            serviceM: dealer.service != undefined ? dealer.service : {},
            //transport: dealer.transport != undefined ? dealer.transport : {},
            finance: dealer.finance != undefined ? dealer.finance : {}
        });
        this.dealerBasicInfo.subscription = dealer.subscription;
        //this.selectedmodels = dealer.model;
        if (dealer.vehicleDealerMakeList != undefined)
            for (var i = 0; i < dealer.vehicleDealerMakeList.length; i++) {
                this.selectedmakes.push(dealer.vehicleDealerMakeList[i].Make);
            }
        if (dealer.vehicleDealerRegion != undefined)
            for (var i = 0; i < dealer.vehicleDealerRegion.length; i++) {
                this.selectedregions.push(dealer.vehicleDealerRegion[i].region);
            }
        if (dealer.vehicleDealerPostCode != undefined)
            for (var i = 0; i < dealer.vehicleDealerPostCode.length; i++) {
                this.selectedpostcodes.push(dealer.vehicleDealerPostCode[i].postCode);
            }
        if (dealer.vehicleDealerAreaOfOperState != undefined)
            for (var i = 0; i < dealer.vehicleDealerAreaOfOperState.length; i++) {
                this.selectedstates.push(dealer.vehicleDealerAreaOfOperState[i].state);
            }
        if ((dealer.finance != undefined && dealer.finance.insVehicles != undefined) || (dealer.insurance != undefined && dealer.insurance.insVehicles != undefined)) {
            for (var i = 0; i < this.insVehicleList.length; i++) {
                let l_vhList;
                if (dealer.subscriptionType == 'Finance')
                    l_vhList = dealer.finance.insVehicles;
                else if (dealer.subscriptionType == 'Insurance')
                    l_vhList = dealer.finance.insVehicles;
                if (l_vhList.indexOf(this.insVehicleList[i].name) != -1)
                    this.insVehicleList[i].selected = true;
            }
        }
        //for (var i = 0; i < l_makes.length; i++) {
        //    let make = this.selectedmakes;
        //    if (make.indexOf(l_makes[i]) != -1)
        //        this.makes.push({ name: l_makes[i], selected: true });
        //    else
        //        this.makes.push({ name: l_makes[i], selected: false });
        //}
    }
    getheaderno(subtype: any) {
        if (subtype == 'sub')
            return (this.isFinance || this.isInsurance) ? 2 : 4;
        else if (subtype == 'payment') {

            if (this.isFinance || this.isInsurance)
                return 3;
            else
                return 5;
        }

    }
    onMakeSelect(make: any) {
        //let l_make = this.selectedmakes.map(function (e) { return e; }).indexOf(make.name);
        let indx = this.selectedmakes.findIndex(p => p.name === make.name);
        if (indx != -1) {
            this.selectedmakes.splice(indx, 1);
        } else
            this.selectedmakes.push(make.name);
    }
    onModelSelect(make: any) {
        //let l_make = this.selectedmakes.map(function (e) { return e; }).indexOf(make.name);
        let indx = this.selectedmodels.findIndex(p => p.name === make.name);
        if (indx != -1) {
            this.selectedmodels.splice(indx, 1);
        } else
            this.selectedmodels.push(make.name);
    }
    onstateSelect(state: any) {
        let indx = this.selectedstates.findIndex(p => p.name === state.name);
        if (indx != -1) {
            this.selectedstates.splice(indx, 1);
        } else
            this.selectedstates.push(state.name);
    }
    onregionSelect(region: any) {
        let indx = this.selectedregions.findIndex(p => p.name === region.name);
        if (indx != -1) {
            this.selectedregions.splice(indx, 1);
        } else
            this.selectedregions.push(region.name);
    }
    onvehicleSelect(vhtype: any) {
        let indx = this.selectedVehicleTypes.findIndex((p: any) => p.name === vhtype.name);
        if (indx != -1) {
            this.selectedregions.splice(indx, 1);
        } else
            this.selectedregions.push(vhtype.name);
    }
    onpostcodeSelect(postcode: any) {
        let indx = this.selectedpostcodes.findIndex(p => p.name === postcode.name);
        if (indx != -1) {
            this.selectedpostcodes.splice(indx, 1);
        } else
            this.selectedpostcodes.push(postcode.name);
    }

    fromstatechange(value: any, l_type: string) {
        switch (l_type) {
            case 'tostate':
                this.fromRegions = this.getFilteredRegion(value);
                break;
            case 'fromstate':
                this.toRegions = this.getFilteredRegion(value);
                break;
            case 'toregion':
                let l_tostate = this.transportGroup.controls["toState"]['_value'];
                this.fromPostcodes = this.getFilteredPostCodes(l_tostate, value);
                break;
            case 'fromregion':
                let l_fromstate = this.transportGroup.controls["fromState"]['_value'];
                this.toPostcodes = this.getFilteredPostCodes(l_fromstate, value);
                break;
        }
    }

    onAllSelect(value: any) {
        for (let i = 0; i < this.insVehicleList.length; i++) {
            this.insVehicleList[i].selected = value.target.checked;
        }
    }
    private allselected: boolean;
    onFinanceVehChange(item: any) {
        let l_ctrl = this.basicGroup.get('finance').get('allselected');
        if (l_ctrl != undefined) {
            if (!item.selected) {
                l_ctrl.setValue(false);
            }
            else {
                let l_unselected = this.insVehicleList.filter(function (p: any) { return p.selected == false });
                if (l_unselected != undefined && l_unselected.length == 0)
                    l_ctrl.setValue(true);
            }
        }
    }


    getStates() {
        this.aostates = [{ name: "ACT", selected: false }, { name: "NSW", selected: false }, { name: "NT", selected: false }, { name: "QLD", selected: false }, { name: "SA", selected: false }, { name: "TAS", selected: false }, { name: "VIC", selected: false }, { name: "WA", selected: false }];
        return;
        try {
            if (this.states == undefined || !this.states.length)
                this._service.getstates().subscribe(
                    data => {
                        if (data != undefined) {
                            var l_response = JSON.parse(data['_body']);
                            this.aostates = l_response;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getFilteredRegion(state: string) {
        try {
            this._service.getregions('australia', state).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);
                        return l_response;
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getRegion() {
        try {
            for (var i = 0; i < shareService.regions.length; i++) {
                let make = this.selectedregions;
                if (make.indexOf(shareService.regions[i]) != -1)
                    this.regions.push({ name: shareService.regions[i], selected: true });
                else
                    this.regions.push({ name: shareService.regions[i], selected: false });
            }
            return;
            if ((this.selectedstates != undefined && this.selectedstates.length) && this.regions == undefined || !this.regions.length)
                this._service.getregions('australia', this.selectedstates).subscribe(
                    data => {
                        if (data != undefined) {
                            var l_response = JSON.parse(data._body);
                            this.regions = l_response;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getFilteredPostCodes(state: string, region: string) {
        try {
            this._service.getpostalcode('australia', state, region).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);
                        return l_response;
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getPostCodes() {
        try {
            for (var i = 0; i < shareService.postcodes.length; i++) {
                let make = this.selectedpostcodes;
                if (make.indexOf(shareService.postcodes[i]) != -1)
                    this.postcodes.push({ name: shareService.postcodes[i], selected: true });
                else
                    this.postcodes.push({ name: shareService.postcodes[i], selected: false });
            }
            return;
            if ((this.selectedregions != undefined && this.selectedregions.length) && this.postcodes == undefined || !this.postcodes.length)
                this._service.getpostalcode('a', 'a', 'a').subscribe(
                    data => {
                        if (data != undefined) {
                            var l_response = JSON.parse(data['_body']);
                            this.postcodes = l_response;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getmakes() {
        try {
            let l_makes = shareService.makes;
            for (var i = 0; i < l_makes.length; i++) {
                let make = this.selectedmakes;
                if (make.indexOf(l_makes[i]) != -1)
                    this.makes.push({ name: l_makes[i], selected: true });
                else
                    this.makes.push({ name: l_makes[i], selected: false });
            }
            return;
            if (this.makes == undefined || !this.makes.length)
                this._service.getmakes().subscribe(
                    data => {
                        if (data != undefined) {
                            var l_response = JSON.parse(data['_body']);
                            this.makes = l_response;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        catch (_err) {
            console.log(_err);
        }
    }
    getmodels() {
        try {
            let l_models = shareService.models;
            for (var i = 0; i < l_models.length; i++) {
                let make = this.selectedmodels;
                if (make.indexOf(l_models[i]) != -1)
                    this.models.push({ name: l_models[i], selected: true });
                else
                    this.models.push({ name: l_models[i], selected: false });
            }
            return;
            if (this.makes == undefined || !this.makes.length)
                this._service.getmakes().subscribe(
                    data => {
                        if (data != undefined) {
                            var l_response = JSON.parse(data['_body']);
                            this.makes = l_response;
                        }
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        catch (_err) {
            console.log(_err);
        }
    }

    setGroupSubscribe() {
        let l_subs = this.dealerBasicInfo.subscription;
        this.dealerBasicInfo = this.basicGroup['_value'].basicInfo;
        this.dealerBasicInfo.subscription = l_subs;
        if (this.isSM)
            this.dealerBasicInfo.service = this.basicGroup['_value'].serviceM;
        if (this.isFinance) {
            this.dealerBasicInfo.finance = [];
            this.dealerBasicInfo.finance.push(this.basicGroup['_value'].finance);
            this.dealerBasicInfo.finance[0].insVehicles = [];
            for (let i = 0; i < this.insVehicleList.length; i++) {
                this.dealerBasicInfo.finance[0].insVehicles.push(this.insVehicleList[i].name);
            }
        }
        if (this.isInsurance) {
            this.dealerBasicInfo.insurance = [];
            this.dealerBasicInfo.insurance.push(this.basicGroup['_value'].insurance);
            this.dealerBasicInfo.insurance[0].insVehicles = [];

            for (let i = 0; i < this.insVehicleList.length; i++) {
                this.dealerBasicInfo.insurance[0].insVehicles.push(this.insVehicleList[i].name);
            }
        }
        //if (this.isTransport)
        //    this.dealerBasicInfo.transport = this.transportGroup['_value'].transport;

        let l_postcodes = this.selectedpostcodes;
        if (this.dealerBasicInfo.vehicleDealerPostCode == undefined)
            this.dealerBasicInfo.vehicleDealerPostCode = [];
        if (this.dealerBasicInfo.vehicleDealerAreaOfOperState == undefined)
            this.dealerBasicInfo.vehicleDealerAreaOfOperState = [];
        if (this.dealerBasicInfo.vehicleDealerRegion == undefined)
            this.dealerBasicInfo.vehicleDealerRegion = [];
        if (this.dealerBasicInfo.vehicleDealerMakeList == undefined)
            this.dealerBasicInfo.vehicleDealerMakeList = [];
        for (var i = 0; i < l_postcodes.length; i++) {
            this.dealerBasicInfo.vehicleDealerPostCode.push({ postCode: l_postcodes[i] });
        }
        for (var i = 0; i < this.selectedstates.length; i++) {
            this.dealerBasicInfo.vehicleDealerAreaOfOperState.push({ state: this.selectedstates[i] });
        }
        for (var i = 0; i < this.selectedregions.length; i++) {
            this.dealerBasicInfo.vehicleDealerRegion.push({ region: this.selectedregions[i] });
        }
        for (var i = 0; i < this.selectedmakes.length; i++) {
            this.dealerBasicInfo.vehicleDealerMakeList.push({ Make: this.selectedmakes[i] });
        }
        //for (var i = 0; i < this.selectedmodels.length; i++) {
        //    this.dealerBasicInfo.model.push(this.selectedmodels[i]);
        //}
        this.dealerBasicInfo.subscriptionType = this.subscriptionType;
        this.setType(false);
        this.dealerBasicInfo.financeEntity = null;
    }



    setType(isLoad: boolean) {

        let type = this.subscriptionType;
        //let subList: any = ['BuyVehicle', 'SellVehicle', 'LeaseVehicle', 'Insurance', 'Finance', 'Servicemaintenance', 'Fuel', 'Sparesaccessories', 'Transport', 'Others'];

        //for (var i = 0; i < subList.length; i++) {
        //    if (subList[i] == type) {
        //        break;
        //    }
        //}

        switch (type) {
            case type = 'BuyVehicle':
                if (isLoad)
                    this.isVehicle = true;
                this.shareservice.defaultSubs.isNew = true;
                break;
            case type = 'SellVehicle':
                if (isLoad)
                    this.isVehicle = true;
                this.shareservice.defaultSubs.isPreOwned = true;
                break;
            case type = 'LeaseVehicle':
                if (isLoad)
                    this.isVehicle = true;
                this.shareservice.defaultSubs.isLease = true;
                break;
            case type = 'Insurance':
                if (isLoad)
                    this.isInsurance = true;
                this.shareservice.defaultSubs.isInsurance = true;
                break;
            case type = 'Finance':
                if (isLoad)
                    this.isFinance = true;
                this.shareservice.defaultSubs.isFinance = true;
                break;
            case type = 'Servicemaintenance':
                if (isLoad)
                    this.isSM = true;
                this.shareservice.defaultSubs.isSM = true;
                break;
            case type = 'Fuel':
                if (isLoad)
                    this.isFuel = true;
                this.shareservice.defaultSubs.isFuel = true;
                break;
            case type = 'Sparesaccessories':
                if (isLoad)
                    this.isSpares = true;
                this.shareservice.defaultSubs.isSpares = true;
                break;
            case type = 'Transport':
                if (isLoad)
                    this.isTransport = true;
                this.shareservice.defaultSubs.isTranssport = true;
                break;
            case type = 'Others':
                if (isLoad)
                    this.isOthers = true;
                this.shareservice.defaultSubs.isOthers = true;
                break;

        }
    }
    saveSubscription() {
        try {
            this.setGroupSubscribe();
            //if (shareService.subscriptions != undefined && shareService.subscriptions.length) {
            //    let l_indx: any;
            //    for (var i = 0; i < shareService.subscriptions.length; i++) {
            //        if (shareService.subscriptions[i].subscriptionType == this.subscriptionType) {
            //            l_indx = i;
            //            break;
            //        }
            //    }
            //    if (l_indx != undefined) {
            //        shareService.subscriptions.splice(l_indx, 1, this.dealerBasicInfo);
            //    }
            //    else {
            //        shareService.subscriptions.push(this.dealerBasicInfo);
            //    }
            //}
            //else
            //    shareService.subscriptions.push(this.dealerBasicInfo);
            
            //return;
            this._service.savesubscription(this.dealerBasicInfo).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);
                        
                        shareService.subscriptions.push(this.dealerBasicInfo);
                        this.router.navigate(['/home']);
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
        catch (_err) {
            console.log(_err);
        }
    }

    onSubmit() {

    }

    onNext(item: string) {
        switch (item) {
            case "basicinfo":
                this.isBasicInfo = false;

                if (this.isFinance || this.isInsurance)
                    this.isSubscription = true;
                else if (this.isTransport) {
                    this.isRoutes = true;
                }
                else
                    this.isMakeModeltab = true;

                break;
            case "makemodel":
                this.isMakeModeltab = false;
                this.isAreaOperation = true;
                break;
            case "area":
                this.isAreaOperation = false;
                this.isSubscription = true;
                //this.saveSubscription();
                break;
            case "addroutes":
                this.isRoutes = false;
                this.isSubscription = true;
                //this.saveSubscription();
                break;
            case "subscription":
                this.isSubscription = false;
                this.isPayment = true;
                this.saveSubscription();
                break;
            default:
                break;
        }
    }

    onPrevious(item: string) {
        switch (item) {
            case "makemodel":
                this.isBasicInfo = true;
                this.isMakeModeltab = false;
                break;
            case "area":
                this.isMakeModeltab = true;
                this.isAreaOperation = false;
                break;
            case "addroutes":
                this.isRoutes = false;
                this.isBasicInfo = true;
                break;
            case "subscription":
                if (this.isFinance || this.isInsurance)
                    this.isBasicInfo = true;
                else if (this.isTransport)
                    this.isRoutes = true;
                else
                    this.isAreaOperation = true;
                this.isSubscription = false;
                break;
            case "payment":
                this.isSubscription = true;
                this.isPayment = false;
                break;
            default:
                break;
        }
    }
}