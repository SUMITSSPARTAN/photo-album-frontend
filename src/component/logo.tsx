import type { CSSProperties } from 'react'

type LogoProps = {
    id: string
    image: string
    name: string
    isOpen: boolean
}

const logoStyle: CSSProperties = {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'column',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.1rem',
}

const textStyle: CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#674805dd',
    fontFamily: 'Arial, sans-serif',
    height: '2rem',
}

const logoImageStyle: CSSProperties = {
    height: '150px',
    alignContent: 'center',
}

export default function Logo({id, image, name, isOpen, newTab }: LogoProps & { newTab:(id: string,active:boolean, heading:string)=> void }) {
    return (
        <div style={logoStyle} onClick={() => { newTab(id, !isOpen, name)}}>
            <img src={image} alt={`${name} logo`} style={logoImageStyle} />
            <span style={textStyle}>{name}</span>
        </div>
    )
}
