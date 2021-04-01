import React, { useEffect} from 'react';
import { Container} from "semantic-ui-react";
import Navbar from './navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {
    const {activityStore} = useStore()
    
  
  useEffect(() => {
    activityStore.loadActivities();
    },[activityStore])
    
    
    
  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'} />
  return (
    <>
        <Navbar/>
        <Container style={{marginTop: '5em'}}>
         <ActivityDashboard  />
        </Container>
    </>
      
  );
}

export default observer(App);
