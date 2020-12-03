import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-winner-ack-list',
  templateUrl: './winner-ack-list.component.html',
  styleUrls: ['./winner-ack-list.component.css']
})
export class WinnerAckListComponent implements OnInit {

  mean = null;
  stdDev = null;
  list = null;


  constructor(private http: HttpClient, private router: Router, private appService: AppService) {
    this.mean = this.router.getCurrentNavigation().extras.state.mean;
    this.stdDev = this.router.getCurrentNavigation().extras.state.std;
  }

  onClick(param) {
    console.log('In Angular : Now transporting to the read_survey with param state ' + param);
    this.router.navigate(['/readSurvey'], { state: { studentid: param } });
  }

  ngOnInit(): void {
      this.appService.getStudentsID().subscribe(data => {
    this.list = data;
    });
  }
}
