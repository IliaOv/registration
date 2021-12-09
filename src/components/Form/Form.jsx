import React, {Component} from 'react';
import Input from '../Input/Input';
import s from './Form.module.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ReactTooltip from 'react-tooltip';
import FormErrors from './FormErrors';

class Form extends Component {
	constructor(props) {
		super(props);

		this.changePasswordType = this.changePasswordType.bind(this)

		this.state = {
			company: false,
			surname: '',
			name: '',
			patronymic: '',
			password: '',
			secondPassword: '',
			phone: '',
			email: '',
			inn: '',
			formErrors: {
				surname: '',
				name: '',
				password: '',
				secondPassword: '',
				phone: '',
				email: '',
				inn: '',
			},
			surnameValid: false,
			nameValid: false,
			passwordValid: false,
			secondPasswordValid: false,
			phoneValid: false,
			emailValid: false,
			innValid: false,
			formValid: false,
			passwordInputType: 'password',
			progressPassword: ''
		}
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'phone') {
			this.maskPhone(e)
		} else {
			this.setState({[name]: value},
				() => {
					this.validateField(name, value)
					if (name === 'password') {
						this.setProgressPassword(value)
					}
				});
		}
	}

	maskPhone(e) {
		let val = e.target.value;
		if (val.length > 2) {
			val = val.slice(3)
		}
		val = val.replace(/ /gm, '');
		val = val.replace(/\D/g, '');
		if (val.length <= 10) {
			let num = `+7 (${val.substring(0, 3)}) ${val.substring(3, 6)}-${val.substring(6, 8)}-${val.substring(8, val.length)}`;
			this.setState({phone: num.trim()},
				() => {
					this.validateField('phone', num)
				});
		}
	};

	changeUser = () => {
		this.setState({company: !this.state.company}, () => {
			this.validateField('surname', this.state.surname)
			this.validateField('name', this.state.name)
			this.validateField('password', this.state.password)
			this.validateField('secondPassword', this.state.secondPassword)
			this.validateField('phone', this.state.phone)
			this.validateField('email', this.state.email)
			this.validateField('inn', this.state.inn)
		})
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors,
			surnameValid = this.state.surnameValid,
			nameValid = this.state.nameValid,
			passwordValid = this.state.passwordValid,
			secondPasswordValid = this.state.secondPasswordValid,
			phoneValid = this.state.phoneValid,
			emailValid = this.state.emailValid,
			innValid = this.state.innValid;

		switch (fieldName) {
			case 'surname':
				surnameValid = !this.state.company ? 1 : (value.length > 0);
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
				secondPasswordValid = (this.state.password === this.state.secondPassword);
				fieldValidationErrors.secondPassword = secondPasswordValid ? '' : 'Пароли не совпадают';
				break;
			case 'phone':
				phoneValid = value.length === 18;
				fieldValidationErrors.phone = phoneValid ? '' : 'Телефон некорректен';
				break;
			case 'email':
				if (!this.state.company && !value.length) {
					emailValid = 1
				} else {
					emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				}
				fieldValidationErrors.email = emailValid ? '' : 'E-mail некорректен';
				break;
			case 'inn':
				innValid = !this.state.company ? 1 : value.match(/^[0-9]{10}$/i);
				fieldValidationErrors.inn = innValid ? '' : 'ИНН некорректен';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			surnameValid,
			nameValid,
			passwordValid,
			secondPasswordValid,
			phoneValid,
			emailValid,
			innValid
		}, this.validateForm);
	}

	validateForm() {
		if (this.state.company) {
			this.setState({formValid: this.state.nameValid && this.state.surnameValid && this.state.passwordValid && this.state.secondPasswordValid && this.state.phoneValid && this.state.emailValid && this.state.innValid});
		} else {
			this.setState({formValid: this.state.nameValid && this.state.passwordValid && this.state.secondPasswordValid && this.state.phoneValid});
		}
		if (this.state.formErrors.surname.length) {
			this.setState({formValid: false})
		}
	}

	setProgressPassword(value) {
		if (value) {
			if (value.length <= 4) {
				this.setState({progressPassword: s.progress__item_1})
			} else if (value.length >= 5 && value.length < 9) {
				this.setState({progressPassword: s.progress__item_2})
			} else {
				this.setState({progressPassword: s.progress__item_3})
			}
		}
	}

	changePasswordType() {
		if (this.state.passwordInputType === 'text') {
			this.setState({passwordInputType: 'password'})
		} else {
			this.setState({passwordInputType: 'text'})
		}
	}

	errorClass(error) {
		return error.length
	}

	render() {
		return (
			<form className={s.form} name='registration'>

				<div className={s.clientType}>
					<label className={s.clientType__person} htmlFor="person_company">Физическое лицо</label>
					<ToggleSwitch
						id="person_company"
						small
						checked={this.state.company}
						onChange={this.changeUser}
					/>
					<label className={s.clientType__company} htmlFor="person_company">Юридическое лицо</label>
				</div>

				<div data-tip data-for="surname">
					<Input data-tip data-for="surname" type='text' required={this.state.company} name='surname'
								 title={this.state.company ? 'Фамилия  ⃰' : 'Фамилия'}
								 hasError={this.errorClass(this.state.formErrors.surname)}
								 value={this.state.surname}
								 valid={this.state.surnameValid}
								 handleUserInput={this.handleUserInput}/>
				</div>
				{this.state.formErrors.surname &&
				<ReactTooltip id='surname' type='error'>
					<span>{this.state.formErrors.surname}</span>
				</ReactTooltip>}

				<div data-tip data-for="name">
					<Input type='text' required={true} name='name'
								 title='Имя ⃰'
								 hasError={this.errorClass(this.state.formErrors.name)}
								 value={this.state.name}
								 valid={this.state.nameValid}
								 handleUserInput={this.handleUserInput}/>
				</div>
				{this.state.formErrors.name &&
				<ReactTooltip id='name' type='error'>
					<span>{this.state.formErrors.name}</span>
				</ReactTooltip>}

				<div>
					<Input type='text' required={true} name='patronymic' title='Отчество'
								 value={this.state.patronymic}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div className={s.passwordBlock}>
					<div data-tip data-for="password">
						<Input type={this.state.passwordInputType} required={true} name='password'
									 title='Пароль ⃰'
									 changePasswordType={this.changePasswordType}
									 hasError={this.errorClass(this.state.formErrors.password)}
									 value={this.state.password}
									 valid={this.state.passwordValid}
									 handleUserInput={this.handleUserInput}/>
					</div>
					{this.state.formErrors.password &&
					<ReactTooltip id='password' type='error'>
						<span>{this.state.formErrors.password}</span>
					</ReactTooltip>}

					<div className={s.progress}>
						<div
							className={`${s.progress__item} ${this.state.password.length ? this.state.progressPassword : ''}`}/>
						<div
							className={`${s.progress__item} ${this.state.password.length >= 5 ? this.state.progressPassword : ''}`}/>
						<div
							className={`${s.progress__item} ${this.state.password.length >= 9 ? this.state.progressPassword : ''}`}/>
					</div>

					<div data-tip data-for="secondPassword">
						<Input type={this.state.passwordInputType} required={true} name='secondPassword'
									 title='Повторите пароль ⃰'
									 changePasswordType={this.changePasswordType}
									 hasError={this.errorClass(this.state.formErrors.secondPassword)}
									 value={this.state.secondPassword}
									 valid={this.state.secondPasswordValid}
									 handleUserInput={this.handleUserInput}/>
					</div>
					{this.state.formErrors.secondPassword &&
					<ReactTooltip id='secondPassword' type='error'>
						<span>{this.state.formErrors.secondPassword}</span>
					</ReactTooltip>}
				</div>

				<div data-tip data-for="phone">
					<Input type='tel' required={true} name='phone'
								 title='Телефон ⃰'
								 hasError={this.errorClass(this.state.formErrors.phone)}
								 value={this.state.phone}
								 valid={this.state.phoneValid}
								 handleUserInput={this.handleUserInput}/>
				</div>
				{this.state.formErrors.phone &&
				<ReactTooltip id='phone' type='error'>
					<span>{this.state.formErrors.phone}</span>
				</ReactTooltip>}

				<div data-tip data-for="email">
					<Input type='email' required={this.state.company} name='email'
								 title={this.state.company ? 'E-mail  ⃰' : 'E-mail'}
								 hasError={this.errorClass(this.state.formErrors.email)}
								 value={this.state.email}
								 valid={this.state.emailValid}
								 handleUserInput={this.handleUserInput}/>
				</div>
				{this.state.formErrors.email &&
				<ReactTooltip id='email' type='error'>
					<span>{this.state.formErrors.email}</span>
				</ReactTooltip>}

				{this.state.company && <>
					<div data-tip data-for="inn">
						<Input type='inn' required={this.state.company} name='inn'
									 title={this.state.company ? 'ИНН  ⃰' : 'ИНН'}
									 hasError={this.errorClass(this.state.formErrors.inn)}
									 value={this.state.inn}
									 valid={this.state.innValid}
									 handleUserInput={this.handleUserInput}/>
					</div>
					{this.state.formErrors.inn &&
					<ReactTooltip id='inn' type='error'>
						<span>{this.state.formErrors.inn}</span>
					</ReactTooltip>}</>}

				<div data-tip data-for="submit">
					<button className={!this.state.formValid ? s.submitBtn_disabled : s.submitBtn} type="submit"
									form="registration"
									disabled={!this.state.formValid}>
						Далее
						<i className="fa fa-long-arrow-right"/>
					</button>
				</div>
				{!this.state.formValid &&
					<ReactTooltip id='submit' type='error'>
						<span>
							<FormErrors formErrors={this.state.formErrors}/>
						</span>
					</ReactTooltip>}
			</form>
		)
	}
}

export default Form;
