import type { CSSProperties } from 'react'

type LogoProps = {
    image: string
    name: string
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

export default function Logo({ image, name, toggleTab }: LogoProps & { toggleTab: (value: boolean) => void }) {
    return (
        <div style={logoStyle} onClick={() => { toggleTab(true) }}>
            <img src={image} alt={`${name} logo`} style={logoImageStyle} />
            <span style={textStyle}>{name}</span>
        </div>
    )
}
