import React from 'react';
import MoreMenu from '../MoreMenu.jsx';
import * as styledComponents from '../styledComponents';

const mockProps = {
    t: () => '',
    name: '',
    theme: {
        coefficient: 1,
    },
    email: '',
    isRtl: false,
    isDemo: false,
    language: 'en',
    userStatus: 'userStatus',
    clickLogOut: () => {},
    clickHelpLink: () => {},
    contentMoreList: [],
    isVerifiedStatus: true,
    clickContentGroup: () => {},
};

describe('MoreMenu snapshot', () => {
    it('snapshot, should render correctly', done => {
        const wrapper = shallow(
            <MoreMenu {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
        done();
    });
});

describe('MoreMenu styledComponents', () => {
    const theme = {
        coefficient: 1,
        colorHeader: 'colorHeader',
        colorTitlePage: 'colorTitlePage',
    };

    it('Wrapper.infoBlock should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.infoBlock theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '100%');
        expect(component).toHaveStyleRule('height', '134px');
    });

    it('Wrapper.registrationBlock should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.registrationBlock theme = {theme}/>);
        expect(component).toHaveStyleRule('width', '100%');
        expect(component).toHaveStyleRule('height', '134px');
    });

    it('Wrapper.body should have correct styles', () => {
        const component = shallowRender(<styledComponents.Wrapper.body theme = {theme}/>);
        expect(component).toHaveStyleRule('padding', '0 16px');
    });
});
