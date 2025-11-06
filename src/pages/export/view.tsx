import { LucaColumn, LucaContainer } from '@/styles/global-style'
import { useExportLogic } from './logic'
import { LucaButton } from '@/styles/antd-style'

export function ExportPage() {
  const logic = useExportLogic()

  return (
    <LucaContainer $justifyContent='center' height='100vh' width='100vw'>
      <LucaColumn $align='center' $itemMargin='10px'>
        <h1>Export Page</h1>
        <p>This is the export page content.</p>
        <LucaButton onClick={logic.exportData}>Export</LucaButton>
      </LucaColumn>
    </LucaContainer>
  )
}
