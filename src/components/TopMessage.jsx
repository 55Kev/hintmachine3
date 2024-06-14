export default function TopMessage({
    render,
    message
}) {

    if (!render) return;

    console.log ("message dans TopMessage:"+message)
    
    const renderTopMessage = () => {
        return (
            <div className="hero topMessage">
                <div className="hero-content">
                    {message}
                </div>
            </div>
        );
    };

    return renderTopMessage();
}