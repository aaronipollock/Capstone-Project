import './LandingPage.css'
import { NavLink } from 'react-router-dom'
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { RiPushpinFill } from "react-icons/ri";
import { GiMagnifyingGlass } from "react-icons/gi";


function LandingPage() {
    return (
        <div className="landing-body-container">
            <section className="section1">
                <p className="h1-text-container">Turn much ado <br />to much accomplished</p>
            </section>
            <section className="section1-plus">
                <p className="sub-text-container">Recall all things and undertake each task with thy notes,<br />
                duties, and appointed hours all bound as one.</p>
            </section>
            <section className="landing-section2">
                <NavLink to="/signup">
                    <button className="start-for-free-button">Commence,<br /> and pay no fee!</button>
                </NavLink>
            </section>
            <section className="landing-section3">
                <div className="column">
                    <FaMapMarkerAlt className='map-marker-icon' />
                    <p className="column-text">Toil in any place</p>
                    <p className="column-sub-text">Keep thy vital knowledge close—thy notes doth sync with all thy devices anon.</p>
                </div>
                <div className="column">
                    <RiPushpinFill className="thumbtack-icon" />
                    <p className="column-text">Recall all things</p>
                    <p className="column-sub-text">Enrich thy notes by adding text, images, scans, PDFs, and documents.</p>
                </div>
                <div className="column">
                    <FaCheck className="check-icon" />
                    <p className="column-text">Complete thy tasks</p>
                    <p className="column-sub-text">Gather thy notes, duties, and hours as one to finish thy deeds with ease.</p>
                </div>
                <div className="column">
                    <GiMagnifyingGlass className="magnifying-glass-icon" />
                    <p className="column-text">Find what thou seek&apos;st</p>
                    <p className="column-sub-text">Obtain what thou need&apos;st, when thou need&apos;st it, with nimble means of search.</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
