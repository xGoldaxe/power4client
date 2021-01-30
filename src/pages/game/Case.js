import { motion } from 'framer-motion';

function lineValue(line) {
    const allLetter = ['A','B','C','D','E','F','G'];
    return allLetter.findIndex(letter => letter === line);
}

export default function Case({actualCase}) {
    let typeOfCase = '';
    if(actualCase.value === 'host') {
        typeOfCase = 'pawn__interior__host'
    } else {
        typeOfCase = 'pawn__interior__opponent'
    }

    const xValue = lineValue(actualCase.case[0]) * 100 + '%';
    const yValue = parseInt(actualCase.case[1]) * -100 + '%';

    return (
        <motion.div 
            className='pawn'
            initial={{ 
                x: xValue,
                y: '-700%'
            }}
            animate={{
                x : xValue,
                y: yValue
            }}
            transition={{
                duration: 0.3,
                ease: 'easeIn'
            }}
        >
            <div className={'pawn__interior ' + typeOfCase}>
            </div>
        </motion.div>
    )
}