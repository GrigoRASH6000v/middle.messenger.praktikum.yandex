import avatar3 from '../../assets/img/users__avatars/avatar-3.png';

export const personalAccountPageTemplate = `<div class="personal-account" id="personal-account">
    <div class="personal-account__form" >
        <div class="item__avatar-wrp">
            <img src="${avatar3}" alt="avatar">
        </div>
        <span class="form__name">Григорий</span>
        <div class="form__inputs">
            <div class="inputs__input-block" id="email-wrp">
                <span class="input-block__label">Почта</span>
                <input class="input-block__input" v-model="form.email" id="email" type="text">
            </div>
            <div class="inputs__input-block" id="login-wrp">
                <span class="input-block__label">Логин</span>
                <input class="input-block__input" v-model="form.login" id="login"  type="text">
            </div>
            <div class="inputs__input-block" id="name-wrp">
                <span class="input-block__label" >Имя</span>
                <input class="input-block__input" v-model="form.first_name" id="name" type="text">
            </div>
            <div class="inputs__input-block" id="surname-wrp">
                <span class="input-block__label">Фамилия</span>
                <input class="input-block__input" v-model="form.second_name" id="surname" type="text">
            </div>
            <div class="inputs__input-block" id="name_in_chat-wrp">
                <span class="input-block__label">Имя в чате</span>
                <input class="input-block__input" v-model="form.display_name" id="name_in_chat" type="text">
            </div>
            <div class="inputs__input-block" id="phone-wrp">
                <span  class="input-block__label">Телефон</span>
                <input class="input-block__input" v-model="form.phone" id="phone" type="text">
            </div>
        </div>
        <div class="form__bottom-block">
            <div class="inputs__input-block">
                <button class="input-block__label" @click="submitForm">Изменить данные</button>
            </div>
            <div class="inputs__input-block">
                <button class="input-block__label">Изменить пароль</button>
            </div>
            <div class="inputs__input-block">
                <button @click="logout" class="link-btn--text">Выйти</button>
            </div>
        </div>
    </div>
</div>`;
