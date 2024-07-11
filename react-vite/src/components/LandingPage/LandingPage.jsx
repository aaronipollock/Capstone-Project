import './LandingPage.css'
import { NavLink } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';


function LandingPage() {
    return (
        <div className="body-container">
            <section className="section1">
                <p className="h1-text-container">Tame your work, <br />organize your life</p>
            </section>
            <section className="section1-plus">
                <p className="sub-text-container">Remember everything and tackle any project with your notes, <br />
                    tasks, and schedule all in one place.</p>
            </section>
            <section className="section2">
                <NavLink to="/signup">
                    <button className="nav-button sign-up-button">Start for free</button>
                </NavLink>
            </section>
            <section className="section3">
                <div className="column">
                    <i className="fas fa-map-marker-alt"></i>
                    <p className="column-text">Work<br /> anywhere</p>
                    <p className="column-sub-text">Keep important info<br /> handy—your notes<br /> sync automatically to<br /> all your devices.</p>
                </div>
                <div className="column">
                    <i className="fas fa-thumbtack"></i>
                    <p className="column-text">Remember<br /> everything</p>
                    <p className="column-sub-text">Make notes more<br /> useful by adding text,<br /> images, audio, scans,<br /> PDFs, and documents.</p>
                </div>
                <div className="column">
                    <i className="fas fa-check"></i>
                    <p className="column-text">Turn to-do<br /> into done</p>
                    <p className="column-sub-text">Bring your notes, tasks,<br /> and schedules together<br /> to get things done<br /> more easily.</p>
                </div>
                <div className="column">
                    <i className="fas fa-search"></i>
                    <p className="column-text">Find things<br /> fast</p>
                    <p className="column-sub-text">Get what you need,<br /> when you need it with<br /> powerful and flexible<br /> search capabilities.</p>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
