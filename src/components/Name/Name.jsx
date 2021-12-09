import React from 'react';
import Input from '../Input/Input';
import {inject, observer} from 'mobx-react';

class Name extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<div data-tip data-for="name">
				<Input type='text'
							 name='name'
							 required={true}
							 title='Имя ⃰'
							 hasError={store.name.length && store.errorClass(store.formErrors.name)}
							 value={store.name}
							 valid={store.nameValid}
							 handleUserInput={store.handleUserInput}/>
			</div>
		)
	}
}

export default inject('store')(observer(Name));
