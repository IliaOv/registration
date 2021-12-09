import React from 'react';
import Input from '../Input/Input';
import {inject, observer} from 'mobx-react';

class Patronymic extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<div>
				<Input type='text'
							 name='patronymic'
							 title='Отчество'
							 value={store.patronymic}
							 handleUserInput={store.handleUserInput}/>
			</div>
		)
	}
}

export default inject('store')(observer(Patronymic));
