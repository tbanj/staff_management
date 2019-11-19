import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from '../util/index';
import App from './App';

/* 
test(); or it();
*/

/* to avoid repetitve code during component test since we 
will be testing different divs like img & the rest through
there data-test attributes..it make sense if make use of foreach to reduce the code */

// th input parameter for setup might varied it might be state or props
const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<App store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}



describe('App Component', () => {
    let wrapper;
    beforeEach(() => {
        const initialState = {
            posts: [{
                title: 'Example title 1',
                body: 'Some text',
            }, {
                title: 'Example title 2',
                body: 'Some text',
            }, {
                title: 'Example title 3',
                body: 'Some text',
            }, {
                title: 'Example title 4',
                body: 'Some text',
            }]
        }
        wrapper = setUp(initialState);

    })
    it('should render without errors', () => {
        // to see what shallow render is doing
        // console.log(component.debug());

        const component = findByTestAttr(wrapper, 'appComponent');
        /*  appComponent is use to check if the component attach
         to this data-test attribute render & since we reference the data-test
        once in our project we should expect it .toBe(1) if we right to 
         .toBe(2) & we make use of it once below test will fail
         */
        expect(component.length).toBe(1);
    })


})