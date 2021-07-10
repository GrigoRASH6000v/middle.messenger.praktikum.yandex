export default
`<div class="login">
<div class="form login__form">
  <h3 class="form__title">Вход</h3>
  <label for="form_input-login" class="label">
    Логин
    <input placeholder="ivanov@mail.ru" id="form_input-login" class="input input--border-botoom" type="text">
  </label>
  <label for="form_input-password" class="label">
    Пароль
    <input id="form_input-password" class="input input--border-botoom" type="password">
  </label>
  <div class="form__buttons">
    <a class="router-link link-btn" href="/" >Войти</a>
    <a class="router-link link-btn--text" href="/registration">Нет аккаунта?</a>
  </div>
</div>
</div>`