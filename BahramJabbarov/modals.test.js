import ModalManager from '../Modals.jsx';
import constants from 'src/js/constants';
import * as react from 'react';
import * as logic from 'src/js/commonLogic/modals/logic';
import * as hooks from 'src/js/hooks/usePrevious';

const mockProps = {
    t: () => {},
    isRtl: false,
    theme: {
        coefficient: 1,
        commonStyles: {
            wrapperBoxShadow: 'wrapperBoxShadow',
        },
    },
    modalData: {
        [constants.ACCOUNT_WARNING_MODAL_TYPE]: {
            isShow: true,
            context: null,
        },
    },
    coefficient: 1,
    dispatchAction: () => {},
    closeModalWindow: () => {},
};

describe('Modals snapshot', () => {
    const modal = shallow(
        <ModalManager {...mockProps}/>
    );

    it('should render correctly', done => {
        expect(modal).matchSnapshot();
        done();
    });
});

describe('Modals methods', () => {
    let props;
    let sandbox;
    let containers;
    let modalStyles;
    let hideTooltips;
    let prevModalData;
    let useCallbackStub;
    let changeWindowBlur;

    before(() => {
        sandbox = sinon.createSandbox();
        props = {
            ...mockProps,
            t: sandbox.stub(),
            onConfirm: sandbox.stub(),
            dispatchAction: sandbox.stub(),
            setAuthStepStore: sandbox.stub(),
            windowToggleBlur: sandbox.stub(),
            closeModalWindow: sandbox.stub(),
            setAuthErrorStore: sandbox.stub(),
        };
        containers = [
            {
                classList: {
                    toggle: sandbox.stub(),
                },
            },
        ];
        modalStyles = {};
        prevModalData = {};
        changeWindowBlur = sandbox.stub();
        sandbox.stub(react, 'useEffect');
    });

    afterEach(() => {
        sandbox.resetHistory();
    });

    after(() => {
        sandbox.restore();
    });

    it('useEffect DidMount', () => {
        shallow(<ModalManager {...props}/>);
        const callback = react.useEffect.getCall(0).args[0];
        const trigger = react.useEffect.getCall(0).args[1];

        callback();

        assert.deepEqual(trigger, []);
        sinon.assert.calledOnce(changeWindowBlur);
        sinon.assert.calledOnce(hideTooltips);
    });

    it('useEffect DidUpdate', () => {
        shallow(<ModalManager {...props}/>);
        const callback = react.useEffect.getCall(1).args[0];
        const trigger = react.useEffect.getCall(1).args[1];

        callback();

        assert.deepEqual(trigger, [props.modalData, prevModalData, hideTooltips, changeWindowBlur]);
        sinon.assert.calledOnce(changeWindowBlur);
        sinon.assert.calledOnce(hideTooltips);
        sinon.assert.calledOnce(logic.isModalDataOpenChanged);
        sinon.assert.calledWith(logic.isModalDataOpenChanged, props.modalData, prevModalData);
    });
});
