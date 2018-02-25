import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {DateService} from "../services/date.service";
import { TourEntity } from "../model/tour-entity";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tourStatus = "approve";
  userRole: string = localStorage.getItem("userRole");
  public dateService = DateService;
  tourId: number;
  private sub: any;
  tour: TourEntity;
  financeManagers = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tourId = +params['id']; // (+) converts string 'id' to a number
      this.getTour();
    });
    if( localStorage.getItem("userRole") == "manager" ) {
      this.getAllFinanceManagers();
    }
  }

  getTour() {
    this.httpClient.get(environment.apiUrl + "tour/" + this.tourId).subscribe(
        (data:any[]) => {
          console.log("TOUR", data);
          this.tour = data;
          this.tourStatus = this.tour['status'];
          if( !this.tour["financeManagerId"] || (this.tour["financeManagerId"] && this.tour["financeManagerId"] == 0) )
            this.tour["financeManagerId"] = this.financeManagers[0].personId;
        }
    );
  }

  getAllFinanceManagers() {
    this.httpClient.get(environment.apiUrl + "financeManagers").subscribe(
        (data:any[]) => {
          this.financeManagers = data["persons"];
          if( !this.tour["financeManagerId"] || (this.tour["financeManagerId"] && this.tour["financeManagerId"] == 0) )
            this.tour["financeManagerId"] = this.financeManagers[0].personId;
        }
    );
  }

  updateTour() {

    if( localStorage.getItem("userRole") == "manager" && this.tourStatus == "approved" ) {
      this.tour['status'] = 'pending';
    } else {
      this.tour['status'] = this.tourStatus;
    }
    this.httpClient.post(environment.apiUrl + "tour/" + this.tourId + "/update", this.tour).subscribe(
        (data:any[]) => {
          console.log(data);
          this.router.navigate(['/manager/dashboard']);
        }
    );
    return false;
  }
}
