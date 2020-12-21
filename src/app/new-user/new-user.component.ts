import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'gender' : [null],
      'email' : [null, Validators.email],
      'birthDate' : [null, Validators.required],
      'naturality' : [null],
      'nationality' : [null],
      'cpf' : [null, Validators.required]
    });
  }

   addUser(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addUser(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
