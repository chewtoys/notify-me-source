var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label"},[_vm._v(_vm._s(_vm.label)+":")]),_c('div',{staticClass:"form-outer"},[_c('input',{staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('update:value', $event.target.value)}}}),(_vm.small)?_c('small',{staticClass:"small_text"},[_vm._v(_vm._s(_vm.small))]):_vm._e()])])}
var staticRenderFns = []

export { render, staticRenderFns }