
import React, { useEffect, useState } from 'react';

import { DataStore } from '@aws-amplify/datastore';
import { navigate, Router } from '@reach/router';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { MerchantsProfile, PaymentAggregators } from '../models/';
import { updateProfile, updateUser } from '../store/reducers/user';
import { Layout } from 'antd';
import SimpleLineIcon from 'react-simple-line-icons';
import DashboardHeader from './components/header';
import DashboardSidebar from './components/sidebar';

import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import './assets/style/theme.less';
import Fallback from '../gc-components/fallback';
import SaveAggregators from './pages/saveAggregators';
import { getUserData } from './utils/dataStore';
import CreateDisputeRules from './pages/disputeRules';

const BlankPage = React.lazy(() => import('./pages/blank'));
const CreateUserProfile = React.lazy(() => import('./pages/createProfile'));
const { Content } = Layout;


const DashboardIndexPage = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    const [state, setState] = useState({
        collapsed: false,
        isLoggedIn: false
    })



    useEffect(() => {
       
        if (!user.isLoggedin) {
            Auth.currentAuthenticatedUser().then((login) => {
                setState({ ...state, isLoggedIn: true })
                const loginData = login?.attributes
                getUserData(loginData.email).then((reduxData) => {
                    dispatch(updateUser({ ...loginData }))
                    if (reduxData.profile.length > 0) {
                        dispatch(updateProfile({ ...reduxData }))
                    } else {
                        navigate("/new-user")
                    }
                })
            }).catch((ex) => {
                navigate("/signin")
            })
        }else{
            setState({ ...state, isLoggedIn: true })
        }

    }, [user.isLoggedin])

    return (
        <Layout className='newdashboard'>
            <DashboardSidebar />
            {state.isLoggedIn &&
                <Layout>
                    <DashboardHeader />
                    <React.Suspense fallback={<Fallback />}>
                        <Content className='main-content'>
                            <Router basepath="/">
                                <BlankPage path="/" />
                                <BlankPage path="/dashboard" />
                                <CreateDisputeRules path="/dispute-rules" />
                                <CreateUserProfile path="/new-user" />
                                <SaveAggregators path="/add-aggregators" />
                            </Router>
                        </Content>
                    </React.Suspense>
                </Layout>
            }
        </Layout>
    )
}

export default DashboardIndexPage