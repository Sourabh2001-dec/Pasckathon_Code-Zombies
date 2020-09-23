import React, { useState } from 'react'
import { Breadcrumb, Layout, Menu, Row } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Chart } from 'primereact/chart';
import Statistics from './Statistics';
import ClassroomTable from './ClassroomTable';
import StudentForm from './StudentForm';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
function HeaderBar() {
    const [dashBoard, setdashBoard] = useState({
        tab: "1",
    });
    const { tab } = dashBoard;
    const onChange = (e) => {
        setdashBoard({ ...dashBoard, tab: e.key });
    };
    const layout = {
        backgroundColor: "#ffac42",
    };
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Dashboard</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[tab]}

                        onClick={onChange}>
                        <Menu.Item key="1">Statistics</Menu.Item>
                        <Menu.Item key="2">Add Classrooms</Menu.Item>
                        <Menu.Item key="3">Add Student</Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content>
                        {tab === "1" && <Statistics></Statistics>}
                        {tab === "2" && <ClassroomTable></ClassroomTable>}
                        {tab === "3" && <StudentForm></StudentForm>}
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    )
}

export default HeaderBar
