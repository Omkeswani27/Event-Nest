import { NavLink } from "react-router-dom"

function Talk() {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Talk with AI and get your answers!</h1>
        <div className="row mt-5">
            <div className="col col-md-6">
                <h2 className="mt-5">Got a question?</h2><br></br>
               <h3>Ask our AI assistant for event details, seat availability, or recommendations—just type your query, and get instant answers!</h3>
            </div>
            <div className="col col-md-6">
        <img src="../../public/Images/ai.jpg" style={{height: "80%px", width: "80%"}}></img>
            </div>
        </div>
        <NavLink to='chatbot'>

        <button className="btn btn-success" style={{marginLeft: "160px"}}>Talk Now</button>
        </NavLink>
        </div>
    )
}

export default Talk
