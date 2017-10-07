﻿import { Component, OnInit, Input } from '@angular/core'
import { HttpModule } from '@angular/http';
import { SellVehicle, feature, shareService } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customvalidations } from './customvalidations';



@Component({
    selector: 'add-inventory',
    templateUrl: 'views/sellinventory.html'
})


export class SellVehicleComponent {

    private inventories: any = [];
    private dealerId: any;
    private isRegistered: boolean;
    private inventory: SellVehicle = new SellVehicle();
    private carExtraList: any = [];
    private selectedBanners: any = [];
    private featureList: any = [];
    private isRego: boolean;
    private states: any;
    private id: any;
    private isDriveAway: boolean = undefined;
    private isPrice: boolean = undefined;
    private pricingTypes: any = [];

    constructor(private route: ActivatedRoute, private _service: dealerservice, private formBuilder: FormBuilder, private router: Router, private shareservice: shareService) {

    }
    inventoryGroup: FormGroup;
    registrationGroup: FormGroup;
    ngOnInit() {
        this.states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
        this.formValidation();
        this.getVehicleExtras();
        this.edit();
        this.inventories = shareService.inventories;
        this.pricingTypes = [{name: 'Fixed', displayName: 'Fixed' }, {name: 'Negotiable', displayName: 'Negotiable' }, { name: 'Range', displayName: 'Price Range' }];
    }
    tes() {
        //'email': ['', Validators.compose([Validators.required, Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)])],
        //    'phn': ['', Validators.compose([Validators.required, Validators.pattern(/^610[0-8]\d{8}$/g)])]
        //'txt': ['', Validators.compose([Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)])],
    }
    formValidation() {
        this.inventoryGroup = this.formBuilder.group({

            headerText: ['', Validators.required],

            vinNumber: ['', [Validators.required, Validators.minLength(2)]],
            dealerStockNumber: ['', [Validators.required, Validators.minLength(2)]],
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
            negotiablePercent:[]
        }, { validator: this.validateNewUsed });//, { validator: this.validatePriceRange }   Validators.compose([Validators.required, this.checkIfA])

    }

    validateNewUsed(formgroup: FormGroup) {
        return (formgroup.controls["isNewCar"]['_value'] == undefined || formgroup.controls["isUsedCar"]['_value'] == undefined)
            ? { 'required': true } : null;
    }
    validatePriceRange(formgroup: FormGroup) {
        return ((formgroup.controls["minPrice"]['_value'] != undefined && formgroup.controls["maxPrice"]['_value'] == undefined) || (formgroup.controls["minPrice"]['_value'] == undefined && formgroup.controls["maxPrice"]['_value'] != undefined))
            ? { 'required': true } : null;
    }

    edit() {
        if (shareService.inventories != undefined && shareService.inventories.length) {
            let l_id = sessionStorage.getItem('inventoryid');
            if (l_id != undefined) {
                this.inventory.id = +l_id;
                this.id = +l_id;
                this.inventory = shareService.inventories[(l_id - 1)];
                sessionStorage.removeItem('inventoryid');
                this.inventoryGroup.setValue({
                    headerText: this.inventory.headerText,

                    vinNumber: this.inventory.vinNumber,
                    dealerStockNumber: this.inventory.dealerStockNumber,
                    isNewCar: this.inventory.condition,// == 'New' ? true : false,
                    isUsedCar: this.inventory.condition,// == 'Used' ? true : false,
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
    }

    carNewChanged($event: any) {
        this.inventoryGroup.controls['isUsedCar'].setValue(!$event);
    }

    carOldChanged($event: any) {
        this.inventoryGroup.controls['isNewCar'].setValue(!$event);
    }

    regoChangeYes($event: any) {
        this.isRego = $event;
    }
    private isFixed: boolean = true;
    private isNegotiable: boolean;
    private isRange: boolean;

    pricingCheck(name: any) {
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
    }

    getImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.images.push({ name: '', url: event.target.result });
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private isOpen: boolean = false;
    private images: any = [];

    showLeftPanel() {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    }
    regoChange($event: any) {
        let l_isRego = $event.target;
        if (l_isRego != undefined) {
            this.isRego = l_isRego.checked;
        }
        //throw new Error(`Expected validator to return Promise or Observable.`);
    }
    getVehicleExtras() {

        this.carExtraList = [{ name: 'Bull Bar', isChecked: false }, { name: 'Nudge Bar', isChecked: false }, { name: 'Side Step', isChecked: false },
            { name: 'Snorkel', isChecked: false }, { name: 'Tow Bar', isChecked: false },
            { name: 'Floor Mats', isChecked: false }, { name: 'Tinted Glass', isChecked: false },
            { name: 'Luggage & Cargo Accessories', isChecked: false }, { name: 'Applicable Roof Racks', isChecked: false },
            { name: 'Tow Accessories', isChecked: false }, { name: 'Seat Cover', isChecked: false },
            { name: 'Bonnet Protection', isChecked: false }, { name: 'Head Lamp Protection', isChecked: false },
            { name: 'Weather Shield', isChecked: false }, { name: 'Medical / first-aid Kit', isChecked: false }, { name: 'Safety Kit', isChecked: false }];

    }
    onbannerselect(banner: any) {
        let indx = this.selectedBanners.findIndex((p: any) => p === banner.name);
        if (indx != -1) {
            this.selectedBanners.splice(indx, 1);
        } else
            this.selectedBanners.push(banner.name);
    }
    updateinventory(item: any) {
        sessionStorage.setItem('reourceid', item.id);
    }

    deleteinventory(item: any) {
        try {
            this._service.deleteresource(item.id).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);
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

    getinventory() {
        try {
            this._service.getresources(this.dealerId).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);

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

    setinventory() {
        this.inventory = this.inventoryGroup['_value'];
        this.inventory.condition = this.inventoryGroup.controls['isNewCar']['_value'] == false ? 'Used' : 'New';
        this.inventory.extras = this.selectedBanners;
    }

    saveinventory() {
        try {
            this.setinventory();
            if (this.id == undefined) {
                this.inventory.id = (shareService.inventories.length + 1).toString();
                shareService.inventories.push(this.inventory);
            }
            else {
                this.inventory.id = this.id;
                shareService.inventories.splice((this.inventory.id - 1), 1, this.inventory);
            }
            this.router.navigate(['/inventory']);
            return;
            this._service.saveinventory(this.dealerId).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);

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
    getrecentaccounts() {
        try {

        }
        catch (_err) {
            console.log(_err);
        }
    }
}