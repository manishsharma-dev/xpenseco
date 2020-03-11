
  export interface Master {
    CityName:string;
    CityCode: string;
    AreaFlag: string;
    AreaCode: string;
    ChkInDate: string;
    ChkOutDate: string;
    Duration: string;
    CountryName: any;
    CountryCode: string;
    Currency: string;
    LangCode: string;
    Nationality: string;
    GMax_Price: any;
    GMin_Price: any;
    LanCount: any;
}

export interface Authentication {
    Channel: string;
    CompanyId: string;
    ServiceType: string;
    ClientId: string;
    SessionId: string;
    UserId: string;
    RefNo: string;
}

export interface HotelBoard {
    Type: string;
    Code: string;
}

export interface Filter {
    StarCategory: string;
    HotelName: string;
    AvailableOnly: string;
}

export interface Child {
    ChildAge: string;
}

export interface Children {
    Child: Child[];
}

export class Room {
    Adult: number;
    RoomType: string;
    Children: Children;
}

export class Rooms {
    Room: Room[];
}


export class RootObject {
    Master: Master;
    Authentication: Authentication;
    HotelBoard: HotelBoard;
    Filter: Filter;
    Rooms: Rooms;
}



