import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newTour = {
    /*title: "",
    purpose: "",
    startDate: "",
    endDate: "",
    modeOfTravel: "",
    ticketCost: 0,
    airportCabHomeCityCost: 0,
    airportCabDestinationCityCost: 0,
    hotelCost: 0,
    otherConveyanceCost: 0,
    status: "open",*/
    airportCabDestinationCityCost: "60",
    airportCabHomeCityCost: "75",
    endDate: "2/3/2018",
    hotelCost: "500",
    modeOfTravel: "Airplane",
    otherConveyanceCost: "100",
    purpose: "Purpose",
    startDate: "2/3/2018",
    status: "open",
    ticketCost: "500",
    title: "Tour",
    employeeId: localStorage.getItem("userToken"),
    managerId: 0
  };

  myTours = {
    open: [],
    pending: [],
    approved: [],
    requestedInformation: [],
    rejected: []
  };

  managers = [];

  showRequestFormFlag = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllTours();
    this.getAllManagers();
  }

  showNewRequestForm() {
    this.showRequestFormFlag = true;
    return false;
  }

  getAllTours() {
    this.httpClient.get(environment.apiUrl + "tour/employee/" + localStorage.getItem("userToken") + "/all").subscribe(
        (data:any[]) => {
          data['tours'].forEach(
              (tour) => {
                if( tour.status == "approved" )
                  this.myTours.approved.push(tour);
                else if(tour.status == "pending")
                  this.myTours.pending.push(tour);
                else if(tour.status == "request_information")
                    this.myTours.requestedInformation.push(tour);
                else if( tour.status == "rejected" )
                  this.myTours.rejected.push(tour);
                else
                  this.myTours.open.push(tour);
              }
          );
        }
    );
  }

  createNewTour() {
    this.newTour.startDate = new Date(this.newTour.startDate).toISOString().slice(0, 19).replace('T', ' ');
    this.newTour.endDate = new Date(this.newTour.endDate).toISOString().slice(0, 19).replace('T', ' ');
    this.httpClient.post(environment.apiUrl + "tour/create", this.newTour).subscribe(
        (data:any[]) => {
            this.myTours.open.push(data);
            this.showRequestFormFlag = false;
            this.newTour.title = "";
            this.newTour.purpose = "";
            this.newTour.startDate = "";
            this.newTour.endDate = "";
            this.newTour.modeOfTravel = "";
            this.newTour.ticketCost = "";
            this.newTour.airportCabHomeCityCost = "";
            this.newTour.airportCabDestinationCityCost = "";
            this.newTour.hotelCost = "";
            this.newTour.otherConveyanceCost = "";
            this.newTour.status = "open";
        }
    );
    //console.log(this.newTour);
    return false;
  }

  getAllManagers() {
    this.httpClient.get(environment.apiUrl + "managers").subscribe(
        (data:any[]) => {
          this.managers = data['persons'];
          this.newTour.managerId = this.managers[0].id;
        }
    );
  }

  public dateService = DateService;

}
