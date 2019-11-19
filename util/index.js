import checkPropTypes from 'check-prop-types';

import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../src/store/reducers/reducer';
import { middlewares } from './../src/createStore';

// findByTestAttr('shallow render', 'attribute which we use to reference the component')
export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, 'props', component.name);
    return propsErr;
}


export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};