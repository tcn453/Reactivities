import { observer } from 'mobx-react-lite';
import React, {useEffect} from 'react';
import { Grid} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from "../../../app/layout/LoadingComponents";




export default observer( function ActivityDashboard() {

    const {activityStore} = useStore()
    const {loadActivities, activityRegistry} = activityStore

    useEffect(() => {
        if (activityRegistry.size <= 0) loadActivities();
    },[activityRegistry, loadActivities])



    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'} />
   
    return (
        <Grid>
            <Grid.Column width={"10"}>
              <ActivityList />
            </Grid.Column>
            <Grid.Column width={"6"}>
               <h2>Activity filters</h2>
                
            </Grid.Column>
        </Grid>
    )
})