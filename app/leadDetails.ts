import { Component, OnInit, Input } from '@angular/core'
import { HttpModule } from '@angular/http';
import { LeadDetails, shareService, dealerInfo, UserInfoCheck, MakeModel, userContext } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'leadinfo',
    templateUrl: 'views/addresource.html'
})


export class LeadInformation {
    private states: any = [];
    constructor(private route: ActivatedRoute, private _service: dealerservice, private formBuilder: FormBuilder, private router: Router, private shareservice: shareService) {
        //private userinfocheck: UserInfoCheck, private usercontext: userContext, private makemodel: MakeModel, private leaddetails:

    }
    private userinfocheck: UserInfoCheck; private usercontext: userContext; private makemodel: MakeModel; private leaddetails: LeadDetails;

    ngOnInit() {

    }

    getresources() {
        try {
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


}