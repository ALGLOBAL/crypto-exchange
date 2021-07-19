import styled from 'styled-components';

const padding = 8;
const itemSize = 13;
const iconSize = 30;
const titleSize = 12;
const flagWidth = 24;
const flagHeight = 20;
const itemHeight = 47;
const crossIndent = 5;
const borderRadius = 4;
const headerHeight = 40;
const windowHeight = 377;
const borderWeight = 1;
const titleLineHeight = 1.1;

export const labelStyle = styled.span`
  color: ${props => props.theme.firstTextColor};
  font-weight: 500;
  text-transform: uppercase;
`;

export const Header = styled.div`
  width: 100%;
  height: ${props => props.theme.coefficient * headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.coefficient * padding}px;
  border-bottom: ${props => `${props.theme.coefficient * borderWeight}px solid ${props.theme.borderColor}`};
  box-sizing: border-box;
`;
Header.title = styled(labelStyle)`
  font-size: ${props => props.theme.coefficient * titleSize}px;
  color: ${props => props.theme.firstTextColor};
  line-height: ${props => props.theme.coefficient * titleLineHeight};
`;
Header.crossButton = styled.div`
  width: ${props => props.theme.coefficient * iconSize}px;
  height: ${props => props.theme.coefficient * iconSize}px;
  position: absolute;
  ${props => props.isRtl ? 'left' : 'right'}: ${props => props.theme.coefficient * crossIndent}px;
`;

export const Item = styled.li`
  height: ${props => props.theme.coefficient * itemHeight}px;
  padding: 0 ${props => props.theme.coefficient * padding}px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: ${props => `${props.theme.coefficient * borderWeight}px solid ${props.theme.borderColor}`};
`;
Item.title = styled.span`
  font-size: ${props => props.theme.coefficient * itemSize}px;
  color: ${props => props.selected ? props.theme.itemActiveColor : props.theme.textColor};
  padding: 0 ${props => props.theme.coefficient * padding}px;
`;
Item.check = styled.div`
  width: ${props => props.theme.coefficient * iconSize}px;
  height: ${props => props.theme.coefficient * iconSize}px;
  mask-image: url(${props => props.theme.iconCheck});
  background-color: ${props => props.theme.common.buttonBackgroundColorActive};
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  position: absolute;
  ${props => props.isRtl ?
    `left: 0px` :
    `right: 0px`
};
`;
Item.flag = styled.div`
  width: ${props => props.theme.coefficient * flagWidth}px;
  height: ${props => props.theme.coefficient * flagHeight}px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${props => props.theme.flags[props.flag]});
  border-radius: ${props => props.theme.coefficient * borderRadius}px;
`;

export const List = styled.ul`
  margin: 0;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  list-style-type: none;
`;
List.Item = Item;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
`;
Main.List = List;

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${props => props.theme.coefficient * windowHeight}px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.wrapperBackgroundColor};
  padding: ${props => props.theme.coefficient * padding}px;
`;
Wrapper.Header = Header;
Wrapper.Main = Main;
