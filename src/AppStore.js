import {action, makeObservable, observable} from 'mobx';
import s from './components/Passwords/Passwords.module.css';

const axios = require('axios');

class AppStore {
	company = false

	surname = ''
	name = ''
	patronymic = ''
	password = ''
	secondPassword = ''
	phone = ''
	email = ''
	inn = ''

	surnameValid = false
	nameValid = false
	passwordValid = false
	secondPasswordValid = false
	phoneValid = false
	emailValid = false
	innValid = false
	formValid = false
	posting = false

	passwordInputType = 'password'
	progressPassword = ''

	formErrors = {
		surname: '',
		name: 'Имя должно быть заполнено',
		password: 'Пароль слишком короткий или не содержит ни одной цифры',
		secondPassword: '',
		phone: 'Телефон некорректен',
		email: '',
		inn: ''
	}

	constructor() {
		makeObservable(this, {
			company: observable,

			surname: observable,
			name: observable,
			patronymic: observable,
			password: observable,
			secondPassword: observable,
			phone: observable,
			email: observable,
			inn: observable,

			surnameValid: observable,
			nameValid: observable,
			passwordValid: observable,
			secondPasswordValid: observable,
			phoneValid: observable,
			emailValid: observable,
			innValid: observable,
			formValid: observable,
			posting: observable,

			passwordInputType: observable,
			progressPassword: observable,
			formErrors: observable,

			validateAll: action,
			changeUser: action,
			handleUserInput: action,
			maskPhone: action,
			setProgressPassword: action,
			changePasswordType: action,
			validateField: action,
			validateForm: action,
			errorClass: action,
			foundDuplicatePhone: action,
			resetData: action,
			updatePosting: action,
			post: action
		})

		this.handleUserInput = this.handleUserInput.bind(this)
		this.changePasswordType = this.changePasswordType.bind(this)
		this.foundDuplicatePhone = this.foundDuplicatePhone.bind(this)
		this.post = this.post.bind(this)
	}

	validateAll() {
		this.validateField('surname', this.surname)
		this.validateField('name', this.name)
		this.validateField('password', this.password)
		this.validateField('secondPassword', this.secondPassword)
		this.validateField('phone', this.phone)
		this.validateField('email', this.email)
		this.validateField('inn', this.inn)
	}

	changeUser = () => {
		this.company = !this.company
		this.validateAll()
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'phone') {
			this.maskPhone(e)
		} else {
			this[name] = value;
			if (name === 'password') {
				this.setProgressPassword(value)
			}
		}
		this.validateAll()
	}

	maskPhone(e) {
		let val = e.target.value;
		if (val.length === 0) {
			this.phone = '';
		} else {
			if (val.length > 2) {
				val = val.slice(3)
			}
			val = val.replace(/ /gm, '');
			val = val.replace(/\D/g, '');
			if (val.length > 0 && val.length <= 10) {
				let num = `+7 (${val.substring(0, 3)}) ${val.substring(3, 6)}-${val.substring(6, 8)}-${val.substring(8, val.length)}`;
				this.phone = num.trim();
			}
		}
	}

	setProgressPassword(value) {
		if (value) {
			if (value.length <= 4) {
				this.progressPassword = s.progress__item_1
			} else if (value.length >= 5 && value.length < 9) {
				this.progressPassword = s.progress__item_2
			} else {
				this.progressPassword = s.progress__item_3
			}
		}
	}

	changePasswordType() {
		if (this.passwordInputType === 'text') {
			this.passwordInputType = 'password'
		} else {
			this.passwordInputType = 'text'
		}
	}

	validateField(fieldName, value) {
		let formErrors = this.formErrors,
			company = this.company,
			surnameValid = this.surnameValid,
			nameValid = this.nameValid,
			passwordValid = this.passwordValid,
			secondPasswordValid = this.secondPasswordValid,
			phoneValid = this.phoneValid,
			emailValid = this.emailValid,
			innValid = this.innValid;

		switch (fieldName) {
			case 'surname':
				surnameValid = !company ? 1 : (value.length > 0);
				formErrors.surname = surnameValid ? '' : 'Фамилия должна быть заполнена';
				this.surnameValid = surnameValid
				break;
			case 'name':
				nameValid = value.length > 0;
				formErrors.name = nameValid ? '' : 'Имя должно быть заполнено'
				this.nameValid = nameValid
				break;
			case 'password':
				passwordValid = (value.length >= 6) && value.match(/(?=.*[0-9])/g);
				formErrors.password = passwordValid ? '' : 'Пароль слишком короткий или не содержит ни одной цифры';
				this.passwordValid = passwordValid
				break;
			case 'secondPassword':
				secondPasswordValid = (this.password === this.secondPassword);
				formErrors.secondPassword = secondPasswordValid ? '' : 'Пароли не совпадают';
				this.secondPasswordValid = secondPasswordValid
				break;
			case 'phone':
				phoneValid = value.length === 18;
				formErrors.phone = phoneValid ? '' : 'Телефон некорректен';
				this.phoneValid = phoneValid
				break;
			case 'email':
				if (!this.company && !value.length) {
					emailValid = 1
				} else {
					emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				}
				formErrors.email = emailValid ? '' : 'E-mail некорректен';
				this.emailValid = emailValid
				break;
			case 'inn':
				innValid = !this.company ? 1 : value.match(/^[0-9]{10}$/i);
				formErrors.inn = innValid ? '' : 'ИНН некорректен';
				this.innValid = innValid
				break;
			default:
				break;
		}
		this.formErrors = {
			surname: formErrors.surname,
			name: formErrors.name,
			password: formErrors.password,
			secondPassword: formErrors.secondPassword,
			phone: formErrors.phone,
			email: formErrors.email,
			inn: formErrors.inn
		}
		this.validateForm()
	}

	validateForm() {
		if (this.company) {
			this.formValid =
				this.nameValid && this.name.length &&
				this.surnameValid && this.surname.length &&
				this.passwordValid && this.password.length &&
				this.secondPasswordValid && this.secondPassword.length &&
				this.phoneValid && this.phone.length &&
				this.emailValid && this.email.length &&
				this.innValid && this.inn.length
		} else {
			this.formValid =
				this.nameValid && this.name.length &&
				this.passwordValid && this.password.length &&
				this.secondPasswordValid && this.secondPassword.length &&
				this.phoneValid && this.phone.length
		}
	}


	errorClass(error) {
		return error.length
	}

	foundDuplicatePhone(e) {
		e.preventDefault();
		let fieldValidationErrors = this.formErrors;
		fieldValidationErrors.phone = 'Пользователь с таким номером телефона уже зарегистрирован.'
		this.formErrors = fieldValidationErrors
		this.validateForm()
	}

	resetData() {
		this.surname = ''
		this.name = ''
		this.patronymic = ''
		this.password = ''
		this.secondPassword = ''
		this.phone = ''
		this.email = ''
		this.inn = ''
		this.posting = false
		this.validateAll()
		this.validateForm()
	}

	updatePosting() {
		this.posting = true
	}

	async post(e) {
		e.preventDefault()
		this.updatePosting()
		try {
			await axios
				.post('http://localhost:5000/users', {
					'surname': this.surname,
					'name': this.name,
					'patronymic': this.patronymic,
					'password': this.password,
					'phone': this.phone,
					'email': this.email,
					'inn': this.inn
				})
				.then((response) => {
					console.log(response);
					this.resetData()
				});
		} catch (error) {
			console.error(error);
		}
	}
}

export default AppStore
