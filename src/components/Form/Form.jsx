import React, {Component} from 'react';
import {FormErrors} from '../FormErrors/FormErrors';
import Input from '../Input/Input';
import s from './Form.module.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

class Form extends Component {
	constructor(props) {
		super(props);
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
			formValid: false
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
		this.setState({company: !this.state.company})
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
				surnameValid = value.length > 1;
				fieldValidationErrors.surname = surnameValid ? '' : ' слишком короткая';
				break;
			case 'name':
				nameValid = value.length > 1;
				fieldValidationErrors.name = nameValid ? '' : ' слишком короткое'
				break;
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' некорректен';
				break;
			case 'password':
				passwordValid = value.length >= 6;
				fieldValidationErrors.password = passwordValid ? '' : ' слишком короткий или не содержит ни одной цифры';
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

	errorClass(error) {
		return error.length
		//(error.length === 0 ? '' : 'has-error');
	}

	render() {
		return (
			<form className={s.form}>

				<div className="panel panel-default">
					<FormErrors formErrors={this.state.formErrors}/>
				</div>

				<div className={s.clientType}>
					<label className={s.clientType__person} htmlFor="daily">Физическое лицо</label>
					<ToggleSwitch
						id="daily"
						small
						checked={this.state.company}
						onChange={this.changeUser}
					/>
					<label className={s.clientType__company} htmlFor="daily">Юридическое лицо</label>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.surname)}`}>
					<Input type='text' required={true} name='surname' title='Фамилия'
								 hasError={this.errorClass(this.state.formErrors.surname)}
								 value={this.state.surname}
								 valid={this.state.surnameValid}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
					<Input type='text' required={true} name='name' title='Имя'
								 value={this.state.name}
								 valid={this.state.nameValid}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div>
					<Input type='text' required={true} name='patronymic' title='Отчество'
								 value={this.state.patronymic}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
					<Input type='text' required={true} name='password' title='Пароль'
								 value={this.state.password}
								 valid={this.state.passwordValid}
								 handleUserInput={this.handleUserInput}/>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.secondPassword)}`}>
					<Input type='text' required={true} name='secondPassword' title='Повторите пароль'
								 value={this.state.secondPassword}
								 valid={this.state.secondPasswordValid}
								 handleUserInput={this.handleUserInput}/>
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
