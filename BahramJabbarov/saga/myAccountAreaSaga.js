import { call, select, put } from 'redux-saga/effects';
import * as selectors from '../selectors';
import * as actions from '../actions';
import { getAccountPageUrlChangedLang } from 'src/js/businessLogic/common';
import { changeUserLocalSettings, closeExpandedWindows } from './userLocalSettingsSaga';
import { configCore } from 'src/js/configCrypto';
import constants from 'src/js/constants';

export function* toggleMyAccountArea(action) {
    if (!action?.payload) {
        return;
    }

    const {
        url,
        isActive,
    } = action.payload;
    const isMobile = yield select(selectors.getIsMobile);

    isActive && (yield call(closeExpandedWindows, constants.MY_ACCOUNT_AREA_EXPANDED_MODE));
    yield call(changeUserLocalSettings, url, 'myAccountArea', 'url');

    configCore.isMobileEnabled && isMobile ?
        yield call(toggleMyAccountMobile, url) :
        yield call(toggleMyAccountDesktop, isActive);
}

export function* toggleMyAccountMobile(url) {
    const exceptionsList = [constants.MORE, constants.BALANCES];
    const activeComponent = yield select(selectors.getActiveMobileComponent);

    if (exceptionsList.includes(activeComponent)) {
        return;
    }

    url ?
        yield put(actions.changeRoute('more/my-account')) :
        yield put(actions.goBackRoute());
}

export function* toggleMyAccountDesktop(isActive) {
    yield call(changeUserLocalSettings, isActive, 'blocksActive', 'myAccountArea');
}

export function* changeMyAccountAreaLanguage(action) {
    const { payload: language } = action;

    const oldUrl = yield select(selectors.getUrlMyAccount);

    if (!oldUrl) {
        return;
    }

    const url = yield call(getAccountPageUrlChangedLang, oldUrl, language);

    yield call(changeUserLocalSettings, url, 'myAccountArea', 'url');
}
