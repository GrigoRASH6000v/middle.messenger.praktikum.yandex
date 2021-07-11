import avatar1 from "../../../assets/img/users__avatars/avatar.png"
import avatar2 from "../../../assets/img/users__avatars/avatar-2.png"


export default
`<div class="chat-list">
    <h3 class="chat-list__title">Чаты</h3>
    <div class="input-wrp">
        <svg class="input__icon" width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M13.4271 15.4271C12.0372 16.4175 10.3367 17 8.5 17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5C17 10.8472 16.0486 12.9722 14.5104 14.5104L20.5078 20.5078C20.7828 20.7828 20.7761 21.2239 20.5 21.5C20.2219 21.7781 19.7796 21.7796 19.5078 21.5078L13.4271 15.4271ZM8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z" />
        </svg>
        <input class="input" type="text" placeholder="Поиск">
    </div>
    <button class="btn">
        <iconPlusOutline/>
        <span>Создать чат</span>
    </button>
    <div class="chat-list__chats">
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar2}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Александра Макарова</span>
            <span class="item__chat-text">Привет, как дела!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Сергей Сазон</span>
            <span class="item__chat-text">Привет, как дела!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
        <div class="chats__item">
            <span class="item__chat-time">10:42</span>
            <div class="item__avatar-wrp">
                <img src="${avatar1}" alt="avatar">
            </div>
            <span class="item__chat-name">Practicum Team</span>
            <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
        </div>
    </div>
</div>`