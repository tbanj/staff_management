import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../util/index';
import ListUser from './ListUser'

const setUp = (props = {}) => {
    const component = shallow(<ListUser  {...props} />);
    return component;
}



describe('ListUser Component', () => {

    describe('Checking PropTypes', () => {
        const expectedProps = {
            desc: 'Example desc',
            title: 'Example title',
        };
        const propsError = checkProps(ListUser, expectedProps);
        expect(propsError).toBeUndefined();

    });

    describe('Component Renders', () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                title: 'Example title',
                desc: 'Example desc',
            };
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAttr(wrapper, 'listUserComponent');
            expect(component.length).toBe(1);
        });


        it(' Should render a title', () => {
            const title = findByTestAttr(wrapper, 'componentTitle');
            expect(title.length).toBe(1);
        });

        it(' Should render a desc', () => {
            const desc = findByTestAttr(wrapper, 'componentDesc');
            expect(desc.length).toBe(1);
        });
    })

    describe('Should Not render', () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                desc: 'Example desc',
            };
            wrapper = setUp(props);
        });

        it('Component is not rendered', () => {
            const component = findByTestAttr(wrapper, 'listUserComponent');
            expect(component.length).toBe(0);
        })
    })
})
