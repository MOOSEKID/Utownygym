<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    :class="`spinner-loading ` + classes"
    :style="{
      width: cSize + 'px',
    }"
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <pattern
        id="ldio-1xjg0i6kydh-pattern"
        patternUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <g>
          <g transform="rotate(20 50 50) scale(1.2)">
            <rect x="-20" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="-10" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="0" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="10" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="20" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="30" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="40" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="50" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="60" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="70" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="80" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="90" y="-10" width="10" height="120" :fill="color1"></rect>
            <rect x="100" y="-10" width="10" height="120" :fill="color"></rect>
            <rect x="110" y="-10" width="10" height="120" :fill="color"></rect>
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;26 0"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </pattern>
    </defs>
    <rect
      rx="8"
      ry="8"
      x="10"
      y="41.5"
      :stroke="stroke"
      stroke-width="2.5"
      width="80"
      height="17"
      fill="url(#ldio-1xjg0i6kydh-pattern)"
    ></rect>
  </svg>
</template>
<script>
import useSpinner, {
  useSpinnerProps,
} from "quasar/src/components/spinner/use-spinner";
import { createComponent } from "quasar/src/utils/private.create/create";
import { getCssVar, colors } from "quasar";

export default createComponent({
  name: "QSpinnerLogo",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    const color = getCssVar(props.color);
    const color1 = colors.lighten(color, 30);
    const stroke = colors.lighten(color, 60);
    return {
      cSize,
      classes,
      color,
      color1,
      stroke,
    };
  },
});
</script>
