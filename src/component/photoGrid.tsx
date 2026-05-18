import { type CSSProperties } from "react";
const gridCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.5rem',
    border: '2px solid',
    margin: '2%',
    paddingLeft: '1%',
    paddingRight:'1%'
}

const itemCSS: CSSProperties = {
    display: 'flex',
    // margin: '10px',
    minWidth: 100,
}

const internalElements: CSSProperties = {
    display: 'flex',
    width: '100%',
    border: '2px solid'
}
export default function PhotoGrid({ totalItems }: { totalItems: {}[] }) {
    return (
        <div style={gridCSS}>
            {totalItems.map((_, i) => (
                <div style={itemCSS} key={i}>
                    <div style={internalElements}>{i}</div>
                </div>
            ))}
        </div>
    );
}