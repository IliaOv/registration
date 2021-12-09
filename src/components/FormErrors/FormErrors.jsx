import React, {Component} from 'react';

class FormErrors extends Component {
	render() {
		let {formErrors} = this.props, arr = [];
		return <div className='formErrors'>
			{Object.keys(formErrors).forEach((fieldName, i) => {
				if (formErrors[fieldName].length > 0) {
					arr.push(formErrors[fieldName])
				}
			})}
			{arr.length
				? arr.map((fieldName, i) => {
					return <p key={i}>{fieldName}</p>
				})
				: 'Заполните необходимые поля'}
		</div>
	}
}

export default FormErrors
