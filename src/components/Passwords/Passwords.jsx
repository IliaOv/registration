import React from 'react';
import {inject, observer} from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import Input from '../Input/Input';
import s from './Passwords.module.css';

class Passwords extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<div className={s.passwordBlock}>
				<div data-tip data-for="password">
					<Input type={store.passwordInputType}
								 name='password'
								 required={true}
								 title='Пароль ⃰'
								 changePasswordType={store.changePasswordType}
								 hasError={store.password && store.errorClass(store.formErrors.password)}
								 value={store.password}
								 valid={store.passwordValid}
								 handleUserInput={store.handleUserInput}/>
				</div>
				{store.password && store.formErrors.password
					? <ReactTooltip id='password' type='error'>
						<span>{store.formErrors.password}</span>
					</ReactTooltip>
					: null}

				<div className={s.progress}>
					<div
						className={`${s.progress__item} ${store.password.length ? store.progressPassword : ''}`}/>
					<div
						className={`${s.progress__item} ${store.password.length >= 5 ? store.progressPassword : ''}`}/>
					<div
						className={`${s.progress__item} ${store.password.length >= 9 ? store.progressPassword : ''}`}/>
				</div>

				<div data-tip data-for="secondPassword">
					<Input type={store.passwordInputType}
								 name='secondPassword'
								 required={true}
								 title='Повторите пароль ⃰'
								 changePasswordType={store.changePasswordType}
								 hasError={store.secondPassword && store.errorClass(store.formErrors.secondPassword)}
								 value={store.secondPassword}
								 valid={store.secondPasswordValid}
								 handleUserInput={store.handleUserInput}/>
				</div>
				{store.secondPassword && store.formErrors.secondPassword
					? <ReactTooltip id='secondPassword' type='error'>
						<span>{store.formErrors.secondPassword}</span>
					</ReactTooltip>
					: null}
			</div>
		)
	}
}

export default inject('store')(observer(Passwords));
