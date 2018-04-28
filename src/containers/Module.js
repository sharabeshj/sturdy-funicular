import React,{ Component } from 'react';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
	root :  theme.mixins.gutters({
		paddingTop : 16,
		paddingBottom : 16,
		marginTop : theme.spacing.unit*3,
		textAlign : "center",
	}),
	container : {
		display : 'flex',
		flexWrap : 'wrap',
	},
	input : {
		display : 'none',
	}
});

class Module extends Component{
	constructor(props){
		super(props);
		this.state = {
			moduleId : '',
			projectId : '',
			moduleOptions : [],
			projectOptions : [],
			nameCreate : '',
			nameUpdate : ''
		};
		this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
		this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
		this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
		this.handleGetOneSubmit = this.handleGetOneSubmit.bind(this);
		this.handleGetAllSubmit = this.handleGetAllSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleModuleIdSelection = this.handleModuleIdSelection.bind(this);
		this.handleProjectIdSelection = this.handleProjectIdSelection.bind(this);
	}
	static propTypes = {
			classes : PropTypes.object.isRequired,
		};
	componentDidMount(){
		this.projectList();
	}
	projectList(){
		axios.get('http://13.71.117.40:3200/Project/getAllWithOutPagination')
			.then(res => {
				var data = [];
				for(var key in res.data.result){
					data.push(res.data.result[key]._id);
				}
				console.log(this.state.projectOptions);
				this.setState({ projectOptions : data });
			})
			.catch(e => console.log(e));
	}
	handleNameChange(e){
		this.setState({ nameCreate : e.target.value });
	}
	handleProjectIdSelection(e){
		this.setState({ projectId : e.target.value });
		axios.get('http://13.71.117.40:3200/Module/getAll/'+this.state.projectId)
			.then(res => {
				console.log(res.data);
				this.setState({ moduleOptions : res.data.modules });
			})
			.catch(e => console.log('hi'));
	}
	handleModuleIdSelection(e){
		this.setState({ moduleId : e.target.value });
	}
	handleCreateSubmit(e){
		e.preventDefault();
		const formPayLoad = {
			Name : this.state.name,
			Project : this.state.projectId
		}
		axios.post('http://13.71.117.40:3200/Module/create',formPayLoad)
			.then(res => console.log(res.data))
			.catch(e => console.log(e));
	}
	handleUpdateSubmit(e){
		e.preventDefault();
		const formPayLoad = {
			ID : this.state.moduleId,
			Name : this.state.nameUpdate,
			Project : this.state.projectId
		}
		axios.post('http://13.71.117.40:3200/Module/update',formPayLoad)
			.then(res => console.log(res.data))
			.catch(e => console.log(e));
	}
	handleGetOneSubmit(e){
		e.preventDefault();
		axios.get('http://13.71.117.40:3200/Module/getOne/'+this.state.moduleId)
			.then(res => console.log(res.data))
			.catch(e => console.log(e));
	}
	handleGetAllSubmit(e){
		e.preventDefault();
		axios.get('http://13.71.117.40:3200/Module/getAll/'+this.state.projectId)
			.then(res => console.log(res.data))
			.catch(e => console.log(e));
	}
	handleDeleteSubmit(e){
		e.preventDefault();
		axios.get('http://13.71.117.40:3200/Module/delete/{MODULEID}')
			.then(res => console.log(res.data))
			.catch(e => console.log(e));
	}
	render(){
		const { classes } = this.props;
		return (
				<Grid container justify = "center" spacing = {24}>
					<Grid item xs = {6}>
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "headline" gutterBottom>Module Create</Typography>
							<form onSubmit = { this.handleCreateSubmit } className = { classes.container } noValidate autoComplete = "off">
								<SingleInput
									name = { 'Name' }
									inputType = { 'text' }
									title = { 'Module Name' }
									content = { this.state.nameCreate }
									controlFunc = { this.handleNameChange }
									placeholder = { 'Enter the module name' }/>
								<Select
									name = { 'moduleId' }
									placeholder = {'Choose moduleId'}
									controlFunc = { this.handleModuleIdSelection }
									options = { this.state.moduleOptions }
									selectedOptions = { this.state.moduleId }/>
								<input className = { classes.input } type = "submit" id = "submit"/>
								<label htmlFor = "submit">
									<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
										Create
									</Button>
								</label>
							</form>
						</Paper>
					</Grid>
					<Grid item xs = {6}>
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "headline" gutterBottom>Module getOne</Typography>
							<form onSubmit = { this.handleGetOneSubmit } className = { classes.container } noValidate autoComplete = "off">
								<Select 
									name = { 'moduleId' }
									placeholder = { 'Choose moduleId' }
									controlFunc = { this.handleModuleIdSelection }
									options = { this.state.moduleOptions }
									selectedOptions = { this.state.moduleId }/>
								<input className = { classes.input } type = "submit" id = "submit"/>
								<label htmlFor = "submit">
									<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
										Get
									</Button>
								</label>
							</form>
						</Paper>
					</Grid>
					<Grid item xs = {6}>
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "headline" gutterBottom>Module Update</Typography>
							<form onSubmit = { this.handleUpdateSubmit } className = { classes.container } noValidate autoComplete = "off">
								<Select
									name = { 'moduleId' }
									placeholder = { 'Choose moduleId' }
									controlFunc = { this.handleModuleIdSelection }
									options = { this.state.moduleOptions }
									selectedOptions = { this.state.moduleId }/>
								<SingleInput
									name = { 'Name' }
									inputType = { 'text' }
									title = { 'Module Name' }
									controlFunc = { this.handleNameChange }
									content = { this.state.nameUpdate }
									placeholder = { 'Enter module name' }
									/>
								<Select
									name = { 'projectId' }
									placeholder = { 'Choose projectId' }
									controlFunc = { this.handleProjectIdSelection }
									options = { this.state.projectOptions }
									selectedOptions = { this.state.projectId }/>
								<input className = { classes.input } type = "submit" id = "submit"/>
								<label htmlFor = "submit">
									<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
										Update
									</Button>
								</label>
							</form>
						</Paper>
					</Grid>
					<Grid>
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "headline" gutterBottom>Module getAll</Typography>
							<form onSubmit = { this.handleGetAllSubmit } className = { classes.container } noValidate autoComplete = "off">
								<Select
									name= { 'projectId' }
									placeholder = { 'Choose projectId' }
									controlFunc = { this.handleProjectIdSelection }
									options = { this.state.projectOptions }
									selectedOptions = { this.state.projectId }/>
								<input className = { classes.input } type = "submit" id = "submit"/>
								<label htmlFor = "submit">
									<Button variant = "raised" component = "span" color="primary" className = { classes.button }>
										Get
									</Button>
								</label>
							</form>
						</Paper>
					</Grid>
					<Grid item xs ={6}>
						<Paper className = { classes.root } elevation = {4}>
							<Typography variant = "headline" gutterBottom>Module delete</Typography>
							<form onSubmit = { this.handleDeleteSubmit } className = { classes.container } noValidate autoComplete = "off">
								<Select
									name = { 'moduleId' }
									placeholder = { 'Choose moduleId' }
									controlFunc = { this.handleModuleIdSelection }
									options = { this.state.moduleOptions }
									selectedOptions = { this.state.moduleId }/>
								<input className = { classes.input } type = "submit" id = "submit"/>
								<label htmlFor = "submit">
									<Button variant = "raised" component = "span" color="secondary" className = { classes.button }>
										Delete
									</Button>
								</label>
							</form>
						</Paper>
					</Grid>
				</Grid>
			);
	}
}

export default withStyles(styles)(Module);