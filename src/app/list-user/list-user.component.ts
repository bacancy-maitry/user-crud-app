import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main.service';
import { UserDataInterface, UserData } from '../user-data-interface';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  // waitingMessageData: string = "Please Wait while we are getting user details...";
  waitingMessage: boolean = false;
  displayUserList: boolean = true;
  fetchMessage: boolean = false;

  displayDataArray: Array<UserData> = [];
  allData: UserDataInterface;
  totalPages: Array<number> = [];

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() {
    this.showUserList(1);
    this.fetchMessage = false;
  }

  // ListUsers
  showUserList(pageNo: number) {
    this.fetchMessage = true;

    this.mainService.getUserList(pageNo).subscribe(response => {
      if (response && response.data) {
        this.allData = response;
        this.displayDataArray = this.allData.data;
        for (let i = 0; i < this.allData.total_pages; i++) {
          this.totalPages[i] = i + 1;
        }

        this.waitingMessage = true;
      }
      this.fetchMessage = false;
    },
      error => {
        console.error("Error!");
        this.waitingMessage = true;
        this.displayUserList = false;
        // this.waitingMessageData = "Please Check your Internet connection...";
      });

    this.displayUserList = true;
  }

  //DeleteUser
  deleteUserData(data) {
    console.log("Delete User:::");

    let confirmMessage = confirm("Are you sure you want to delete this user?");
    if (confirmMessage == true) {
      this.displayDataArray = this.displayDataArray.filter(response => response !== data);
      this.mainService.deleteUserData(data).subscribe();
      return true;
    }
    else {
      return false;
    }

  }
}