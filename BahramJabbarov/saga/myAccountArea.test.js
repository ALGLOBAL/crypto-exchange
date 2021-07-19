import { call, put, select } from 'redux-saga/effects';
import * as selectors from '../selectors';
import * as myAccountAreaSaga from '../sagas/myAccountAreaSaga';
import * as userLocalSettingsSaga from '../sagas/userLocalSettingsSaga';
import constants from 'src/js/constants';
import { getAccountPageUrlChangedLang } from 'src/js/businessLogic/common';
import * as config from 'src/js/configCrypto';
import * as mockActions from 'src/js/mockData/mockActions';

describe('myAccountAreaSaga', () => {
    describe('toggleMyAccountArea', () => {
        describe('when isActive = true, isMobile = true', () => {
            let sandbox = null;
            let mockConfigCore = null;

            before(() => {
                sandbox = sinon.createSandbox();
                mockConfigCore = {
                    isMobileEnabled: true ,
                };

                sandbox.stub(config, 'configCore').get(() => mockConfigCore);
            });

            after(() => {
                sandbox.restore();
            });

            const action = {
                payload: {
                    url: 'url',
                    isActive: true,
                },
            };
            const isMobile = true;
            const generator = myAccountAreaSaga.toggleMyAccountArea(action);

            it('should select getIsMobile', () => {
                assert.deepEqual(generator.next().value, select(selectors.getIsMobile));
            });

            it('should call closeExpandedWindows', () => {
                assert.deepEqual(generator.next(isMobile).value, call(userLocalSettingsSaga.closeExpandedWindows, constants.MY_ACCOUNT_AREA_EXPANDED_MODE));
            });

            it('should call changeUserLocalSettings', () => {
                assert.deepEqual(generator.next().value, call(userLocalSettingsSaga.changeUserLocalSettings, action.payload.url, 'myAccountArea', 'url'));
            });

            it('should put changeRoute with myAccount', () => {
                assert.deepEqual(generator.next().value, call(myAccountAreaSaga.toggleMyAccountMobile, action.payload.url));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });

        describe('when isActive = false isMobile = false', () => {
            const action = {
                payload: {
                    url: 'url',
                    isActive: false,
                },
            };
            const isMobile = false;
            const generator = myAccountAreaSaga.toggleMyAccountArea(action);

            it('should select getIsMobile', () => {
                assert.deepEqual(generator.next().value, select(selectors.getIsMobile));
            });

            it('should call changeUserLocalSettings', () => {
                assert.deepEqual(generator.next(isMobile).value, call(userLocalSettingsSaga.changeUserLocalSettings, action.payload.url, 'myAccountArea', 'url'));
            });

            it('should call toggleMyAccountDesktop', () => {
                assert.deepEqual(generator.next().value, call(myAccountAreaSaga.toggleMyAccountDesktop, action.payload.isActive));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });

        describe('when no action.payload', () => {
            const generator = myAccountAreaSaga.toggleMyAccountArea({});

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });
    });

    describe('changeMyAccountAreaLanguage', () => {
        describe('when have oldUrl', () => {
            let sandbox = null;
            let mockConfigCore = null;

            before(() => {
                sandbox = sinon.createSandbox();
                mockConfigCore = {
                    isMobileEnabled: true,
                };

                sandbox.stub(config, 'configCore').get(() => mockConfigCore);
            });

            after(() => {
                sandbox.restore();
            });
            const action = {
                payload: 'en',
            };
            const oldUrl = 'link?mode=platform&lang=ru';
            const newUrl = 'link?mode=platform&lang=en';
            const generator = myAccountAreaSaga.changeMyAccountAreaLanguage(action);

            it('should select getUrlMyAccount', () => {
                assert.deepEqual(generator.next().value, select(selectors.getUrlMyAccount));
            });

            it('should call getAccountPageUrlChangedLang', () => {
                assert.deepEqual(generator.next(oldUrl).value, call(getAccountPageUrlChangedLang, oldUrl, action.payload));
            });

            it('should call changeUserLocalSettings', () => {
                assert.deepEqual(generator.next(newUrl).value, call(userLocalSettingsSaga.changeUserLocalSettings, newUrl, 'myAccountArea', 'url'));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });

        describe('when have not oldUrl', () => {
            const action = {
                payload: 'en',
            };
            const oldUrl = '';

            const generator = myAccountAreaSaga.changeMyAccountAreaLanguage(action);

            it('should select getUrlMyAccount', () => {
                assert.deepEqual(generator.next().value, select(selectors.getUrlMyAccount));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next(oldUrl).done);
            });
        });
    });

    describe('toggleMyAccountDesktop', () => {
        const isActive = true;
        const generator = myAccountAreaSaga.toggleMyAccountDesktop(isActive);

        it('should call changeUserLocalSettings', () => {
            assert.deepEqual(generator.next().value, call(userLocalSettingsSaga.changeUserLocalSettings, isActive, 'blocksActive', 'myAccountArea'));
        });

        it('should be finished', () => {
            assert.isTrue(generator.next().done);
        });
    });

    describe('toggleMyAccountMobile', () => {
        describe('when set url and activeComponent test', () => {
            const url = 'url';
            const activeComponent = 'test';

            const generator = myAccountAreaSaga.toggleMyAccountMobile(url);

            it('should select getActiveMobileComponent', () => {
                assert.deepEqual(generator.next().value, select(selectors.getActiveMobileComponent));
            });

            it('should put changeRoute', () => {
                assert.deepEqual(generator.next(activeComponent).value, put(mockActions.changeRoute('more/my-account')));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });

        describe('when set empty url and activeComponent test', () => {
            const url = '';
            const activeComponent = 'test';

            const generator = myAccountAreaSaga.toggleMyAccountMobile(url);

            it('should select getActiveMobileComponent', () => {
                assert.deepEqual(generator.next().value, select(selectors.getActiveMobileComponent));
            });

            it('should put changeRoute', () => {
                assert.deepEqual(generator.next(activeComponent).value, put(mockActions.goBackRoute()));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next().done);
            });
        });

        describe('when activeComponent more', () => {
            const url = '';
            const activeComponent = 'more';

            const generator = myAccountAreaSaga.toggleMyAccountMobile(url);

            it('should select getActiveMobileComponent', () => {
                assert.deepEqual(generator.next().value, select(selectors.getActiveMobileComponent));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next(activeComponent).done);
            });
        });

        describe('when activeComponent balances', () => {
            const url = '';
            const activeComponent = 'balances';

            const generator = myAccountAreaSaga.toggleMyAccountMobile(url);

            it('should select getActiveMobileComponent', () => {
                assert.deepEqual(generator.next().value, select(selectors.getActiveMobileComponent));
            });

            it('should be finished', () => {
                assert.isTrue(generator.next(activeComponent).done);
            });
        });
    });
});
