import React from 'react';
import Input from '../Input/Input';
import s from './Password.module.css';

class Password extends React.Component {
	render() {
		return (
			<label className={s.block}>
				<Input type='password' title='Пароль ⃰ '/>
				<div>Filler</div>
				<Input type='password' title='Повторите пароль ⃰ '/>
			</label>
		)
	}
}

export default Password;
