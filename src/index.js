// import Templator from './utils/templator/index.ts';
import 'normalize.css';
// import RouterModule from './router/index.ts';
// import { utils } from './utils/index.ts';
import { app } from './app/app.component';
import './assets/style/style.scss';
// const entrySelector = '#app';
// const router = new RouterModule('#main');

// declare global {
//   interface Window {
//     utils;
//   }
// }
// window.utils = utils || {};

// const initApp = (point: string): void => {
//   const tmpl = new Templator(app);
//   const renderTemplate = tmpl.compile();
//   //console.log(renderTemplate);
//   document.querySelector(point).innerHTML = renderTemplate;
//   router.init();
// };

// initApp(entrySelector);

// class App extends Block {
//   constructor(props) {
//     super(props);
//   }
// }

// const app = new App({
//   data: {
//     text: 'Страдание и боль (((',
//     subText: 'Наше всё',
//   },
//   template: `
//   <div class='test1'>
//     <div class="test1.1">
//       <span>Текст</span>
//       <span>{{text}} {{subText}}</span>
//       <div class="test1.1.1">
//       </div>
//     </div>
//   </div>`,
// });

app.init();
