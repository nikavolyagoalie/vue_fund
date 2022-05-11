import { createApp } from 'vue'
import App from './App'
//импорт UI-компонентов
import components from '@/components/UI'

const app = createApp(App)

//глобальная регистрация компонентов
components.forEach(component => {
    //('называние компонента', компонент)
    app.component(component.name, component)
});

app.mount('#app')
