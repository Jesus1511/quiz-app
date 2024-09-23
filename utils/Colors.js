import { useColorScheme } from "react-native"

function useColors () {

    const isDark = useColorScheme() == "dark"

    const green = isDark ? "#6fc200" : "#9adc29"

    const green3 = isDark ? "#6ec200cb" : "#9adc29cb"

    const winnerGreen = isDark ? "#38c73fff" : "#50ff20"

    const red = isDark ? "#c64040":"#ff1919"

    const green2 = isDark ? "#76b524ff" : "#b0e655"

    const darkGreen = isDark?"#6cb113":"#90c92c"

    const transparentGreen = isDark ? "#2e2e29ff" : "#fffff2ff"

    const text = isDark ? "white" : "black"

    const blue = isDark ? "#eaf9ff":"#003176"

    const blue2 = isDark ? "hsla(221, 100%, 95%, 1)":"#001e4487"

    const blue3 = isDark ? "#0099e6":"#24b6ff"

    const bluePoint = "hsla(199, 100%, 64%, 1)"

    const subText = isDark ? "#ffffffe1" : "#000000e1"

    const label = isDark ? "#aaaaaa" : "#00000063"

    const bar = isDark ? "#ffffff15" : "#00000015"

    const background = isDark ? "#353631" : "#ffffea"

    return Colors = {
        green,
        green3,
        winnerGreen,
        green2,
        red,
        blue,
        blue2,
        blue3,
        bluePoint,
        transparentGreen,
        darkGreen,
        text,
        bar,
        subText,
        label,
        background
      }
    }

export default useColors