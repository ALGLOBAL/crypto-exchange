import { configCore } from 'src/js/platforms/crypto/configCrypto';
import { createDeepEqualSelector } from 'src/js/base/createSelectors';
import { getIsVerifiedStatus, getUserStatus } from 'src/js/platforms/crypto/commonLogic/header/logic';
import { createSelector } from 'reselect';
import { getTheme } from 'src/js/themes';
import constants from 'src/js/constants';
import { getPushNotificationDescriptionText } from 'src/js/platforms/crypto/businessLogic/common';
import { getOrderType } from 'src/js/base/logic';

export const getIsRtl = state => state.language.lang === constants.AR;
export const getIsDemo = state => state.connector.isDemo;
export const getLanguage = state => state.language.lang;
export const getUserEmail = state => state.connector.userName;
export const getDeviceName = state => state.cryptoModel.device.deviceName;
export const getCoefficient = state => state.theme.coefficient;
export const getRestrictions = state => state.cryptoModel.userSettings.restrictions || {};
export const getCurrentTheme = state => state.theme.currentTheme;
export const getUserNameSurname = () => 'name surname';
export const getSecuritySettings = state => state.cryptoModel.userSettings.securitySettings;
export const getDefaultOrderType = state => state.cryptoModel.userExtraData[constants.SERVER_CONSTANTS.USER_EXTRA_DATA_KEYS.ORDER_TYPE];
export const getSelectedInstrument = state => state.userLocalSettings.accountSettings.instrumentTable.selectedInstrument;
export const getDefaultTimeInForce = state => state.cryptoModel.userExtraData[constants.SERVER_CONSTANTS.USER_EXTRA_DATA_KEYS.TIME_IN_FORCE];
export const getOneClickTradingState = state => state.userLocalSettings.accountSettings.platformSettings.isOneClickTrading;
export const getShowSignalsModalState = state => state.userLocalSettings.accountSettings.platformSettings.isShowSignalsModal;
export const getShowNotificationsState = state => state.userLocalSettings.accountSettings.platformSettings.isShowNotifications;
export const getPushNotificationsCount = state => state.cryptoModel.pushNotifications.count;
export const getPayWithBrandCurrencyState = state => state.cryptoModel.userExtraData[constants.SERVER_CONSTANTS.USER_EXTRA_DATA_KEYS.PAY_COMMISSION_IN_THIRD_CURRENCY];
export const getPushNotificationsPermission = state => state.userLocalSettings.accountSettings.pushNotifications.permission;
export const getIsShowSystemPushNotifications = state => state.userLocalSettings.accountSettings.platformSettings.isShowSystemPushNotifications;

export const pushNotificationDescriptionSelector = createSelector(
    getPushNotificationsPermission,
    permission => getPushNotificationDescriptionText(permission)
);

export const sortedContentMoreList = () => {
    const list = configCore.modules.more.contentMoreList;

    return list.filter(item => item.isActive).map(item => item.key)
};

export const userStatusSelector = createDeepEqualSelector(
    getRestrictions,
    getSecuritySettings,
    getSelectedInstrument,
    (restrictions, securitySettings, selectedInstrument) => getUserStatus({
            restrictions,
            securitySettings,
            selectedInstrument
    })
);

export const itemSecuritySettingsSelector = createDeepEqualSelector(
    getSecuritySettings,
    getSelectedInstrument,
    (securitySettings, selectedInstrument) => securitySettings && securitySettings[selectedInstrument] ? securitySettings[selectedInstrument] : {}
);

export const isVerifiedSelector = createDeepEqualSelector(
    userStatusSelector,
    userStatus =>  getIsVerifiedStatus(userStatus)
);

export const themeSelector = createSelector(
    getDeviceName,
    getCoefficient,
    getCurrentTheme,
    (deviceName, coefficient, currentTheme) => getTheme({ component: constants.MORE, deviceName, coefficient, currentTheme })
);

export const selectedOrderTypeSelector = createSelector(
    getDefaultOrderType,
    getDefaultTimeInForce,
    (defaultOrderType, defaultTimeInForce) => getOrderType(defaultOrderType, defaultTimeInForce)
);
