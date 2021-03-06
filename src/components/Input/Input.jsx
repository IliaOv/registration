import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Input.module.css';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			valid: false
		};
	}

	handleFocus = () => {
		this.setState({focus: true})
	}
	handleBlur = () => {
		this.setState({focus: false})
	}

	render() {
		return (
			<div className={this.props.hasError ? `${s.block} ${s.has_error}` : s.block}>
				{this.props.title &&
				<div className={(this.props.value || this.state.focus) ? s.block__placeholder_top : s.block__placeholder}>
					{this.props.title}
				</div>}
				<div className={s.content}>
					<input className={s.block__field}
								 type={this.props.type}
								 value={this.props.value}
								 required={this.props.required}
								 name={this.props.name}
								 onChange={e => this.props.handleUserInput(e)}
								 onFocus={this.handleFocus}
								 onBlur={this.handleBlur}
					/>
				</div>
				{this.props.valid && this.props.value && this.props.name !== 'password' && this.props.name !== 'secondPassword' &&
				<span className={s.check_circle}>
					<i className="fa fa-check-circle"/>
				</span>}
				{this.props.value && (this.props.name === 'password' || this.props.name === 'secondPassword') &&
				<span className={s.eye} onClick={this.props.changePasswordType}>
					<i className="fa fa-eye"/>
				</span>}

			</div>
		)
	}
}

Input.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string
};
Input.defaultProps = {
	title: null,
	type: 'text',
	value: ''
};

export default Input;
