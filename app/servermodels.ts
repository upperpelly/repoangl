export class VehicleDealerAreaOfOperState {
    public country: string;
    public state: string;
    public offered: boolean;
}

export class VehicleDealerAreaOfOperPostCode {

    public country: string;
    public state: string;
    public region: string;
    public postCode: string;

}

export class VehicleDealerAreaOfOperRegion {

    public country: string;
    public state: string;
    public region: string;
    public offered: boolean;

}

export class Dealer {

    public dealerId: string;
    public password: string;
    public email: string;
    public isAdmin: boolean;
    public isDealer: boolean;
    public isInsurer: boolean;
    public isFinancer: boolean;
    public ABNNumber: string;
    public dealername: string;
    public dealerGroupName: string;//need in server
    public subscription: string; //bronze,basic...
    public subscriptionType: string;//need in server for finance,insurance...
    public ACNNumber: string;
    public website: string;
    public delmobile: number;
    public landLine1: number;
    public landLine2: number;
    public streetNumber: string;
    public streetName: string;
    public areaName: string;
    public suborb: string;
    public state: string;
    public postcode: number;
    public designation: string;
    public vehicleDealerDetails: Array<VehicleDealerDetails> = [];
    public vehicleDealerMakeList: Array<VehicleDealerMakeList> = [];
    public vehicleDealerAreaOfOperState: Array<VehicleDealerAreaOfOperState> = [];
    public vehicleDealerRegion: Array<VehicleDealerAreaOfOperRegion> = [];
    public vehicleDealerPostCode: Array<VehicleDealerAreaOfOperPostCode> = [];
    public insurance: Array<VehicleDealerInsuranceDetails>;
    public finance: Array<VehicleDealerFinanceDetails>;
    public service: Array<VehicleDealerServMaintDetails>;
    public financeEntity: Array<VehicleDealerFinanceDetails> = null;
}
export class FinanceEntity {

}
export class VehicleDealerDetails {
    public vehicleType: string;
    public isNewCar: boolean;
    public isUsedCar: boolean;
    public isBoth: boolean;
}

export class VehicleDealerMakeList {

    public Make: string;
}

export class VehicleDealerFinanceDetails {

    public vehicleDealerFinanceDetailId: number;

    public vehicleType: string;
    public isIndividual: boolean;
    public isLicensedBroker: boolean;
    public isFinancialInstitute: boolean;
    public isNewCar: boolean;
    public isUsedCar: boolean;
    public isBoth: boolean;
    //Need these in server
    public afslNo: string;//Australian Financial Service Number
    public authRepNo: string;//Authorised Rep Number
    public aclNo: string; //Australian credi licence no
    public brokerLicenceNo: string;
    public insVehicles: Array<string> = [];//type of vehicles (car,boat,...)
    public isLoanNewVeh: boolean;
    public isLoanUsedVeh: boolean;
}

export class VehicleDealerInsuranceDetails {

    public vehicleDealerInsuranceDetailId: number;
    public vehicleType: string;
    public isIndividual: boolean;
    public isLicensedBroker: boolean;
    public isInsuranceInstitute: boolean;
    public isNewCar: boolean;
    public isUsedCar: boolean;
    public isBoth: boolean;
    //New fields for insurance
    public afslNo: string;//Australian Financial Service Number
    public authRepNo: string;//Authorised Rep Number
    public aclNo: string; //Australian credi licence no
    public brokerLicenceNo: string;
    public insVehicles: Array<string>;//type of vehicles (car,boat,...)
    public isComprehensive: boolean;
    public isThirdParty: boolean;
    public isThirdProperty: boolean;
}

export class VehicleDealerServMaintDetails {

    private vehicleDealerServMaintDetailId: number;

    private vehicleType: string;
    private isIndividual: boolean;
    private isLicensedBroker: boolean;
    private isServMaintInstitute: boolean;
    private isNewCar: boolean;
    private isUsedCar: boolean;
    private isBoth: boolean;
    //update in server
    public isPetrol: boolean;
    public isDiesel: boolean;
    public isElectric: boolean;
    public All: boolean;
    public clientPlaceDriveYes: boolean;
    public clientPlaceDriveMaybe: boolean;
    public clientPlaceDriveNo: boolean;
    public roadAssistance: boolean;
}