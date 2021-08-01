import avatar3 from '../../assets/img/users__avatars/avatar-3.png';

export default `<div class="personal-account">
    <div class="personal-account__form">
        <div class="item__avatar-wrp">
            <img src="${avatar3}" alt="avatar">
        </div>
        <span class="form__name">Григорий</span>
        <div class="form__inputs">
            <div class="inputs__input-block">
                <span class="input-block__label">Почта</span>
                <input class="input-block__input" value="mikigrigorij@yandex.ru" type="text">
            </div>
            <div class="inputs__input-block">
                <span class="input-block__label">Логин</span>
                <input class="input-block__input" value="GrigoRASH" type="text">
            </div>
            <div class="inputs__input-block">
                <span class="input-block__label">Имя</span>
                <input class="input-block__input" value="Григорий" type="text">
            </div>
            <div class="inputs__input-block">
                <span class="input-block__label">Фамилия</span>
                <input class="input-block__input" value="Микиртумов" type="text">
            </div>
            <div class="inputs__input-block">
                <span class="input-block__label">Имя в чате</span>
                <input class="input-block__input" value="Григорий" type="text">
            </div>
            <div class="inputs__input-block">
                <span class="input-block__label">Телефон</span>
                <input class="input-block__input" value="+7 (916) 821 55 27" type="text">
            </div>
        </div>
        <!-- <button class="btn form__save-btn">Сохранить</button> -->
        <div class="form__bottom-block">
            <div class="inputs__input-block">
                <button class="input-block__label">Изменить данные</button>
            </div>
            <div class="inputs__input-block">
                <button class="input-block__label">Изменить пароль</button>
            </div>
            <div class="form__logout-btn">
                <a class="router-link" href="/login">Выйти</ф>
            </div>
        </div>
    </div>
</div>`;
