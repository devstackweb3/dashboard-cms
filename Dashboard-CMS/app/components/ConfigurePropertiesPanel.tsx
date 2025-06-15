'use client'

import { useProperties } from '../context/PropertiesContext'

export default function ConfigurePropertiesPanel() {
  const { config, toggle } = useProperties()

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded relative z-10">
      <h4 className="font-semibold mb-2">Show on cards:</h4>
      <div className="space-y-1">
        {Object.entries(config).map(([key, on]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={on}
              onChange={() => toggle(key as any)}
              className="accent-blue-500"
            />
            <span className="capitalize text-sm">{key.replace('_', ' ')}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
