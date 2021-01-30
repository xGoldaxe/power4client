export default function TimeBlock({time, timeSelected, onClick}) {
    return (
        <div 
            onClick={()=>onClick(time)}
            className={timeSelected === time ? 
            "pvGame__create__timeContainer__block pvGame__create__timeContainer__block__selected"
            : "pvGame__create__timeContainer__block"
        }>{time}</div>
    )
}