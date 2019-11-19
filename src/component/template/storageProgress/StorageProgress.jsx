import React, { Component } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './storageProgress.css';

const percentage = 70.5;

class StorageProgress extends Component {


    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center">
                    <CircularProgressbarWithChildren
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.58,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',

                            // Text size
                            textSize: '16px',

                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor: `rgba(255, 112, 112, ${percentage / 100})`,
                            textColor: '#f88',
                            trailColor: '#E1E4E8',
                            backgroundColor: '#3e98c7',
                        })}
                        value={74.5} >
                        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                        <div style={{ fontSize: 12, marginTop: -5 }}>
                            <h2>74.5%</h2>
                        </div>
                        <h6 className="text-teal">Storage Used</h6>
                    </CircularProgressbarWithChildren>;
                </div>
                <div className="py-5">
                    <div className="d-flex justify-content-around">
                        <div className="pr-2"><span className="h5">44 GB</span> <span className="bg-teal">Used</span></div>
                        <div className="pr-2"><span className="h5">50 GB</span>  <span className="bg-teal">Total</span> </div>
                    </div>

                    <div><hr id="brekLine" /></div>
                    {/* Accounting Dept */}
                    <div className="d-flex justify-content-around">
                        <div>
                            <div className="pt-3"> <span className="storagetitle">Accounting Dept</span> </div>
                            <div className="pt-3"> <span className="storagetitle">Human Resource</span></div>
                            <div className="pt-3"> <span className="storagetitle">Finance</span> </div>
                            <div className="pt-3"><span className="storagetitle">Creative</span></div>
                        </div>
                        <div>
                            <div className="pt-3"><span className="storageColor storageSize">12 GB</span></div>
                            <div className="pt-3"><span className="storageColor storageSize">13 GB</span></div>
                            <div className="pt-3"><span className="storageColor storageSize">18 GB</span></div>
                            <div className="pt-3"><span className="storageColor storageSize">8 GB</span></div>
                        </div>
                    </div>
                </div>



            </React.Fragment>
        );
    }
}

export default StorageProgress;