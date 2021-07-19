import AccountWarningWindowContent from '../AccountWarningWindowContent';
import * as react from 'react';
import * as styledComponents from '../styledComponents';

const mockProps = {
    t: () => {},
    theme: {
        iconKYC: 'iconKYC',
        coefficient: 2,
    },
    styles: {},
    isShow: true,
    context: {
        type: 'kyc_not_verified',
        action: () => {},
    },
    dispatchAction: () => {},
};

describe('AccountWarningWindowContent snapshot', () => {
    it('should render correctly', done => {
        const component = shallow(
            <AccountWarningWindowContent {...mockProps}/>
        );
        expect(component).matchSnapshot();
        done();
    });
});

describe('AccountWarningWindowContent methods', () => {
    let props;
    let sandbox;
    let localSandbox;
    let useCallbackStub;

    before(() => {
        sandbox = sinon.createSandbox();
        localSandbox = sinon.createSandbox();

        props = {
            ...mockProps,
            onClose: sandbox.stub(),
            dispatchAction: sandbox.stub(),
        };

        useCallbackStub = sandbox.stub(react, 'useCallback');
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    it('onCloseCallback', () => {
        shallow(<AccountWarningWindowContent {...props}/>);

        const callback = useCallbackStub.getCall(0).args[0];
        const trigger = useCallbackStub.getCall(0).args[1];

        callback();

        sinon.assert.calledOnce(props.onClose);
        sinon.assert.calledOnce(props.dispatchAction);
        sinon.assert.calledWith(props.dispatchAction, props.context.action);
        assert.deepEqual(trigger, [props.onClose, props.dispatchAction, props.context]);
    });
});

describe('AccountWarningWindow styledComponents', () => {
    const theme = {
        iconKYC: 'iconKYC',
        iconCross: 'iconCross',
        firstTextColor: 'buttonTextColor',
        coefficient: 1,
        secondTextColor: 'titleColorText',
        wrapperBackgroundColor: 'wrapperBackgroundColor',
        common: {
            buttonBackgroundColorHover: 'buttonBackgroundColorHover',
            buttonBackgroundColorNormal: 'buttonBackgroundColorNormal',
            buttonBackgroundColorActive: 'buttonBackgroundColorActive',
        },
    };

    it('text should have correct styles', () => {
        const component = shallowRender(<styledComponents.text theme = {theme}/>);
        expect(component).toHaveStyleRule('font-size', '14px');
        expect(component).toHaveStyleRule('color', 'buttonTextColor');
    });

    it('Header should have correct height', () => {
        const component = shallowRender(<styledComponents.Header theme = {theme}/>);
        expect(component).toHaveStyleRule('height', '30px');
    });

    it('Header.crossButton should have correct styled', () => {
        const component = shallowRender(<styledComponents.Header.crossButton theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '24px');
        expect(component).toHaveStyleRule('height', '24px');
        expect(component).toHaveStyleRule('mask-image', 'url(iconCross)');
        expect(component).toHaveStyleRule('background-color', 'buttonBackgroundColorNormal');
    });

    it('TextContainer should have correct styled', () => {
        const component = shallowRender(<styledComponents.TextContainer theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '276px');
    });

    it('TextContainer.title should have correct styled', () => {
        const component = shallowRender(<styledComponents.TextContainer.title theme = {theme}/>);
        expect(component).toHaveStyleRule('font-size', '18px');
        expect(component).toHaveStyleRule('color', 'titleColorText');
    });

    it('Body should have correct padding-bottom', () => {
        const component = shallowRender(<styledComponents.Body theme = {theme}/>);
        expect(component).toHaveStyleRule('padding-bottom', '12px');
    });

    it('Body.image should have correct styles', () => {
        const component = shallowRender(<styledComponents.Body.image theme = {theme} image={'iconKYC'}/>);
        expect(component).toHaveStyleRule('width', '158px');
        expect(component).toHaveStyleRule('height', '132px');
        expect(component).toHaveStyleRule('background-image', 'url(iconKYC)');
    });

    it('Body.button should have correct height', () => {
        const component = shallowRender(<styledComponents.Body.button theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '276px');
        expect(component).toHaveStyleRule('height', '40px');
    });

    it('Wrapper should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper theme = {theme}/>);
        expect(component).toHaveStyleRule('min-width', '100%');
        expect(component).toHaveStyleRule('min-height', '100%');
        expect(component).toHaveStyleRule('border-radius', '6px');
        expect(component).toHaveStyleRule('background-color', 'wrapperBackgroundColor');
        expect(component).toHaveStyleRule('padding', '12px');
    });
});

