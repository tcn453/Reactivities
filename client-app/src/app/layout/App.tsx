import React from 'react';
import { Container} from "semantic-ui-react";
import Navbar from './navbar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/Activities/form/ActivityForm';
import ActivityDetails from '../../features/Activities/details/ActivityDetails';


function App() {
    
    const location = useLocation()

  return (
    <>
        <Route  exact path="/" component={HomePage} />
        <Route 
        path={"/(.+)"}
        render={() => (
            <>
                <Navbar/>
                <Container style={{marginTop: '5em'}}>

                    <Route path="/activities/:id" component={ActivityDetails} />
                    <Route exact path="/activities" component={ActivityDashboard} />
                    <Route key={location.key} path={["/createActivity", '/manage/:id']} component={ActivityForm} />
                </Container>
            </>
        ) }
        />
        
    </>
      
  );
}

export default observer(App);
