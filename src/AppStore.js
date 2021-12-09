import {action, makeObservable, observable} from 'mobx';
import s from './components/Passwords/Passwords.module.css';

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

	passwordInputType = 'password'
	progressPassword = ''

	formErrors = {
		surname: '',
		name: '',
		password: '',
		secondPassword: '',
		phone: '',
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

			passwordInputType: observable,
			progressPassword: observable,
			formErrors: observable,

			changeUser: action,
			handleUserInput: action,
			maskPhone: action,
			setProgressPassword: action,
			changePasswordType: action,
			validateField: action,
			validateForm: action,
			errorClass: action,
			foundDuplicatePhone: action
		})
		this.handleUserInput = this.handleUserInput.bind(this)
		this.changePasswordType = this.changePasswordType.bind(this)
		this.validateForm = this.validateForm.bind(this)
		this.foundDuplicatePhone = this.foundDuplicatePhone.bind(this)
	}

	changeUser = () => {
		this.company = !this.company
		this.validateField('surname', this.surname)
		this.validateField('name', this.name)
		this.validateField('password', this.password)
		this.validateField('secondPassword', this.secondPassword)
		this.validateField('phone', this.phone)
		this.validateField('email', this.email)
		this.validateField('inn', this.inn)
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'phone') {
			this.maskPhone(e)
		} else {
			this[name] = value;
			this.validateField(name, value)
			if (name === 'password') {
				this.setProgressPassword(value)
			}
		}
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
				this.validateField('phone', num)
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
		let fieldValidationErrors = this.formErrors,
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
				fieldValidationErrors.surname = surnameValid ? '' : 'Фамилия должна быть заполнена';
				break;
			case 'name':
				nameValid = value.length > 0;
				fieldValidationErrors.name = nameValid ? '' : 'Имя должно быть заполнено'
				break;
			case 'password':
			case 'secondPassword':
				passwordValid = (value.length >= 6) && value.match(/(?=.*[0-9])/g);
				fieldValidationErrors.password = passwordValid ? '' : 'Пароль слишком короткий или не содержит ни одной цифры';
				secondPasswordValid = (this.password === this.secondPassword);
				fieldValidationErrors.secondPassword = secondPasswordValid ? '' : 'Пароли не совпадают';
				break;
			case 'phone':
				phoneValid = value.length === 18;
				fieldValidationErrors.phone = phoneValid ? '' : 'Телефон некорректен';
				break;
			case 'email':
				if (!this.company && !value.length) {
					emailValid = 1
				} else {
					emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				}
				fieldValidationErrors.email = emailValid ? '' : 'E-mail некорректен';
				break;
			case 'inn':
				innValid = !this.company ? 1 : value.match(/^[0-9]{10}$/i);
				fieldValidationErrors.inn = innValid ? '' : 'ИНН некорректен';
				break;
			default:
				break;
		}
		this.formErrors = fieldValidationErrors
		this.surnameValid = surnameValid
		this.nameValid = nameValid
		this.passwordValid = passwordValid
		this.secondPasswordValid = secondPasswordValid
		this.phoneValid = phoneValid
		this.emailValid = emailValid
		this.innValid = innValid
		this.validateForm()
	}

	validateForm() {
		if (this.company) {
			this.formValid = this.nameValid && this.surnameValid && this.passwordValid && this.secondPasswordValid && this.phoneValid && this.emailValid && this.innValid
		} else {
			this.formValid = this.nameValid && this.passwordValid && this.secondPasswordValid && this.phoneValid
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
}

export default AppStore
