export const loginTemplate = `<div class="login">
<div class="login__form">
  <div class="form__container">
    <h3 class="title-h2">Войти</h3>
  <label class="label">
    login
    <input v-model="login" placeholder="ivanov@mail.ru" id="login" class="input input--border-bottom" type="text">
  </label>
  <label class="label label--last">
    Пароль
    <input v-model="password" class="input input--border-bottom" id="password" type="password">
  </label>
  <div class="form__buttons">
    <button class="link-btn" @click="submitForm">Войти</button>
    <a class="router-link link-btn--text" href="/sign-up">Нет аккаунта?</a>
  </div>
</div>
  </div>
</div>`;
