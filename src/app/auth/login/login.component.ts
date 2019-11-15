import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/servises/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/servises/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'edu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //важно определить message до обработки сообщ из регистр
    this.message = new Message('danger', '');    
    //обработка сообщения из регистрации
    this.route.queryParams
    .subscribe((params: Params)=> {
      if(params['nowCanLogin']) {
        this.showMessage({
          text: 'Теперь вы можете войти!', 
          type: 'success'
        });
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
  private showMessage(message: Message) {
    this.message = message;
    //убираю по таймауту
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }
  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
    .subscribe((user: User)=> {
      if(user[0]) {
        if(user[0].password === formData.password) {
          //очищаем ошибку если была
          this.message.text = '';
          //добавляем в localStorage
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          // this.router.navigate([]);
        } else {
          this.showMessage({
            text: 'Пароль не верный',
            type: 'danger'
          });
        }
      } else {
        this.showMessage({
          text: 'Такого пользователя не существует',
          type: 'danger'        
        });
      }
    });
  }

}
