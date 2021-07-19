import React, { useCallback } from 'react';
import { Wrapper } from './styledComponents.js';
import { arePropsEqual } from 'src/js/base/arePropsEqual';
import { getRegistrationLink } from 'src/js/platforms/crypto/businessLogic/common';
import CustomButton from 'src/js/reactlibs/buttons/customButton/CustomButton';
import PropTypes from 'prop-types';

const RegistrationBlock = props => {
    const {
        t,
        theme,
        callback,
        language,
    } = props;

    const openLinkRegistration = useCallback(() => {
        const link = getRegistrationLink(language);

        callback({ link, target: '_self' });
    }, [language]);

    return (
        <Wrapper data-at={'registration-block_wrapper'}>
            <Wrapper.title data-at={'wrapper-title'}
                           children={t('resources:notRegistered')}
                           data-lang={'resources:notRegistered'}
            />
            <Wrapper.registration data-at={'wrapper-registration'}>
                <CustomButton
                    title={t('resources:registration')}
                    dataLang={'resources:registration'}
                    callback={openLinkRegistration}
                    textSize={14}
                    textColor={theme.buttonColor}
                    fontWeight={500}
                    paddingTop={0}
                    borderWidth={2}
                    paddingLeft={0}
                    borderColor={theme.buttonColor}
                    coefficient={theme.coefficient}
                    paddingRight={0}
                    borderRadius={20}
                    paddingBottom={0}
                />
            </Wrapper.registration>
        </Wrapper>
    );
};

RegistrationBlock.propTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
};

export default React.memo(RegistrationBlock, arePropsEqual);
