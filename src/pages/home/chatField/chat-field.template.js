import yndxBigAvatar from '../../../assets/img/group_avatars/yndx-big-avatar.png';

export const chatFieldTemplate = `<div class="chat-field" id="chat-field">
    <div class="chat-field__header">
        <div class="header__chat-info">
            <span id="chat-info-name" class="chat-info__name"></span>
        </div>
    </div>
    <div class="chat-field__body" id="chat-body"> 
    </div>
    <div class="chat-field__footer">
        <input class="footer__input" placeholder="Сообщение" v-model="messageText" type="text">
        <button class="footer__send-btn" @click="sendMessage"><i class="footer__send-icon fab fa-telegram-plane"></i></button>
    </div>
    <aside class="chat-field__aside">
        <div class="aside__header">
            <span class="header__text">Информация о группе</span>
        </div>
        <div class="aside__body">
            <div class="aside__body-header">
                <div class="body-header__group-avatar-wrp">
                    <img class="body-header__group-avatar" src="${yndxBigAvatar}" alt="group-avatar">
                    <button class="body-header__group-edit"><i class="edit-icon fas fa-pencil-alt"></i></button>
                </div>
                <span class="body-header__group-name" id="group-name">{{selectedChat.title}}</span>
                <div class="body-header__add-user" id="add-user">
                    <input class="add-user__input" id="add-user-input" v-model="userName" type="text" placeholder="Введите логин пользователя">
                    <button @click="showSerch" id="add-user-btn" class="header__btn--add add-user__btn"><i class="header__btn-icon fas fa-user-plus"></i></button>
                    <button @click="searchUser" id="add-user-search" class="header__btn--search add-user__btn"><i class="header__btn-icon fas fa-search"></i></button>
                    <button @click="showSerch" id="add-user-search" class="header__btn--search add-user__btn"><i class="header__btn-icon fas fa-times"></i></button>
                </div>
            </div>
            <div class="aside__body-content" id="aside-body">
            </div>
        </div>
    </aside>
</div>`;
