import Component from './MoreMenu.jsx';
import { connect } from 'react-redux';
import * as selectors from '../../selectors';
import * as actions from '../../actions';
import { registerSelectors } from 'reselect-tools';

export const mapStateToProps = state => ({
    name: selectors.getUserNameSurname(),
    email: selectors.getUserEmail(state),
    isRtl: selectors.getIsRtl(state),
    theme: selectors.themeSelector(state),
    isDemo: selectors.getIsDemo(state),
    language: selectors.getLanguage(state),
    userStatus: selectors.userStatusSelector(state),
    contentMoreList: selectors.sortedContentMoreList(state),
    isVerifiedStatus: selectors.isVerifiedSelector(state)
});

export const mapDispatchToProps = dispatch => ({
    clickLogOut: () => dispatch(actions.clickLogOut()),
    clickHelpLink: payload => dispatch(actions.clickHelpLink(payload)),
    clickContentGroup: payload => dispatch(actions.clickMoreMenuContentGroup(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Component);

(process.env.NODE_ENV !== 'production') && (registerSelectors(selectors));
