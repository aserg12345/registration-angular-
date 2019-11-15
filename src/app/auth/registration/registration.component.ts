import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/servises/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'edu-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
          Validators.required,
          Validators.email
        ],
        this.forbiddenEmails.bind(this)
      ),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue     
      ]),     
    });
  }
  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUser(user)
    .subscribe(()=> {
      this.router.navigate(['/login'], {
        //сообщение о том что можно войти
        queryParams: {
          nowCanLogin: true          
        }

      });
    });
  }
  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.usersService.getUserByEmail(control.value)
      .subscribe((user)=>{
        if(user[0]) {
          //здесь forbiddenEmail это поле
          //не функция
          resolve({forbiddenEmail: true});
          // console.log(user);
        } else {
          // console.log('незанят')
          resolve(null);
        }
      });
    });
  }

}
