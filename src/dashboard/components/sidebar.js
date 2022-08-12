import { Divider, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';
import logo from '../assets/images/presolved.png'
const { Sider } = Layout;
const DashboardSidebar = () => {
    const [state, setState] = useState({
        collapsed: false
    })
    return (
        <Sider theme='light' width={250} collapsedWidth={80} collapsed={state.collapsed} breakpoint="lg" reverseArrow >
            <div className='logo'>
                <img src={logo} height={50} />
            </div>
            <div onClick={() => setState({ ...state, collapsed: !state.collapsed })} className='nav'><SimpleLineIcon name="arrow-left-circle" /></div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="home1"> <SimpleLineIcon name="home" /> item 1</Menu.Item>
                <Menu.Item key="list2"> <SimpleLineIcon name="list" />   item 2</Menu.Item>
            
                <Menu.Item key="home"><SimpleLineIcon name="home" /> Home</Menu.Item>
                <Menu.Item key="dashboard"><SimpleLineIcon name="briefcase" /> Dashboard</Menu.Item>
                <Menu.Item key="abouts"><SimpleLineIcon name="layers" /> About us</Menu.Item>
                <Menu.Item key="Pricing"><SimpleLineIcon name="speedometer" /> Pricing</Menu.Item>
                <Menu.Item key="Contact"><SimpleLineIcon name="phone" /> Contact us</Menu.Item>
            </Menu>

        </Sider>
    )
}

export default DashboardSidebar