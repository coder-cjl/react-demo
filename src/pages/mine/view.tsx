import { LucaButton, LucaNavBar } from '../../styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '../../styles/global-style'
import { useMineLogic } from './logic'

export function MinePage() {
  const logic = useMineLogic()

  return (
    <>
      <LucaNavBar onBack={logic.onBack}>Mine</LucaNavBar>
      <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
        <LucaColumn $align='center' $itemMargin='10px'>
          <LucaText fontSize='14px'> Welcome to the Mine Page</LucaText>
          <LucaText fontSize='20px'> Welcome to the Mine Page</LucaText>
          <LucaButton color='success' onClick={logic.onToSetting}>
            Next Setting
          </LucaButton>
          <LucaButton color='success' onClick={logic.onBack}>
            Back
          </LucaButton>
        </LucaColumn>
      </LucaContainer>
    </>
  )
}
