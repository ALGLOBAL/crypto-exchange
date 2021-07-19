import React from 'react';
import OrderTypesWindow from '../OrderTypesWindow.jsx';
import * as styledComponents from '../styledComponents';
import * as react from 'react';
import * as logic from 'src/js/base/logic';

const mockProps = {
    t: () => '',
    isRtl: false,
    theme: {
        coefficient: 1,
        common: {
            buttonBackgroundColorHover: 'buttonBackgroundColorHover',
            buttonBackgroundColorNormal: 'buttonBackgroundColorNormal',
            buttonBackgroundColorActive: 'buttonBackgroundColorActive',
        },
    },
    onClose: () => {},
    defaultOrderType: '',
    selectedOrderType: '',
    defaultTimeInForce: '',
    filteredOrderTypesList: [],
    changeDefaultOrderType: () => {},
};

describe('OrderTypesWindow snapshot', () => {
    it('should render correctly', done => {
        const wrapper = shallow(
            <OrderTypesWindow {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
        done();
    });
});

describe('OrderTypesWindow methods', () => {
    let props;
    let sandbox;
    let useMemoStub;
    let localSandbox;
    let listOrderTypes;
    let useCallbackStub;

    before(() => {
        sandbox = sinon.createSandbox();
        localSandbox = sinon.createSandbox();

        props = {
            ...mockProps,
            t: sandbox.stub(),
            onClose: sandbox.stub(),
            changeDefaultOrderType: sandbox.stub(),
        };
        listOrderTypes = [
            {
                label: 'limit',
                value: 'limit',
            }
        ];
        sandbox.stub(logic, 'getOrderTypesItems').returns(listOrderTypes);

        useMemoStub = sandbox.stub(react, 'useMemo');
        useCallbackStub = sandbox.stub(react, 'useCallback');

        useMemoStub.onCall(0).returns(listOrderTypes);
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    describe('useCallback', () => {
        it('toggleItemCallback should call changeDefaultOrderType', () => {
            shallow(<OrderTypesWindow {...props}/>);

            const event = {
                currentTarget: {
                    accessKey: 'limit',
                },
                preventDefault: localSandbox.stub(),
                stopPropagation: localSandbox.stub(),
            };

            const callback = useCallbackStub.getCall(0).args[0];
            const trigger = useCallbackStub.getCall(0).args[1];

            callback(event)

            sinon.assert.calledOnce(props.onClose);
            sinon.assert.calledOnce(props.changeDefaultOrderType);
            sinon.assert.calledWith(props.changeDefaultOrderType, 'limit');
            assert.deepEqual(trigger, [listOrderTypes, props.changeDefaultOrderType])
        });
    });

    describe('useMemo', () => {
        it('should return listOrderTypes', () => {
            shallow(<OrderTypesWindow {...props}/>);

            const expected = [
                {
                    label: 'limit',
                    value: 'limit'
                }
            ];
            const callback = useMemoStub.getCall(0).args[0];
            const trigger = useMemoStub.getCall(0).args[1];

            const actual = callback(props.filteredOrderTypesList, props.defaultOrderType, props.defaultTimeInForce, props.t);

            assert.deepEqual(trigger, [logic.getOrderTypesItems, props.filteredOrderTypesList, props.defaultOrderType, props.defaultTimeInForce, props.t]);
            assert.deepEqual(actual, expected);
            sinon.assert.calledOnce(logic.getOrderTypesItems);
            sinon.assert.calledWith(logic.getOrderTypesItems, props.filteredOrderTypesList, props.defaultOrderType, props.defaultTimeInForce, props.t);
        });
    });
});

describe('OrderTypesWindow styled components', () => {
    const theme = {
        coefficient: 1,
        textColor: 'textColor',
        iconCross: 'iconCross',
        iconCheck: 'iconCheck',
        borderColor: 'borderColor',
        firstTextColor: 'firstTextColor',
        itemActiveColor: 'itemActiveColor',
        wrapperBackgroundColor: 'wrapperBackgroundColor',
        flags: {
            en: 'en',
        },
        common: {
            buttonBackgroundColorHover: 'buttonBackgroundColorHover',
            buttonBackgroundColorNormal: 'buttonBackgroundColorNormal',
            buttonBackgroundColorActive: 'buttonBackgroundColorActive',
        },
    };

    it('labelStyle should have correct color', () => {
        const component = shallowRender(<styledComponents.labelStyle theme = {theme}/>);
        expect(component).toHaveStyleRule('color', 'firstTextColor');
    });

    it('Header should have correct styled', () => {
        const component = shallowRender(<styledComponents.Header theme = {theme}/>);
        expect(component).toHaveStyleRule('height', '40px');
        expect(component).toHaveStyleRule('padding', '8px');
        expect(component).toHaveStyleRule('border-bottom', '1px solid borderColor');
    });

    it('Header.title should have correct styled', () => {
        const component = shallowRender(<styledComponents.Header.title theme = {theme}/>);
        expect(component).toHaveStyleRule('font-size', '12px');
        expect(component).toHaveStyleRule('color', 'firstTextColor');
    });

    it('Header.crossButton should have correct styled', () => {
        const component = shallowRender(<styledComponents.Header.crossButton theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '30px');
        expect(component).toHaveStyleRule('height', '30px');
    });

    it('Header.crossButton should have correct left when isRtl = true ', () => {
        const component = shallowRender(<styledComponents.Header.crossButton theme = {theme} isRtl={true}/>);
        expect(component).toHaveStyleRule('left', '5px');
    });

    it('Header.crossButton should have correct right when isRtl = false ', () => {
        const component = shallowRender(<styledComponents.Header.crossButton theme = {theme} isRtl={false}/>);
        expect(component).toHaveStyleRule('right', '5px');
    });

    it('Item.title should have correct styled', () => {
        const component = shallowRender(<styledComponents.Item.title theme = {theme}/>);
        expect(component).toHaveStyleRule('font-size', '13px');
        expect(component).toHaveStyleRule('color', 'textColor');
        expect(component).toHaveStyleRule('padding', '0 8px');
    });

    it('Item.title should have correct color when active', () => {
        const component = shallowRender(<styledComponents.Item.title theme = {theme} selected={true}/>);
        expect(component).toHaveStyleRule('color', 'itemActiveColor');
    });

    it('Item.title should have correct color when not active', () => {
        const component = shallowRender(<styledComponents.Item.title theme = {theme} selected={false}/>);
        expect(component).toHaveStyleRule('color', 'textColor');
    });

    it('Item.check should have correct styled', () => {
        const component = shallowRender(<styledComponents.Item.check theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '30px');
        expect(component).toHaveStyleRule('height', '30px');
        expect(component).toHaveStyleRule('mask-image', 'url(iconCheck)');
        expect(component).toHaveStyleRule('background-color', 'buttonBackgroundColorActive');
    });

    it('Item.check should have correct left when isRtl = true', () => {
        const component = shallowRender(<styledComponents.Item.check theme = {theme} isRtl={true}/>);
        expect(component).toHaveStyleRule('left', '0px');
    });

    it('Item.check should have correct right when isRtl = false', () => {
        const component = shallowRender(<styledComponents.Item.check theme = {theme} isRtl={false}/>);
        expect(component).toHaveStyleRule('right', '0px');
    });

    it('Item should have correct styled', () => {
        const component = shallowRender(<styledComponents.Item theme = {theme}/>);
        expect(component).toHaveStyleRule('height', '47px');
        expect(component).toHaveStyleRule('padding', '0 8px');
        expect(component).toHaveStyleRule('border-bottom', '1px solid borderColor');
    });

    it('Wrapper should have correct styled', () => {
        const component = shallowRender(<styledComponents.Wrapper theme = {theme}/>);
        expect(component).toHaveStyleRule('min-height', '377px');
        expect(component).toHaveStyleRule('background-color', 'wrapperBackgroundColor');
        expect(component).toHaveStyleRule('padding', '8px');
    });
});
