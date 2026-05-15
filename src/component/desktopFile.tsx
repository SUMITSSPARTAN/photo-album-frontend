import type { CSSProperties } from 'react'
import allImages from '../assets/ChatGPT Image May 14, 2026, 12_38_31 PM.png'
import favourite from '../assets/favourites.png'
import myAlbums from '../assets/My_Albums.png'
import trash from '../assets/trash.png'
import Logo from './logo'


const desktopFileStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'start',
    gap: '1rem'
}

export default function DesktopFile({ toggleTab }: { toggleTab: (value: boolean) => void }) {
    const files = [
        { id: 'all-images', name: 'All Images', image: allImages },
        { id: 'favourites', name: 'Favourites', image: favourite },
        { id: 'my-albums', name: 'My Albums', image: myAlbums },
        { id: 'trash', name: 'Trash', image: trash },
    ]


    return (
        <div className="desktop-file" style={desktopFileStyle}>
            {files.map(file => {
                return <Logo key={file.name} image={file.image} name={file.name} toggleTab={toggleTab} />
            })}
        </div>
    )
}
