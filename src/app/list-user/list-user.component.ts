import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main.service';
import { UserDataInterface, UserData } from '../user-data-interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  waitingMessage: boolean = false;
  displayUserList: boolean = true;
  fetchMessage: boolean = false;

  displayDataArray: Array<UserData> = [];
  allData: UserDataInterface;
  totalPages:Array<number> = [];

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() { 
    this.showUserList(1);
    this.fetchMessage = false; 
  }

  // ListUsers
  showUserList(pageNo: number) {
    this.fetchMessage = true;
    this.mainService.getUserList(pageNo).subscribe(response => {
      if(response && response.data){
        this.allData = response;
        this.displayDataArray = this.allData.data;
        console.log("Data Array:::", this.displayDataArray);
        for(let i=0; i<this.allData.total_pages; i++){
          this.totalPages[i] = i + 1;
        }

        this.waitingMessage = true;
      }
      this.fetchMessage = false;
    });
    this.displayUserList = true;
  }
}