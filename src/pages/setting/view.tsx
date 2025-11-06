import { LucaButton } from '@/styles/antd-style'
import { LucaColumn, LucaText } from '@/styles/global-style'
import useSettingLogic from './logic'

export default function SettingPage() {
  const logic = useSettingLogic()

  return (
    <LucaColumn $align='center' $itemMargin='10px'>
      <LucaButton onClick={logic.onBack}>Back</LucaButton>
      <LucaButton onClick={logic.onToggleTheme}>Setting Dark</LucaButton>
      <LucaText>{logic.model.theme}</LucaText>
    </LucaColumn>
  )
}
