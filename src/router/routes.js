import login from "../pages/login/index.js";
import registration from "../pages/registration/index.js";
import home from "../pages/home/index.js";
import personalAccount from "../pages/personal_account/index.js";
import page505 from "../pages/505/index.js";
import page404 from "../pages/404/index.js";

export default [
  {
    path: "/",
    component: home,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/registration",
    component: registration,
  },
  {
    path: "/personal-account",
    component: personalAccount,
  },
  {
    path: "/505",
    component: page505,
  },
  {
    path: "/404",
    component: page404,
  },
];
