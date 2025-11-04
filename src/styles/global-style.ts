import styled from 'styled-components'

interface LucaTextProps {
  fontSize?: '12px' | '14px' | '16px' | '20px' | '24px' | '32px'
  color?: string
  bold?: boolean
  align?: 'left' | 'center' | 'right'
  lineHeight?: string
  display?: string
}

export const LucaText = styled.span<LucaTextProps>`
  font-family: 'Luca', sans-serif;
  font-size: ${props => props.fontSize || '16px'};
  color: ${props => props.color || '#000'};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || '1.5'};
`

interface LucaRowProps {
  $align?: 'top' | 'center' | 'bottom'
  $itemMargin?: string
}

export const LucaRow = styled.div<LucaRowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${props => {
    switch (props.$align) {
      case 'center':
        return 'center'
      case 'bottom':
        return 'flex-end'
      case 'top':
      default:
        return 'flex-start'
    }
  }};
  & > * {
    margin-right: ${({ $itemMargin }) => $itemMargin || '0px'};
  }
`

interface LucaColumnProps {
  $align?: 'left' | 'center' | 'right'
  $itemMargin?: string
}

export const LucaColumn = styled.div<LucaColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    switch (props.$align) {
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      case 'left':
      default:
        return 'flex-start'
    }
  }};
  & > * {
    margin-bottom: ${({ $itemMargin }) => $itemMargin || '0px'};
  }
`

interface LucaContainerProps {
  padding?: string
  width?: string
  height?: string
  backgroundColor?: string
  borderRadius?: string
  display?: string
  flexDirection?: 'row' | 'column'
  $justifyContent?: 'top' | 'center' | 'bottom'
}

export const LucaContainer = styled.div<LucaContainerProps>`
  padding: ${props => props.padding || '0px'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  background-color: ${props => props.backgroundColor || 'white'};
  border-radius: ${props => props.borderRadius || '0px'};
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => {
    switch (props.$justifyContent) {
      case 'center':
        return 'center'
      case 'bottom':
        return 'flex-end'
      case 'top':
      default:
        return 'flex-start'
    }
  }};
`

export const LucaHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`
