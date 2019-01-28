import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { UserDataInterface, UserData } from '../user-data-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  showData: UserData[];
  displayEditData: boolean = true;
  id: string;
  submitButton: string = "Submit";

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];

      if (this.id == "new") {
        console.log("Add Mode");
        this.displayEditData = false;
        this.showData = null;
      }
      else {
        console.log("Edit Mode");
        this.mainService.getUserDataById(this.id)
          .subscribe(response => this.showData = response.data);
      }
    });
  }

  addUserRecord(first_name: string, last_name: string) {
    if (this.displayEditData == false) {
      this.mainService.addUserData({ first_name, last_name } as UserData)
        .subscribe(response => console.log("Record Add:::", response));
      this.submitButton = "Please Wait...";
    }
    else {
      console.log("Hello");
    }
  }

  // addUserRecord() {
  //   //  this.userService.postUser(this.userEditObject).subscribe(postData => {
  //   // this.userEditObject = postData;
  //   this.mainService.addUserData().subscribe(response => {
  //     console.log(response);
  //   });
  // }

}
