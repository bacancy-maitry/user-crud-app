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

  showData:any;
  displayEditData: boolean = true;

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if(id === "new"){
      console.log("Add Mode");
      this.displayEditData = false;
    }
    else{
      console.log("Edit Mode");
      this.mainService.getUserDataById(id).subscribe(response => console.log("Response:::",response.data));
      this.mainService.getUserDataById(id).subscribe(response => this.showData = response.data);
      console.log(this.showData);
    }
    console.log("Get id:::", id);
  }

}
