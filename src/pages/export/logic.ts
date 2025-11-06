export function useExportLogic() {
  function exportData() {
    const html = document.documentElement.outerHTML
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'page.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    exportData,
  }
}
