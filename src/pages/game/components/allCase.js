import React from 'react'
import Case from './Case'
import PlayableLines from './playableLines';

export function allNumber(number) {
    let allNumber = []
    for(let i = 0; i<number ; i++) {
        allNumber.push(i)
    }

    return allNumber;
}

export function AllCase({ onClick, gameValue }) {
    const caseVerifyed = []

    if(gameValue.moves.length>0){
        gameValue.moves.forEach(move => {
            if(move.player === gameValue.host.id) {
                caseVerifyed.push({
                    case : move.value,
                    value : 'host'
                });
            }
            if(move.player === gameValue.opponent.id) {
                caseVerifyed.push({
                    case : move.value,
                    value : 'opponent'
                });
            }
        });
    }
    function allNumber(number) {
        let result = [];
        for(let i = 0; i<number; i++) {
            result.push(i)
        }
        return result
    }

    const allCase = allNumber(42);

    return <>
            {allCase.map((theCase, i) => 
                <div className="gameContainer__case" key={i}>
                    <div className="gameContainer__case__interior"></div>
                </div>
            )}
            {caseVerifyed.map((actualCase) => 
                <Case actualCase={actualCase} key={actualCase.case}/>
            )}
            <PlayableLines onClick={onClick}/>
        </>
}
