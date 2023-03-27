import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends Record<string, any> {
    colors: {
      background: string
      primary: string
      border: string
      'primary-50': string
      'primary-100': string
      'primary-200': string
      'primary-300': string
      'primary-400': string
      'primary-500': string
      'primary-600': string
      'primary-700': string
      'primary-800': string
      'primary-900': string
    }
  }
}
