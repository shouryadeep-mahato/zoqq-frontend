import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTheme } from '../../../../data/branding/themes';
import AIQuestion from './QuestionsModal/AIQuestion';
import { handleCopy } from '../../../structure/handleCopy';

function Theme({ setColour, setFont }) {

    const [count, setCount] = useState(0);

    const [aiColorSet, setAIColorSet] = useState([])

    const [randomColor, setRandomColor] = useState('#000000'); // Initial color is black

    const [currentColor, setCurrentColor] = useState("");

    const [currentFont, setCurrentFont] = useState("");

    const [answers, setAnswers] = useState({});

    const [isGenerated, setIsGenerated] = useState(false);

    const [loader, setLoader] = useState("Generate");

    const setDefault = () => {
        localStorage.removeItem("style");
        setRandomColor(
            { "id": "1", "colorSet": ["green"], "isLight": true, "main": "#3b656b", "primary": "#0b8fb9", "secondary": "#299e58", "tertiary": "#f0b429", "primaryB": "rgba(11, 143, 185, 0.1)", "secondaryB": "rgba(41, 158, 88, 0.1)", "tertiaryB": "rgba(240, 180, 41, 0.1)", "color0": "#ffffff", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#0a1e2c" }
        )
        changeColor(
            { "id": "1", "colorSet": ["green"], "isLight": true, "main": "#3b656b", "primary": "#0b8fb9", "secondary": "#299e58", "tertiary": "#f0b429", "primaryB": "rgba(11, 143, 185, 0.1)", "secondaryB": "rgba(41, 158, 88, 0.1)", "tertiaryB": "rgba(240, 180, 41, 0.1)", "color0": "#ffffff", "color25": "#e7ebef", "color50": "rgba(219, 229, 230, 0.2)", "color75": "#8f9096", "color100": "#0a1e2c" }
        )
    }

    useEffect(() => {
        if (currentFont)
            setFont(currentFont);
    }, [currentFont]);

    useEffect(() => {
        if (isGenerated)
            setAIColorSet(getTheme(answers));
    }, [answers, isGenerated])

    useEffect(() => {
        // rootStyles?.setProperty('--color-25', colour?.color25); // Modify the value of a CSS variable
        const root = document.documentElement;

        const main = getComputedStyle(root).getPropertyValue('--main-color');
        const primary = getComputedStyle(root).getPropertyValue('--primary-color-100');
        const primaryB = getComputedStyle(root).getPropertyValue('--primary-color-10');
        const secondary = getComputedStyle(root).getPropertyValue('--secondary-color-100');
        const secondaryB = getComputedStyle(root).getPropertyValue('--secondary-color-10');
        const tertiary = getComputedStyle(root).getPropertyValue('--tertiary-color-100');
        const tertiaryB = getComputedStyle(root).getPropertyValue('--tertiary-color-10');
        const color0 = getComputedStyle(root).getPropertyValue('--color-0');
        const color25 = getComputedStyle(root).getPropertyValue('--color-25');
        const color50 = getComputedStyle(root).getPropertyValue('--color-50');
        const color75 = getComputedStyle(root).getPropertyValue('--color-75');
        const color100 = getComputedStyle(root).getPropertyValue('--color-100');

        setRandomColor({ main, primary, secondary, tertiary, primaryB, secondaryB, tertiaryB, color0, color25, color50, color75, color100 });
    }, [])


    const changeColor = (colour) => {
        // const root = document.documentElement;
        const rootStyles = root?.style;
        if (colour?.main)
            rootStyles?.setProperty('--main-color', colour?.main); // Modify the value of a CSS variable
        if (colour?.primary)
            rootStyles?.setProperty('--primary-color-100', colour?.primary); // Modify the value of a CSS variable
        if (colour?.primaryB)
            rootStyles?.setProperty('--primary-color-10', colour?.primaryB); // Modify the value of a CSS variable
        if (colour?.secondary)
            rootStyles?.setProperty('--secondary-color-100', colour?.secondary); // Modify the value of a CSS variable
        if (colour?.secondaryB)
            rootStyles?.setProperty('--secondary-color-10', colour?.secondaryB); // Modify the value of a CSS variable
        if (colour?.tertiary)
            rootStyles?.setProperty('--tertiary-color-100', colour?.tertiary); // Modify the value of a CSS variable
        if (colour?.tertiaryB)
            rootStyles?.setProperty('--tertiary-color-10', colour?.tertiaryB); // Modify the value of a CSS variable
        if (colour?.color0)
            rootStyles?.setProperty('--color-0', colour?.color0); // Modify the value of a CSS variable
        if (colour?.color25)
            rootStyles?.setProperty('--color-25', colour?.color25); // Modify the value of a CSS variable
        if (colour?.color50)
            rootStyles?.setProperty('--color-50', colour?.color50); // Modify the value of a CSS variable
        if (colour?.color75)
            rootStyles?.setProperty('--color-75', colour?.color75); // Modify the value of a CSS variable
        if (colour?.color100)
            rootStyles?.setProperty('--color-100', colour?.color100); // Modify the value of a CSS variable
    }

    const onSave = () => {
        localStorage.setItem("style", JSON.stringify(randomColor));
        changeColor(randomColor);
    }

    const onFontSave = () => {
        const rootStyles = document.documentElement?.style;
        if (currentFont) {
            rootStyles?.setProperty('--font', currentFont);
            setRandomColor({ ...randomColor, "--font": currentFont });
            localStorage.setItem("style", JSON.stringify({ ...randomColor, font: currentFont }));
        }
    }

    const colors = [
        { label: "Choose Color", value: "" },
        { label: "Main Color", value: "main" },
        // { label: "Primary Color", value: "primary" },
        { label: "Secondary Color", value: "secondary" },
        // { label: "Tertiary Color", value: "tertiary" },
        // { label: "Primary Color Background", value: "primaryB" },
        // { label: "Secondary Color Background", value: "secondaryB" },
        // { label: "Tertiary Color Background", value: "tertiaryB" },
        { label: "Background Color", value: "color0" },
        { label: "Color 1", value: "color25" },
        { label: "Color 2", value: "color50" },
        { label: "Color 3", value: "color75" },
        { label: "Text Color", value: "color100" }
    ]

    const fonts = [
        { label: "", value: "" },
        { label: "Roboto", value: "'Roboto', sans-serif" },
        { label: "Playfair Display", value: "'Playfair Display', serif" },
        { label: "Montserrat", value: "'Montserrat', sans-serif" },
        { label: "Maven Pro", value: "'Maven Pro', sans-serif" },
        { label: "Aleo", value: "'Aleo', serif" },
        { label: "Fascinate Inline", value: "'Fascinate Inline', cursive" },
        { label: "Libre Franklin", value: "'Libre Franklin', sans-serif" },
    ]

    const generateRandomColor = () => {
        // const randomColorCode = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        // setRandomColor({ ...randomColor, main: randomColorCode });
        setCount(count + 1);
        setTimeout(() => setLoader("Generating"), 100);
        setTimeout(() => setLoader("Generating."), 200);
        setTimeout(() => setLoader("Generating.."), 300);
        setTimeout(() => setLoader("Generating..."), 400);
        setTimeout(() => setLoader("Generating"), 500);
        setTimeout(() => setLoader("Generating."), 600);
        setTimeout(() => setLoader("Generating.."), 700);
        setTimeout(() => setLoader("Generating..."), 800);
        setTimeout(() => setLoader("Generating"), 900);
        setTimeout(() => setLoader("Generate"), 1000);
        setTimeout(() => setRandomColor(aiColorSet[count % (aiColorSet?.length)]), 1000);

    };

    useEffect(() => {
        setColour(randomColor);
    }, [randomColor]);


    return (
        <>

            <div className='border rounded-4 p-3 m-3'>
                <p>Customize your own color</p>
                <select className='w-100 mb-3 fw-500 p-2' onChange={(e) => setCurrentColor(e.target.value)}>
                    {
                        colors.map((color, key) => (
                            <option value={color?.value} key={key} >{color?.label}</option>
                        ))
                    }
                </select>

                {currentColor && (currentColor !== "secondary" ? <>
                    <input
                        type="color"
                        onChange={(e) => setRandomColor({ ...randomColor, [currentColor]: e.target.value })}
                        className='w-100'
                        value={randomColor[currentColor]}
                    />
                    <button onClick={onSave} className='btn bg-blue100 text-white fw-500 w-100 mt-3'>Save Theme</button>
                </> : <>
                    <div className='d-flex'>
                        <input
                            type="color"
                            onChange={(e) => setRandomColor({ ...randomColor, primary: e.target.value, primaryB: e.target.value + "10" })}
                            className='w-100'
                            value={randomColor["primary"]}
                        />
                        <input
                            type="color"
                            onChange={(e) => setRandomColor({ ...randomColor, secondary: e.target.value, secondaryB: e.target.value + "10" })}
                            className='w-100'
                            value={randomColor["secondary"]}
                        />
                        <input
                            type="color"
                            onChange={(e) => setRandomColor({ ...randomColor, tertiary: e.target.value, tertiaryB: e.target.value + "10" })}
                            className='w-100'
                            value={randomColor["tertiary"]}
                        />
                    </div>
                    <button onClick={onSave} className='btn bg-blue100 text-white fw-500 w-100 mt-3'>Save Theme</button>
                </>)}
            </div>

            <div className='border rounded-4 p-3 m-3'>
                <p>Choose your font</p>
                <select className='w-100 mb-3 fw-500 p-2' style={{fontFamily: currentFont}} onChange={(e) => setCurrentFont(e.target.value)}>
                    {
                        fonts.map((font, key) => (
                            <option style={{fontFamily: font?.value}} value={font?.value} key={key} >{font?.label}</option>
                        ))
                    }
                </select>

                {currentFont && <>
                    <button onClick={onFontSave} className='btn bg-blue100 text-white fw-500 w-100 mt-3'>Save Font</button>
                </>}
            </div>

            <div className='border rounded-4 p-3 m-3'>
                <p>Let's AI Generate your theme</p>
                <div className='d-flex flex-column'>
                    {isGenerated ? <button onClick={generateRandomColor} className='btn bg-blue100 text-white fw-500 ms-auto mt-3 w-100'>{loader}</button> :
                        <AIQuestion setAnswers={setAnswers} setIsGenerated={setIsGenerated} />}
                    <button onClick={onSave} className='btn bg-blue100 text-white fw-500 w-100 mt-3'>Save Theme</button>
                    <button onClick={setDefault} className='btn bg-blue100 text-white fw-500 w-100 mt-3'>Reset to default</button>
                </div>

                {/* temp */}
                {/* <button className='btn w-100 bg-yellow100 text-white my-3' onClick={(e) => handleCopy(e, JSON.stringify(randomColor))}>Copy</button> */}
                {/* temp */}
            </div>

        </>)
}

export default Theme