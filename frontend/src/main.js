import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import '@fontsource-variable/onest'
import './style.css'

createApp(App).directive('reveal', reveal).mount('#app')
