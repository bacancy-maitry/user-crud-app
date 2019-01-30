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
  allData: UserDataInterface;
  totalPages: Array<number> = [];

  loading: boolean = false;

  constructor(private http: HttpClient, private mainService: MainService) { }

  ngOnInit() {
    this.showUserList(1);
  }

  // ListUsers
  showUserList(pageNo: number) {
    this.loading = true;
    //Resoponse
    this.mainService.getUserList(pageNo).subscribe((response) => {
      if (response && response.data) {
        this.allData = response;
        for (let i = 0; i < this.allData.total_pages; i++) {
          this.totalPages[i] = i + 1;
        }
        this.loading = false;
      }
    },
      //Error Message
      (error) => {
        console.error("Error!", error);
        this.loading = true;
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