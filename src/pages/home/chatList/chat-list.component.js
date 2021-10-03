import { Block } from '../../../framework/core/block.ts';
import { chatListTemplate } from './chat-list.template';
import { store } from '../../../store/index';
import { eventBus } from '../../../bus/index';

import avatar2 from '../../../assets/img/users__avatars/avatar-2.png';

class ChatList extends Block {
  constructor(properties) {
    super(properties);
  }
  mounted() {
    fetch(store.state.baseUrl + '/api/v2/chats', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        this.data.listOfChats = data;
        this.methods.renderChatList(data);
      });
  }
}
export const chatList = new ChatList({
  selector: 'chatlist',
  template: chatListTemplate,
  data: {
    selectedChat: null,
    title: '',
    showInput: false,
  },
  methods: {
    selectChat(target) {
      let chats = document.querySelectorAll('.chats__item');
      chats.forEach((chat) => {
        if (chat.dataset.id !== target.dataset.id) {
          chat.classList.remove('chats__item--selected');
        }
      });
      target.classList.toggle('chats__item--selected');
      store.state.chat.selectedChat = target.dataset.id;
    },
    getChat() {
      fetch(store.state.baseUrl + '/api/v2/chats', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((data) => {
          this.renderChatList(data);
        });
    },
    removeChat(id) {
      fetch(store.state.baseUrl + '/api/v2/chats', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ chatId: id }),
      }).then((res) => {
        if (res.ok) {
          this.getChat();
        }
      });
    },
    addChat() {
      const sddWrp = document.getElementById('add-wrp');
      if (!this.showInput) {
        sddWrp.classList.add('chat-list__add-wrp--show');
        this.showInput = true;
      } else if (this.showInput && this.data.title) {
        fetch(store.state.baseUrl + '/api/v2/chats', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify({ title: this.data.title }),
        })
          .then((res) => {
            if (res.ok) {
              this.showInput = false;
              sddWrp.classList.remove('chat-list__add-wrp--show');
              this.data.title = '';
              return res.json();
            }
          })
          .then(() => {
            this.data.title = '';
            this.methods.getChat();
          });
      }
    },
    renderChatList(data) {
      let target = document.getElementById('chat-list');
      let str = '';
      data.forEach((d) => {
        str += `<div class="chats__item" data-id="${d.id}">
                  <button data-id="${d.id}" class="chats__item-btn-remove"><i class="item-btn-icon fas fa-times"></i></button>
                  <span class="item__chat-time">10:42</span>
                  <div class="item__avatar-wrp">
                      <img src="${avatar2}" alt="avatar">
                  </div>
                  <span class="item__chat-name">${d.title}</span>
                  <span class="item__chat-text">Привет, ребята, зацените новую фучу!</span>
              </div>`;
      });
      target.innerHTML = str;
      this.initListener();
    },
    initListener() {
      console.log(this);
      let chats = document.querySelectorAll('.chats__item');
      let buttons = document.querySelectorAll('.chats__item-btn-remove');
      buttons.forEach((el, idx) => {
        chats[idx].addEventListener('click', (e) => {
          this.selectChat(e.currentTarget);
        });
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeChat(e.currentTarget.dataset.id);
        });
      });
    },
  },
});
