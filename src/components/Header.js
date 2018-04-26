import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
		<header>
			<nav>
				<ul>
					<li><Link to = '/'>Home</Link></li>
					<li><Link to = '/project'>Projects</Link></li>
					<li><Link to = '/module'>Module</Link></li>
				</ul>
			</nav>
		</header>
	);

export default Header;


