import AccountWarningWindow from '../AccountWarningWindow';
import constants from 'src/js/constants';

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
        callback: () => {},
    },
    dispatchAction: () => {},
    closeModalWindow: () => {},
};

describe('AccountWarningWindow snapshot', () => {
    it('should render correctly', done => {
        const component = shallow(
            <AccountWarningWindow {...mockProps}/>
        );

        expect(component).matchSnapshot();

        done();
    });
});

describe('AccountWarningWindow methods', () => {
    let props;
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
        props = {
            ...mockProps,
            t: sandbox.stub(),
            closeModalWindow: sandbox.stub(),
        };
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.resetHistory();
        sandbox.restore();
    });

    it('onRequestClose should call closeModalWindow', () => {
        const component = shallow(<AccountWarningWindow {...props}/>);

        component.find('Modal').props().onRequestClose();

        sinon.assert.calledOnce(props.closeModalWindow);
        sinon.assert.calledWith(props.closeModalWindow, { type: constants.ACCOUNT_WARNING_MODAL_TYPE });
    });
});
