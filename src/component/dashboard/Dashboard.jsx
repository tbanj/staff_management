import React from 'react';
// import antd from 'antd';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Table } from 'antd';
import UserIcon from '../template/userIcon/UserIcon';
// import Modal from "../modal/Modal";
import { Modal, Button } from 'antd';
import StorageProgress from '../template/storageProgress/StorageProgress';
import MultiForm from '../template/MultiForm';
import './dashboard.css';


const { Header, Sider, Content } = Layout;

const columns = [
    // {
    //     title: 'Event Time',
    //     dataIndex: 'eventTime',

    //     /* specify the condition of filtering result
    //     here is that finding the name started with `value` */
    //     // filterMultiple: false,
    //     defaultSortOrder: 'descend',
    //     sorter: (a, b) => {
    //         const monthDay = a.eventTime.split(",");
    //         const day = monthDay.slice(0, 1).join(" ");
    //         const pickTime = day.split(" ");
    //         const monthDaySecond = b.eventTime.split(",");
    //         const daySec = monthDaySecond.slice(0, 1).join(" ");
    //         const pickTimeSec = daySec.split(" ");
    //         return pickTime[1] - pickTimeSec[1];
    //     },
    //     sortDirections: ['descend', 'ascend'],
    // },
    {
        title: 'User',
        dataIndex: 'user',
        render: (text, record) => (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-4">
                        <img style={{ borderRadius: '50%' }} src={record.user}
                            alt="user" width="60" className="img-circle" />
                    </div>


                </div>
            </React.Fragment>
        ),
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        /* specify the condition of filtering result
        here is that finding the eventType started with `value` */
        sorter: (a, b) => a.firstName.length - b.firstName.length,
        sortDirections: ['descend', 'ascend'],
    },

    {
        title: 'Last Name',
        dataIndex: 'lastName',
        /* specify the condition of filtering result
        here is that finding the eventType started with `value` */
        sorter: (a, b) => a.lastName.length - b.lastName.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'State of Origin',
        dataIndex: 'stateOfOrigin',
        /* specify the condition of filtering result
        here is that finding the eventType started with `value` */
        sorter: (a, b) => a.stateOfOrigin.length - b.stateOfOrigin.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },


    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
    },
    {

        dataIndex: 'detail',
        render: (text, record) => (
            <span>
                <a className="btn btn-outline-success" href={`${record.firstName}`}>{record.detail}</a>
            </span>

        ),
    },
];

const data = [

    {
        key: '1',
        firstName: 'John',
        lastName: 'Ken',
        email: 'johnken@yahoo.com',
        birthday: new Date(1978, 12, 2).toDateString(),
        user: "/images/dashboard/Avatar_3.3.svg",
        detail: 'Edit Staff',
        age: 32,
        stateOfOrigin: "Lagos",
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        email: 'jimgreen@yahoo.com',
        birthday: new Date(1967, 4, 5).toDateString(),
        user: "/images/dashboard/Avatar_3.3.svg",
        detail: 'Edit Staff',
        age: 27,
        stateOfOrigin: "Kano",
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        email: 'joeblack@yahoo.com',
        birthday: new Date(1990, 21, 12).toDateString(),
        user: "/images/dashboard/Avatar_3.3.svg",
        detail: 'Edit Staff',
        age: 43,
        stateOfOrigin: "Kwara",
    },

];

const stateOfOrigin = [{ id: 1, value: 'lagos', state: 'Lagos' }, { id: 2, value: 'abuja', state: 'Abuja' }, { id: 3, value: 'kwara', state: 'Kwara' }]

function onShowSizeChange(current, pageSize = 3) {
    console.log(current, pageSize);
}

function extractTime(day = 0) {
    const date = new Date();
    const transformDate = date.setDate(date.getDate() + day);
    const extractValue = new Date(transformDate).toDateString();
    const extractDate = extractValue.split(" ");
    const extractTime = new Date(transformDate).toLocaleTimeString();
    const time = extractTime.split(" ");
    const splitTime = time.slice(0, 1);
    const newTime = splitTime[0].split(":");
    return `${extractDate.slice(1, 3).join(" ")}, ${newTime.slice(0, -1).join(":")} ${time[1]}`;
}


function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false, visible: false, showApplyJobModal: false, stateList: stateOfOrigin,
            allStaffs: [...data],
        };
        this.child = React.createRef();

    }

    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    handleJobApply = () => {
        this.setState({
            showApplyJobModal: true,
        })
    }

    hideModal = () => {
        this.setState({ showApplyJobModal: false });
    };
    handelAddUser = (user) => {
        console.log(user);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.setState({ visible: false });
        this.child.current.resetFields()
    };

    handleCancel = e => {
        this.setState({ visible: false });
        console.log(this.child.current);
        console.log(this.form);

        this.child.current.resetFields()

    };

    createImage(file) {
        this.image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
            return vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    onSubmitToServer = (user) => {
        // const saveData = user;
        // delete saveData.confirm;
        console.log(user);
        user.detail = 'Edit Staff';
        console.log(user.user)
        user.stateOfOrigin = user.select[0].toUpperCase() +
            user.select.slice(1);
        const { allStaffs } = this.state
        const key = (allStaffs.length + 1).toString();
        let newStaff = [...allStaffs];
        newStaff = newStaff.concat({ key, ...user });
        this.setState({ allStaffs: newStaff })
    }

    render() {
        const { stateList, allStaffs } = this.state;
        const { location } = this.props;
        console.log(location.pathname)
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo   my-5" >
                        <div className="d-flex justify-content-center">
                            <div className="logoBackground text-center ">
                                <img className="my-2" src="/images/dashboard/photo.PNG" alt="logo_edms" />
                            </div>
                        </div>
                        <h5 className="text-center pt-3">Jaohn Samue</h5>
                        <p className="userPost text-center">Front Desk Officer</p>
                        <p className="text-center" id="userPostTitle ">Finance</p>
                    </div>
                    <Menu className="" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" className="my-3">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/home_icon.svg" alt="homeIcon" />)} />
                            <span className="">Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2" className="my-3">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/User.svg" alt="userIcon" />)} />
                            <span className="">Audit Log</span>
                        </Menu.Item>
                        <Menu.Item key="3" className="my-3">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/settings_icon.svg" alt="settingIcon" />)} />
                            <span className="">Settings</span>
                        </Menu.Item>
                        <Menu.Item key="4" className=" sidebarLogout">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/Left arrow round.svg" alt="leftArrowIcon" />)} />
                            <span className="">Log Out</span>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger" onClick={this.toggle}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        />
                    </Header>
                    <div className="row">
                        <div className="col-md">
                            <div>
                                <Content
                                    style={{
                                        margin: '24px 16px', padding: 24,
                                        background: '#fff', minHeight: 280,
                                    }}>
                                    <div className=" ">
                                        {/* <div className="text-center">
                                            <button onClick={this.handleJobApply}
                                                className="btn btn-outline-success btn-lg" type="button">Add Staffs</button>
                                        </div> */}

                                        <React.Fragment>
                                            <Button onClick={this.showModal} style={{ float: 'right', marginTop: '10px' }} type="primary">
                                                <Icon type="user-add" /> Add User</Button>
                                        </React.Fragment>
                                        <div>
                                            <h3>All Employees</h3>
                                            <div className="superAdminLine superAdminLineColor col-md-1"></div>
                                            <Table columns={columns} pagination={{ onShowSizeChange: onShowSizeChange(1, 4) }} dataSource={allStaffs} onChange={onChange} scroll={{ x: 700 }}>

                                            </Table> </div>

                                    </div>


                                    {/* Apply Now modal */}
                                    {/* <Modal showModal={this.state.showApplyJobModal} handleClose={this.hideModal}>
                                        <div className="modal-content">
                                            <div className="modal-header removeBorderModal">
                                                <div className="clearfix">
                                                    <span className="float-right">
                                                        <button type="button" className="close " data-dismiss="modal">
                                                            <span onClick={this.hideModal}>×</span>
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="container">
                                                    <h1 className="modal-title col-md-8 offset-md-2 fontLookTitleIm" >Staff Biodata Form</h1>
                                                </div>
                                            </div>
                                            <div className="modal-body pt-5">
                                                <div className="container">

                                                    <MultiForm wrappedComponentRef={(form) => this.form = form}
                                                        ref={this.child} checkUrl={location.pathname} stateList={stateList}
                                                        onAddUser={this.handelAddUser} onSubmitToServer={this.onSubmitToServer} />


                                                </div>
                                            </div>

                                        </div>
                                    </Modal> */}

                                    <Modal
                                        title="Add User"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <MultiForm wrappedComponentRef={(form) => this.form = form}
                                            ref={this.child} checkUrl={location.pathname} stateList={stateList}
                                            onAddUser={this.handelAddUser} onSubmitToServer={this.onSubmitToServer} />
                                    </Modal>

                                </Content>
                            </div>

                        </div>

                    </div>

                </Layout>
            </Layout>
        );
    }
}

Dashboard.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,

    }),
    handelAddUser: PropTypes.func,
};

// insert default values for props to avoid your app breaking
Dashboard.defaultProps = {
    location: {
        pathname: '',
    },
};

export default Dashboard;


