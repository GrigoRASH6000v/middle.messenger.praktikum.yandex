import avatar1 from '../../../assets/img/users__avatars/avatar.png';
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
        <iconUserAdd />
        <iconDotes />
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
        <div class="body__item body__item--outgoing">
            <div class="item__avatar-wrp item__avatar-wrp--body">
                <img src="${avatar3}" alt="avatar">
            </div>
            <div class="item__text">
                <p class="text__cintent">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vel, fugiat. Nihil, laudantium maiores expedita dolor velit
                    adipisci doloribus tenetur assumenda rerum ducimus
                    unde, omnis dolores voluptatibus, obcaecati exercitationem ipsa.
                </p>
                <span class="text__last-date">8 минут назад</span>
            </div>
        </div>
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
        <div class="body__item body__item--outgoing">
            <div class="item__avatar-wrp item__avatar-wrp--body">
                <img src="${avatar3}" alt="avatar">
            </div>
            <div class="item__text">
                <p class="text__cintent">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vel, fugiat. Nihil, laudantium maiores expedita dolor velit
                    adipisci doloribus tenetur assumenda rerum ducimus
                    unde, omnis dolores voluptatibus, obcaecati exercitationem ipsa.
                </p>
                <span class="text__last-date">8 минут назад</span>
            </div>
        </div>
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
        <div class="body__item body__item--outgoing">
            <div class="item__avatar-wrp item__avatar-wrp--body">
                <img src="${avatar3}" alt="avatar">
            </div>
            <div class="item__text">
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
</div>`;
