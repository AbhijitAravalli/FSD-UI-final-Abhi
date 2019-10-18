import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import mockData from './mockjson.json';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../actions/taskAction';

class AddProject extends Component {
   constructor(){
        super();
        this.state={
            project:'',
            priority:'0',
            checkedDate:false,
            startDate:'',
            endDate:'',
            manager:'',
            displaymanagerPopup:false,
            managerSelected:false,
            managerSelectedValue:'',
            searchProject:'',
            managerId:''
        }
        this.projectChange=this.projectChange.bind(this);
        this.priorityChange=this.priorityChange.bind(this);
        this.dateCheck=this.dateCheck.bind(this);
        this.startDateChange=this.startDateChange.bind(this);
        this.endDateChange=this.endDateChange.bind(this);
        this.reset=this.reset.bind(this);
        this.managerChange=this.managerChange.bind(this);
        this.sendManagerName=this.sendManagerName.bind(this);
        this.nameSelect=this.nameSelect.bind(this);
        this.projectSearchChange=this.projectSearchChange.bind(this);
        this.addproject=this.addproject.bind(this);
    }
    addproject=()=>{
      debugger;
      var postDataOfProject=
      {
        "projectName": this.state.project,
        "startDate": this.state.startDate?this.state.startDate:moment(),
        "endDate": this.state.endDate?this.state.endDate:moment().add(1, 'days'),
        "priority": this.state.priority,
        "manager":this.state.managerId
    }
      const {postProject}=this.props;
      postProject(postDataOfProject);
window.location.reload();
    }
    projectSearchChange=(event)=>{
        this.setState({
            searchProject:event.target.value
          });
      }
    nameSelect=(event)=>{
      debugger;
        this.setState({
            managerSelected:true,
            managerSelectedValue:event.target.value,
            manager:event.target.value,
            managerId:event.target.name
        })
    }
    sendManagerName=(searchResultsSelect)=>{
        this.setState({
            managerSelected:true
        })

    }
    findManager=(manager)=>{
        this.setState({
            displaymanagerPopup:!this.state.displaymanagerPopup,
            managerSelected:false
        });
      }
    reset=()=>{
      this.setState({
        project:'',
            priority:'0',
            checkedDate:false,
            startDate:'',
            endDate:''
      });
    }
    projectChange=(event) =>{
        this.setState({
            project:event.target.value
        });
    }
    priorityChange=(event) =>{
        this.setState({
            priority:event.target.value
        });
    }
    dateCheck=(event)=>{
      this.setState({
        checkedDate:!this.state.checkedDate
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
    managerChange=(event)=>{
        this.setState({
                    manager:event.target.value
                });
            }
            editProject=(project)=>{
                //this.props.callbackContainer(user);
              }
            projectList=(data)=>{
                const projectNameFilter=this.state.searchProject ? x => x.projectName.includes(this.state.searchProject) : x => x;
                
          {return data.filter(projectNameFilter).map((project) =>
                <div>
              <div className="row paddingTop10px paddingBottom20px">
              <div className="col-md-2">
                Project
              </div>
              <div className="col-md-1">
              No. of Tasks
              </div>
              <div className="col-md-1">
                Completed
              </div>
              <div className="col-md-2">
                 Start Date
              </div>
              <div className="col-md-2">
                 End Date
              </div>
              <div className="col-md-2">
                 Priority
              </div>
              <div className="col-md-2">
                 
              </div>
              </div>
              <div className="row paddingTop10px paddingBottom20px borderBottom">
              <div className="col-md-2">
              {project.projectName}
            </div>
            <div className="col-md-1">
            {project.projectId}
            </div>
            <div className="col-md-1">
            {moment(project.startDate)<moment()?'No':'Yes'}
            </div>
            <div className="col-md-2">
            {moment(project.startDate).format('YYYY-MM-DD')}
            </div>
            <div className="col-md-2">
            {moment(project.endDate).format('YYYY-MM-DD')}
            </div>
            <div className="col-md-2">
               {project.priority}
            </div>
            <div className="col-md-2 displayInlineFlex">
            <button type="button" className="btn btn-primary" onClick={() =>{this.editProject(project)}}>Update</button>
         <span className="paddingLeft3px paddingright3px"></span>
         <button type="button" className="btn btn-primary">Suspend</button>
            </div>
              </div>
              </div>
            )}
          
              }
render() {
  const {projectList, userList}=this.props;
return (
    <React.Fragment>
    <Modal show={this.state.displaymanagerPopup} onHide={this.findManager}>
    <Modal.Header closeButton>
      <Modal.Title>Manager Search</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>List of available Managers</h4>
      <div>
          {userList.userList.filter(this.state.manager ? x => x.firstName.includes(this.state.manager) : x => x).map((user) =>
          <React.Fragment>
          <input type="checkbox" name={user.empId} value={user.firstName} onClick={this.nameSelect}/>
          {user.firstName}
          <br></br>
          </React.Fragment>
        )
        }
          </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.findManager}>Close</Button>
    </Modal.Footer>
  </Modal>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Project:
    </div>
    <div className="col-md-9">
      <input type="text" name="project" value={this.state.project} onChange={this.projectChange} className="addComponentWidth"/>
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
    <input type="checkbox" name="dateCheck" value={this.state.checkedDate} onClick={this.dateCheck}/>
    </div>
    <div className="col-md-9">
      Set start and end date
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Start Date:
    </div>
    <div className="col-md-9">
      <input type="text" name="StartDate" disabled= {!this.state.checkedDate} value={this.state.startDate} onChange={this.startDateChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      End Date:
    </div>
    <div className="col-md-9">
      <input type="text" name="EndDate" disabled= {!this.state.checkedDate} value={this.state.endDate} onChange={this.endDateChange} className="addComponentWidth"/>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
      Manager:
    </div>
    <div className="col-md-3">
    <input type="text" name="manager" value={this.state.manager} onChange={this.managerChange} className="addComponentWidth"/>
    </div>
    <div className="col-md-3">
    <button type="button" className="btn btn-primary" onClick={() =>{this.findManager(this.state.manager)}}>Search</button>
    </div>
    </div>
    <div className="row paddingTop10px">
      <div className="col-md-1">
      
    </div>
    <div className="col-md-1">
      <button type="button" class="btn btn-primary" onClick={()=>{this.addproject()}}>Add</button>
    </div>
    <div className="col-md-10">
      <button type="button" class="btn btn-primary" onClick={()=>{this.reset()}}>Reset</button>
    </div>
    </div>
    <div className="row paddingTop10px">
    <div className="col-md-3">
    <input type="text" name="Task" value={this.state.searchProject} placeholder="Search" onChange={this.projectSearchChange} className=""/>
    </div>
    <div className="col-md-1">
    Sort: 
    </div>
    <div className="col-md-2">
    <button type="button" class="btn btn-primary">Start Date</button> 
    </div>
    <div className="col-md-2">
    <button type="button" class="btn btn-primary">End Date</button>
    </div>
    <div className="col-md-2">
    <button type="button" class="btn btn-primary">Priority</button>
    </div>
    <div className="col-md-2">
    <button type="button" class="btn btn-primary">Completed</button>
    </div>
    </div>
    {this.projectList(projectList.projectList)}
   </React.Fragment> 
);
   }}

   const mapStateToProps = (state) => ({
    
});

   export default connect(mapStateToProps, {postProject:actions.postProjectsAction})(AddProject);
//export default AddProject;