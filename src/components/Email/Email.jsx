import React from 'react';
import {inject, observer} from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import Input from '../Input/Input';

class Email extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<>
				<div data-tip data-for="email">
					<Input type='email' required={store.company} name='email'
								 title={store.company ? 'E-mail  ⃰' : 'E-mail'}
								 hasError={store.email && store.errorClass(store.formErrors.email)}
								 value={store.email}
								 valid={store.emailValid}
								 handleUserInput={store.handleUserInput}/>
				</div>
				{store.email && store.formErrors.email
					? <ReactTooltip id='email' type='error'>
						<span>{store.formErrors.email}</span>
					</ReactTooltip>
					: null}
			</>
		)
	}
}

export default inject('store')(observer(Email));
