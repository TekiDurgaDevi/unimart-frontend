import { useEffect, useState } from "react";
import "../styles/profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProfile("NOT_LOGGED_IN");
      return;
    }

    const storedProfile = JSON.parse(localStorage.getItem("profile"));

    const defaultProfile = {
      name: "UniMart User",
      email: "user@unimart.com",
      createdAt: new Date().toISOString(),
      totalProducts: 0,
      activeListings: 0,
    };

    const finalProfile = storedProfile || defaultProfile;

    setProfile(finalProfile);
    setName(finalProfile.name);
  }, []);

  const handleSave = () => {
    const updatedProfile = { ...profile, name };
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setEditName(false);
  };

  if (profile === "NOT_LOGGED_IN") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#C49012",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Please login to view your profile
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#C49012",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading profile...
      </div>
    );
  }

  return (
    <section
      className="profile-page"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1743951433926-a0f5958f03af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="profile-card">
        <h1>My Profile</h1>

        <div className="profile-row">
          <span>Name</span>
          {editName ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p>{profile.name}</p>
          )}
          <button onClick={editName ? handleSave : () => setEditName(true)}>
            {editName ? "Save" : "Edit"}
          </button>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <p className="locked">{profile.email}</p>
        </div>

        <div className="profile-row">
          <span>Member since</span>
          <p>{new Date(profile.createdAt).toDateString()}</p>
        </div>

        <hr />
      </div>
    </section>
  );
}

export default Profile;
