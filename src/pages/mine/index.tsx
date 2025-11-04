import { LucaButton, LucaNavBar } from '../../styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '../../styles/global-style'
import { useMineViewModel } from './vm'

export function MinePage() {
  const vm = useMineViewModel()

  return (
    <>
      <LucaNavBar onBack={vm.onBack}>Mine</LucaNavBar>
      <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
        <LucaColumn $align='center' $itemMargin='10px'>
          <LucaText fontSize='14px'> Welcome to the Mine Page</LucaText>
          <LucaText fontSize='20px'> Welcome to the Mine Page</LucaText>
          <LucaButton color='success' onClick={vm.onBack}>
            Back
          </LucaButton>
        </LucaColumn>
      </LucaContainer>
    </>
  )
}
