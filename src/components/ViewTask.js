import React, { Component } from 'react';
import mockData from './mockjson.json'
import moment from 'moment';

class ViewTask extends Component {
   constructor(){
        super();
        this.state={
            task:'',
            priority:'',
            parentTask:'',
            startDate:'',
            endDate:'',
            minPriority:'',
            maxPriority:''
        }
        this.taskChange=this.taskChange.bind(this);
        this.minPriorityChange=this.minPriorityChange.bind(this);
        this.maxPriorityChange=this.maxPriorityChange.bind(this);
        this.parentTaskChange=this.parentTaskChange.bind(this);
        this.startDateChange=this.startDateChange.bind(this);
        this.endDateChange=this.endDateChange.bind(this);
        this.searchresultsRender=this.searchresultsRender.bind(this);
        this.editTask=this.editTask.bind(this);
    }
    editTask=(task)=>{
      debugger;
      this.props.callbackContainer(task);
    }
    searchresultsRender=(data)=>{
      const taskFilter=this.state.task ? x => x.task.includes(this.state.task) : x => x;
      const priorityFromFilter = this.state.minPriority? x => x.priority>= this.state.minPriority : x => x;
      const priorityToFilter=this.state.maxPriority? x => x.priority<=this.state.maxPriority : x => x;
      const parentTaskFilter= this.state.parentTask? x => x.parent.includes(this.state.parentTask) : x => x;
      const startDateFilter = this.state.startDate? x => x.start.includes(this.state.startDate) : x => x;
      const endDateFilter= this.state.endDate? x => x.end.includes(this.state.endDate) : x => x;
{return data.filter(taskFilter).filter(priorityFromFilter).filter(priorityToFilter).filter(parentTaskFilter).filter(startDateFilter).filter(endDateFilter).map((task) =>
      <div>
    <div className="row paddingTop10px paddingBottom20px">
    <div className="col-md-2">
      Task
    </div>
    <div className="col-md-2">
    Parent
    </div>
    <div className="col-md-1">
      Priority
    </div>
    <div className="col-md-2">
       Start
    </div>
    <div className="col-md-2">
      End
    </div>
    <div className="col-md-3">
       
    </div>
    </div>
    <div className="row paddingTop10px paddingBottom20px borderBottom">
    <div className="col-md-2">
      {task.taskName}
    </div>
    <div className="col-md-2">
    {task.parentTask}
    </div>
    <div className="col-md-1">
      {task.priority}
    </div>
    <div className="col-md-2">
       {moment(task.startDate).format('YYYY-MM-DD')}
    </div>
    <div className="col-md-2">
    {moment(task.endDate).format('YYYY-MM-DD')}
    </div>
    <div className="col-md-3 displayInlineFlex">
       <button type="button" className="btn btn-primary" onClick={() =>{this.editTask(task)}}>Edit</button>
       <span className="paddingLeft3px paddingright3px"></span>
       <button type="button" className="btn btn-primary">End Task</button>
    </div>
    </div>
    </div>
  )}

    }
    
    taskChange=(event) =>{
        this.setState({
            task:event.target.value
        });
    }
    minPriorityChange=(event) =>{
        this.setState({
            minPriority:event.target.value
        });
    }
    maxPriorityChange=(event) =>{
        this.setState({
            maxPriority:event.target.value
        });
    }
    parentTaskChange=(event)=>{
      this.setState({
            parentTask:event.target.value
        });
    }
    startDateChange=(event)=>{
this.setState({
            startDate:event.target.value
        });
    }
    endDateChange=(event)=>{
this.setState({
            endDate:event.target.value
        });
    }
render() {
  const {taskList}=this.props;
return (
<React.Fragment>
    <div className="row paddingTop10px">
    <div className="col-md-1">
      Task:
    </div>
    <div className="col-md-5">
      <input type="text" name="Task" value={this.state.task} onChange={this.taskChange} className=""/>
    </div>
    <div className="col-md-1">
      Parent Task:
    </div>
    <div className="col-md-5">
      <input type="text" name="ParentTask" value={this.state.parentTask} onChange={this.parentTaskChange} className=""/>
    </div>
    </div>
    <div className="row paddingTop10px paddingBottom20px borderBottom">
    <div className="col-md-1">
      Priority From:
    </div>
    <div className="col-md-2">
       <input type="text" name="minpriority" value={this.state.minPriority} onChange={this.minPriorityChange} className=""/>
    </div>
    <div className="col-md-1">
      Priority To:
    </div>
    <div className="col-md-2">
       <input type="text" name="maxPriority" value={this.state.maxPriority} onChange={this.maxPriorityChange} className=""/>
    </div>
    <div className="col-md-1">
      Start Date:
    </div>
    <div className="col-md-2">
       <input type="text" name="startDate" value={this.state.startDate} onChange={this.startDateChange} className=""/>
    </div>
    <div className="col-md-1">
      End date:
    </div>
    <div className="col-md-2">
       <input type="text" name="endDate" value={this.state.endDate} onChange={this.endDateChange} className=""/>
    </div>
    </div>
    {this.searchresultsRender(taskList.taskList)}
      
   </React.Fragment> 
);
   }}
export default ViewTask;