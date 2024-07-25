import './LandingPage.css'
import { NavLink } from 'react-router-dom'
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { RiPushpinFill } from "react-icons/ri";
import { GiMagnifyingGlass } from "react-icons/gi";


function LandingPage() {
    return (
        <div className="landing-body-container">
            <section className="section1">
                <p className="h1-text-container">Tame your work, <br />organize your life</p>
            </section>
            <section className="section1-plus">
                <p className="sub-text-container">Remember everything and tackle any project with your notes, <br />
                    tasks, and schedule all in one place.</p>
            </section>
            <section className="landing-section2">
                <NavLink to="/signup">
                    <button className="start-for-free-button">Start for free</button>
                </NavLink>
            </section>
            <section className="landing-section3">
                <div className="column">
                    <FaMapMarkerAlt className='map-marker-icon' />
                    <p className="column-text">Work<br /> anywhere</p>
                    <p className="column-sub-text">Keep important info<br /> handy—your notes<br /> sync automatically to<br /> all your devices.</p>
                </div>
                <div className="column">
                    <RiPushpinFill className="thumbtack-icon" />
                    <p className="column-text">Remember<br /> everything</p>
                    <p className="column-sub-text">Make notes more<br /> useful by adding text,<br /> images, audio, scans,<br /> PDFs, and documents.</p>
                </div>
                <div className="column">
                    <FaCheck className="check-icon" />
                    <p className="column-text">Turn to-do<br /> into done</p>
                    <p className="column-sub-text">Bring your notes, tasks,<br /> and schedules together<br /> to get things done<br /> more easily.</p>
                </div>
                <div className="column">
                    <GiMagnifyingGlass className="magnifying-glass-icon" />
                    <p className="column-text">Find things<br /> fast</p>
                    <p className="column-sub-text">Get what you need,<br /> when you need it with<br /> powerful and flexible<br /> search capabilities.</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
