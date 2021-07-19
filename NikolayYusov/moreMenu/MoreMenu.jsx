import React from 'react';
import { Wrapper } from './styledComponents';
import InfoBlock from './components/InfoBlock/InfoBlock';
import RegistrationBlock from './components/registrationBlock/RegistrationBlock';
import ItemsMenu from './components/itemsMenu/ItemsMenu';
import PropTypes from 'prop-types';
import { withLocalization } from 'src/js/lang/localization';
import { ThemeProvider } from 'styled-components';
import { arePropsEqual } from 'src/js/base/arePropsEqual';

const MoreMenu = props => {
    const {
        t,
        name,
        theme,
        email,
        isRtl,
        isDemo,
        language,
        userStatus,
        clickLogOut,
        clickHelpLink,
        contentMoreList,
        isVerifiedStatus,
        clickContentGroup,
    } = props;

    return (
        <ThemeProvider theme={theme.moreMenu}>
            <Wrapper data-at={'more-menu_wrapper'}>
                {isDemo ?
                    <Wrapper.registrationBlock data-at={'wrapper-registration-block'}>
                        <RegistrationBlock
                            t={t}
                            theme={theme.moreMenu}
                            callback={clickHelpLink}
                            language={language}
                        />
                    </Wrapper.registrationBlock>
                    :
                    <Wrapper.infoBlock data-at={'wrapper-info-block'}>
                        <InfoBlock
                            t={t}
                            name={name}
                            email={email}
                            userStatus={userStatus}
                            isVerifiedStatus={isVerifiedStatus}
                        />
                    </Wrapper.infoBlock>
                }
                <Wrapper.body data-at={'wrapper-body'}>
                    <ItemsMenu
                        t={t}
                        theme={theme.moreMenu}
                        isRtl={isRtl}
                        items={contentMoreList}
                        clickLogOut={clickLogOut}
                        clickContentGroup={clickContentGroup}
                    />
                </Wrapper.body>
            </Wrapper>
        </ThemeProvider>
    );
}

MoreMenu.propTypes = {
    t: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    isRtl: PropTypes.bool.isRequired,
    isDemo: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    clickLogOut: PropTypes.func.isRequired,
    clickHelpLink: PropTypes.func.isRequired,
    contentMoreList: PropTypes.array.isRequired,
    isVerifiedStatus: PropTypes.bool.isRequired,
    clickContentGroup: PropTypes.func.isRequired,
};

export default React.memo(withLocalization(['resources'])(MoreMenu), arePropsEqual);