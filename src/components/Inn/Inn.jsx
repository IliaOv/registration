import React from 'react';
import {inject, observer} from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import Input from '../Input/Input';

class Inn extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<>
				{store.company && <>
					<div data-tip data-for="inn">
						<Input type='inn' required={store.company} name='inn'
									 title={store.company ? 'ИНН  ⃰' : 'ИНН'}
									 hasError={store.inn && store.errorClass(store.formErrors.inn)}
									 value={store.inn}
									 valid={store.innValid}
									 handleUserInput={store.handleUserInput}/>
					</div>
					{store.inn && store.formErrors.inn
						? <ReactTooltip id='inn' type='error'>
							<span>{store.formErrors.inn}</span>
						</ReactTooltip>
						: null}
				</>}
			</>
		)
	}
}

export default inject('store')(observer(Inn));
