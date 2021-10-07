import { Block } from '../../../framework/core/block.ts';
import { chatListTemplate } from './chat-list.template';
import { store } from '../../../store/index';
import { eventBus } from '../../../bus/index';
import fetchHTTP from '../../../framework/core/fetch';
import avatar2 from '../../../assets/img/users__avatars/avatar-2.png';

class ChatList extends Block {
  constructor(properties) {
    super(properties);
  }
  mounted() {
    this.methods.getChat();
  }
}
export const chatList = new ChatList({
  selector: 'chatlist',
  template: chatListTemplate,
  data: {
    listOfChats: [],
    selectedChat: null,
    title: '',
    showInput: false,
  },
  methods: {
    selectChat(target) {
      let chats = document.querySelectorAll('.chats__item');
      let selectedChatData;
      chats.forEach((chat) => {
        if (chat.dataset.id !== target.dataset.id) {
          chat.classList.remove('chats__item--selected');
        }
      });
      target.classList.toggle('chats__item--selected');
      if (this.data.selectedChat === target.dataset.id) {
        this.data.selectedChat = null;
        selectedChatData = null;
      } else {
        this.data.selectedChat = target.dataset.id;
        selectedChatData = this.data.listOfChats.find(
          (el) => el.id === +this.data.selectedChat
        );
      }
      eventBus.emit('selectChat', selectedChatData);
    },
    getChat() {
      fetchHTTP.get(store.state.baseUrl + '/api/v2/chats').then((res) => {
        this.data.listOfChats = res.data;
        this.methods.renderChatList(res.data);
      });
    },
    removeChat(id) {
      fetchHTTP
        .delete(store.state.baseUrl + '/api/v2/chats', {
          body: { chatId: id },
        })
        .then((res) => {
          if (res.status === 200) this.methods.getChat();
        });
    },
    addChat() {
      const sddWrp = document.getElementById('add-wrp');
      if (!this.showInput) {
        sddWrp.classList.add('chat-list__add-wrp--show');
        this.showInput = true;
      } else if (this.showInput && this.data.title) {
        fetchHTTP
          .post(store.state.baseUrl + '/api/v2/chats', {
            body: { title: this.data.title },
          })
          .then((res) => {
            if (res.status === 200) {
              this.showInput = false;
              sddWrp.classList.remove('chat-list__add-wrp--show');
              this.data.title = '';
              this.methods.getChat();
            }
          });
        // fetch(store.state.baseUrl + '/api/v2/chats', {
        //   method: 'POST',
        //   headers: {
        //     'content-type': 'application/json',
        //   },
        //   credentials: 'include',
        //   mode: 'cors',
        //   body: JSON.stringify({ title: this.data.title }),
        // })
        //   .then((res) => {
        //     if (res.ok) {
        //       this.showInput = false;
        //       sddWrp.classList.remove('chat-list__add-wrp--show');
        //       this.data.title = '';
        //       return res.json();
        //     }
        //   })
        //   .then(() => {
        //     this.data.title = '';
        //     this.methods.getChat();
        //   });
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
                  <span class="item__chat-text"></span>
              </div>`;
      });
      target.innerHTML = str;
      this.methods.initListener();
    },
    initListener() {
      let chats = document.querySelectorAll('.chats__item');
      let buttons = document.querySelectorAll('.chats__item-btn-remove');
      buttons.forEach((el, idx) => {
        chats[idx].addEventListener('click', (e) => {
          this.methods.selectChat(e.currentTarget);
        });
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.methods.removeChat(e.currentTarget.dataset.id);
        });
      });
    },
  },
});
