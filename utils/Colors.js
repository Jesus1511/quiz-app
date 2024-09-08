import { isDark } from "../Styles/GlobalStyles";

const green = isDark ? "#6fc200" : "#9adc29"

const darkGreen = isDark?"#5ba100":"#88c225"

const transparentGreen = isDark ? "#0000002f" : "#ffffff2f"

const text = isDark ? "white" : "black"

const label = isDark ? "#aaaaaa" : "#00000063"

const background = isDark ? "#353631" : "#ffffea"

export default Colors = {
    green,
    transparentGreen,
    darkGreen,
    text,
    label,
    background
}
