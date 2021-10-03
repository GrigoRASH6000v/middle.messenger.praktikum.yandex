import avatar1 from '../../../assets/img/users__avatars/avatar.png';
import yndxBigAvatar from '../../../assets/img/group_avatars/yndx-big-avatar.png';
import avatar3 from '../../../assets/img/users__avatars/avatar-3.png';
export const chatFieldTemplate = `<div class="chat-field">
    <div class="chat-field__header">
        <div class="header__chat-info">
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="chat-info__name">Александра Макарова</span>
            <span class="chat-info__status">online</span>
        </div>
       
        <button  class="header__btn"><i class="header__btn-icon fas fa-ellipsis-v"></i></button>
    </div>
    <div class="chat-field__body">
         <div class="body__item body__item--incoming">
            <div class="item__avatar-wrp item__avatar-wrp--body">
                <img src="${avatar1}" alt="avatar">
            </div>
            <div class="item__text">
                <span class="text__name">Александра Макарова</span>
                 <p class="text__cintent">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Vel, fugiat. Nihil, laudantium maiores expedita dolor velit
                    adipisci doloribus tenetur assumenda rerum ducimus
                     unde, omnis dolores voluptatibus, obcaecati exercitationem ipsa.
                 </p>
                 <span class="text__last-date">8 минут назад</span>
             </div>
         </div>
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
                <span class="body-header__group-name">test chat 8</span>
                <div class="body-header__add-user" id="add-user">
                    <input class="add-user__input" id="add-user-input" v-model="userName" type="text">
                    <button @click="addUser" class=" header__btn add-user__btn"><i class="header__btn-icon fas fa-user-plus"></i></button>
                </div>
            </div>
            <div class="aside__body-content">
                <div class="body-content__item">
                    <img class="content__item-avatar" src="${avatar3}" alt="user-avatar">
                    <span class="content__item-name">Андрей Аристов</span>
                    <button  class="header__btn content__item-edit-btn"><i class="header__btn-icon fas fa-ellipsis-v"></i></button>
                </div>
                <div class="body-content__item">
                    <img class="content__item-avatar" src="${avatar1}" alt="user-avatar">
                    <span class="content__item-name">Александра Макарова</span>
                    <button  class="header__btn content__item-edit-btn"><i class="header__btn-icon fas fa-ellipsis-v"></i></button>
                </div>
            </div>
        </div>
    </aside>
</div>`;
