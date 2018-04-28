import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
	textField : {
		marginleft : theme.spacing.unit,
		marginRight : theme.spacing.unit,
		width : 200,
	},
});

function SingleInput(props){
	const { classes } = props;
	return (
			<TextField
				label = { props.title }
				name = { props.name }
				className = { classes.textField }
				type = { props.inputType }
				value = { props.content }
				onChange = { props.controlFunc }
				placeholder = { props.placeholder }
				margin = "normal"
			/>
		)
}

SingleInput.propTypes = {
	classes : PropTypes.object.isRequired,
	inputType : PropTypes.oneOf(['text','number']).isRequired,
	title : PropTypes.string.isRequired,
	name : PropTypes.string.isRequired,
	controlFunc : PropTypes.func.isRequired,
	content : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder : PropTypes.string,
};

export default withStyles(styles)(SingleInput);
