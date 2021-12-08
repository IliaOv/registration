import React, {Component} from 'react';
import s from './App.module.css';
import Form from './components/Form/Form';

class App extends Component {

	render() {
		console.log(1)
		return (
			<div className={s.app}>
				<header className={s.header}>
					Регистрация
				</header>
				<Form/>
			</div>
		);
	}
}

export default App;