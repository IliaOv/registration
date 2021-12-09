import React from 'react';
import {inject, observer} from 'mobx-react';
import Input from '../Input/Input';
import ReactTooltip from 'react-tooltip';

class Phone extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<>
				<div data-tip data-for="phone">
					<Input type='tel'
								 name='phone'
								 required={true}
								 title='Телефон ⃰'
								 hasError={store.phone && store.errorClass(store.formErrors.phone)}
								 value={store.phone}
								 valid={store.phoneValid}
								 handleUserInput={store.handleUserInput}/>
				</div>
				{store.phone && store.formErrors.phone
					? <ReactTooltip id='phone' type='error'>
						<span>{store.formErrors.phone}</span>
					</ReactTooltip>
					: null}
			</>
		)
	}
}

export default inject('store')(observer(Phone));
