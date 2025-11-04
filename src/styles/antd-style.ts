import { Button, NavBar } from 'antd-mobile'
import styled from 'styled-components'

export const LucaButton = styled(Button)``

export const LucaNavBar = styled(NavBar)`
  --adm-safe-area-top: 0px;
  height: 44px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  z-index: 1000;
  position: sticky;
  top: 0;
`
