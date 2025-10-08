// import "./Footer.css"
// function Footer() {
//     return (
//         <div>
//             <div id="contact" className="contact-area section-padding footer">
// 	<div className="container">										
// 		<div className="section-title text-center">
// 			<h1>Get in Touch</h1>
// 			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis dignissim. Aenean vitae metus in augue pretium ultrices.</p>
// 		</div>					
// 		<div className="row">
// 			<div className="col-lg-7">	
// 				<div className="contact">
// 					<form className="form" name="enq" method="post">
// 						<div className="row">
// 							<div className="form-group col-md-6">
// 								<input type="text" name="name" className="form-control" placeholder="Name" required="required" />
// 							</div>
// 							<div className="form-group col-md-6">
// 								<input type="email" name="email" className="form-control" placeholder="Email" required="required" />
// 							</div>
// 							<div className="form-group col-md-12">
// 								<input type="text" name="subject" className="form-control mt-4" placeholder="Subject" required="required" />
// 							</div>
// 							<div className="form-group col-md-12">
// 								<textarea rows="6" name="message" className="form-control" placeholder="Your Message" required="required"></textarea>
// 							</div>
// 							<div className="col-md-12 text-center">
// 								<button type="submit" value="Send message" name="submit" id="submitButton" className="btn btn-contact-bg btn-primary mt-3" title="Submit Your Message!">Send Message</button>
// 							</div>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 			<div className="col-lg-5">
// 				<div className="single_address">
// 					<i className="fa fa-map-marker"></i>
// 					<h4>Our Address</h4>
// 					<p>3481 Melrose Place, Beverly Hills</p>
// 				</div>
// 				<div className="single_address">
// 					<i className="fa fa-envelope"></i>
// 					<h4>Send your message</h4>
// 					<p>Info@example.com</p>
// 				</div>
// 				<div className="single_address">
// 					<i className="fa fa-phone"></i>
// 					<h4>Call us on</h4>
// 					<p>(+1) 517 397 7100</p>
// 				</div>
// 				<div className="single_address">
// 					<i className="fa fa-clock-o"></i>
// 					<h4>Work Time</h4>
// 					<p>Mon - Fri: 08.00 - 16.00. Sat: 10.00 - 14.00</p>
// 				</div>					
// 			</div>
// 		</div>
// 	</div>
// </div>
//         </div>
//     )
// }

// export default Footer



import axios from 'axios';
import { useState } from 'react';
import "./Footer.css";

function Footer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error state
        setSuccess(null);  // Reset success state

        try {
            // Send a POST request to the newsletter endpoint
            const response = await axios.post('http://localhost:8000/api/newsletter/', {
                name,
                email,
                subject,
                message
            });

            // Assuming the success message is returned in this format
            setSuccess(response.data.message); 
        } catch (err) {
            // Handle errors appropriately
            if (err.response) {
                // If the error response exists, set the error state to the error message from the server
                setError(err.response.data.detail || "An error occurred while subscribing.");
            } else {
                // Generic error message for network errors
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            <div id="contact" className="contact-area section-padding footer">
                <div className="container">										
                    <div className="section-title text-center">
                        <h1>Get in Touch</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae risus nec dui venenatis dignissim. Aenean vitae metus in augue pretium ultrices.</p>
                    </div>					
                    <div className="row">
                        <div className="col-lg-7">	
                            <div className="contact">
                                <form className="form" onSubmit={handleSubmit} method='post'>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="form-control" 
                                                placeholder="Name" 
                                                required 
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input 
                                                type="email" 
                                                name="email" 
                                                className="form-control" 
                                                placeholder="Email" 
                                                required 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                className="form-control mt-4" 
                                                placeholder="Subject" 
                                                required 
                                                value={subject} 
                                                onChange={(e) => setSubject(e.target.value)} 
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <textarea 
                                                rows="6" 
                                                name="message" 
                                                className="form-control" 
                                                placeholder="Your Message" 
                                                required 
                                                value={message} 
                                                onChange={(e) => setMessage(e.target.value)} 
                                            ></textarea>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <button 
                                                type="submit" 
                                                className="btn btn-contact-bg btn-primary mt-3" 
                                                title="Submit Your Message!"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {error && <div className="error">{error}</div>}
                                {success && <div className="success">{success}</div>}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="single_address">
                                <i className="fa fa-map-marker"></i>
                                <h4>Our Address</h4>
                                <p>3481 Melrose Place, Beverly Hills</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-envelope"></i>
                                <h4>Send your message</h4>
                                <p>Info@example.com</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-phone"></i>
                                <h4>Call us on</h4>
                                <p>(+1) 517 397 7100</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-clock-o"></i>
                                <h4>Work Time</h4>
                                <p>Mon - Fri: 08.00 - 16.00. Sat: 10.00 - 14.00</p>
                            </div>					
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;