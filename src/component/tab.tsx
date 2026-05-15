import { useState, useRef, type CSSProperties } from 'react'
function Css(position: { x: number; y: number }, isOpen: boolean): { TabCss: CSSProperties; tabHeader: CSSProperties; tabControl: CSSProperties; tabButton: CSSProperties; tabHeading: CSSProperties } {
    return {
        TabCss: {
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: '900px',
            height: '600px',
            display: isOpen ? 'flex' : 'none',
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
            height: '25px',
            width: '100%',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },

        tabHeading: {
            fontSize: '14px',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            alignSelf: 'center',
        },

        tabControl: {
            flex: 1,
            width: '100%',
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

fullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();    
    }
    else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
} 
export default function Tab({ isOpen, toggleTab }: { isOpen: boolean; toggleTab: (value: boolean) => void }) {
    const componentRef = useRef<HTMLDivElement | null>(null)
    const [position, setPosition] = useState({ x: 200, y: 300 });
    const { TabCss, tabHeader, tabControl, tabButton, tabHeading } = Css(position, isOpen)

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
                        <h1 style={tabHeading}>All Images</h1>
                    </div>
                    <div style={tabControl}>
                        <button style={tabButton}>-</button>
                        <button style={tabButton}onClick={() => fullScreen()}>⛶</button>
                        <button style={tabButton} onClick={() => toggleTab(false)}>X</button>
                    </div>
                </div>
            </div>
            <div><h1>Tab</h1></div>
        </div >
    )
}
