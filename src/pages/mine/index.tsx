import { LucaButton } from '../../styles/antd-style'
import { LucaColumn, LucaContainer, LucaText } from '../../styles/global-style'
import { useMineViewModel } from './vm'

export function MinePage() {
  const vm = useMineViewModel()

  return (
    <LucaContainer width='100vw' height='100vh' $justifyContent='center'>
      <LucaColumn $align='center'>
        <LucaText fontSize='14px'> Welcome to the Mine Page</LucaText>
        <LucaText fontSize='20px'> Welcome to the Mine Page</LucaText>
        <LucaButton color='success' onClick={vm.onBack}>
          Back
        </LucaButton>
      </LucaColumn>
    </LucaContainer>
  )
}
