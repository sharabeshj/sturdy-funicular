import React,{ Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Project extends Component {
	constructor(props){
		super(props);
		this.data = {
			data : []
		}
	}
	componentDidMount(){
		this.loadProjects();
	}
	loadProjects(){
		axios.get('http://13.71.117.40:3200/Project/getAllWithOutPagination')
			.then(res => this.setState({ data : res.data }))
			.catch(e => console.log(e));		
	}
	render(){
		if(this.state.data){
			var projectNodes = this.state.data.map(function(project){
				return <li key = { project.PROJECTID }>{ project.PROJECTID }</li>
			})
		}
		render(){
			<div>
				<h3>Project list</h3>
				<ul>
					{projectNodes}
				</ul>
			</div>
		}
	}
}