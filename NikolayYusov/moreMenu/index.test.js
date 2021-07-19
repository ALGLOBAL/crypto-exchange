import { mapStateToProps, mapDispatchToProps } from '../index';
import * as mockSelectors from 'src/js/mockData/mockSelectors';
import * as mockActions from 'src/js/mockData/mockActions';
import * as selectors from '../../../selectors';

const state = store.getState();

describe('HOC MoreMenu', () => {
    let sandbox;
    let dispatch;

    before(() => {
        sandbox = sinon.createSandbox();
        dispatch = sandbox.stub(store, 'dispatch');
    });

    after(() => {
        sandbox.restore();
    });

    it('mapStateToProps should return correct selectors', () => {
        const mockMapStateToProps = state => ({
            name: mockSelectors.getUserNameSurname(),
            email: mockSelectors.getUserEmail(state),
            isRtl: mockSelectors.getIsRtl(state),
            theme: selectors.themeSelector(state),
            isDemo: mockSelectors.getIsDemo(state),
            language: mockSelectors.getLanguage(state),
            userStatus: selectors.userStatusSelector(state),
            contentMoreList: selectors.sortedContentMoreList(state),
            isVerifiedStatus: selectors.isVerifiedSelector(state),
        });
        const expected = mockMapStateToProps(state);

        const actual = mapStateToProps(state);

        assert.deepEqual(actual, expected);
    });

    it('mapDispatchToProps should return correct actions', () => {
        const mapDispatchToPropsResult = mapDispatchToProps(dispatch);
        const payload = 'testPayload';
        const expected = [
            mockActions.clickLogOut(),
            mockActions.clickHelpLink(payload),
            mockActions.clickContentGroup(payload),
        ];

        Object.keys(mapDispatchToPropsResult).forEach(key => mapDispatchToPropsResult[key](payload));

        expected.forEach((expectedAction, index) => {
            const call = dispatch.getCall(index);
            assert.deepEqual(expectedAction, call.args[0]);
        });
    });
});
