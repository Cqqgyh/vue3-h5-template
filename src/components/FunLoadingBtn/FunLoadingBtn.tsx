import { defineComponent, ref } from "vue";
import { Button } from "vant";
export default defineComponent(
  (props, { attrs, slots }) => {
    // 就像在 <script setup> 中一样使用组合式 API
    const loading = ref(false);
    const clickHandler = async () => {
      try {
        loading.value = true;
        await props.onClick();
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
            {slots.default?.()}
          </Button>
        </>
      );
    };
  },
  {
    props: ["onClick"]
  }
);
