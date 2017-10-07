import { Component, OnInit, Input } from '@angular/core'
import { HttpModule } from '@angular/http';
import { inventory, shareService } from './models';
import { dealerservice } from './dealerService';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
    selector: 'l-panel',
    templateUrl: 'views/leftpanel.html'
})


export class leftPanelComponent {

    private inventories: any = [];
    private dealerId: any;
    private isRegistered: boolean;
    private inventory: inventory = new inventory();
    constructor(private router: Router, private _service: dealerservice, private shareservice: shareService) {

    }
    ngOnInit() {

    }
    private isOpen: boolean = false;
    showLeftPanel() {
        this.shareservice.isOpen = (this.shareservice.isOpen) ? false : true;
    }
    nav(item: string) {
        sessionStorage.setItem('subscriptiontype', item);
        this.router.navigate(['/subscribe']);
    }
}