import { Component, OnInit } from '@angular/core'
import { HttpModule } from '@angular/http';
import { resource, shareService } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'resource',
    templateUrl: 'views/resource.html'
})


export class ResourceComponent {

    private resources: any = [];
    private dealerId: any;
    constructor(private route: ActivatedRoute, private _service: dealerservice, private router: Router, private shareservice: shareService) {

    }
    private isOpen: boolean = false;
    showLeftPanel() {
        this.isOpen = (this.isOpen) ? false : true;
    }
    ngOnInit() {
        if (shareService != undefined)
            this.resources = shareService.resources;
        //this.getresources();
        //this.getrecentaccounts();
    }

    updateresource(item) {
        sessionStorage.setItem('resourceid', item.id);
        this.router.navigate(['/addresource']);
    }

    deleteresource(index) {
        this.resources.splice(index, 1);
        //shareService.resources.splice(index, 1);
        return;
        try {
            this._service.deleteresource(item.id).subscribe(
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