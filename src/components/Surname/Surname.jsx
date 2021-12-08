import React from 'react';
import Input from '../Input/Input';

class Surname extends React.Component {
	render() {
		return (
			<Input type='text' required={true} name='surname' title='Фамилия'
						 value={this.props.surname}
						 valid={this.props.surnameValid}
						 handleUserInput={this.props.handleUserInput}/>
		)
	}
}

export default Surname;
