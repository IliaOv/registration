import React from 'react';
import {inject, observer} from 'mobx-react';
import s from './PersonCompany.module.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

class PersonCompany extends React.Component {
	render() {
		let store = this.props.store;
		return (
			<div className={s.clientType}>
				<label className={s.clientType__person} htmlFor="person_company">Физическое лицо</label>
				<ToggleSwitch
					id="person_company"
					small
					checked={store.company}
					onChange={store.changeUser}
				/>
				<label className={s.clientType__company} htmlFor="person_company">Юридическое лицо</label>
			</div>
		)
	}
}

export default inject('store')(observer(PersonCompany));
