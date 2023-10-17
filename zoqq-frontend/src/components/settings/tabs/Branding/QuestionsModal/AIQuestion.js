import React, { useEffect, useState } from 'react'

function AIQuestion({setAnswers, setIsGenerated}) {

    const [isLight, setIsLight] = useState(true);
    const [colors, setColors] = useState([]);


    useEffect(() => {
        setAnswers({isLight, colors})
    }, [isLight, colors])

    return (
        <>
            <div
                className="modal fade"
                id="AIQuestion"
                aria-hidden="true"
                aria-labelledby="AIQuestionLabel"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AIQuestionLabel">
                                Answer Few Question for better theme
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />

                        </div>
                        <div className="modal-body">
                            Do you like light theme or dark theme?



                        </div>
                        <div className="modal-footer">
                            <div className='d-flex flex-fill'>
                                <button className='btn bg-blue10 blue100 w-100 mx-2 fw-500' data-bs-target="#AIQuestion2"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                    onClick={() => setIsLight(true)}
                                >Light</button>
                                <button className='btn bg-blue100 text-white w-100 mx-2 fw-500' data-bs-target="#AIQuestion2"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                    onClick={() => setIsLight(false)}
                                >Dark</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="AIQuestion2"
                aria-hidden="true"
                aria-labelledby="AIQuestionLabel2"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AIQuestionLabel2">
                                Answer Few Question for better theme
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            Choose the desired colors

                            <div className='d-flex'>
                                <div role='button' onClick={()=>setColors({...colors, black: !colors?.black})} className={'m-2 w-25 border p-3 text-center text-white bg-dark border-3 ' + ((colors?.black || colors?.any) ? "border-danger" : "")}>Black</div>
                                <div role='button' onClick={()=>setColors({...colors, blue: !colors?.blue})} className={'m-2 w-25 border p-3 text-center text-white bg-primary border-3 ' + ((colors?.blue || colors?.any) ? "border-danger" : "")}>Blue</div>
                                <div role='button' onClick={()=>setColors({...colors, green: !colors?.green})} className={'m-2 w-25 border p-3 text-center text-white bg-success border-3 ' + ((colors?.green || colors?.any) ? "border-danger" : "")}>Green</div>
                                <div role='button' onClick={()=>setColors({...colors, brown: !colors?.brown})} style={{background: "#964B00"}} className={'m-2 w-25 border p-3 text-center text-white border-3 ' + ((colors?.brown || colors?.any) ? "border-danger" : "")}>Brown</div>
                                <div role='button' onClick={()=>setColors({...colors, any: !colors?.any})} className={'m-2 w-25 border p-3 text-center text-white bg-info border-3 ' + ((colors?.any) ? "border-danger" : "")}>Any</div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <div className='d-flex flex-fill'>
                                <button
                                    className='btn bg-yellow100 text-white fw-500 ms-auto mt-3 w-100 mx-2'
                                    data-bs-target="#AIQuestion"
                                    data-bs-toggle="modal"
                                    data-bs-dismiss="modal"
                                >
                                    Back to first
                                </button>
                                <button
                                    className='btn bg-blue100 text-white fw-500 ms-auto mt-3 w-100 mx-2'
                                    type="button"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={()=>setIsGenerated(true)}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <a
                className='btn bg-blue100 text-white fw-500 ms-auto mt-3 w-100'
                data-bs-toggle="modal"
                href="#AIQuestion"
                role="button"
            >
                Generate
            </a>
        </>

    )
}

export default AIQuestion