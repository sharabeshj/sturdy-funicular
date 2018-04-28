import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
	root : {
		flexGrow : 1,
	},
	flex : {
		flex : 1,
	},
};

function Header(props){
	const { classes } = props;
	return (
			<div className = { classes.root }>
				<AppBar position = "static" >
					<Toolbar>
						<Typography variant = "title" color = "inherit" className = { classes.flex }>
							Vertace
						</Typography>
						<Button color = "inherit" component = { Link } to = '/'>Home</Button>
						<Button color = "inherit" component = { Link } to = '/projects'>Projects</Button>
						<Button color = "inherit" component = { Link } to = '/module'>Module</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
}

Header.propTypes = {
	classes : PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);


