import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { UserDataInterface, UserData } from '../user-data-interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  editDataShow: boolean = false
  showData: UserData;
  id: string;

  userObj = {
    id: null,
    first_name: null,
    last_name: null,
    avatar: null,
  }

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.editDataShow = true;
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id']

      if (this.id === "new") {
        console.log("Add Mode");
        this.showData = this.userObj;
        this.editDataShow = false;
      }
      else {
        console.log("Edit Mode");
        this.showData = {
          id: this.userObj.id,
          first_name: this.userObj.first_name,
          last_name: this.userObj.last_name,
          avatar: this.userObj.avatar,
        }
        this.editDataShow = true;
        this.mainService.getUserDataById(this.id)
          .subscribe((response: any) => {
            this.showData = response.data;
            console.log("In ShowData", this.showData);
          });
      }
    });
  }

  addUserRecord() {
    if (this.id == "new") {
      console.log("Add Record Condition");
      this.mainService.addUserData(this.showData)
        .subscribe(response => {
          console.log("User Response:::", response);
          this.router.navigateByUrl("/recordlist");
        });
    }
    else {
      console.log("Else Block Edit");
      this.mainService.updateUserData(this.showData)
        .subscribe(response => {
          console.log("Edited Data:::", response);
          this.router.navigateByUrl("/recordlist");
        });
    }
  }

}