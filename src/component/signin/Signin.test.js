import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps, testStore } from '../../../util/index'
import Signin from './Signin';



const setUp = (initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Signin store={store} />).childAt(0).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Signin Component', () => {

    // check types of props
    describe('Check PropTypes', () => {

        it('Should not throw a warning', () => {
            const expectedProps = {
                location: {
                    pathname: 'Test Pathname',
                },
                tempArr: [{
                    name: 'Test name',
                    age: 25,
                    isOnline: false
                }],
            };
            const propsErr = checkProps(Signin, expectedProps);
            expect(propsErr).toBeUndefined();

        });
    });

    // testing for when we have props
    describe('Have props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                location: {
                    pathname: 'Test Pathname'
                }
            }
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'signinComponent')
            expect(component.length).toBe(1);
        });

        it('Should render image workspace', () => {
            const imgWorkSpace = findByTestAttr(wrapper, 'workSpaceImage');
            expect(imgWorkSpace.length).toBe(1);
        })

    });


    // testing for when there is no props
    describe('Have No props', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAttr(wrapper, 'signinComponent');
            expect(component.length).toBe(1);
        })

    });



})
