import React from 'react';
import InfoBlock from '../InfoBlock.jsx';
import * as styledComponents from '../styledComponents';

const mockProps = {
    t: () => '',
    name: '',
    email: '',
    userStatus: 'userStatus',
    isVerifiedStatus: true,
};

describe('InfoBlock snapshot', () => {
    it('should render correctly', done => {
        const wrapper = shallow(
            <InfoBlock {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
        done();
    });
});

describe('InfoBlock styledComponents', () => {
    const theme = {
        coefficient: 1,
        titleTextColor: 'titleTextColor',
        textColor: 'textColor',
        separatorsColor: 'separatorsColor',
        verifiedStatusColor: 'verifiedStatusColor',
        notVerifiedStatusColor: 'notVerifiedStatusColor',
    };

    it('Wrapper should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper theme = {theme}/>);
        expect(component).toHaveStyleRule('border-bottom', '1px solid separatorsColor');
        expect(component).toHaveStyleRule('padding-bottom', '30px');
    });

    it('Wrapper.account should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.account theme = {theme}/>);
        expect(component).toHaveStyleRule('color', 'titleTextColor');
        expect(component).toHaveStyleRule('font-size', '18px');
        expect(component).toHaveStyleRule('padding', '16px 0 0');
        expect(component).toHaveStyleRule('line-height', '18px');
    });

    it('Wrapper.email should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.email theme = {theme}/>);
        expect(component).toHaveStyleRule('color', 'textColor');
        expect(component).toHaveStyleRule('font-size', '14px');
        expect(component).toHaveStyleRule('padding', '18px 0 0');
        expect(component).toHaveStyleRule('line-height', '18px');
    });

    it('Wrapper.status should have correct color when isVerified="false"', () => {
        const component = shallowRender(<styledComponents.Wrapper.status theme = {theme} isVerified = {false}/>);
        expect(component).toHaveStyleRule('color', 'notVerifiedStatusColor');
        expect(component).toHaveStyleRule('padding', '8px 0 0');
        expect(component).toHaveStyleRule('font-size', '13px');
        expect(component).toHaveStyleRule('line-height', '12px');
    });

    it('Wrapper.status should have correct color when isVerified="true"', () => {
        const component = shallowRender(<styledComponents.Wrapper.status theme = {theme} isVerified = {true}/>);
        expect(component).toHaveStyleRule('color', 'verifiedStatusColor');
    });
});
