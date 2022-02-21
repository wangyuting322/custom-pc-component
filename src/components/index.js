import Vue from 'vue';
/** ============公用系统组件================= */
import CustomDialog from './customDialog/index.js';
import Tag from './tag/Tag.vue';
import TagInput from './tagInput/TagInput.vue';

Vue.use(CustomDialog);
Vue.component(Tag.name,Tag)
Vue.component(TagInput.name,TagInput)