import type { Directive, DirectiveBinding } from "vue";
/**
 * @description  点击元素移除或添加指定类名
 * @param  {array | string} 需要移除类名的数组或者字符串
 * @docs  v-on-click-remove-or-add-class
 * 1.单独注册：使用方式，在main.js中引入并注册repeat
 * import onClickRemoveOrAddClass from './direct/onClickRemoveOrAddClass'
 * app.directive('on-click-remove-or-add-class', onClickRemoveOrAddClass);
 * 2.统一注册directives目录下所有指令：使用方式，在main.js中引入并注册
 * import directives from "@/directives";
 * app.use(directives);
 * 页面内直接使用
 *    <div v-on-click-remove-or-add-class="['class1', 'class2']">点 击我去除或添加 class1 和 class2</div>
 **/

const removeOrAddClassDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const classNames = binding.value;
    // 判断元素是否存在该类名，存在则移除，否则添加
    /**
     * @description 移除或添加指定类名
     * @param el 元素
     * @param className 类名
     */
    const handleRemoveOrAddClass = (el: HTMLElement, className: string) => {
      // 判断元素是否存在该类名，存在则移除，否则添加
      Array.from(el.classList).includes(className)
        ? el.classList.remove(className)
        : el.classList.add(className);
    };
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Element && classNames) {
        // 如果传入的是数组，则循环处理
        if (Array.isArray(classNames)) {
          classNames.forEach(className => {
            // 判断元素是否存在该类名，存在则移除，否则添加
            handleRemoveOrAddClass(el, className);
          });
        } else {
          // 判断元素是否存在该类名，存在则移除，否则添加
          handleRemoveOrAddClass(el, classNames);
        }
      }
    };
    // 添加事件监听
    el.addEventListener("click", handleClick);
  }
};

export default removeOrAddClassDirective;
