import home from "./index.tmpl.js"
import chatList from "./chatList/index.js"
import chatField from "./chatField/index.js"

export default {
    template: home,
    data:{},
    methods: {},
    components: {
        chatList,
        chatField
    }
}