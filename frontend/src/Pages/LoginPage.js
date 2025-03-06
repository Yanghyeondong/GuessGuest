import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../Image/logo.png'; 

const LoginPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/MainPage'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
        <p style={styles.slogan}>여행에서 인연을 찾으세요</p>
        <div style={{ ...styles.leftImage, backgroundImage: `url(${logo})` }}>
        </div>
      </div>
      <div style={styles.rightContainer}>
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Guess Me</h2>
          <form style={styles.form}>
            <label htmlFor="phone" style={styles.label}>
              전화번호
            </label>
            <input
              type="text"
              id="phone"
              placeholder="010-0000-0000"
              style={styles.input}
            />
            <label htmlFor="password" style={styles.label}>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <button type="button" style={styles.signupButton}>
                회원가입
              </button>
              <button type="button" onClick={handleLogin} style={styles.loginButton}>
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#FF9999', 
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  slogan: {
    fontSize: '20px', 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginBottom: '20px', 
  },
  leftImage: {
    width: '400px', 
    height: '400px', 
    backgroundSize: 'contain', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  loginBox: {
    backgroundColor: '#FFECEC', 
    borderRadius: '10px',
    padding: '20px',
    height: '450px', 
    width: '350px', 
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#FF9999',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '300px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000000', 
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '93%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonContainer: {
    marginTop:'10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  signupButton: {
    flexGrow: 1,
    marginRight: '10px',
    padding: '10px',
    backgroundColor: '#007BFF', 
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  loginButton: {
    flexGrow: 1,
    padding: '10px',
    backgroundColor: '#007BFF', 
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LoginPage;
