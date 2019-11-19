import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (<React.Fragment>

        <div className="container pt-5">
            <div className="pt-5"><h1 className>Page not Found Click</h1>
                <div><Link className="mt-3" style={{ fontSize: '30px' }} to="/">Go Back Home</Link></div>
            </div>
        </div>

    </React.Fragment>);
}

export default NotFound;