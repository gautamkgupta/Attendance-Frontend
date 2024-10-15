import React from "react";

const Profile = () => {
  return (
    <div className="users_table container">
      <div className="form_layout">
        <div className="pb-2">
          <h2 className="edit_att_header">Profile</h2>
        </div>
        <div className="user_pro_pic">
          <a href="/user/user-profile/edit-personal?profile=0">
            <img src="/images/default.jpeg" className="img-fluid" alt="" />
          </a>
          <h6>Gautam Gupta</h6>
          <p>Frontend Developer - Intern</p>
        </div>
        <div className="accordion" id="accordionExample2">
          {/* Add your accordion items here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
