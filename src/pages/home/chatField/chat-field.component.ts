import { Block } from '../../../framework/core/block.ts';
import { chatFieldTemplate } from './chat-field.template';
import {eventBus} from '../../../bus/index'
import {store} from '../../../store/index'
import avatar3 from '../../../assets/img/users__avatars/avatar-3.png';
import avatar1 from '../../../assets/img/users__avatars/avatar-3.png';
import fetchHTTP from '../../../framework/core/fetch'

interface Properties {
  components?: Block[];
  selector?: string;
  template: string;
  data?: { [key: string]: unknown };
  methods?: { [key: string]: () => unknown };
}

class ChatField extends Block {
  constructor(properties: Properties) {
    super(properties);
  }
  mounted() {
    eventBus.on('selectChat', (data)=>{
      this.data.selectedChat = data
      this.methods.getChatUsers(data)
      
    })
    this.data.chatBody = document.getElementById('chat-body')
    this.data.chatField = document.getElementById('chat-field')
    this.data.asideBody = document.getElementById('aside-body')
  },
}

export const chatField = new ChatField({
  data: {
    messageText: '',
    chatBody: null,
    socket: null,
    chatList: [],
    chatField: null,
    usersInSelectedChat: null,
    asideBody: null,
    showInput: false,
    showAside: false,
    selectedChat: {
      title: ''
    },
    selectedChatToken: null,
    userName: '',
  },
  selector: 'chatfield',
  template: chatFieldTemplate,
  methods: {
    createChatList(){
      let chatMessages = this.data.chatList.map( message =>{
        return `<div class="body__item ${store.state.userData.id===message.user_id ? 'body__item--incoming' : 'body__item--outgoing'}">
        <div class="item__avatar-wrp item__avatar-wrp--body">
            <img src="${avatar1}" alt="avatar">
        </div>
        <div class="item__text">
            <span class="text__name">${store.state.userData.id===message.user_id ? 'Я' : 'id: '+message.user_id}</span>
             <p class="text__cintent">${message.content}</p>
             <span class="text__last-date">8 минут назад</span>
         </div>
     </div>`
      }).join('')
      this.data.chatBody.innerHTML = chatMessages
    },
    closeSocket(){
      this.data.socket.close()
    },
    sendMessage(){
      this.data.socket.send(JSON.stringify({
        content: this.data.messageText,
        type: 'message',
      }))
    },
    createSocket(token:string){
      const userId = store.state.userData.id
      this.data.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${this.data.selectedChat.id}/${token}`); 
      this.data.socket.addEventListener('open', ()=>{
        this.data.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      })); 
      })
      let pingInterval = setInterval(()=>{
        this.data.socket.send(JSON.stringify({type:"ping"}))
      }, 3000)
      this.data.socket.addEventListener('close', () => {
        clearInterval(pingInterval)
      });
      this.data.socket.addEventListener('message', event => {
        let data = JSON.parse(event.data)
        if(data.type==='pong'){
          return
        }
        if(Array.isArray(data)){
          this.data.chatList = data
        }else{
          this.data.chatList.push(data)
        }
        this.methods.createChatList()
      });
    },
    getChatToken(){
      return fetchHTTP.post(`${store.state.baseUrl}/api/v2/chats/token/${this.data.selectedChat.id}`)
      .then(res=> {
        this.data.selectedChatToken =  res.data.token
        this.methods.createSocket(res.data.token)
      })
    },
    getChatUsers(data):void{
      if(!data){
        this.methods.closeSocket()
        this.data.chatField.classList.remove('chat-field--show-aside')
        return this.methods.createUserList(data)
      }
      fetchHTTP.get(store.state.baseUrl + `/api/v2/chats/${data.id}/users`).then(res=>{
        if(res.status === 200){
          this.data.usersInSelectedChat = res.data
          this.methods.createUserList(res.data)
          this.methods.getChatToken()
          this.data.chatField.classList.add('chat-field--show-aside')
        }
      })
    },
    searchUser():void{
      fetchHTTP.post(store.state.baseUrl + '/api/v2/user/search', {
        body: { login: this.data.userName }
      }).then(res=>this.methods.createUserList(res.data, 'user-list-add'))
    },
    showSerch() {
      let target = document.getElementById('add-user')
      let input = target?.querySelector('#add-user-input')
      if(!this.data.showInput){
        this.data.showInput = true
        target.classList.add('body-header__add-user--show')
        setTimeout(()=>{ input.focus()},300)
      }else{
        this.data.showInput = false
        target.classList.remove('body-header__add-user--show')
        this.methods.createUserList(this.data.usersInSelectedChat)
      }
    },
  
    createUserList(data, type='user-list'){
      let chatName = document.getElementById('group-name')
      let chatNameTop = document.getElementById('chat-info-name')
      if(!data){
        this.data.asideBody.innerHTML = ''
        chatName?.textContent = ''
        chatNameTop.textContent = ''
        return
      }
      chatNameTop.textContent = this.data.selectedChat.title
      chatName?.textContent = this.data.selectedChat.title
      let dataElements = data.map(el=>{
          return ` 
          <div class="body-content__item">
              <img class="content__item-avatar" src="${avatar3}" alt="user-avatar">
              <span class="content__item-name">${el.first_name} ${el.second_name}</span>
              ${store.state.userData.id !== el.id 
              ? 
                type === 'user-list' 
                  ? `<button class="header__btn--add-remove  add-user__btn" data-id="${el.id}"><i class="header__btn-icon fas fa-times"></i></button>`
                  : `<button class="header__btn--add-plus add-user__btn" data-id="${el.id}"><i class="header__btn-icon fas fa-plus"></i></button>`
              :''}
          </div>`
      }).join('')
      this.data.asideBody.innerHTML = dataElements
      this.methods.initListeners(type === 'user-list' ? '.header__btn--add-remove' :'.header__btn--add-plus')
    },
    initListeners(selector){
      let buttons = document.querySelectorAll(selector)
      buttons.forEach(element => element.addEventListener('click', (e)=>{
        const users = [+e.currentTarget.dataset.id];
        const chatId = +this.data.selectedChat.id
        let data = {chatId, users}
        if(selector ===  '.header__btn--add-plus'){
          fetchHTTP.put(store.state.baseUrl + '/api/v2/chats/users', {
            body: data
          })
        }else{
          fetchHTTP.delete(store.state.baseUrl + '/api/v2/chats/users', {
            body: data
          })
        }
      }
      }));
    }
  },
});
