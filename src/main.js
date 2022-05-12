import { createApp } from 'vue'
import App from './App'
//импорт UI-компонентов
import components from '@/components/UI'
import router from './components/router/router';
import VIntersection from '@/directives/VIntersection';
import directives from '@/directives';

const app = createApp(App)

//глобальная регистрация компонентов
components.forEach(component => {
    //('называние компонента', компонент)
    app.component(component.name, component)
});

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

//все библиотеки, плагигны и т.д. подключаются через use
app
    .use(router)
    .mount('#app')
