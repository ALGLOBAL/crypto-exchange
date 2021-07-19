import styled from 'styled-components';

const imageWidth = 158;
const lineHeight = 20;
const imageHeight = 132;
const buttonWidth = 276;
const buttonHeight = 40;
const borderRadius = 6;
const headerHeight = 30;
const iconCrossSize = 24;
const smallFontSize = 14;
const titleFontSize = 18;
const contentPadding = 12;
const textContainerWidth = 276;

export const text = styled.span`
  color: ${props => props.theme.firstTextColor};
  padding: 1em;
  text-align: center;
  font-size: ${props => props.theme.coefficient * smallFontSize}px;
  line-height: ${props => props.theme.coefficient * lineHeight}px;
`;

export const Header = styled.div`
  height: ${props => props.theme.coefficient * headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
Header.crossButton = styled.div`
  width: ${props => props.theme.coefficient * iconCrossSize}px;
  height: ${props => props.theme.coefficient * iconCrossSize}px;
  cursor: pointer;
  display: flex;
  mask-size: cover;
  mask-image: url(${props => props.theme.iconCross});
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: ${props => props.theme.common.buttonBackgroundColorNormal};
`;

export const TextContainer = styled.div`
  width: ${props => props.theme.coefficient * textContainerWidth}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
TextContainer.title = styled.span`
  color: ${props => props.theme.secondTextColor};
  font-size: ${props => props.theme.coefficient * titleFontSize}px;
  text-align: center;
  font-weight: bold;
`;
TextContainer.footerText = styled(text)``;
TextContainer.descriptionText = styled(text)``;

export const Body = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: ${props => props.theme.coefficient * contentPadding}px;
`;
Body.image = styled.div`
  width: ${props => props.theme.coefficient * imageWidth}px;
  height: ${props => props.theme.coefficient * imageHeight}px;
  display: flex;
  background-size: cover;
  background-image: url(${props => props.image});  
  background-repeat: no-repeat;
  background-position: center;
`;
Body.button = styled.div`
  width: ${props => props.theme.coefficient * buttonWidth}px;
  height: ${props => props.theme.coefficient * buttonHeight}px;
  display: flex;
`;
Body.TextContainer = TextContainer;

export const Wrapper = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  padding: ${props => props.theme.coefficient * contentPadding}px;
  box-sizing: border-box;
  border-radius: ${props => props.theme.coefficient * borderRadius}px;
  flex-direction: column;
  background-color: ${props => props.theme.wrapperBackgroundColor};
`;
Wrapper.Body = Body;
Wrapper.Header = Header;

