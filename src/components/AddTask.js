import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/taskAction';
import moment from 'moment';

class AddTask extends Component {
   constructor(){
        super();
        this.state={
            task:'',
            priority:'0',
            parentTask:'',
            startDate:'',
            endDate:''
        }
        this.taskChange=this.taskChange.bind(this);
        this.priorityChange=this.priorityChange.bind(this);
        this.parentTaskChange=this.parentTaskChange.bind(this);
        this.startDateChange=this.startDateChange.bind(this);
        this.endDateChange=this.endDateChange.bind(this);
        this.reset=this.reset.bind(this);
        this.addtask=this.addtask.bind(this);
    }
    reset=()=>{
      this.setState({
            task:'',
            priority:'0',
            parentTask:'',
            startDate:'',
            endDate:'',
            validDate:false,
            error:false
      });
    }
    addtask=()=>{
      const regexDate=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
const startDateCheck=regexDate.test(this.state.startDate);
const endDateCheck=regexDate.test(this.state.endDate);
var startDateFinal;
var endDateFinal;
if(startDateCheck && endDateCheck){
  this.setState({
    validDate:true
  })
startDateFinal=moment(this.state.startDate).format();
endDateFinal=moment(this.state.endDate).format();
}
if(this.state.validDate && this.state.priority!=='' && this.state.task!=='' && this.state.parentTask!==''){
      var postDataOfTasks=
      {
         "priority": this.state.priority,
        "taskName": this.state.task,
        "startDate": startDateFinal,
        "endDate": endDateFinal,
        "parentTask": this.state.parentTask
      };
      const {postTask}=this.props;
      postTask(postDataOfTasks);
window.location.reload();
    }
    else{
      this.setState({
        error:true
      })
    }
    }
    taskChange=(event) =>{
        this.setState({
            task:event.target.value
        });
    }
    priorityChange=(event) =>{
        this.setState({
            priority:event.target.value
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
return (
<React.Fragment>
<div className="row paddingTop10px">
    <div className="col-md-12">
      Date format allowed: YYYY-MM-DD
    </div>
    </div>
    {this.state.error?<div className="row paddingTop10px">
    <div className="col-md-12 error">
      Error
    </div>
    </div>:''}
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Task:
    </div>
    <div className="col-md-9">
      <input type="text" name="Task" value={this.state.task} onChange={this.taskChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Priority:
    </div>
    <div className="col-md-9 addComponentWidth displayInlineFlex">
      <span className="paddingright3px">0</span>
      <span>
      <input type="range"  value={this.state.priority} className="addComponentSliderWidth" id="customRange1" min="0" max="30"  onChange={this.priorityChange}/>
      </span>
      <span className="paddingLeft3px">30</span>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Parent Task:
    </div>
    <div className="col-md-9">
      <input type="text" name="ParentTask" value={this.state.parentTask} onChange={this.parentTaskChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Start Date:
    </div>
    <div className="col-md-9">
      <input type="text" name="StartDate" value={this.state.startDate} onChange={this.startDateChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      End Date:
    </div>
    <div className="col-md-9">
      <input type="text" name="EndDate" value={this.state.endDate} onChange={this.endDateChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
      <div className="col-md-1">
      
    </div>
    <div className="col-md-1">
      <button type="button" class="btn btn-primary" onClick={()=>{this.addtask()}}>Add Task</button>
    </div>
    <div className="col-md-10">
      <button type="button" class="btn btn-primary" onClick={()=>{this.reset()}}>Reset</button>
    </div>
    </div>
   </React.Fragment> 
);
   }}

   const mapStateToProps = (state) => ({
    taskInsert:state.taskInsert
});
//export default AddTask;
export default connect(mapStateToProps, {postTask:actions.postTasksAction})(AddTask);
