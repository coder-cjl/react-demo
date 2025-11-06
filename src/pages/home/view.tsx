import { LucaButton, LucaNavBar } from '../../styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '../../styles/global-style'
import { useHomeLogic } from './logic'

export function HomePage() {
  const logic = useHomeLogic()

  return (
    <>
      <LucaNavBar backIcon={null}>Home</LucaNavBar>
      <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
        <LucaColumn $align='center' $itemMargin='10px'>
          <LucaText fontSize='14px'> Welcome to the Home Page</LucaText>
          <LucaText fontSize='20px'> Welcome to the Home Page</LucaText>
          <LucaButton color='success' onClick={logic.goToMine}>
            To Mine
          </LucaButton>
          <LucaButton color='primary' onClick={logic.fetchData}>
            Fetch Data
          </LucaButton>
          <LucaButton onClick={logic.goToExport}>To Export Page</LucaButton>
        </LucaColumn>
      </LucaContainer>
    </>
  )
}
