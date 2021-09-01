export const registrationPageTemplate = `<div class="registration">
    <div class="registration__form">
        <div class="form__container">
            <h3 class="title-h2">Регистрация</h3>
            <label class="label">
                Почта
                <input placeholder="ivanov@mail.ru" v-model="email"  id="email" class="input input--border-bottom" type="text">
            </label>
            <label class="label">
                Логин
                <input placeholder="ivanov33" v-model="login" id="login" class="input input--border-bottom" type="text">
            </label>
            <label class="label">
                Имя
                <input placeholder="Сергей" v-model="name" id="name" class="input input--border-bottom" type="text">
            </label>
            <label class="label">
                Фамилия
                <input placeholder="Иванов" v-model="surname" id="surname" class="input input--border-bottom" type="text">
            </label>
            <label class="label">
                Телефон
                <input placeholder="+7(919)-477-55-17" v-model="phone" id="phone" class="input input--border-bottom" type="text">
            </label>
            <label class="label">
                Пароль
                <input class="input input--border-bottom" v-model="password" id="password" type="password">
            </label>
            <label class="label">
                Пароль (ещё раз)
                <input class="input input--border-bottom" v-model="passwordRepeat" id="password-repeat" type="password">
            </label>
            <div class="form__buttons">
                <button class="link-btn" @click="submitForm">Зарегистрироваться</button>
                <!-- <a class="link-btn" href="/login">Зарегистрироваться</a> -->
                <a class="link-btn--text" href="/">Войти</a>
            </div>
        </div>
    </div>
</div>`;
