import { LucaColumn, LucaText } from '@/styles/global-style'
import useSettingLogic from './logic'
import { useTheme } from '@/hooks/theme'
import { LucaButton } from '@/styles/antd-style'

export default function SettingPage() {
  const logic = useSettingLogic()
  const theme = useTheme()

  return (
    <LucaColumn $align='center' $itemMargin='10px'>
      <LucaButton onClick={logic.onBack}>Back</LucaButton>
      <LucaButton onClick={theme.toggleTheme}>Setting Dark</LucaButton>
      <LucaText>{theme.theme}</LucaText>
    </LucaColumn>
  )
}
