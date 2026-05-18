import { useState, useRef, type CSSProperties } from 'react'
import PhotoGrid from './photoGrid';
function Css(position: { x: number; y: number }, dimensions: { width: string; height: string }): { TabCss: CSSProperties; tabHeader: CSSProperties; tabControl: CSSProperties; tabButton: CSSProperties; tabHeading: CSSProperties } {
    return {
        TabCss: {
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: dimensions.width,
            height: dimensions.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
        },
        tabHeader: {
            display: 'flex',
            height: '30px',
            width: '100%',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },

        tabHeading: {
            fontSize: '14px',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
        },

        tabControl: {
            flex: 1,
            paddingRight: '7px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '0.8px',
        },

        tabButton: {
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            border: 'none',
            color: '#333',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
}

export default function Tab({ heading, id, newTab }: { heading: string; id: string; newTab: (id: string, active: boolean, heading: string) => void }) {
    const componentRef = useRef<HTMLDivElement | null>(null)
    const [view, setView] = useState({ isFullScreen: false, symbol: '⛶', prevDimensions: { width: "900px", height: "600px", x: 200, y: 300 } });
    const [dimensions, setDimensions] = useState({ width: "900px", height: "600px" });
    const [position, setPosition] = useState({ x: 200, y: 300 })
    const fullScreen = (doFullScreen: boolean, width: string, height: string, x: number, y: number) => {
        if (doFullScreen) {
            setView({ isFullScreen: true, symbol: '『』', prevDimensions: { width: width, height: height, x: x, y: y } });
            return setDimensions({ width: "100%", height: "100%" }), setPosition({ x: 0, y: 0 })
        }
        else {
            setView({ isFullScreen: false, symbol: '⛶', prevDimensions: { width: width, height: height, x: x, y: y } });
            return setDimensions({ width: view.prevDimensions.width, height: view.prevDimensions.height }), setPosition({ x: view.prevDimensions.x, y: view.prevDimensions.y });
        };
    }
    const { TabCss, tabHeader, tabControl, tabButton, tabHeading } = Css(position, dimensions)
    return (
        <div style={TabCss} ref={componentRef}>
            <div style={tabHeader} onMouseDown={(e) => {
                const startX = e.clientX;
                const startY = e.clientY;
                const initialX = position.x;
                const initialY = position.y;

                const onMouseMove = (e: MouseEvent) => {
                    const newX = initialX + (e.clientX - startX);
                    const newY = initialY + (e.clientY - startY);
                    setPosition({ x: newX, y: newY });
                };

                const onMouseUp = () => {
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                };

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            }
            } ><div style={tabHeader}>
                    <div>
                        <h1 style={tabHeading}>{heading}</h1>
                    </div>
                    <div style={tabControl}>
                        <button style={tabButton} onClick={() => fullScreen(view.isFullScreen ? false : true, view.prevDimensions.width, view.prevDimensions.height, view.prevDimensions.x, view.prevDimensions.y)}>{view.symbol}</button>
                        <button style={tabButton} onClick={() => newTab(id, false, heading)}>X</button>
                    </div>
                </div>
            </div>
            <div><h1>Tab</h1></div>
            <PhotoGrid totalItems={[{},{},{},{},{},{},{},{}]}/>
        </div >
    )
}
