import React from 'react';
import AnalysisBar from '../analysisChart/AnalysisBar';
import './userIcon.css';


const UserIcon = () => {
    return (<React.Fragment>

        {/* bottom graph and user summary div */}
        <div className="row">
            <div className="col-md-6 pt-4 ">
                {/* Department & Members */}
                <div className="container bg-white">
                    <div className="row pt-5">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">
                                <div className="superAdminIcon departmentBackground text-center ">
                                    <img className="my-3" width="35" src="/images/dashboard/departments/Group (2).svg" alt="department_edms" />
                                </div>
                            </div>
                            <h6 className="p-2 mt-1 text-center iconTitleText">Departments</h6>
                            <h6 className="p-2 text-center text-dark">5 Members </h6>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">
                                <div className="superAdminIcon memberBackground text-center ">
                                    <img className="my-3" width="30" src="/images/dashboard/members/Vector.svg" alt="department_edms" />
                                </div>
                            </div>
                            <h6 className="p-2 mt-1 text-center iconTitleText">Members</h6>
                            <h6 className="p-2 text-center text-dark">24 Members </h6>
                        </div>
                    </div>
                </div>

                {/* second icon Unit & Documents */}
                <div className="container bg-white">
                    <div className="row py-5">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">
                                <div className="superAdminIcon departmentBackground text-center ">
                                    <img className="my-3" width="35" src="/images/dashboard/units/Group_(2).svg" alt="department_edms" />
                                </div>

                            </div>
                            <h6 className="p-2 mt-1 text-center iconTitleText">Units</h6>
                            <h6 className="p-2 text-center text-dark">3 Units</h6>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">
                                <div className="superAdminIcon memberBackground text-center ">
                                    <img className="my-3" width="30" src="/images/dashboard/documents/Vector.svg" alt="department_edms" />
                                </div>
                            </div>
                            <h6 className="p-2 mt-1 text-center iconTitleText">Documents</h6>
                            <h6 className="p-2 text-center text-dark">12,097 files</h6>
                        </div>
                    </div>
                </div>
            </div>


            {/*  */}

            <div className="col-md-6 pt-4 ">
                <div className="pt-2  container bg-white">
                    <div className="pt-4 pl-3">
                        <h3 >ANALYSIS</h3>
                        <div className="superAdminLine superAdminLineColor col-md-1 "></div>
                    </div>
                    <AnalysisBar />
                </div>

            </div>
            {/* <div className="col-md-6 py-5" style={{ height: '100%' }}>
                    <div className="pt-5 pl-5 bg-white">
                        <h3 >ANALYSIS</h3>
                        <div className="superAdminLine superAdminLineColor col-md-1 "></div>
                    </div>
                    <AnalysisBar />
                </div> */}
        </div>
    </React.Fragment>);
}

export default UserIcon;