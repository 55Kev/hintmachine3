
import TimerComponent from "./TimerComponent.jsx";

export default function Timer({
    datedepart,
    render
}) {

    if (datedepart == null) return;

    if (!render) return;
    
    const now = new Date();
    const depart = new Date(datedepart);

    var dif = depart.getTime() - now.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.floor(Math.abs(Seconds_from_T1_to_T2));

    const renderTimer = () => {
        return (
            <div className="timer">
                    <TimerComponent startTime={Seconds_Between_Dates} />
            </div>
        );
    };

    return renderTimer();
}