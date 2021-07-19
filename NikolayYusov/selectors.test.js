import * as selectors from '../selectors';
import * as mockSelectors from 'src/js/mockData/mockSelectors';
import * as themes from 'src/js/themes';
import * as logic from 'src/js/platforms/crypto/commonLogic/header/logic';
import * as businessLogic from 'src/js/platforms/crypto/businessLogic/common';

describe('More selectors', () => {
    const state = store.getState();

    it('getIsRtl', () => {
        assert.deepEqual(selectors.getIsRtl(state), mockSelectors.getIsRtl(state));
    });

    it('getIsDemo', () => {
        assert.deepEqual(selectors.getIsDemo(state), mockSelectors.getIsDemo(state));
    });

    it('getLanguage', () => {
        assert.deepEqual(selectors.getLanguage(state), mockSelectors.getLanguage(state));
    });

    it('getUserEmail', () => {
        assert.deepEqual(selectors.getUserEmail(state), mockSelectors.getUserEmail(state));
    });

    it('getDeviceName', () => {
        assert.deepEqual(selectors.getDeviceName(state), mockSelectors.getDeviceName(state));
    });

    it('getCoefficient', () => {
        assert.deepEqual(selectors.getCoefficient(state), mockSelectors.getCoefficient(state));
    });

    it('getRestrictions', () => {
        assert.deepEqual(selectors.getRestrictions(state), mockSelectors.getRestrictions(state));
    });

    it('getCurrentTheme', () => {
        assert.deepEqual(selectors.getCurrentTheme(state), mockSelectors.getCurrentTheme(state));
    });

    it('getUserNameSurname', () => {
        assert.deepEqual(selectors.getUserNameSurname(state), mockSelectors.getUserNameSurname(state));
    });

    it('getSecuritySettings', () => {
        assert.deepEqual(selectors.getSecuritySettings(state), mockSelectors.getSecuritySettings(state));
    });

    it('getDefaultOrderType', () => {
        assert.deepEqual(selectors.getDefaultOrderType(state), mockSelectors.getDefaultOrderType(state));
    });

    it('getSelectedInstrument', () => {
        assert.deepEqual(selectors.getSelectedInstrument(state), mockSelectors.getSelectedInstrument(state));
    });

    it('getDefaultTimeInForce', () => {
        assert.deepEqual(selectors.getDefaultTimeInForce(state), mockSelectors.getDefaultTimeInForce(state));
    });

    it('getOneClickTradingState', () => {
        assert.deepEqual(selectors.getOneClickTradingState(state), mockSelectors.getOneClickTradingState(state));
    });

    it('getShowSignalsModalState', () => {
        assert.deepEqual(selectors.getShowSignalsModalState(state), mockSelectors.getShowSignalsModalState(state));
    });

    it('getShowNotificationsState', () => {
        assert.deepEqual(selectors.getShowNotificationsState(state), mockSelectors.getShowNotificationsState(state));
    });

    it('getPushNotificationsCount', () => {
        assert.deepEqual(selectors.getPushNotificationsCount(state), mockSelectors.getPushNotificationsCount(state));
    });

    it('getPayWithBrandCurrencyState', () => {
        assert.deepEqual(selectors.getPayWithBrandCurrencyState(state), mockSelectors.getPayWithBrandCurrencyState(state));
    });

    it('getPushNotificationsPermission', () => {
        assert.deepEqual(selectors.getPushNotificationsPermission(state), mockSelectors.getPushNotificationsPermission(state));
    });

    it('getIsShowSystemPushNotifications', () => {
        assert.deepEqual(selectors.getIsShowSystemPushNotifications(state), mockSelectors.getIsShowSystemPushNotifications(state));
    });
});

describe('More reselect selectors', () => {
    let theme;
    let sandbox;
    let userStatus;
    let pushNotificationDescription;

    before(() => {
        sandbox = sinon.createSandbox();

        theme = 'theme';
        userStatus = 'kyc_verified_status';
        pushNotificationDescription = 'dialogResources:showEnabledPushNotificationsDescription';

        sandbox.stub(logic, 'getUserStatus').returns(userStatus);
        sandbox.stub(logic, 'getIsVerifiedStatus').returns(true);
        sandbox.stub(themes, 'getTheme').returns(theme);
        sandbox.stub(businessLogic, 'getPushNotificationDescriptionText').returns(pushNotificationDescription);
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    it('themeSelector', () => {
        const deviceName = 'deviceName';
        const coefficient = 'coefficient';
        const currentTheme = 'currentTheme';
        const mockState = {
            theme: {
                coefficient,
                currentTheme,
            },
            cryptoModel: {
                device: {
                    deviceName,
                },
            },
        };

        assert.deepEqual(selectors.themeSelector(mockState), theme);
        sinon.assert.calledOnce(themes.getTheme);
        sinon.assert.calledWith(themes.getTheme, {
            component: 'more',
            deviceName,
            coefficient,
            currentTheme,
        });
    });

    it('pushNotificationDescriptionSelector', () => {
        const mockState = {
            userLocalSettings: {
                accountSettings: {
                    pushNotifications: {
                        permission: 'granted',
                    },
                },
            },
        };
        const permission = 'granted';

        assert.deepEqual(selectors.pushNotificationDescriptionSelector(mockState), pushNotificationDescription);
        sinon.assert.calledOnce(businessLogic.getPushNotificationDescriptionText);
        sinon.assert.calledWith(businessLogic.getPushNotificationDescriptionText, permission);
    });

    it('itemSecuritySettingsSelector when exists selectedInstrument', () => {
        const BTCAUD = {
            name: 'BTCAUD',
            market: 'crypto-fiat',
            popular: false,
            tickSize: 0.01,
            multiplier: 1e-8,
            termCurrency: 'AUD',
            baseCurrency: 'BTC',
            calendarCodeId: 'b01aabdd-1021-11ea-b3b6-fafced178cd6',
            defaultQuantity: 0.001,
            maximumQuantity: 25,
            minimumQuantity: 0.001,
            quantityIncrement: 1e-8,
            isSuspendedForTrading: false,
            targetPriceMinPercent: 100,
            targetPriceMaxPercent: 100,
            buyerCommissionAccount: 'DESTINATION_ACCOUNT',
            takerReserveMultiplier: 1.3,
            sellerCommissionAccount: 'DESTINATION_ACCOUNT',
            commissionThirdCurrency: 'BXY',
            buyerMakerCommissionFlat: 0,
            buyerTakerCommissionFlat: 0,
            sellerMakerCommissionFlat: 0,
            sellerTakerCommissionFlat: 0,
            allowCommissionInThirdCurrency: true,
            buyerMakerCommissionProgressive: 0.15,
            buyerTakerCommissionProgressive: 0.25,
            sellerTakerCommissionProgressive: 0.25,
            commissionPercentInThirdCurrency: 90,
            sellerMakerCommissionProgressive: 0.15,
        };
        const mockState = {
            cryptoModel: {
                userSettings: {
                    securitySettings: {
                        BTCAUD
                    },
                }
            },
            userLocalSettings: {
                accountSettings: {
                    instrumentTable: {
                        selectedInstrument: 'BTCAUD',
                    }
                }
            }
        };

        assert.deepEqual(selectors.itemSecuritySettingsSelector(mockState), BTCAUD);
    });

    it('itemSecuritySettingsSelector when absent selectedInstrument', () => {
        const BTCAUD = {
            name: 'BTCAUD',
            market: 'crypto-fiat',
            popular: false,
            tickSize: 0.01,
            multiplier: 1e-8,
            termCurrency: 'AUD',
            baseCurrency: 'BTC',
            calendarCodeId: 'b01aabdd-1021-11ea-b3b6-fafced178cd6',
            defaultQuantity: 0.001,
            maximumQuantity: 25,
            minimumQuantity: 0.001,
            quantityIncrement: 1e-8,
            isSuspendedForTrading: false,
            targetPriceMinPercent: 100,
            targetPriceMaxPercent: 100,
            buyerCommissionAccount: 'DESTINATION_ACCOUNT',
            takerReserveMultiplier: 1.3,
            sellerCommissionAccount: 'DESTINATION_ACCOUNT',
            commissionThirdCurrency: 'BXY',
            buyerMakerCommissionFlat: 0,
            buyerTakerCommissionFlat: 0,
            sellerMakerCommissionFlat: 0,
            sellerTakerCommissionFlat: 0,
            allowCommissionInThirdCurrency: true,
            buyerMakerCommissionProgressive: 0.15,
            buyerTakerCommissionProgressive: 0.25,
            sellerTakerCommissionProgressive: 0.25,
            commissionPercentInThirdCurrency: 90,
            sellerMakerCommissionProgressive: 0.15,
        };
        const mockState = {
            cryptoModel: {
                userSettings: {
                    securitySettings: {
                        BTCAUD
                    },
                }
            },
            userLocalSettings: {
                accountSettings: {
                    instrumentTable: {
                        selectedInstrument: 'BXYBTC',
                    }
                }
            }
        }
        assert.deepEqual(selectors.itemSecuritySettingsSelector(mockState), {});
    });

    it('userStatusSelector', () => {
        const mockState = {
            cryptoModel: {
                userSettings: {
                    restrictions: {
                        fiatTradingRestriction: 'ALLOWED',
                        is2faEnabled: false,
                        isKycVerified: true,
                        tradingRestriction: 'ALLOWED',
                    },
                    securitySettings: {
                        BTCUSD: {},
                    },
                },
            },
            userLocalSettings: {
                accountSettings: {
                    instrumentTable: {
                        selectedInstrument: 'BTCUSD',
                    },
                },
            },
        };

        assert.deepEqual(selectors.userStatusSelector(mockState), userStatus);
        sinon.assert.calledOnce(logic.getUserStatus);
        sinon.assert.calledWith(logic.getUserStatus, {
            restrictions: {
                fiatTradingRestriction: 'ALLOWED',
                is2faEnabled: false,
                isKycVerified: true,
                tradingRestriction: 'ALLOWED',
            },
            securitySettings:{
                BTCUSD: {},
            },
            selectedInstrument: 'BTCUSD',
        });
    });

    it('isVerifiedSelector', () => {
        const mockState = {
            cryptoModel: {
                userSettings: {
                    restrictions: {
                        fiatTradingRestriction: 'ALLOWED',
                        is2faEnabled: false,
                        isKycVerified: true,
                        tradingRestriction: 'ALLOWED',
                    },
                    securitySettings: {
                        BTCUSD: {},
                    },
                },
            },
            userLocalSettings: {
                accountSettings: {
                    instrumentTable: {
                        selectedInstrument: 'BTCUSD',
                    },
                },
            },
        };

        assert.deepEqual(selectors.isVerifiedSelector(mockState), true);
        sinon.assert.calledOnce(logic.getIsVerifiedStatus);
        sinon.assert.calledWith(logic.getIsVerifiedStatus, userStatus);
    });

    it('sortedContentMoreList', () => {
        assert.deepEqual(selectors.sortedContentMoreList(), [ 'settings', 'support', 'logout' ]);
    });
});
