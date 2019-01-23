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

  waitingMessageDisplay = "Please Wait while we are getting user details...";
  waitingMessage: boolean = false;

  fetchMessageDisplay = "Fetching Data...";
  fetchMessage: boolean = false;

  displayDataArray: Array<UserData> = [];
  allData: UserDataInterface;

  totalPage:number;

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() { 
    this.showUserList(1);
    this.fetchMessage = false; 
  }

  
  showUserList(pageNo: number) {
    this.fetchMessage = true; 

    this.mainService.getUserList(pageNo).subscribe(response => {
      console.log("Page 1 Data::" , response);
      if(response && response.data){
        this.allData = response;
        console.log("All Data::" , this.allData);

        this.displayDataArray = this.allData.data;
        console.log("Data Array:: ", this.displayDataArray);

        this.totalPage = this.allData.total_pages;

        this.waitingMessage = true;
      }
      this.fetchMessage = false;
    });
  }

  addUserForm(){
    console.log("Add USer:::");
  }

}