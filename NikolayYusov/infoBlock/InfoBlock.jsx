import React from 'react';
import { Wrapper } from './styledComponents';
import PropTypes from 'prop-types';
import { getUserStatusText } from 'src/js/platforms/crypto/commonLogic/header/logic';
import { arePropsEqual } from 'src/js/base/arePropsEqual';

const InfoBlock = props => {
    const {
        t,
        name,
        email,
        userStatus,
        isVerifiedStatus,
    } = props;

    const userStatusText = getUserStatusText(userStatus, t);

    return (
        <Wrapper data-at={'info-block_wrapper'}>
            <Wrapper.account data-at={'wrapper-account'}
                             children={name}
            />
            <Wrapper.email data-at={'wrapper-email'}
                           children={email}
            />
            <Wrapper.status data-at={'wrapper-status'}
                            children={userStatusText.value.text}
                            data-lang={userStatusText.value.dataLang}
                            isVerified={isVerifiedStatus}
            />
        </Wrapper>
    );
};

InfoBlock.propTypes = {
    t: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    isVerifiedStatus: PropTypes.bool.isRequired,
};

export default React.memo(InfoBlock, arePropsEqual);
