import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import constants from 'src/js/constants';
import { arePropsEqual } from 'src/js/base/arePropsEqual';
import AccountWarningWindowContent from './components/AccountWarningWindowContent';

const AccountWarningWindow = props => {
    const {
        t,
        theme,
        styles,
        isShow,
        context,
        brandName,
        dispatchAction,
        closeModalWindow,
    } = props;

    return (
        <Modal
            style={styles}
            isOpen={isShow}
            children={
                <AccountWarningWindowContent
                    t={t}
                    theme={theme}
                    onClose={() => closeModalWindow({ type: constants.ACCOUNT_WARNING_MODAL_TYPE })}
                    context={context}
                    brandName={brandName}
                    dispatchAction={dispatchAction}
                    closeModalWindow={closeModalWindow}
                />
            }
            ariaHideApp={false}
            onRequestClose={() => closeModalWindow({ type: constants.ACCOUNT_WARNING_MODAL_TYPE })}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        />
    );
};

AccountWarningWindow.propTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    isShow: PropTypes.bool.isRequired,
    context: PropTypes.object,
    brandName: PropTypes.string.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    closeModalWindow: PropTypes.func.isRequired,
};

export default React.memo(AccountWarningWindow, arePropsEqual);
