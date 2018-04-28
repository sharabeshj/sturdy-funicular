import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

const styles = theme => ({
	textField : {
		marginLeft : theme.spacing.unit,
		marginRight : theme.spacing.unit,
		width : 300,
	},
	menu : {
		width : 200,
	}
});

function Select(props){
	const { classes } = props;
	return (
			<TextField
				select
				label = { props.name }
				className = { classes.textField }
				value = { props.selectedOptions }
				onChange = { props.controlFunc }
				SelectProps = {{
					MenuProps : {
						className : classes.menu,
					},
				}}
				helperText = { props.placeholder }
				margin = "normal">
					{props.options.map(opt => (
							<MenuItem key = { opt } value = { opt }>
								{opt}
							</MenuItem>
						))}
			</TextField>
		);
}

Select.propTypes = {
	classes : PropTypes.object.isRequired,
	name : PropTypes.string.isRequired,
	options : PropTypes.array.isRequired,
	selectedOptions : PropTypes.string,
	controlFunc : PropTypes.func.isRequired,
	placeholder : PropTypes.string
};

export default withStyles(styles)(Select);