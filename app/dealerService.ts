import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
    Dealer, VehicleDealerAreaOfOperPostCode, VehicleDealerAreaOfOperRegion, VehicleDealerAreaOfOperState, VehicleDealerDetails
    , VehicleDealerFinanceDetails, VehicleDealerInsuranceDetails, VehicleDealerMakeList, VehicleDealerServMaintDetails
} from './servermodels';
import { dealer } from './models';


@Injectable()
export class dealerservice {

    private _uri: string = '';
    headers = new Headers();
    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('dataType', 'jsonp');
        this.headers.append("Access-Control-Allow-Origin", "*");
        //var refid = UIStorage.getCookie('refId');
        //if (refid != null && refid != undefined && refid != '')
        //    this.headers.append('Authorization', 'Bearer ' + refid);http://autoscoop.com.au/api/tempCarModelMakesForYear?modelYear=2017
        //this._uri = 'http://localhost:43893/';
        this._uri = 'http://localhost:8080/MyCarDomain/';
    }

    getstates() {
        //var xhr = new XMLHttpRequest();
        //xhr.open("GET", "states?country=australia", true);
        //xhr.onreadystatechange = function () {
        //    debugger;
        //    if (xhr.readyState == 4) {
        //        // JSON.parse does not evaluate the attacker's scripts.
        //        return JSON.parse(xhr.responseText);
        //    }
        //}
        //xhr.send();
        return this.http.get(this._uri + 'states?country=australia', { headers: this.headers });
    }
    getmakes() {
        return this.http.get(this._uri + 'api/tempCarModelMakesForYear?modelYear=2017', { headers: this.headers });
    }
    getregions(country: string, state: string) {
        return this.http.get(this._uri + 'regions?country=' + country + '&state=' + state, { headers: this.headers });
    }
    getpostalcode(country: string, state: string, region: string) {
        return this.http.get(this._uri + 'postcodes?country=' + country + '&state=' + state + '&region=' + region, { headers: this.headers });
    }
    savesubscription(dealerbasicinfo: any) {
        return this.http.post(this._uri + 'api/dealer', dealerbasicinfo, { headers: this.headers });
    }
    save(statements: any) {
        var data = this.http.post(this._uri + 'api/user/Save', statements, { headers: this.headers });
        return data;
    }

    //resource managements
    getresources(dealerId) {
        return this.http.get(this._uri + 'api/resources?dealerid=1', { headers: this.headers });
    }

    updateresource(resourceid) {
        return this.http.get(this._uri + 'api/resources?dealerid=1', { headers: this.headers });
    }

    deleteresource(resourceid) {
        return this.http.get(this._uri + 'api/resources?dealerid=1', { headers: this.headers });
    }
    saveresource(dealerid) {
        return this.http.get(this._uri + 'api/resources?dealerid=1', { headers: this.headers });
    }
    saveinventory(dealerid) {
        return this.http.get(this._uri + 'api/resources?dealerid=1', { headers: this.headers });
    }
}




class uitoserver {

    public static saveSubscription(p_dealer: dealer) {
        let l_dealer = new Dealer();
        l_dealer.delmobile = +p_dealer.contactDetails.contactNumber1;
        l_dealer.landLine1 = +p_dealer.contactDetails.contactNumber2;
        l_dealer.dealername = p_dealer.contactDetails.contactPerson;
        l_dealer.designation = p_dealer.contactDetails.designation;
        l_dealer.email = p_dealer.contactDetails.email;
        l_dealer.streetName = p_dealer.basicInfo.address;
        l_dealer.suborb = p_dealer.basicInfo.suburb;
        l_dealer.postcode = +p_dealer.basicInfo.postCode;
        l_dealer.state = p_dealer.basicInfo.state;
        l_dealer.vehicleDealerDetails.push({ vehicleType: 'çar', isNewCar: p_dealer.basicInfo.isNew, isUsedCar: p_dealer.basicInfo.isUsed, isBoth: false });
        for (var i = 0; i < p_dealer.basicInfo.make.length; i++) {
            l_dealer.vehicleDealerMakeList.push({ Make: p_dealer.basicInfo.make[i] });
        }
        for (var i = 0; i < p_dealer.areaofOperation.state.length; i++) {
            l_dealer.vehicleDealerAreaOfOperState.push({ country: 'australia', state: p_dealer.areaofOperation.state[i] });
        }
        for (var i = 0; i < p_dealer.areaofOperation.area.length; i++) {
            l_dealer.vehicleDealerRegion.push({ country: 'Australia', region: p_dealer.areaofOperation.area[i] });
        }
        for (var i = 0; i < p_dealer.areaofOperation.postCode.length; i++) {
            l_dealer.vehicleDealerPostCode.push({ country: 'australia', postCode: p_dealer.areaofOperation.postCode[i] });
        }
        return l_dealer;
    }
}

