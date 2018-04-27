import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => (
	<div>
		<select>
		name = { props.name },
		value = { props.selectedOptions },
		onChange = { props.controlFunc },
		<option value = "">{ props.placeholder }</option>
		{ props.options.map(opt => {
			return (
			<option key = { opt } value = { opt }>
				{ opt }
			</option>);
		})}
		</select>
	</div>
)

Select.propTypes = {
	name : PropTypes.string.isRequired,
	options : PropTypes.array.isRequired,
	selectedOptions : PropTypes.string,
	controlFunc : PropTypes.func.isRequired,
	placeholder : PropTypes.string
};
export default Select;