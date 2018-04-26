import React from 'react';
import { Switch,Route } from 'react-router-dom';
import Home from '../containers/Home';
import Project from '../containers/Project';
import Module from '../containers/Module';

const Main = (props) => (
	<main>
		<Switch>
			<Route exact path = '/' component = { Home }/>
			<Route path = '/projects' component = { Project }/>
			<Route path = '/module' component = { Module }/>
		</Switch>
	</main>
	);

export default Main;