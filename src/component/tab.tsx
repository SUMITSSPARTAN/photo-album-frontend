import { useState, useRef, type CSSProperties } from 'react'
import PhotoGrid from './photoGrid';

type ResizeDirection =
    | 'right'
    | 'left'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

function Css(
    position: { x: number; y: number },
    dimensions: { width: number; height: number }
): {
    TabCss: CSSProperties;
    tabHeader: CSSProperties;
    tabControl: CSSProperties;
    tabButton: CSSProperties;
    tabHeading: CSSProperties;
} {
    return {
        TabCss: {
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            overflow: 'hidden',
        },

        tabHeader: {
            display: 'flex',
            height: '30px',
            width: '100%',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            userSelect: 'none',
        },

        tabHeading: {
            fontSize: '14px',
            color: '#333',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '10px',
        },

        tabControl: {
            paddingRight: '7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: '4px',
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
        }
    }
}

export default function Tab({
    heading,
    id,
    newTab
}: {
    heading: string;
    id: string;
    newTab: (id: string, active: boolean, heading: string) => void
}) {

    const componentRef = useRef<HTMLDivElement | null>(null);

    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300;

    const [view, setView] = useState({
        isFullScreen: false,
        symbol: '⛶',
        prevDimensions: {
            width: 900,
            height: 600,
            x: 200,
            y: 100
        }
    });

    const [dimensions, setDimensions] = useState({
        width: 900,
        height: 600
    });

    const [position, setPosition] = useState({
        x: 200,
        y: 100
    });

    const fullScreen = () => {
        if (!view.isFullScreen) {
            setView({
                isFullScreen: true,
                symbol: '『』',
                prevDimensions: {
                    width: dimensions.width,
                    height: dimensions.height,
                    x: position.x,
                    y: position.y
                }
            });

            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });

            setPosition({
                x: 0,
                y: 0
            });

        } else {

            setView((prev) => ({
                ...prev,
                isFullScreen: false,
                symbol: '⛶'
            }));

            setDimensions({
                width: view.prevDimensions.width,
                height: view.prevDimensions.height
            });

            setPosition({
                x: view.prevDimensions.x,
                y: view.prevDimensions.y
            });
        }
    };

    const startDrag = (e: React.MouseEvent) => {

        if (view.isFullScreen) return;

        const startX = e.clientX;
        const startY = e.clientY;

        const initialX = position.x;
        const initialY = position.y;

        const onMouseMove = (e: MouseEvent) => {
            setPosition({
                x: initialX + (e.clientX - startX),
                y: initialY + (e.clientY - startY)
            });
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const startResize = (
        e: React.MouseEvent,
        direction: ResizeDirection
    ) => {

        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;

        const startWidth = dimensions.width;
        const startHeight = dimensions.height;

        const startPosX = position.x;
        const startPosY = position.y;

        const onMouseMove = (e: MouseEvent) => {

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            let newX = startPosX;
            let newY = startPosY;

            if (direction.includes('right')) {
                newWidth = Math.max(MIN_WIDTH, startWidth + dx);
            }

            if (direction.includes('left')) {
                newWidth = Math.max(MIN_WIDTH, startWidth - dx);

                if (newWidth > MIN_WIDTH) {
                    newX = startPosX + dx;
                }
            }

            if (direction.includes('bottom')) {
                newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
            }

            if (direction.includes('top')) {
                newHeight = Math.max(MIN_HEIGHT, startHeight - dy);

                if (newHeight > MIN_HEIGHT) {
                    newY = startPosY + dy;
                }
            }

            setDimensions({
                width: newWidth,
                height: newHeight
            });

            setPosition({
                x: newX,
                y: newY
            });
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const {
        TabCss,
        tabHeader,
        tabControl,
        tabButton,
        tabHeading
    } = Css(position, dimensions);

    const resizeHandle = (
        direction: ResizeDirection,
        style: CSSProperties
    ) => (
        <div
            onMouseDown={(e) => startResize(e, direction)}
            style={{
                position: 'absolute',
                ...style,
                zIndex: 2000
            }}
        />
    );

    return (
        <div style={TabCss} ref={componentRef}>

            <div style={tabHeader} onMouseDown={startDrag}>
                <h1 style={tabHeading}>{heading}</h1>

                <div style={tabControl}>
                    <button
                        style={tabButton}
                        onClick={fullScreen}
                    >
                        {view.symbol}
                    </button>

                    <button
                        style={tabButton}
                        onClick={() => newTab(id, false, heading)}
                    >
                        X
                    </button>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <h1>Tab</h1>
            </div>

            <PhotoGrid totalItems={[{}, {}, {}, {}, {}, {}, {}, {}]} />

            {/* RIGHT */}
            {resizeHandle('right', {
                right: 0,
                top: 0,
                width: '6px',
                height: '100%',
                cursor: 'ew-resize',
            })}

            {/* LEFT */}
            {resizeHandle('left', {
                left: 0,
                top: 0,
                width: '6px',
                height: '100%',
                cursor: 'ew-resize',
            })}

            {/* TOP */}
            {resizeHandle('top', {
                top: 0,
                left: 0,
                width: '100%',
                height: '6px',
                cursor: 'ns-resize',
            })}

            {/* BOTTOM */}
            {resizeHandle('bottom', {
                bottom: 0,
                left: 0,
                width: '100%',
                height: '6px',
                cursor: 'ns-resize',
            })}

            {/* TOP LEFT */}
            {resizeHandle('top-left', {
                top: 0,
                left: 0,
                width: '12px',
                height: '12px',
                cursor: 'nwse-resize',
            })}

            {/* TOP RIGHT */}
            {resizeHandle('top-right', {
                top: 0,
                right: 0,
                width: '12px',
                height: '12px',
                cursor: 'nesw-resize',
            })}

            {/* BOTTOM LEFT */}
            {resizeHandle('bottom-left', {
                bottom: 0,
                left: 0,
                width: '12px',
                height: '12px',
                cursor: 'nesw-resize',
            })}

            {/* BOTTOM RIGHT */}
            {resizeHandle('bottom-right', {
                bottom: 0,
                right: 0,
                width: '12px',
                height: '12px',
                cursor: 'nwse-resize',
            })}
        </div>
    )
}
