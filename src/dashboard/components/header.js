import React, { useState, useEffect } from 'react';
import { Avatar, Col, Space, Layout, Menu, Row, Button } from 'antd';
import SimpleLineIcon from 'react-simple-line-icons';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import {navigate} from '@reach/router'


const { Header } = Layout;
const DashboardHeader = () => {
    const [state, setState] = useState({ user: null })
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (user.isLoggedin) {
            setState({ user: user.name })
        }
    }, [user])
    

    return (

        <Header color='#fc6'>
            <Row align='top' justify='space-around'>
                <Col span={4}><h2>Dashboard</h2></Col>
                <Col span={20}>
                    <Row justify='space-around'>
                        <Col span={6} offset={8}>
                            <Space>
                                <Button className='sec-button' type='default' size='middle' shape='round'><SimpleLineIcon name="layers" /> Create Disputes</Button>
                                <Button className='sec-button' type='default' size='middle' shape='round'><SimpleLineIcon name="badge" /> Notification</Button>

                            </Space>
                        </Col>
                        <Col span={6}>
                            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['about']}>
                                {/*  <Menu.Item key="home"><SimpleLineIcon name="home" /> Home</Menu.Item>
                        <Menu.Item key="dashboard"><SimpleLineIcon name="briefcase" /> Dashboard</Menu.Item>
                        <Menu.Item key="abouts"><SimpleLineIcon name="layers" /> About us</Menu.Item>
                        <Menu.Item key="Pricing"><SimpleLineIcon name="speedometer" /> Pricing</Menu.Item>
                        <Menu.Item key="Contact"><SimpleLineIcon name="phone" /> Contact us</Menu.Item> */}

                                <Menu.Item key="about" icon={<Avatar size={40} src="https://joeschmoe.io/api/v1/random" />}>{state.user}</Menu.Item>
                                <Menu.Item key="notification" onClick={()=>Auth.signOut().then(()=>{navigate("/signin")})}><SimpleLineIcon name="power" /></Menu.Item>
                            </Menu>

                        </Col>

                    </Row>
                </Col>
            </Row>
        </Header>
    )
}

export default DashboardHeader