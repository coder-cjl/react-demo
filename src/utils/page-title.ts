import { useEffect, useState } from 'react'

export function usePageTitle(title: string) {
  const [natTitle, setNatTitle] = useState(title)

  useEffect(() => {
    document.title = title
    setNatTitle(title)
  }, [title])

  return { natTitle }
}
