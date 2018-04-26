import React,{ Component } from 'react';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
import axios from 'axios';

export default class Module extends Component{
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
	componentDidMount(){
		this.projectList();
	}
	projectList(){
		axios.get('http://13.71.117.40:3200/Project/getAllWithOutPagination')
			.then(res => {
				for(var key in res.data){
					if(res.data.hasOwnProperty(key)){
						this.state.data.push(res.data[key]);
					}
				}
			})
			.catch(e => console.log(e));
	}
	handleNameChange(e){
		this.setState({ nameCreate : e.target.value });
	}
	handleProjectIdSelection(e){
		this.setState({ projectId : e.target.value });
		axios.get('http://13.71.117.40:3200/Module/getAll/'+this.state.projectId)
			.then(res => this.setState({ moduleOptions : res.data.modules }))
			.catch(e => console.log(e));
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
		return (
				<div>
					<h3>Module Create</h3>
					<form onSubmit = { this.handleCreateSubmit }>
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
						<input type = "submit" value = "submit"/>
					</form>
					<h3>Module getOne</h3>
					<form onSubmit = { this.handleGetOneSubmit }>
						<Select 
							name = { 'moduleId' }
							placeholder = { 'Choose moduleId' }
							controlFunc = { this.handleModuleIdSelection }
							options = { this.state.moduleOptions }
							selectedOptions = { this.state.moduleId }/>
						<input type = "submit" value = "submit"/>
					</form>
					<h3>Module Update</h3>
					<form onSubmit = { this.handleUpdateSubmit }>
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
						<input type = "submit" value = "submit"/>
					</form>
					<h3>Module getAll</h3>
					<form onSubmit = { this.handleGetAllSubmit }>
						<Select
							name= { 'projectId' }
							placeholder = { 'Choose projectId' }
							controlFunc = { this.handleProjectIdSelection }
							options = { this.state.projectOptions }
							selectedOptions = { this.state.projectId }/>
						<input type = "submit" value = "submit"/>
					</form>
					<h3>Module delete</h3>
					<form onSubmit = { this.handleDeleteSubmit }>
						<Select
							name = { 'moduleId' }
							placeholder = { 'Choose moduleId' }
							controlFunc = { this.handleModuleIdSelection }
							options = { this.state.moduleOptions }
							selectedOptions = { this.state.moduleId }/>
						<input type = "submit" value = "submit"/>
					</form>	
				</div>
			)
	}
}