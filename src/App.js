import React, {Component} from 'react';
import s from './App.module.css';
import AppStore from './AppStore';
import PersonCompany from './components/PersonCompany/PersonCompany';
import Surname from './components/Surname/Surname';
import Name from './components/Name/Name';
import Patronymic from './components/Patronymic/Patronymic';
import Passwords from './components/Passwords/Passwords';
import Phone from './components/Phone/Phone';
import Email from './components/Email/Email';
import Inn from './components/Inn/Inn';
import SubmitBtn from './components/SubmitBtn/SubmitBtn';

const store = new AppStore();

class App extends Component {
	render() {
		return (
			<div className={s.app}>
				<header className={s.header}>
					Регистрация
				</header>
				<PersonCompany store={store}/>
				<form className={s.form} id='registration'>
					<Surname store={store}/>
					<Name store={store}/>
					<Patronymic store={store}/>
					<Passwords store={store}/>
					<Phone store={store}/>
					<Email store={store}/>
					<Inn store={store}/>
					<SubmitBtn store={store}/>
				</form>
			</div>
		);
	}
}

export default App;
