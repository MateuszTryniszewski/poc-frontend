import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { plugin, defaultConfig } from '@formkit/vue'

setup((app) => {
  app.use(plugin, defaultConfig)
})

import '../src/style.css';
import '../dist/output.css'



const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light'
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
