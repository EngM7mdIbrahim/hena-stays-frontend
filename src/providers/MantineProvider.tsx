import { PropsWithChildren } from 'react'
import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
  MantineProvider as NativeMantineProvider
} from '@mantine/core'

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    colors: {
      primary: [
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649',
        '#F6A649'
      ]
    },
    primaryColor: 'primary'
  })
)

export default function MantineProvider({ children }: PropsWithChildren) {
  return (
    <NativeMantineProvider defaultColorScheme='light' theme={theme}>
      {children}
    </NativeMantineProvider>
  )
}
