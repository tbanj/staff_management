import React from 'react';
import { shallow } from 'enzyme';
import ButtonList from './ButtonList';
import { findByTestAttr, checkProps } from '../../../util/index';

const setUp = (props = {}) => {
    const component = shallow(<ButtonList {...props} />);
    // console.log(component.debug());
    return component;
}
describe('ButtonList Component', () => {

    describe('Have Props', () => {
        let wrapper;

        let mockFunc;
        beforeEach(() => {
            /* Integration Test to simulate event
            mockFunc is a function which is use to simulate  click
            event in a button */
            mockFunc = jest.fn()
            const props = {
                buttonText: 'Example Button',
                emitEvent: mockFunc,
            };
            wrapper = setUp(props);
        });

        it('Should render buttonList without errors', () => {
            const button = findByTestAttr(wrapper, 'buttonListComponent');
            expect(button.length).toBe(1);
        });

        it('Should emit callback onclick', () => {
            const button = findByTestAttr(wrapper, 'buttonListComponent');
            button.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        })
    });

    describe('Have No Props', () => {
        let wrapper;
        beforeEach(() => { wrapper = setUp(); });

        it('Should not render', () => {
            const component = findByTestAttr(wrapper, 'buttonListComponent');
            expect(component.length).toBe(1);
        })
    });

    // check types of props & 
    describe('Check PropTypes', () => {

        it('Should not throw a warning', () => {
            const expectedProps = {
                // test for ActionCreators propType
                buttonText: 'Example Button',
                emitEvent: () => { },
            };
            const propsErr = checkProps(ButtonList, expectedProps);
            expect(propsErr).toBeUndefined();

        });
    });

});

