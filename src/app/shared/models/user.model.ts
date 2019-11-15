// описание модели юзера
export class User {
		// public email: string;
		// public password: string;
		// public name: string;
		// public id?: number;	
	constructor(
		public email: string,
		public password: string,
		public name: string,
		public id?: number	
	) {}
}