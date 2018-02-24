import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';
import {DateService} from "../../services/date.service";

@Component({
    selector: 'app-manager-dashboard',
    templateUrl: './manager-dashboard.component.html',
    styleUrls: ['./manager-dashboard.component.css'],
    providers: [DateService]
})
export class ManagerDashboardComponent implements OnInit {

    public dateService = DateService;

    tours = {
        open: [],
        pending: [],
        requestedInformation: [],
        rejected: [],
        approved: []
    };

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.getTours();
    }

    getTours() {
        let url: string;
        if( localStorage.getItem("userRole") == "manager" )
            url = environment.apiUrl + "tour/manager/" + localStorage.getItem("userToken") + "/all";
        else
            url = environment.apiUrl + "tour/fmanager/" + localStorage.getItem("userToken") + "/all";
        this.httpClient.get(url).subscribe(
            (data: any[]) => {
                data['tours'].forEach(
                    (tour) => {
                        if (tour.status == "approved") {
                            this.tours.approved.push(tour);
                        } else if (tour.status == "pending") {
                            if( localStorage.getItem("userRole") == "finance_manager" )
                                this.tours.open.push(tour);
                            else
                                this.tours.pending.push(tour);
                        } else if (tour.status == "request_information") {
                            this.tours.requestedInformation.push(tour);
                        } else if (tour.status == "rejected") {
                            this.tours.rejected.push(tour);
                        } else {
                            this.tours.open.push(tour);
                        }

                    }
                );
            }
        );
    }

}
