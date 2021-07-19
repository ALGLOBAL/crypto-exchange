import styled from 'styled-components';

const lineHeight = 18;
const nameFontSize = 18;
const emailPadding = 18;
const statusPadding = 8;
const accountPadding = 16;
const statusFontSize = 13;
const wrapperPadding = 15;
const statusLineHeight = 12;
const amountOfPaddings = 2;
const fontSizeTitleEmail = 14;
const sizeBorderBottomLine = 1;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: ${props => props.theme.coefficient * wrapperPadding * amountOfPaddings}px;
  align-items: center;
  flex-direction: column;
  border-bottom: ${props => props.theme.coefficient * sizeBorderBottomLine}px solid ${props => props.theme.separatorsColor};
`;
Wrapper.account = styled.div`
  color: ${props => props.theme.titleTextColor};
  width: 100%;
  padding: ${props => props.theme.coefficient * accountPadding}px 0 0;
  font-size: ${props => props.theme.coefficient * nameFontSize}px;
  text-align: center;
  line-height: ${props => props.theme.coefficient * lineHeight}px;
`;
Wrapper.email = styled.span`
  color: ${props => props.theme.textColor};
  padding: ${props => props.theme.coefficient * emailPadding}px 0 0;
  font-size: ${props => props.theme.coefficient * fontSizeTitleEmail}px;
  line-height: ${props => props.theme.coefficient * lineHeight}px;
`;
Wrapper.status = styled.span`
  ${props => props.isVerified ? `color: ${props.theme.verifiedStatusColor}` : `color: ${props.theme.notVerifiedStatusColor}`};
  padding: ${props => props.theme.coefficient * statusPadding}px 0 0;
  font-size: ${props => props.theme.coefficient * statusFontSize}px;
  text-transform: uppercase;
  line-height: ${props => props.theme.coefficient * statusLineHeight}px;
`;
