import { Block } from '../../../framework/core/block.ts';
import { chatFieldTemplate } from './chat-field.template';
import {eventBus} from '../../../bus/index'

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
    })
  },
}

export const chatField = new ChatField({
  data: {
    showInput: false
    showAside: false,
    selectedChat: null
  },
  selector: 'chatfield',
  template: chatFieldTemplate,
  methods: {
    addUser() {
      let target = document.getElementById('add-user')
      let input = target?.querySelector('#add-user-input')
      if(!this.data.showInput){
        this.data.showInput = true
        target.classList.add('body-header__add-user--show')
        console.log(this)
        this.methods.initListener(input)
        setTimeout(()=>{ input.focus()},300)
      }else{
        this.data.showInput = false
        target.classList.remove('body-header__add-user--show')
      }
    },
    initListener(target){
      target?.addEventListener('input', (e)=>{
        console.log(e)
      })
    }
  },
});
