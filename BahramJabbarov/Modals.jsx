import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import constants from 'src/js/constants';
import AccountWarningWindow from './components/accountWarningWindow/AccountWarningWindow';
import { usePrevious } from 'src/js/hooks/usePrevious';
import { arePropsEqual } from 'src/js/base/arePropsEqual';
import { withLocalization } from 'src/js/lang/localization';

const ModalManager = props => {
    const {
        t,
        theme,
        modalData,
        brandName,
        coefficient,
        dispatchAction,
        closeModalWindow,
    } = props;

    const prevModalData = usePrevious(modalData);

    useEffect(() => {
        changeWindowBlur();
        hideTooltips();
    }, []);

    useEffect(() => {
        changeWindowBlur();
        prevModalData && isModalDataOpenChanged(modalData, prevModalData) && hideTooltips();
    }, [modalData, prevModalData, hideTooltips, changeWindowBlur]);

    const accountWarningData = modalData[constants.ACCOUNT_WARNING_MODAL_TYPE];

    return (
        <>
            <AccountWarningWindow
                t={t}
                theme={{
                    ...theme.accountWarning,
                    coefficient,
                    common: theme.common,
                }}
                styles={modalStyles}
                isShow={accountWarningData.isShow}
                context={accountWarningData.context}
                brandName={brandName}
                dispatchAction={dispatchAction}
                closeModalWindow={closeModalWindow}
            />
        </>
    );
};

ModalManager.propTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    modalData: PropTypes.object.isRequired,
    brandName: PropTypes.string.isRequired,
    coefficient: PropTypes.number.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
};

export default React.memo(withLocalization(['resources'])(ModalManager), arePropsEqual);
