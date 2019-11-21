import React, { Suspense } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Table } from 'antd';
// import Modal from "../modal/Modal";
import { Modal, Button } from 'antd';
import StaffService from '../../service/staffService';
import { logout } from '../../service/userService';
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
                            alt={record.user} width="60" className="img-circle" />
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
                <a className="btn btn-outline-success" href={`/dashboard/${record._id}`}>{record.detail}</a>
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

// function extractTime(day = 0) {
//     const date = new Date();
//     const transformDate = date.setDate(date.getDate() + day);
//     const extractValue = new Date(transformDate).toDateString();
//     const extractDate = extractValue.split(" ");
//     const extractTime = new Date(transformDate).toLocaleTimeString();
//     const time = extractTime.split(" ");
//     const splitTime = time.slice(0, 1);
//     const newTime = splitTime[0].split(":");
//     return `${extractDate.slice(1, 3).join(" ")}, ${newTime.slice(0, -1).join(":")} ${time[1]}`;
// }


function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false, visible: false, showApplyJobModal: false, stateList: stateOfOrigin,
            allStaffs: [],
        };
        this.child = React.createRef();
        this.staffSrv = new StaffService();
        this.logOut = this.logOut.bind(this);
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

    logOut() {
        logout();
        window.location = "/signin";
    }

    createImage(file) {
        this.image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
            return vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    presentData(data) {
        let serviceData = [];
        const user = [...data]
        user.forEach((element, key) => {
            let name = element.fullName.split(" ");
            console.log(name[0])
            let reform = {
                firstName: name[0], lastName: name[1],
                birthday: element.dob, email: element.email, stateOfOrigin: element.stateOfOrigin,
                user: element.profilePic, _id: element._id, detail: "Edit Staff", key: key,
            }
            serviceData.push(reform);
        });
        console.log(serviceData)
        return serviceData;
    }

    // async getStaff() {
    //     try {
    //         const res = await this.staffSrv.getAll();
    //         toast("staffs list retrieved");

    //         // console.log(res.data.data);
    //         this.setState({ allStaffs: res.data.data })
    //         // this.presentData(this.state.allStaffs)
    //     } catch (error) {
    //         toast.error("you are not authorised to view staffs");
    //         console.log(error.response);
    //     }
    // }

    getStaff() {

        this.staffSrv.getAll().then((response) => {
            if (response) {
                console.log(response.data.data)
                const data = response.data.data
                this.setState({ allStaffs: this.presentData(data) });
            }
        },
            (error => { console.log(error) }))
            .catch(error => { console.log(error) })

    }

    componentDidMount() {
        this.getStaff();
    }

    onSubmitToServer = (user) => {
        const staff = {
            fullName: (user.firstName + ' ' + user.lastName),
            email: user.email,
            dob: user.birthday,
            stateOfOrigin: user.select
        }
        this.createStaff(staff);
        user.detail = 'Edit Staff';
        user.user = "https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg";
        user.stateOfOrigin = user.select[0].toUpperCase() +
            user.select.slice(1);
        const { allStaffs } = this.state
        const key = (allStaffs.length + 1).toString();
        let newStaff = [...allStaffs];
        newStaff = newStaff.concat({ key, ...user });
        this.setState({ allStaffs: newStaff });
        toast.success(`Staff with Fullname ${user.firstName} ${user.firstName} added`)
        this.handleOk();
    }

    async createStaff(staff) {
        try {
            const res = await this.staffSrv.create(staff);
        } catch (error) {
            toast.error(`error encounter while creating staff`)
            console.log(error.response);
        }
    }
    imgUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('staffId', '5dd460c69d20f200047e8d2c')
            this.upload(fd)
        }
    }
    async upload(fd) {
        try {
            const res = await this.staffSrv.uploadImg(fd);
            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
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
                            <div className=" text-center ">
                                <img className="my-2 img-fluid" src="https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg" alt="logo_edms" />
                            </div>
                        </div>
                        <h5 className="text-center pt-3">Jaohn Samue</h5>
                        <p className="userPost text-center">Front Desk Officer</p>
                        <p className="text-center" id="userPostTitle ">Finance</p>
                    </div>
                    <Menu id="listRezise" className="" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" className="my-3">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/home_icon.svg" alt="homeIcon" />)} />
                            <span className="">Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="4" className=" sidebarLogout">
                            <Icon component={() => (<img className="mb-2" src="/images/dashboard/sidebar/Left arrow round.svg" alt="leftArrowIcon" />)} />
                            <span onClick={this.logOut} className="">Log Out</span>
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

                                        <React.Fragment>
                                            <Button onClick={this.showModal} style={{ float: 'right', marginTop: '10px' }} type="primary">
                                                <Icon type="user-add" /> Add User</Button>
                                        </React.Fragment>
                                        <div>
                                            <h3>All Employees</h3>
                                            {/* <input type="file" onChange={this.imgUpload} /> */}
                                            <div className="superAdminLine superAdminLineColor col-md-1"></div>


                                            <Suspense fallback={<div><h2>Data Loading in Progress</h2></div>}>
                                                {this.state.allStaffs.length > 1 ? <Table columns={columns} pagination={{ onShowSizeChange: onShowSizeChange(1, 4) }} dataSource={allStaffs} onChange={onChange} scroll={{ x: 700 }}>

                                                </Table> : <h2>No data available yet</h2>}
                                            </Suspense>
                                        </div>

                                    </div>

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
            </Layout >
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


