import React from 'react';
import {inject, observer} from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import s from './SubmitBtn.module.css';
import FormErrors from '../FormErrors/FormErrors';

class SubmitBtn extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<>
				<div data-tip data-for="submit">

					<button className={(!store.formValid || store.posting) ? s.submitBtn_disabled : s.submitBtn}
									type='submit'
									form="registration"
									disabled={!store.formValid || store.posting}
									onClick={store.phone === '+7 (456) 123-45-62' ? store.foundDuplicatePhone : store.post}
					>
						{store.posting
							? <>
								Загрузка
								<i className={s.spinner}>
									<i className="fa fa-spinner"/>
								</i>
							</>
							: <>
								Далее
								<i className="fa fa-long-arrow-right"/>
							</>}
					</button>
				</div>
				{!store.formValid &&
				<ReactTooltip id='submit' type='error'>
						<span>
							<FormErrors formErrors={store.formErrors}/>
						</span>
				</ReactTooltip>}
			</>
		)
	}
}

export default inject('store')(observer(SubmitBtn));
