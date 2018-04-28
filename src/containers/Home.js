import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
	root : theme.mixins.gutters({
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit*3,
		textAlign : 'center',
	}),
});
 
function Home(props){
	const { classes } = props;
	return (
			<div>
				<Paper className = { classes.root } elevation = {4}>
					<Typography variant = "display3" gutterBottom>
						Welcome to our dashboard
					</Typography>
					<Typography variant = "headline" gutterBottom>
						Get project list
					</Typography>
					<Button color = "primary" component = { Link } to = '/projects'>Get</Button>
					<Typography variant = "headline" gutterBottom>
						Module operations
					</Typography>
					<Button color = "primary" component = { Link } to = '/module'>Go</Button>
				</Paper>
			</div>
		);
}

Home.propTypes = {
	classes : PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);
