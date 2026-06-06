import { useState } from "react";

function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="main-content">
      <header>
        <div className="header-title">
          <h1>Account Settings</h1>
          <p>Manage your profile, security, and app preferences</p>
        </div>
      </header>

      <div className="settings-grid">
        <aside className="settings-nav">
          <button
            className={`s-nav-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fa fa-user-circle" /> Profile
          </button>
          <button
            className={`s-nav-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <i className="fa fa-shield-alt" /> Security
          </button>
          <button
            className={`s-nav-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <i className="fa fa-bell" /> Notifications
          </button>
          <hr />
          <button
            className={`s-nav-btn danger ${activeTab === "danger" ? "active" : ""}`}
            onClick={() => setActiveTab("danger")}
          >
            <i className="fa fa-trash-alt" /> Delete Account
          </button>
        </aside>

        <section className="settings-view-card">
          <div
            id="profile"
            className="tab-content"
            style={{ display: activeTab === "profile" ? "block" : "none" }}
          >
            <h3>Public Profile</h3>
            <div className="profile-header">
              <div className="avatar-edit">
                <img
                  src="https://ui-avatars.com/api/?name=Mbah+Divine&background=6c5ce7&color=fff"
                  className="avatar-xl"
                  alt="Mbah Divine"
                />
                <button className="btn-icon-float">
                  <i className="fa fa-camera" />
                </button>
              </div>
              <div className="profile-meta">
                <h4>Mbah Divine</h4>
                <p>Student at University of Buea</p>
              </div>
            </div>

            <form className="grid-form">
              <div className="form-group">
                <label>Username</label>
                <input type="text" defaultValue="mbah_divine237" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="divine.hnd@student.cm" />
              </div>
              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  rows="3"
                  defaultValue="Final year HND student focusing on Software Engineering. Love organizing my tasks!"
                />
              </div>
              <button type="submit" className="btn-primary">
                Update Profile
              </button>
            </form>
          </div>

          <div
            id="security"
            className="tab-content"
            style={{ display: activeTab === "security" ? "block" : "none" }}
          >
            <h3>Security Settings</h3>
            <form className="grid-form">
              <div className="form-group full-width">
                <label>Current Password</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" />
              </div>
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </form>

            <div className="two-factor-box">
              <div className="tf-info">
                <i className="fa fa-key" />
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <p>Add an extra layer of security to your account.</p>
                </div>
              </div>
              <button className="btn-outline">Enable</button>
            </div>
          </div>

          <div
            id="notifications"
            className="tab-content"
            style={{
              display: activeTab === "notifications" ? "block" : "none",
            }}
          >
            <h3>Notification Settings</h3>
            <p>Configure how you get notified about tasks and deadlines.</p>
          </div>

          <div
            id="danger"
            className="tab-content"
            style={{ display: activeTab === "danger" ? "block" : "none" }}
          >
            <h3>Delete Account</h3>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="btn-danger">Delete My Account</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Setting;
