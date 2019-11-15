export class AuthService {
	//переменная_поле для хранения состояния: зарегистрирован
	//пользователь или нет
	private isAuthentificated = false;
	login() {
		this.isAuthentificated = true;
	}
	logout() {
		this.isAuthentificated = false;
		window.localStorage.clear();
	}
	isLoggedIn(): boolean {
		return this.isAuthentificated;
	}

}