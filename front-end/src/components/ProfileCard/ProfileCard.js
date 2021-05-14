
import React, { useEffect } from "react";
import * as AuthorizationAction from "../../redux/reducers/userReducer";
import { connect } from "react-redux";


const ProfileCard = ({ dispatch }) => {
  useEffect(() => {
    dispatch(AuthorizationAction.addInfo({ userName: "test", userEmail: "test@test.ru" }));
  }, []);

  return (
    <>
      <div className="profile-nav col-md-3">
        <div className="panel">
          <div className="user-heading round">
            <a href="#">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
            </a>
            <h1>Camila Smith</h1>
            <p>deydey@theEmail.com</p>
          </div>
          <ul className="nav nav-pills nav-stacked">
            <li className="active">
              <a href="#">
                {" "}
                <i className="fa fa-user"></i> Profile
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <i className="fa fa-calendar"></i> Recent Activity{" "}
                <span className="label label-warning pull-right r-activity">
                  9
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <i className="fa fa-edit"></i> Edit profile
              </a>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(ProfileCard);