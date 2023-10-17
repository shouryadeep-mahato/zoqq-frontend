export const getTheme = (answers) => {

    const themes = [
        { "id": "1", "colorSet": ["green"], "isLight": true, "main": "#3b656b", "primary": "#0b8fb9", "secondary": "#299e58", "tertiary": "#f0b429", "primaryB": "rgba(11, 143, 185, 0.1)", "secondaryB": "rgba(41, 158, 88, 0.1)", "tertiaryB": "rgba(240, 180, 41, 0.1)", "color0": "#ffffff", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#0a1e2c" },
        { "id": "2", "colorSet": ["blue"], "isLight": true, main: "#5f6090", primary: "#2d7150", primaryB: "#2d715010", secondary: "#8e925a", secondaryB: "#8e925a10", tertiary: "#d43838", tertiaryB: "#d4383810", color0: "#ffffff" },
        { "id": "3", "colorSet": ["blue"], "isLight": true, main: "#97b4c2", primary: "#1289b6", primaryB: "#1289b610", secondary: "#509f5f", secondaryB: "#509f5f10", tertiary: "#edaa25", tertiaryB: "#edaa2510", color0: "#ffffff" },
        { "id": "4", "colorSet": ["green"], "isLight": true, main: "#6dc5c4", primary: "#0066cc", primaryB: "#0066cc10", secondary: "#9e11da", secondaryB: "#9e11da10", tertiary: "#5ae5de", tertiaryB: "#5ae5de10", color0: "#ffffff" },
        { "id": "5", "colorSet": ["blue"], "isLight": true, "main": "#1d1f7c", "primary": "#2d7150", "secondary": "#8e925a", "tertiary": "#d43838", "primaryB": "#2d715010", "secondaryB": "#8e925a10", "tertiaryB": "#d4383810", "color0": "#ffffff", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#0a1e2c" },
        { "id": "9", "colorSet": ["brown"], "isLight": true, "main": "#55220c", "primary": "#22814b", "secondary": "#631f08", "tertiary": "#2630ba", "primaryB": "#22814b10", "secondaryB": "#631f0810", "tertiaryB": "#2630ba10", "color0": "#ffffff", "color25": "#f1f2ed", "color50": "#fff0f0", "color75": "#2d1c69", "color100": "#3f1308" },
        { "id": "11", "colorSet": ["black"], "isLight": true, "main": "#000000", "primary": "#bc0b0b", "secondary": "#1a512d", "tertiary": "#2630ba", "primaryB": "#bc0b0b10", "secondaryB": "#1a512d10", "tertiaryB": "#2630ba10", "color0": "#ffffff", "color25": "#ffffff", "color50": "#f5f5f5", "color75": "#2d1c69", "color100": "#3f1308" },
        { "id": "21", "colorSet": ["green"], "isLight": true, "main": "#8cd246", "primary": "#1d6a9a", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#1d6a9a10", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#ffffff", "color25": "#1e258a", "color50": "#f1efef", "color75": "#8f9096", "color100": "#058a2d" },
        { "id": "15", "colorSet": ["blue"], "isLight": true, "main": "#2f536f", "primary": "#455fb0", "secondary": "#b65d66", "tertiary": "#536b4c", "primaryB": "#455fb010", "secondaryB": "#b65d6610", "tertiaryB": "#536b4c10", "color0": "#ffffff", "color25": "#99bbcc", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#30253c" },
        { "id": "13", "colorSet": ["blue"], "isLight": false, "main": "#52357e", "primary": "#791515", "secondary": "#1b793c", "tertiary": "#2630ba", "primaryB": "#79151510", "secondaryB": "#1b793c10", "tertiaryB": "#2630ba10", "color0": "#dfdbe6", "color25": "#ffffff", "color50": "#e5e0e0", "color75": "#2d1c69", "color100": "#3f1308" },
        { "id": "14", "colorSet": ["blue"], "isLight": false, "main": "#2f536f", "primary": "#263d82", "secondary": "#b01121", "tertiary": "#304729", "primaryB": "#263d8210", "secondaryB": "#b0112110", "tertiaryB": "#30472910", "color0": "#c9d1d9", "color25": "#b71a1a", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#500c7d" },
        { "id": "16", "colorSet": ["blue"], "isLight": false, "main": "#708ce1", "primary": "#0b8fb9", "secondary": "#8d6aec", "tertiary": "#f0b429", "primaryB": "rgba(11,143,185,.1)", "secondaryB": "#8d6aec10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#fafafa", "color25": "#f1f2f4", "color50": "rgba(219,229,230,.2)", "color75": "#8f9096", "color100": "#0010eb" },
        { "id": "17", "colorSet": ["green"], "isLight": false, "main": "#8dca72", "primary": "#0b75b7", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#0b75b710", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#fdfef1", "color25": "#7376a0", "color50": "rgba(219,229,230,.2)", "color75": "#8f9096", "color100": "#515e9a" },
        { "id": "18", "colorSet": [""], "isLight": false, "main": "#ff7070", "primary": "#0b75b7", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#0b75b710", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#fdfdfc", "color25": "#1e258a", "color50": "#d1d2cb", "color75": "#8f9096", "color100": "#051d80" },
        { "id": "19", "colorSet": ["blue"], "isLight": false, "main": "#9c44f3", "primary": "#1d6a9a", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#1d6a9a10", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#fcfcfd", "color25": "#1e258a", "color50": "#eef0cc", "color75": "#8f9096", "color100": "#11646f" },
        { "id": "20", "colorSet": ["blue"], "isLight": false, "main": "#44bff3", "primary": "#1d6a9a", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#1d6a9a10", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#ffffff", "color25": "#1e258a", "color50": "#f1f1da", "color75": "#8f9096", "color100": "#11646f" },
        { "id": "22", "colorSet": ["black"], "isLight": false, "main": "#12293b", "primary": "#1d6a9a", "secondary": "#a5e4be", "tertiary": "#f0b429", "primaryB": "#1d6a9a10", "secondaryB": "#a5e4be10", "tertiaryB": "rgba(240,180,41,.1)", "color0": "#ffffff", "color25": "#6c6fb7", "color50": "#ededed", "color75": "#8f9096", "color100": "#9a8413" },
        { "id": "6", "colorSet": ["black"], "isLight": false, "main": "#615114", "primary": "#2d7150", "secondary": "#8e925a", "tertiary": "#d43838", "primaryB": "#2d715010", "secondaryB": "#8e925a10", "tertiaryB": "#d4383810", "color0": "#242622", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#f4f8fb" },
        { "id": "7", "colorSet": ["green", "black"], "isLight": false, "main": "#017e59", "primary": "#2d7150", "secondary": "#8e925a", "tertiary": "#d43838", "primaryB": "#2d715010", "secondaryB": "#8e925a10", "tertiaryB": "#d4383810", "color0": "#000000", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#f4f8fb" },
        { "id": "8", "colorSet": ["green"], "isLight": false, "main": "#0b4c16", "primary": "#141514", "secondary": "#352da9", "tertiary": "#de0d2c", "primaryB": "#14151410", "secondaryB": "#352da910", "tertiaryB": "#de0d2c10", "color0": "#d9f2e3", "color25": "#fcfdf7", "color50": "#cdeed9", "color75": "#306e07", "color100": "#0c283b" },
        { "id": "10", "colorSet": ["brown"], "isLight": false, "main": "#55220c", "primary": "#502102", "secondary": "#086323", "tertiary": "#2630ba", "primaryB": "#50210210", "secondaryB": "#08632310", "tertiaryB": "#2630ba10", "color0": "#f2dede", "color25": "#f5f5f5", "color50": "#f9ecec", "color75": "#2d1c69", "color100": "#3f1308" },
        { "id": "12", "colorSet": ["black"], "isLight": false, "main": "#000000", "primary": "#bc0b0b", "secondary": "#1a512d", "tertiary": "#2630ba", "primaryB": "#bc0b0b10", "secondaryB": "#1a512d10", "tertiaryB": "#2630ba10", "color0": "#ffffff", "color25": "#ffffff", "color50": "#ffffff", "color75": "#2d1c69", "color100": "#3f1308" },
    ]

    let filterThemes = themes.filter((item)=>(item?.isLight===answers?.isLight && (answers?.colors?.any || (answers?.colors?.green && (item?.colorSet.includes("green"))) || (answers?.colors?.black && (item?.colorSet.includes("black"))) || (answers?.colors?.blue && (item?.colorSet.includes("blue"))) || (answers?.colors?.brown && (item?.colorSet.includes("brown"))))));


    return filterThemes.concat(themes);

}












