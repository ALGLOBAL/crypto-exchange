import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CustomButton from 'src/js/reactlibs/buttons/customButton/CustomButton';
import {
    getAccountWarningModalText,
    getAccountWarningModalImage,
} from 'src/js/commonLogic/modals/logic';
import { ThemeProvider } from 'styled-components';
import { arePropsEqual } from 'src/js/base/arePropsEqual';
import {
    Body,
    Header,
    Wrapper,
    TextContainer,
} from './styledComponents';

const AccountWarningWindowContent = props => {
    const {
        t,
        theme,
        context,
        onClose,
        brandName,
        dispatchAction,
    } = props;

    const {
        titleText,
        footerText,
        buttonText,
        titleDataLang,
        footerDataLang,
        buttonDataLang,
        descriptionText,
        descriptionDataLang,
    } = getAccountWarningModalText({ t, context, brandName });
    const image = getAccountWarningModalImage({ theme, context });

    const onCloseCallback = useCallback(() => {
        const { action } = context || {};

        onClose();
        dispatchAction(action);
    }, [onClose, dispatchAction, context]);

    return (
        <ThemeProvider theme={theme}>
            <Wrapper data-at={'account-warning-window-content_wrapper'}>
                <Wrapper.Header data-at={'wrapper_header'}>
                    <Header.crossButton data-at={'header_cross-button'}
                                        onClick={onClose}
                    />
                </Wrapper.Header>
                <Wrapper.Body data-at={'wrapper_body'}>
                    <Body.image image={image}
                                data-at={'body_image'}
                    />
                    <Body.TextContainer data-at={'body_text-container'}>
                        <TextContainer.title data-at={'text-container_title'}
                                             children={titleText}
                                             data-lang={titleDataLang}
                        />
                        <TextContainer.descriptionText data-at={'text-container_description-text'}
                                                       children={descriptionText}
                                                       data-lang={descriptionDataLang}
                        />
                        <TextContainer.footerText data-at={'text-container_footer-text'}
                                                  children={footerText}
                                                  data-lang={footerDataLang}
                        />
                    </Body.TextContainer>
                    <Body.button data-at={'body_button'}>
                        <CustomButton
                            title={buttonText}
                            dataLang={buttonDataLang}
                            callback={onCloseCallback}
                            textSize={14}
                            textColor={theme.buttonTextColor}
                            boxShadow={theme.boxShadow}
                            fontWeight={500}
                            borderColor={theme.buttonTextColor}
                            coefficient={theme.coefficient}
                            borderWidth={2}
                            borderRadius={100}
                            backgroundColor={theme.wrapperBackgroundColor}
                        />
                    </Body.button>
                </Wrapper.Body>
            </Wrapper>
        </ThemeProvider>
    );
};

AccountWarningWindowContent.propTypes = {
    t: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    context: PropTypes.object,
    brandName: PropTypes.string.isRequired,
    dispatchAction: PropTypes.func.isRequired,
};

export default React.memo(AccountWarningWindowContent, arePropsEqual);
