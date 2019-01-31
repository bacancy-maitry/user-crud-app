import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { UserData } from '../user-data-interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  pleaseWait: boolean = false
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

  //Default if Url id is New or Edit data it
  getUserData() {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
      if (this.id === "new") {
        this.showData = this.userObj;
      }
      else {
        this.showData = {
          id: this.userObj.id,
          first_name: this.userObj.first_name,
          last_name: this.userObj.last_name,
          avatar: this.userObj.avatar,
        }
        this.mainService.getUserDataById(this.id)
          .subscribe((response: any) => {
            this.showData = response.data;
          });
      }
    });
  }

  //Add or Edit the User Record
  addEditUserRecord() {
    this.pleaseWait = true;
    if (this.id == "new") {
      this.mainService.addUserData(this.showData)
        .subscribe(response => {
          this.showData = response;
          this.pleaseWait = false;
          this.router.navigateByUrl("/recordlist");
        });
    }
    else {
      this.mainService.updateUserData(this.showData)
        .subscribe(response => {
          this.showData = response;
          this.pleaseWait = false;
          this.router.navigateByUrl("/recordlist");
        });
    }
  }

}