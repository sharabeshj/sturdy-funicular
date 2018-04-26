import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => (
		<div>
			<h2>Welcome to our Dashboard</h2>
			<h4>Get project list</h4>
			<Link to = '/projects'><button>Get</button></Link>
			<h4>Module operations</h4>
			<Link to = '/module'><button>Go</button></Link>
		</div>
	);
