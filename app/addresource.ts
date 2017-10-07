import { Component, OnInit, Input } from '@angular/core'
import { HttpModule } from '@angular/http';
import { resource, shareService } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'add-resource',
    templateUrl: 'views/addresource.html'
})


export class AddResourceComponent {
    private states: any = [];
    private resources: any = [];
    private socialName: string;
    private dealerId: any;
    private titleList: any = [{ name: 'Mr', dName: 'Mr' }, { name: 'Mrs', dName: 'Mrs' }, { name: 'Ms', dName: 'Ms' }];
    private socialList: any = ['Facebook', 'Google+', 'LinkedIn'];
    private resource: resource = new resource();
    private quickDateBars: any = [];
    resourceGroup: FormGroup;
    socialGroup: FormGroup;
    private isanother: boolean;
    constructor(private route: ActivatedRoute, private _service: dealerservice, private formBuilder: FormBuilder, private router: Router, private shareservice: shareService) {

    }

    private editresource: resource;
    ngOnInit() {
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
        this.resources = shareService.resources;
    }
    private isOpen: boolean = false;
    showLeftPanel() {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    }
    edit() {
        if (shareService.resources != undefined && shareService.resources.length) {
            let l_id = sessionStorage.getItem('resourceid');
            if (l_id != undefined) {
                this.editresource = shareService.resources[(l_id - 1)];
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
    }
    formValidation() {
        this.resourceGroup = this.formBuilder.group({

            employeeCode: ['', Validators.required],
            contactDetails: this.formBuilder.group({
                title: [null, Validators.required],
                contactPerson: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', Validators.required],
                designation: ['', [Validators.required, Validators.minLength(2)]],
                contactNumber1: ['', Validators.required],
                dob: ['', Validators.required],
                additionalInfo: ['']
                //lastName: ['', Validators.required],
            })
        });
        this.socialGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            url: ['', [Validators.required, Validators.pattern('https?://.+')]]
        });

    }
    addsociallink() {
        if (this.resource.socialMedia != undefined)
            this.resource.socialMedia.push({ name: this.socialGroup._value.name, url: this.socialGroup._value.url });
        this.socialName = '';
        this.socialGroup.reset();
    }
    resetForm() {
        this.isanother = true;
        this.saveresource();
    }
    updateresource(item: any) {
        sessionStorage.setItem('reourceid', item.id);
    }

    saveresource() {
        try {
            this.resource.contactDetails = this.resourceGroup._value.contactDetails;
            this.resource.employeeCode = this.resourceGroup._value.employeeCode;
            if (shareService.resources == undefined)
                shareService.resources = [];
            if (this.resource.id == undefined) {
                this.resource.id = (shareService.resources.length + 1).toString();
                shareService.resources.push(this.resource);
            }
            else {
                shareService.resources.splice((this.resource.id - 1), 1, this.resource);
            }
            this.resourceGroup.reset();
            this.socialGroup.reset();
            this.resource = {};
            if (!this.isanother)
                this.router.navigate(['/resources']);
            this.isanother = false;
            return;
            this._service.saveresource(this.dealerId).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data._body);
                        this.resources = l_response;
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
    getresources() {
        try {
            this._service.getresources(this.dealerId).subscribe(
                data => {
                    if (data != undefined) {
                        var l_response = JSON.parse(data._body);
                        this.resources = l_response;
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