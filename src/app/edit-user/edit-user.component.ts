import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  _id: Number = null;
  userForm: FormGroup;
  name: String = '';
  gender: String = '';
  email: String = '';
  birthDate: Date = null;
  naturality: String = '';
  nationality: String = '';
  cpf: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'id': [this._id],
      'name' : [null, Validators.required],
      'gender' : [null],
      'email' : [null, Validators.email],
      'birthDate' : [null, Validators.required],
      'naturality' : [null],
      'nationality' : [null],
      'cpf' : [null, Validators.required]
    });
  }

  getUser(id) {
    this.api.getUser(id)
    .subscribe(data => {
      this._id = data.id;
      this.userForm.setValue({
        id: data.id,
        name: data.name,
        gender: data.gender,
        email: data.email,
        birthDate: data.birthDate,
        naturality: data.naturality,
        nationality: data.nationality,
        cpf: data.cpf
      });
    });
  }

  updateUser(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateUser(form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
