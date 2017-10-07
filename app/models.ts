import {
    Dealer, VehicleDealerAreaOfOperPostCode, VehicleDealerAreaOfOperRegion, VehicleDealerAreaOfOperState, VehicleDealerDetails
    , VehicleDealerFinanceDetails, VehicleDealerInsuranceDetails, VehicleDealerMakeList, VehicleDealerServMaintDetails
} from './servermodels';

export class dealerLeads {
    public displayName: string;
    public name: string;
    public icon: string;
    public leads: string;
    public value: string;
}
export class offering {
    public type: string;
    public displayName: string;
    public count: number;
    public leadCount: number;
    public leadName: string;
    public valueName: string;
    public isSubscribed: boolean;
    public source: string;
}
export class dealer {
    public basicInfo: basicInfo = new basicInfo();
    public contactDetails: contactDetails = new contactDetails();
    public make: Array<string> = [];
    public model: Array<string> = [];
    public areaofOperation: areaOperation = new areaOperation();
    public subscriptionType: string;
    public subscription: string;
    public service: VehicleDealerServMaintDetails;
    public finance: VehicleDealerFinanceDetails;
    public transport: Transport;
    public insurance: VehicleDealerInsuranceDetails;
}
export class dealerBasicInfo {
}
export class basicInfo {
    public vehicleType: string;
    public licenceABNNumber: string;
    public licenceNumber: string;
    public dealerShipName: string;
    public dealerGroupName: string;
    public suburb: string;
    public postCode: string;
    public state: string;
    public make: Array<string> = [];
    public model: Array<string> = [];
    public website: string;
    public address: string;
    public isNew: boolean;
    public isUsed: boolean;
}
export class Service {

    public isPetrol: boolean;
    public isDiesel: boolean;
    public isElectric: boolean;
    public All: boolean;
    public clientPlaceDriveYes: boolean;
    public clientPlaceDriveMaybe: boolean;
    public clientPlaceDriveNo: boolean;
    public roadAssistance: boolean;
}
export class Transport {
    public fromState: string;
    public toState: string;
    public fromRegion: string;
    public toRegion: string;
    public fromPost: string;
    public toPost: string;
    public stateRate: string;
    public regionRate: string;
    public postRate: string;
    public isStateRoute: boolean;
    public isRegionRoute: boolean;
    public isPostRoute: boolean;
}
export class Finance {
    public afslNo: string;//Australian Financial Service Number
    public authRepNo: string;//Authorised Rep Number
    public aclNo: string; //Australian credi licence no
    public brokerLicenceNo: string;
    public insVehicles: Array<string> = [];
    public isLoanNewVeh: boolean;
    public isLoanUsedVeh: boolean;
}
export class Insurance {
    public afslNo: string;//Australian Financial Service Number
    public authRepNo: string;//Authorised Rep Number
    public aclNo: string; //Australian credi licence no
    public brokerLicenceNo: string;
    public insVehicles: Array<string>;
    public isComprehensive: boolean;
    public isThirdParty: boolean;
    public isThirdProperty: boolean;
}
export class contactDetails {
    public contactPerson: string;
    public designation: string;
    public contactNumber1: string;
    public contactNumber2: string;
    public email: string;
    public additionalInfo: string;
    public dob: string;
    public lastName: string;
    public title: string;
}
export class areaOperation {
    public postCode: Array<string> = [];
    public state: Array<string> = [];
    public area: Array<string> = [];
}
export class resource {
    public contactDetails: contactDetails = new contactDetails();
    public employeeCode: string;
    public socialMedia: Array<socialMedia> = [];
    public id: string;
}

export class socialMedia {
    public name: string;
    public url: string;
}

export class inventory {

    public headerText: string;
    public vinNumber: string;
    public dealerStockNumber: string;
    //public isNewCar: boolean;
    //public isUsedCar: boolean;
    public inStock: boolean;
    public condition: string;
    public regNumber: string;
    public state: string;
    public regEndDate: string;
    public extColour: string;
    public intColour: string;
    public isRegistrationIncluded: boolean;
    public isRoadWorthIncluded: boolean;
    public isTestDrive: boolean;
    public features: Array<feature> = [];
    public banners: any = [];
    public photos: any = [];
    public isVehicleUsed: boolean;
    public additionalInfo: string;
    public minPrice: number;
    public maxPrice: number;
    public Price: number;
    public id: number;
}

export class SellVehicle {

    public headerText: string;
    public vinNumber: string;
    public dealerStockNumber: string;
    //public isNewCar: boolean;
    //public isUsedCar: boolean;
    public inStock: boolean;
    public condition: string;
    public regNumber: string;
    public state: string;
    public regEndDate: string;
    public extColour: string;
    public intColour: string;
    public isRoadWorthIncluded: boolean;
    public isTestDrive: boolean;
    public features: Array<feature> = [];
    public extras: any = [];
    public photos: any = [];
    public isVehicleUsed: boolean;
    public additionalInfo: string;
    public minPrice: number;
    public maxPrice: number;
    public Price: number;
    public id: number;
    public details: string;
    public isDemo: boolean;
    public negotiablePercent: number;
}

export class feature {

    public name: string;
    public isChecked: string;
}

export class subscription {
    public isNew: boolean = false;
    public isPreOwned: boolean = false;
    public isLease: boolean = false;
    public isFinance: boolean = false;
    public isInsurance: boolean = false;
    public isSM: boolean = false;
    public isTranssport: boolean = false;
    public isSpares: boolean = false;
    public isParking: boolean = false;
    public isFuel: boolean = false;
    public isOthers: boolean = false;
}

export class LeadDetails {
    public leadId: string;
    public generatedDate: string;
    public dealerStockNumber: string;
    //public isNewCar: boolean;
    //public isUsedCar: boolean;
    public makemodel: MakeModel = new MakeModel();
    public mainColour: string;
    public secondColour: string;
    public additionalDetails: string;
    public estimatedDate: string;

    public newused: string;
    public userinfocheck: UserInfoCheck = new UserInfoCheck();
    public usercontext: userContext = new userContext();
    public quotes: Array<Quote> = [];
}

export class Quote {
    public name: string;
    public quoteId: string;
    public driveAwayPrice: number;
    public actualValue: number;
    public autoscoopSaving: number;
    public offerEndDate: string;
    public quoteValidDate: string;
    public scoopStockNo: string;
    public dealerStockNo: string;
    public additions: any = [];
    public documents: any = [];
    public termsConditions: any = [];
    public appointments: any = [];
}

export class dealerInfo {
    public companyName: string;
    public contactNo: number;
    public address: string;
    public photo: string;
}
export class UserInfoCheck {
    public idCheck: string;
    public mobileCheck: string;
    public finance: string;
    public vehicleSellSwap: string;
    public creditcardCheck: string;
}
export class MakeModel {
    public isNew: boolean;
    public isUsed: boolean;
    public year: number;
    public make: string;
    public model: string;
    public autoscoopTrim: string;
    public variant: string;
}
export class userContext {
    public userId: string;
    public autoscoopId: string;

}
export class shareService {
    public isOpen: boolean = false;
    public static resources: Array<resource> = [];
    public static subscriptions: any = [];
    public static inventories: any = [];
    public defaultSubs: subscription = new subscription();
    public nav() {

    }
    public static makes: any = [
        "Abarth", "Audi",
        "BMW",
        "Ford",
        "Holden",
        "Holden SPV",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Isuzu",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Land Rover",
        "LDV",
        "Lexus",
        "Maserati",
        "Mazda",
        "Mercedes-Benz",
        "MINI",
        "Mitsubishi",
        "Nissan",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo"
    ];
    public static models: any = [
        "A1",
        "A3",
        "A4",
        "A6",
        "A7",
        "A8",
        "Q2",
        "Q3",
        "Q7",
        "R8",
        "RS",
        "RS6",
        "RS7",
        "S1",
        "S3",
        "S4",
        "S6",
        "S7",
        "S8",
        "SQ7",
        "TT"
    ];
    public states: any = [
        "ACT",
        "NSW",
        "NT",
        "QLD",
        "SA",
        "TAS",
        "VIC",
        "WA"
    ];
    public static regions: any = [
        "CANBERRA",
        "SOUTH CANBERRA",
        "NORTH CANBERRA",
        "WODEN VALLEY",
        "WESTON CREEK",
        "COREE",
        "BELCONNEN",
        "TUGGERANONG",
        "GUNGAHLIN"
    ];
    public static postcodes: any = [
        221,
        2600,
        2603,
        2604,
        2609
    ]
}