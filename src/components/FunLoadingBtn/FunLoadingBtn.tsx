import { defineComponent, ref } from "vue";
import { Button } from "vant";
/**
 * @description: 具有loading状态的按钮,传入的方法为为异步方法时自动添加loading状态
 * @param {https://vant-contrib.gitee.io/vant/#/zh-CN/button} 支持其中所有的属性
 */
export default defineComponent(
  (props, { attrs, slots }) => {
    // 就像在 <script setup> 中一样使用组合式 API
    const loading = ref(false);
    const clickHandler = async () => {
      try {
        loading.value = true;
        // onClick事件没传递时，不执行await
        props.onClick && (await props.onClick());
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = false;
      }
    };
    return () => {
      return (
        <>
          <Button
            type="default"
            {...attrs}
            onClick={clickHandler}
            loading={loading.value}
          >
            {slots.default?.() || "按钮"}
          </Button>
        </>
      );
    };
  },
  {
    //   这里需要注意的是需要声明接收onClick属性
    props: ["onClick"]
  }
);
