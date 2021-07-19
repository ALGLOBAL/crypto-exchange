import RegistrationBlock from '../RegistrationBlock.jsx';
import * as styledComponents from '../styledComponents';
import * as logic from 'src/js/platforms/crypto/businessLogic/common';
import * as react from 'react';

const mockProps = {
    t: () => '',
    theme: {},
    language: 'en',
    callback: () => {},
};

describe('RegistrationBlock snapshot', () => {
    it('should render correctly', done => {
        const wrapper = shallow(
            <RegistrationBlock {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
        done();
    });
});

describe('RegistrationBlock methods', () => {
    let link;
    let props;
    let sandbox;
    let localSandbox;
    let useCallbackStub;

    before(() => {
        link = 'link';
        sandbox = sinon.createSandbox();
        localSandbox = sinon.createSandbox();

        props = {
            ...mockProps,
            callback: sandbox.stub(),
        };

        useCallbackStub = sandbox.stub(react, 'useCallback');
        sandbox.stub(logic, 'getRegistrationLink').returns(link);
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    it('openLinkRegistration should call callback', () => {
        shallow(<RegistrationBlock {...props}/>);

        const callback = useCallbackStub.getCall(0).args[0];
        const trigger = useCallbackStub.getCall(0).args[1];

        callback()

        sinon.assert.calledOnce(logic.getRegistrationLink);
        sinon.assert.calledWith(logic.getRegistrationLink, props.language);
        sinon.assert.calledOnce(props.callback);
        sinon.assert.calledWith(props.callback, { link, target: '_self' });
        assert.deepEqual(trigger, [props.language])
    });
});

describe('RegistrationBlock styledComponents', () => {
    const theme = {
        coefficient: 1,
        separatorsColor: 'separatorsColor',
        verifiedStatusColor: 'verifiedStatusColor',
        notVerifiedStatusColor: 'notVerifiedStatusColor',
        textColor: 'textColor',
    };

    it('Wrapper should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper theme = {theme}/>);
        expect(component).toHaveStyleRule('border-bottom', '1px solid separatorsColor');
        expect(component).toHaveStyleRule('padding-bottom', '30px');
    });

    it('Wrapper.registration should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.registration theme = {theme}/>);
        expect(component).toHaveStyleRule('padding', '12px 0 0');
        expect(component).toHaveStyleRule('height', '40px');
        expect(component).toHaveStyleRule('width', '268px');
    });

    it('Wrapper.title should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.title theme = {theme}/>);
        expect(component).toHaveStyleRule('color', 'textColor');
        expect(component).toHaveStyleRule('font-size', '14px');
        expect(component).toHaveStyleRule('padding', '18px 0 0');
        expect(component).toHaveStyleRule('line-height', '18px');
    });
});
