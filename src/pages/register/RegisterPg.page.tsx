import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { register } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./RegisterPg.module.scss";
import townSquareLogo from "./assets/townSquareLogo.svg";

const Register = () => {
  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
    age: 0,
    location: "",
    gender: "",
  });
  const { setSignUpStatus, setCerror, cerror } = useContext(LoginContext);
  const [registerStatus, setRegisterStatus] = useState(false);
  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);
  const handleChange = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "age") {
      value = parseInt(value);
    }

    setPerson({ ...person, [name]: value });
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    let missing_fields = [];
    for (const [key, value] of Object.entries(person)) {
      console.log(`${key}: ${value}`);
      if (!value) {
        missing_fields.push(key);
      }
    }

    if (missing_fields.length != 0) {
      let missings = "";
      missing_fields.forEach((element) => {
        missings += `,${element} `;
      });
      setCerror(`Please fill all fields, these are missing: ${missings}.`);
      // window.alert(`Pleaes fill all fields, these are missing: ${missings}.`);
    } else {
      const user_obj = {
        username: person.username,
        email: person.email,
        password: person.password,
        age: person.age,
        location: person.location,
        gender: person.gender,
      };
      register(user_obj, (err: Error, result: any) => {
        if (err) {
          console.log(err);
          setCerror(err.message);
        } else {
          setSignUpStatus(true);
          setRegisterStatus(true);
          // history.push("/");
        }
      });
    }
  };

  const ageArr = [];
  for (let i = 1; i <= 100; i++) {
    ageArr.push(i);
  }
  return (
    <>
      {cerror && <Error message={cerror} />}
      <div className={styles.card}>
        <div className={styles.backgroundSquare}>
          <br></br>
          <br></br>
          <img
            className={styles.logo}
            id="logo"
            src={townSquareLogo}
            alt="TownSquareLogo"
          ></img>
          <h1 className="signUpTitle" style={{ marginBottom: 0 }}>
            Sign Up
          </h1>
          <a
            href={`${process.env.REACT_APP_URL}/help`}
            style={{
              color: "white",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Help
          </a>
          {registerStatus ? (
            <div>
              <h1>
                Registration success, please check your email for verification
                link
              </h1>
            </div>
          ) : (
            <article className="form">
              <form>
                <div className={"form-control"}>
                  <input
                    className={styles.inputForm}
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Create a username"
                    value={person.username}
                    maxLength={20}
                    onChange={handleChange}
                  />
                  <div className="form-control">
                    <input
                      className={styles.inputForm}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Please enter your email"
                      value={person.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <input
                      className={styles.inputForm}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={person.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control" style={{ marginTop: "5px" }}>
                    <div
                      className="flex"
                      style={{ margin: "auto", width: "230px" }}
                    >
                      <label htmlFor="age">Age&nbsp;</label>

                      <select
                        name="age"
                        onChange={handleChange}
                        // value={person.age}
                        style={{ width: "100%" }}
                        required
                      >
                        <option key="0"></option>
                        {ageArr.map((year) => {
                          return <option key={year}>{year}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-control" style={{ marginTop: "5px" }}>
                    <div
                      className="flex"
                      style={{ margin: "auto", width: "230px" }}
                    >
                      <label htmlFor="location">Location&nbsp;</label>
                      <select
                        name="location"
                        onChange={handleChange}
                        // value={person.location}
                        style={{ width: "100%" }}
                        required
                      >
                        <option value=""></option>
                        <option value="Surrey">Surrey</option>
                        <option value="Burnaby">Burnaby</option>
                        <option value="Coquitlam">Coquitlam</option>
                        <option value="Richmond">Richmond</option>
                        <option value="Vancouver">Vancouver</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-control" style={{ marginTop: "5px" }}>
                    <div
                      className="flex"
                      style={{ margin: "auto", width: "230px" }}
                    >
                      <label htmlFor="gender">Gender&nbsp;</label>
                      <select
                        name="gender"
                        onChange={handleChange}
                        // value={person.gender}
                        style={{ width: "100%" }}
                        required
                      >
                        <option value=""></option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <button
                className={styles.registerButton}
                type="submit"
                onClick={handleRegister}
              >
                Sign Up
              </button>
            </article>
          )}
        </div>
        <div className={styles.loginButtonContainer}>
          <p className={styles.alreadyHaveAccount}>Already have an account?</p>
          <Link className={styles.backToSignUp} to="/">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
