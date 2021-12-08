import React from 'react';
import Input from '../Input/Input';

class Email extends React.Component {
	render() {
		return (
			<label>
				<Input type='text' title='E-mail '/>
			</label>
		)
	}
}

export default Email;
