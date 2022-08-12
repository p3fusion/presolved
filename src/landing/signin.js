import { Authenticator, Button, Flex, Heading, ThemeProvider, View } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';

import { DataStore } from '@aws-amplify/datastore';
import { navigate } from '@reach/router';
import { Auth, Hub } from "aws-amplify";
import { useDispatch } from 'react-redux';
import { MerchantsProfile } from '../models/';
import { updateProfile, updateUser } from '../store/reducers/user';


import '@aws-amplify/ui-react/styles.css';
import './assets/style/index.less';
import { getUserData } from '../dashboard/utils/dataStore';


const theme = { name: 'my-theme', tokens: { colors: { font: { primary: { value: '#222' } } } } };

const SigninPage = () => {

    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoggedin: false,
        user: null
    })

    const RedirectToPage = async (url = "/dashboard") => {
        await navigate(url)
    }
    const checkUserProfile = async (id) => {
        let result = await DataStore.query(MerchantsProfile, (profile) => profile.email('eq', id));
        return result
    }

    // when user directly lands on to this page, the below function will check the user is authenticated
    useEffect(() => {
        Auth.currentAuthenticatedUser().then((login) => {
            //setState({...state,isLoggedin:true})
            const loginData = login?.attributes            
            getUserData(loginData.email).then((reduxData) => {
                dispatch(updateUser({ ...loginData }))
                if (reduxData.profile.length > 0) {
                    dispatch(updateProfile({ ...reduxData }))
                    RedirectToPage()
                } else {
                    navigate("/new-user")
                }
            })
        })
    }, [state.isLoggedin])

    // When users signup or login, the below function will update the user data to the app.
    Hub.listen('auth', (data) => {
        const event = data.payload.event;
        console.log({event});
        if (event === 'signIn') {
            setState({...state,isLoggedin:true})
           /*  const login = data.payload.data
            console.log({login});
            const loginData = login?.attributes
            getUserData(loginData.email).then((reduxData) => {
                dispatch(updateUser({ ...loginData }))
                if (reduxData.profile.length > 0) {
                    dispatch(updateProfile({ ...reduxData }))
                    RedirectToPage()
                } else {
                    navigate("/new-user")
                }
            }) */
        }
    });


    return (
        <ThemeProvider theme={theme}>
            <section className='auth-page'>
                <Flex borderRadius={1} direction="column" justifyContent="center" alignItems="center" alignContent="" wrap="wrap" gap="1rem" height="100vh">
                    <View className="form">
                        <View className="logo">
                            <Heading color="white" level={3}>MerchantApp</Heading >
                            <Heading color="white" level={6}>one stop shop for all your Online tracking</Heading>
                        </View>
                        <Authenticator >
                            {({ signOut }) => (
                                <main>
                                    <Heading level={2}>Please wailt while we load the page . . .</Heading>
                                    <Button onClick={signOut} isFullWidth={true} variation="primary" size="large" loadingText="">Sign out</Button>
                                </main>
                            )}
                        </Authenticator>
                    </View>
                </Flex>
            </section>
        </ThemeProvider>
    );
}

export default SigninPage