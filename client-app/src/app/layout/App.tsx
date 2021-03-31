import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Container} from "semantic-ui-react";
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';


function App() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    agent.Activities.list().then(response => {
        let activities: Activity[] = [];
        response.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
        })
      setActivities(activities);
        setLoading(false);
    })
  },[])
    
    function handleSelectedActivity(id: string){
      setSelectedActivity(activities.find(x=> x.id === id))
    }
    
    function handleCancelSelectActivity(){
      setSelectedActivity(undefined);
    };
  function handleFormOpen(id? :string){
      id ? handleSelectedActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
  }
  function handleFormClose(){
      setEditMode(false);
  }
  
  function handleCreateOrEdit(activity: Activity){
      activity.id 
          ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
          : setActivities([...activities, {...activity, id: uuid()}]);
            setEditMode(false);
            setSelectedActivity(activity)
  }
  
  function handleDeleteActivity(id:string){
        setActivities([...activities.filter(x => x.id !== id)])
    }
  if (loading) return <LoadingComponent content={'Loading app'} />
  return (
    <>
        <Navbar openForm={handleFormOpen}/>
        <Container style={{marginTop: '5em'}}>
         <ActivityDashboard  activities={activities}
         selectedActivity = {selectedActivity}
         selectActivity={handleSelectedActivity}
         cancelSelectedActivtiy={handleCancelSelectActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose} createOrEdit={handleCreateOrEdit}
         deleteActivity={handleDeleteActivity}/>
        
        </Container>
    </>
      
  );
}

export default App;
