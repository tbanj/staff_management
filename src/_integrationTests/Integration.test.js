import moxios from 'moxios';
import { testStore } from './../../util/index';
import { fetchPosts } from './../store/actions/index';

describe(' fetchPosts action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });


    test('Store is updated correctly', () => {
        const expectedState = [{
            title: 'Example title 1',
            body: 'Some Text'
        }, {
            title: 'Example title 2',
            body: 'Some Text'
        }, {
            title: 'Example title 3',
            body: 'Some Text'
        }];

        const expectedUser = { "user": {}, "posts": expectedState };
        const newStateSent = Object.assign({}, expectedUser);
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(fetchPosts())
            .then(() => {
                const newState = store.getState();
                expect(newState.posts).toStrictEqual(newStateSent.posts);
            })
    });
});