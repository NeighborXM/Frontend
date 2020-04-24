import $ from 'jquery';
var apiUrl = "http://localhost:5000";
export class apiController {
    getUser (userId): UserObject {
        $.get()
        return null;
    }
}

export class UserObject {
    getNeed (needId): NeedObject {
        return null;
    }
}

export class NeedObject {
    id: string;
    firstName;
    lastName;
    email;
    phoneNumber;
    location;
    timeDate: Date; //Auto-populated
    /**
     * Request Types (in order):
     *  Food Assistance
     *  Emergency Assistance
     *  Mental Health
     *  Pastoral Care
     *  Prayer
     */
    requestType: number
    description: string //100 characters or less
}

export default apiController;