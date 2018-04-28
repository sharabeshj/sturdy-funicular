import React,{ Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List,{ ListItem,ListItemText } from 'material-ui/List';

const styles = theme => ({
	root : theme.mixins.gutters({
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit*3,
		textAlign : 'center',
	}),
});

class Project extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : []
		}
	}
	static propTypes = {
		classes : PropTypes.object.isRequired,
	}
	componentDidMount(){
		this.loadProjects();
	}
	loadProjects(){
		axios.get('http://13.71.117.40:3200/Project/getAllWithOutPagination')
			.then(res => {
				console.log(res.data);
				this.setState({ data : res.data.result });
			})
			.catch(e => console.log(e));		
	}
	render(){
		const { classes } = this.props;
		if(this.state.data){
			var projectNodes = this.state.data.map(function(project){
				return <ListItem><ListItemText key = {project._id} primary = {project.Name} secondary = {project._id}></ListItemText></ListItem>
			})
		}
		return(
			<div>
				<Grid container justify = "center">
					<Grid item xs = {8} >
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "display1" gutterBottom>
								Project list
							</Typography>
							<List>
								{projectNodes}
							</List>
						</Paper>	
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Project);