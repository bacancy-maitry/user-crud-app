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

  waitingMessageData: string = "Please Wait while we are getting user details...";
  flagVar: boolean = false; // Flag Variable

  allData: UserDataInterface;
  totalPages: Array<number> = [];

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() {
    this.showUserList(1);
  }

  // ListUsers
  showUserList(pageNo: number) {
    console.log("Before Response:::", this.allData);

    this.mainService.getUserList(pageNo).subscribe((response) => {
      if (response && response.data) {
        this.allData = response;
        console.log("After Response:::", this.allData);

        for (let i = 0; i < this.allData.total_pages; i++) {
          this.totalPages[i] = i + 1;
        }
        this.flagVar = true;
      }
    },
      (error) => {
        console.error("Error!");
        this.flagVar = false;
        this.waitingMessageData = "Please Check your Internet connection...";
      });
  }

  //DeleteUser
  deleteUserData(data) {
    console.log("Delete User:::");
    let confirmMessage = confirm("Are you sure you want to delete this user?");
    if (confirmMessage == true) {
      this.allData.data = this.allData.data.filter(response => response !== data);
      this.mainService.deleteUserData(data).subscribe();
      return true;
    }
    else {
      return false;
    }

  }
}