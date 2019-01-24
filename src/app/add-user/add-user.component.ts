import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id === "1"){
      console.log("Edit Mode");
    }
    console.log("Get id:::",id);
  }

}
