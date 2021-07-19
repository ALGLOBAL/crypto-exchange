import React, { useMemo, useCallback } from 'react';
import { withLocalization } from 'src/js/lang/localization';
import { arePropsEqual } from 'src/js/base/arePropsEqual';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {Header, Item, List, Main, Wrapper} from '../languagesWindow/styledComponents';
import ImageButton from 'src/js/reactlibs/buttons/imageButton/ImageButton';
import Scrollbar from 'react-scrollbars-custom';
import { getOrderTypesItems } from 'src/js/base/logic';

const OrderTypesWindow = props => {
    const {
        t,
        theme,
        isRtl,
        onClose,
        defaultOrderType,
        selectedOrderType,
        defaultTimeInForce,
        filteredOrderTypesList,
        changeDefaultOrderType,
    } = props;

    const listOrderTypes = useMemo(() => getOrderTypesItems(filteredOrderTypesList, defaultOrderType, defaultTimeInForce, t),
        [getOrderTypesItems, filteredOrderTypesList, defaultOrderType, defaultTimeInForce, t]);

    const toggleItemCallback = useCallback( event => {
        event.preventDefault();
        event.stopPropagation();

        const { accessKey } = event.currentTarget;
        const toggledItem = listOrderTypes.find(item => item.label === accessKey)

        toggledItem && changeDefaultOrderType(toggledItem.value)

        onClose();
    }, [listOrderTypes, changeDefaultOrderType]);

    return (
        <ThemeProvider theme={theme}>
            <Wrapper data-at={'order-types-window_wrapper'}>
                <Wrapper.Header data-at={'wrapper_header'}>
                    <Header.title data-at={'header-title'}
                                  children={t('dialogResources:defaultOrderType')}
                                  data-lang={'dialogResources:defaultOrderType'}
                    />
                    <Header.crossButton isRtl={isRtl}
                                        data-at={'header-cross-button'}
                    >
                        <ImageButton
                            width={30}
                            height={30}
                            isActive={true}
                            callback={onClose}
                            maskImage={theme.iconCross}
                            coefficient={theme.coefficient}
                            buttonBackgroundColorHover={theme.common.buttonBackgroundColorHover}
                            buttonBackgroundColorNormal={theme.common.buttonBackgroundColorNormal}
                            buttonBackgroundColorActive={theme.common.buttonBackgroundColorActive}
                        />
                    </Header.crossButton>
                </Wrapper.Header>
                <Wrapper.Main data-at={'wrapper_main'}>
                    <Scrollbar noScrollX={false}
                               className={'drop-down-scroll-bar cx-scrollbar'}
                    >
                        <Main.List data-at={'main_list'}>
                            {listOrderTypes.map(item =>
                                <List.Item key={item.label}
                                           onClick={toggleItemCallback}
                                           data-at={'list-item'}
                                           accessKey={item.label}
                                >
                                    <Item.title data-at={'list-title'}
                                                children={item.label}
                                                selected={selectedOrderType === item.value}
                                    />
                                    {selectedOrderType === item.value ? <Item.check isRtl={isRtl}/> : null}
                                </List.Item>
                            )}
                        </Main.List>
                    </Scrollbar>
                </Wrapper.Main>
            </Wrapper>
        </ThemeProvider>
    );
};

OrderTypesWindow.propTypes = {
    t: PropTypes.func.isRequired,
    isRtl: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    defaultOrderType: PropTypes.string.isRequired,
    selectedOrderType: PropTypes.string.isRequired,
    defaultTimeInForce: PropTypes.string,
    filteredOrderTypesList: PropTypes.array.isRequired,
};

export default React.memo(withLocalization(['resources'])(OrderTypesWindow), arePropsEqual);
