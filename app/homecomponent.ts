import { Component, OnInit } from '@angular/core';
import { offering, shareService, subscription } from './models';
import { Router } from '@angular/router';

@Component({
    selector: 'content',
    templateUrl: 'views/homecontent.html'
})
export class HomeComponent {

    private offerings: Array<offering> = [];
    private leads: any = [];
    private isSubShow: boolean;
    constructor(private router: Router, private shareservice: shareService) {
        this.shareservice = new shareService();
        this.shareservice.defaultSubs = new subscription();
    }

    ngOnInit() {
        this.setOfferings();
        this.setLeads();
        //let indx = this.selectedpostcodes.findIndex(p => p.name === postcode.name);
        for (var i = 0; i < this.offerings.length; i++) {
            let l_vehicles = shareService.subscriptions.filter((p: any) => p.subscriptionType == this.offerings[i].type);
            if (l_vehicles != undefined && l_vehicles.length > 0)
                this.offerings[i].isSubscribed = true;
            //this.offerings[i].count = 
        }
    }
    subscribe(item: any) {
        sessionStorage.setItem('subscriptiontype', item.type);
        this.router.navigate(['/subscribe']);
    }
    setOfferings() {
        this.offerings.push(this.offering('SellVehicle', 'Sell Vehicle', false, 0, 0, 'Total Leads', 'Value', false, 'images/sell_vehicle.jpg', 'flaticon-car-steering-wheel', true));
        this.offerings.push(this.offering('LeaseVehicle', 'Lease Vehicle', true, 0, 0, 'Total Leads', 'Value', false, 'images/buy_vehicle.jpg', 'flaticon-car-steering-wheel', true));
        this.offerings.push(this.offering('BuyVehicle', 'Buy Vehicle', true, 0, 0, 'Total Leads', 'Value', false, 'images/buy_vehicle.jpg', 'flaticon-car-steering-wheel', true));
        this.offerings.push(this.offering('Insurance', 'Insurance', false, 0, 0, 'Total Leads', 'Value', false, 'images/car_insurance.jpg', 'flaticon-umbrella', true));
        this.offerings.push(this.offering('Finance', 'Finance', false, 0, 0, 'Total Leads', 'Value', false, 'images/car-finance.jpg', 'flaticon-money-bag-with-dollar-symbol', true));
        this.offerings.push(this.offering('Servicemaintenance', 'Service & Maintenance', false, 0, 0, 'Total Leads', 'Value', false, 'images/service_maintenance.jpg', 'flaticon-work-tools-cross', true));
        this.offerings.push(this.offering('Transport', 'Transport', false, 0, 0, 'Total Leads', 'Value', false, 'images/service_maintenance.jpg', 'flaticon-work-tools-cross', true));
        this.offerings.push(this.offering('Fuel', 'Fuel', false, 0, 0, 'Total Leads', 'Value', false, 'images/fuel_cards.jpg', 'flaticon-money-bag-with-dollar-symbol', false));
        this.offerings.push(this.offering('Sparesaccessories', 'Spares & Accessories', false, 0, 0, 'Total Leads', 'Value', false, 'images/spares.jpg', 'flaticon-money-bag-with-dollar-symbol', false));
        //this.offerings.push(this.offering('Others', 'Others', false, 0, 0, 'Total Leads', 'Value', false, 'images/miscellaneous.jpg', 'flaticon-money-bag-with-dollar-symbol'));
    }

    setLeads() {
        this.leads.push(this.offering('SellVehicle', 'Sell Vehicle', false, 0, 0, 'Total Leads', 'Value', false, 'images/sell_vehicle.jpg', 'flaticon-car-steering-wheel'));
        this.leads.push(this.offering('LeaseVehicle', 'Lease Vehicle', true, 0, 0, 'Total Leads', 'Value', false, 'images/buy_vehicle.jpg', 'flaticon-car-steering-wheel'));
        this.leads.push(this.offering('BuyVehicle', 'Buy Vehicle', true, 0, 0, 'Total Leads', 'Value', false, 'images/buy_vehicle.jpg', 'flaticon-car-steering-wheel'));
        this.leads.push(this.offering('Insurance', 'Insurance', false, 0, 0, 'Total Leads', 'Value', false, 'images/car_insurance.jpg', 'flaticon-umbrella'));
        this.leads.push(this.offering('Finance', 'Finance', false, 0, 0, 'Total Leads', 'Value', false, 'images/car-finance.jpg', 'flaticon-money-bag-with-dollar-symbol'));
        this.leads.push(this.offering('Servicemaintenance', 'Service & Maintenance', false, 0, 0, 'Total Leads', 'Value', false, 'images/service_maintenance.jpg', 'flaticon-work-tools-cross'));
        this.leads.push(this.offering('Transport', 'Transport', false, 0, 0, 'Total Leads', 'Value', false, 'images/service_maintenance.jpg', 'flaticon-work-tools-cross'));
        this.leads.push(this.offering('Fuel', 'Fuel', false, 0, 0, 'Total Leads', 'Value', false, 'images/fuel_cards.jpg', 'flaticon-money-bag-with-dollar-symbol'));
        this.leads.push(this.offering('Sparesaccessories', 'Spares & Accessories', false, 0, 0, 'Total Leads', 'Value', false, 'images/spares.jpg', 'flaticon-money-bag-with-dollar-symbol'));
        //this.leads.push(this.offering('Others', 'Others', false, 0, 0, 'Total Leads', 'Value', false, 'images/miscellaneous.jpg', 'flaticon-money-bag-with-dollar-symbol'));
    }


    offering(type: string, displayName: string, isSubscribed: boolean, count: number, leadCount: number, leadName: string, valueName: string, isSubShow: boolean, url: string, icon: string, show: boolean) {
        return { type: type, displayName: displayName, isSubscribed: false, count: 0, leadCount: 0, leadName: leadName, valueName: valueName, isSubShow: isSubShow, url: url, icon: icon, show: show };
    }

    editSubscription(item: any) {
        sessionStorage.setItem('subscriptiontype', item.type);
        this.router.navigate(['/subscribe']);
    }
    showSubscription(item: any) {

        item.isSubShow = item.isSubShow ? false : true;
    }
    comingsoon(l_type: string) {
        if (l_type === 'Fuel' || l_type === 'Sparesaccessories')
            return true;
    }
    showSubs(l_type: any) {
        if (l_type === 'Fuel' || l_type === 'Sparesaccessories')
            this.isSubShow = false;
    }
}