import React from 'react';
import Input from '../Input/Input';

class Name extends React.Component {
	render() {
		return (
			<label>
				<Input type='text' title='Имя ⃰ '/>
			</label>
		)
	}
}

export default Name;
