﻿import { Component, OnInit, Input } from '@angular/core'
import { HttpModule } from '@angular/http';
import { LeadDetails, shareService, dealerInfo, UserInfoCheck, MakeModel, userContext } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'leadview',
    templateUrl: 'views/leadview.html'
})


export class LeadView {
    private states: any = [];
    constructor(private route: ActivatedRoute, private _service: dealerservice, private formBuilder: FormBuilder, private router: Router, private shareservice: shareService) {
        //private userinfocheck: UserInfoCheck, private usercontext: userContext, private makemodel: MakeModel, private leaddetails:

    }
    private userinfocheck: UserInfoCheck = new UserInfoCheck(); private usercontext: userContext; private makemodel: MakeModel;
    private leaddetails: LeadDetails = new LeadDetails();

    ngOnInit() {

        this.getleadinfo();
        this.gettempData();
    }

    getleadinfo() {
        try {
            return;
            this._service.getresources('dealerId').subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data['_body']);
                        //this.resources = l_response;
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

    gettempData() {
        this.leaddetails.leadId = 'LD1002';
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
    }


}