import Vue from 'vue';
/** ============公用系统组件================= */
import CustomDialog from './customDialog/index.js';
import Tag from './tag/Tag.vue';
import TagInputSpace from './tagInput/TagInputSpace.vue';
import TagInputEnter from './tagInput/TagInputEnter.vue';
import NumAnimation from './numAnimation/NumAnimation.vue';
import HcToolTip from './toolTip/ToolTip.vue'

Vue.use(CustomDialog);
Vue.component(Tag.name,Tag)
Vue.component(TagInputSpace.name,TagInputSpace)
Vue.component(TagInputEnter.name,TagInputEnter)
Vue.component(NumAnimation.name,NumAnimation)
Vue.component(HcToolTip.name, HcToolTip)
