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
								 onFocus={() => this.setState({focus: true})}
								 onBlur={() => this.setState({focus: false})}
					/>
				</div>
				{this.props.valid &&
				<span className={s.icon}>
					<i className="fa fa-check-circle"/>
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
