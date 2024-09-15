import { useColorScheme } from 'react-native'
import { createContext } from 'react'

export const ScreenModeContext = createContext()

const ScreenMode = ({children}) => {

    const isDark = useColorScheme() == 'dark'

  return (
    <ScreenModeContext.Provider value={{isDark}}>
      {children}
    </ScreenModeContext.Provider>
  )
}

export default ScreenMode
