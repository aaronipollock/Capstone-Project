import Sidebar from '../Sidebar/Sidebar'
import './UserPage.css'
function UserPage() {
    return (
        <>
        <Sidebar />
        <div className="user-page-container">
            <div>
                <p className="ready">Ready to start taking notes?</p>
                <h1 className="h1-user-page">Your Home</h1>
            </div>
        </div>
        </>
    )
}

export default UserPage
