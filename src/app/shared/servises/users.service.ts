import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
	constructor(private http: HttpClient) {}

	getUserByEmail(email: string) { //: Observable<User>
		return this.http.get(`http://localhost:3000/users?email=${email}`);
	}
	createNewUser(user: User) {//: Observable<User>
		return this.http.post(`http://localhost:3000/users`, user);
	}
}