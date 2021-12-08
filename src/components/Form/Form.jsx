import React, {Component} from 'react';
import Input from '../Input/Input';
import s from './Form.module.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ReactTooltip from 'react-tooltip';

class Form extends Component {
	constructor(props) {
		super(props);

		this.changeType = this.changeType.bind(this)

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
			passwordInputType: 'password'
		}
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value},
			() => {
				this.validateField(name, value)
			});
	}

	changeUser = () => {
		this.setState({company: !this.state.company},
			() => {
				(this.state.surname || !this.state.company) && this.validateField('surname', this.state.surname)
			})
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors,
			surnameValid = this.state.surnameValid,
			nameValid = this.state.nameValid,
			passwordValid = this.state.passwordValid,
			secondPasswordValid = this.state.secondPasswordValid,
			phoneValid = this.state.phoneValid,
			emailValid = this.state.emailValid;

		switch (fieldName) {
			case 'surname':
				surnameValid = !this.state.company ? 1 : (value.length > 1);
				fieldValidationErrors.surname = surnameValid ? '' : 'Фамилия слишком короткая';
				break;
			case 'name':
				nameValid = value.length > 1;
				fieldValidationErrors.name = nameValid ? '' : 'Имя слишком короткое'
				break;
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' некорректен';
				break;
			case 'password':
			case 'secondPassword':
				passwordValid = (value.length >= 6) && value.match(/(?=.*[0-9])/g);
				fieldValidationErrors.password = passwordValid ? '' : 'Пароль слишком короткий или не содержит ни одной цифры';
				secondPasswordValid = (this.state.password === this.state.secondPassword);
				fieldValidationErrors.secondPassword = secondPasswordValid ? '' : 'Пароли не совпадают';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			surnameValid,
			nameValid,
			emailValid,
			passwordValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({formValid: this.state.surnameValid && this.state.nameValid /*&& this.state.emailValid && this.state.passwordValid*/});
	}

	changeType() {
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
			<form className={s.form}>

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

				<div className={`form-group ${this.errorClass(this.state.formErrors.surname)}`}>
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
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
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
				</div>

				<div>
					<Input type='text' required={true} name='patronymic' title='Отчество'
								 value={this.state.patronymic}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
					<div data-tip data-for="password">
						<Input type={this.state.passwordInputType} required={true} name='password'
									 title='Пароль'
									 changeType={this.changeType}
									 hasError={this.errorClass(this.state.formErrors.password)}
									 value={this.state.password}
									 valid={this.state.passwordValid}
									 handleUserInput={this.handleUserInput}/>
					</div>
					{this.state.formErrors.password &&
					<ReactTooltip id='password' type='error'>
						<span>{this.state.formErrors.password}</span>
					</ReactTooltip>}
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.secondPassword)}`}>
					<div data-tip data-for="secondPassword">
						<Input type={this.state.passwordInputType} required={true} name='secondPassword'
									 title='Повторите пароль'
									 changeType={this.changeType}
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

				<button className={!this.state.formValid ? s.submitBtn_disabled : s.submitBtn} type="submit" form="registration"
								disabled={!this.state.formValid}>
					Далее
					<i className="fa fa-long-arrow-right"/>
				</button>
			</form>
		)
	}
}

export default Form;
