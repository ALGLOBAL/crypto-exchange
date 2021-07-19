import styled from 'styled-components';

const lineHeight = 18;
const paddingTitle = 18;
const fontSizeTitle = 14;
const wrapperPadding = 15;
const amountOfPaddings = 2;
const widthButtonLogOut = 268;
const heightButtonLogOut = 40;
const paddingButtonLogOut = 12;
const sizeBorderBottomLine = 1;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: ${props => props.theme.coefficient * wrapperPadding * amountOfPaddings}px;
  align-items: center;
  flex-direction: column;
  border-bottom: ${props => props.theme.coefficient * sizeBorderBottomLine}px solid ${props => props.theme.separatorsColor};
`;
Wrapper.registration = styled.div`
  width: ${props => props.theme.coefficient * widthButtonLogOut}px;
  height: ${props => props.theme.coefficient * heightButtonLogOut}px;
  padding: ${props => props.theme.coefficient * paddingButtonLogOut}px 0 0;
`;
Wrapper.title = styled.span`
  color: ${props => props.theme.textColor};
  padding: ${props => props.theme.coefficient * paddingTitle}px 0 0;
  font-size: ${props => props.theme.coefficient * fontSizeTitle}px;
  line-height: ${props => props.theme.coefficient * lineHeight}px;
`;
