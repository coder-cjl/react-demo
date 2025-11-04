import { LucaButton, LucaNavBar } from '../../styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '../../styles/global-style'
import { useHomeViewModel } from './vm'

export function HomePage() {
  const vm = useHomeViewModel()

  return (
    <>
      <LucaNavBar backIcon={null}>Home</LucaNavBar>
      <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
        <LucaColumn $align='center' $itemMargin='10px'>
          <LucaText fontSize='14px'> Welcome to the Home Page</LucaText>
          <LucaText fontSize='20px'> Welcome to the Home Page</LucaText>
          <LucaButton color='success' onClick={vm.goToMine}>
            To Mine
          </LucaButton>
        </LucaColumn>
      </LucaContainer>
    </>
  )
}
