import React from 'react';
import {inject, observer} from 'mobx-react';
import Input from '../Input/Input';

class Surname extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<div data-tip data-for="surname">
				<Input data-tip data-for="surname"
							 type='text'
							 name='surname'
							 required={store.company}
							 title={store.company ? 'Фамилия  ⃰' : 'Фамилия'}
							 hasError={store.surname.length && store.errorClass(store.formErrors.surname)}
							 value={store.surname}
							 valid={store.surnameValid}
							 handleUserInput={store.handleUserInput}/>
			</div>
		)
	}
}

export default inject('store')(observer(Surname));
