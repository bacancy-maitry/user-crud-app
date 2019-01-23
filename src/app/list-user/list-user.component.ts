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

  displayUserList: boolean = true;

  fetchMessageDisplay = "Fetching Data...";
  fetchMessage: boolean = false;

  displayDataArray: Array<UserData> = [];
  allData: UserDataInterface;

  totalPages:Array<number> = [];
  i:number;

  userForm: boolean = false;

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() { 
    this.showUserList(1);
    this.fetchMessage = false; 
  }

  // ListUsers
  showUserList(pageNo: number) {
    this.fetchMessage = true;
    this.mainService.getUserList(pageNo).subscribe(response => {
      console.log("Page 1 Data::" , response);
      if(response && response.data){
        this.allData = response;
        console.log("All Data::" , this.allData);

        this.displayDataArray = this.allData.data;
        console.log("Data Array:: ", this.displayDataArray);

        for(this.i=0; this.i<this.allData.total_pages; this.i++){
          this.totalPages[this.i] = this.i + 1;
        }
        this.waitingMessage = true;
      }
      this.fetchMessage = false;
    });
    this.displayUserList = true;
    this.userForm = false;
  }

  addUserForm(){
    console.log("Add USer:::");
    this.displayUserList = false;
    this.userForm = true;
  }

}