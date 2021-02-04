export default function PlayableLines({onClick}) {
    const lines = ['A','B','C','D','E','F','G'];

    return (
        <div className="playableLine--wrapper">
            {lines.map(line => 
                <div className="playableLine" onClick={() => onClick(line+'0')} key={line}></div>
            )}
        </div>
    )
}

