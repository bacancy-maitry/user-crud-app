import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { UserDataInterface, UserData } from '../user-data-interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  showData: UserData;
  displayEditData: boolean = true;
  id: string;
  submitButton: string = "Submit";

  userObj = {
    id: null,
    first_name: null,
    last_name: null,
    avatar: null,
    a: null,
  }

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id']

      if (this.id === "new") {
        console.log("Add Mode");
        this.displayEditData = false;
        this.showData = this.userObj;
      }
      else {
        console.log("Edit Mode");
        this.showData = {
          id: this.userObj.id,
          first_name: this.userObj.first_name,
          last_name: this.userObj.last_name,
          avatar: this.userObj.avatar,
        }

        this.mainService.getUserDataById(this.id)
          .subscribe((response: any) => {
            this.showData = response.data;
            console.log("In ShowData", this.showData);
          });

      }
    });
  }

  addUserRecord() {
    if (this.displayEditData == false) {
      this.submitButton = "Please Wait...";
      this.mainService.addUserData(this.showData).subscribe(response => {
        this.showData = response;
        console.log("User Added", response);
        this.submitButton = "Submit";
      });
      console.log("Add Record Condition");
    }
    else {
      console.log("Else Block Edit");
      this.mainService.updateUserData(this.showData)
        .subscribe(response => console.log("Edited Data", response));
    }
  }

}