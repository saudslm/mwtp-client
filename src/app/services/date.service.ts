import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  public static formatDate = function(date){
    date = date.replace(/(.+) (.+)/, "$1T$2Z");// + " UTC";

    let myDate: any = new Date(); //My current time
    let ukDate: any = new Date(new Date().toLocaleString("en-UK",{timeZone:'Europe/London'})); //London current time


    let timeDifference: any = myDate - ukDate;
    let differenceInMinutes: any = Math.floor(timeDifference/(1000*60));

    let formattedDate = new Date(date);
    formattedDate.setMinutes(formattedDate.getMinutes()+formattedDate.getTimezoneOffset()+differenceInMinutes);

    return formattedDate.getTime();
  }
}
