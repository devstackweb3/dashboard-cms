'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// define which card‐fields we support toggling
type FieldKey = 'imageurl' | 'date_publication' | 'lien_de_page'
type PropsConfig = Record<FieldKey, boolean>

const DEFAULT_CONFIG: PropsConfig = {
  imageurl: true,
  date_publication: true,
  lien_de_page: true,
}

const StorageKey = 'galleryPropsConfig'

const PropertiesContext = createContext<{
  config: PropsConfig
  toggle: (key: FieldKey) => void
}>({
  config: DEFAULT_CONFIG,
  toggle: () => {},
})

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PropsConfig>(DEFAULT_CONFIG)

  // on mount, load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(StorageKey)
      if (stored) setConfig(JSON.parse(stored))
    } catch {}
  }, [])

  // persist on change
  useEffect(() => {
    localStorage.setItem(StorageKey, JSON.stringify(config))
  }, [config])

  function toggle(key: FieldKey) {
    setConfig((c) => ({ ...c, [key]: !c[key] }))
  }

  return (
    <PropertiesContext.Provider value={{ config, toggle }}>
      {children}
    </PropertiesContext.Provider>
  )
}

export const useProperties = () => useContext(PropertiesContext)
