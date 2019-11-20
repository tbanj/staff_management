import React, { Component } from 'react';
import { toast } from 'react-toastify';
import StaffService from '../../service/staffService';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.staffSrv = new StaffService();
        console.log(this.props.history.location.pathname);

    }
    staffId() {
        const splitName = this.props.history.location.pathname.split("/");
        return splitName[2];
    }

    getDatas = async () => {
        try {
            const res = await this.staffSrv.staffDetail(this.staffId());
            console.log(res.data)
            toast.success("Staff data retrieved")
        } catch (error) {
            console.log(error);
            toast.error("unable to retrieve data")
        }
    }

    componentDidMount() {
        this.staffId();
        this.getDatas();
    }
    render() {
        return (<div></div>);
    }
}

export default Profile;