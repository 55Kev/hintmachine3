
import TimerComponent from "./TimerComponent.jsx";

export default function Timer({
    datedepart
}) {

    if (datedepart == null) return;
    
    const now = new Date();
    const depart = new Date(datedepart);

    var dif = depart.getTime() - now.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.floor(Math.abs(Seconds_from_T1_to_T2));

    const renderTimer = () => {
        return (
            <div className="hero timer">
                <div className="hero-content">
                    <TimerComponent startTime={Seconds_Between_Dates}
                    />
                </div>
            </div>
        );
    };

    return renderTimer();
}