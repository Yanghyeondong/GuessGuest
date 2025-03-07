import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Image/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);


  const handleComplete = async () => {
    try {
      const response = await fetch("http://localhost:9000/users", {//url 쏠 대 localhost로 쏴야 cors 문제 안생김
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // CORS 문제 방지

        body: JSON.stringify({
          nickName: userData.nickname,
          birthDate: userData.birthdate,
          gender: userData.gender === "여자", // API는 Boolean으로 받음 (여자 → true)
          isSolo: userData.isSolo === "Yes", // Boolean 변환
          mbti: userData.mbti,
          food: userData.food,
        }),
      });
      console.log("완료버튼 눌림");
      if (!response.ok) throw new Error("회원가입 실패");
  
      const data = await response.json();
      console.log("회원가입 성공:", data);
  
      localStorage.setItem("userId", data.userId);
    
  
      navigate("/MainPage");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };


  const [userData, setUserData] = useState({
    nickname: "",
    birthdate: "",
    gender: "여자",
    isSolo: "Yes",
    mbti: "I",
    food: "중식",
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSelection = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  // const handleComplete = () => {
  //   console.log("User Data:", userData);
  //   navigate("/MainPage");
  // };

  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
        <p style={styles.slogan}>여행에서 인연을 찾으세요</p>
        <div style={{ ...styles.leftImage, backgroundImage: `url(${logo})` }} />
      </div>
      <div style={styles.rightContainer}>
        {!showUserInfoForm ? (
          <div style={styles.loginBox}>
            <h2 style={styles.title}>Guess Me</h2>
            <form style={styles.form}>
              <label htmlFor="phone" style={styles.label}>전화번호</label>
              <input type="text" id="phone" placeholder="010-0000-0000" style={styles.input} />
              <label htmlFor="password" style={styles.label}>비밀번호</label>
              <input type="password" id="password" placeholder="비밀번호" style={styles.input} />
              <div style={styles.buttonContainer}>
                <button type="button" style={styles.signupButton}>회원가입</button>
                <button type="button" onClick={() => setShowUserInfoForm(true)} style={styles.loginButton}>로그인</button>
              </div>
            </form>
          </div>
        ) : (
          <div style={styles.rightContainer}>
          <div style={styles.signupBox}>
            <h2 style={styles.title}>Guess Me</h2>
            <p style={styles.subtitle}>지금의 나는 어떤 사람인가요?</p>
  
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>닉네임</label>
                <input
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={userData.nickname}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>생년월일</label>
                <input
                  type="date"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </div>
  
            <div style={styles.inputRow}>
              <div style={styles.optionGroup}>
                <label style={styles.label}>성별</label>
                <div style={styles.toggleGroup}>
                  {['남자', '여자'].map((option) => (
                    <button
                      key={option}
                      style={userData.gender === option ? styles.selectedButton : styles.button}
                      onClick={() => handleSelection('gender', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div style={styles.optionGroup}>
                <label style={styles.label}>솔로</label>
                <div style={styles.toggleGroup}>
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      style={userData.isSolo === option ? styles.selectedButton : styles.button}
                      onClick={() => handleSelection('isSolo', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            <div style={styles.inputRow}>
              <div style={styles.optionGroup}>
                <label style={styles.label}>MBTI</label>
                <div style={styles.toggleGroup}>
                  {['E', 'I'].map((option) => (
                    <button
                      key={option}
                      style={userData.mbti === option ? styles.selectedButton : styles.button}
                      onClick={() => handleSelection('mbti', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div style={styles.optionGroup}>
                <label style={styles.label}>선호 음식</label>
                <div style={styles.toggleGroup}>
                  {['Korean', 'Chinese', 'Japanese'].map((option) => (
                    <button
                      key={option}
                      style={userData.food === option ? styles.selectedButton : styles.button}
                      onClick={() => handleSelection('food', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => {
  console.log("✅ 완료 버튼 클릭됨");
  handleComplete();
}} style={styles.completeButton}>완료</button>
            {/* <button onClick={handleComplete} style={styles.completeButton}>완료완료</button> */}
          </div>
        </div>
        )}
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
    marginLeft:"100px",
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  slogan: {
    fontSize: '32px', 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginBottom: '-100px', 
    marginTop:"50px",
  },
  leftImage: {
    width: '500px', 
    height: '500px', 
    backgroundSize: 'contain', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  rightContainer: {
    marginRight: "100px",
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
  signupBox: { 
    marginRight: "-100px",

    backgroundColor: '#FFECEC', 
    padding: '20px',
    borderRadius: "10px", 
    width: "350px", 
    height: '450px', 
    textAlign: "center", 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',

    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" 
  },

  title: {
    fontSize: '24px',
    color: '#FF9999',
    marginBottom: '20px',
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
    pageTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: '10px',
  },
  form: {
    width: '100%',
    maxWidth: '300px',
  },

  input: {
    width: '93%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  userInfoBox: { backgroundColor: '#FFECEC', borderRadius: '10px', padding: '20px', width: '350px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' },
  optionContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' },
  optionButton: { padding: '8px 16px', border: '1px solid #ccc', borderRadius: '5px', background: '#FFF', cursor: 'pointer' },

  subtitle: { fontSize: "18px", color: "#000000", fontWeight: "bold", marginBottom: "20px" },
  inputRow: { display: "flex", justifyContent: "space-between", marginBottom: "15px" },
  inputGroup: { width: "48%" },
  label: { fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "5px" },
  optionGroup: { width: "48%" },
  toggleGroup: { display: "flex", justifyContent: "space-between" },
  button: { fontSize: "12px",padding: "8px 16px", borderRadius: "5px", background: "#FFF", border: "1px solid #ccc", cursor: "pointer",height: "40px", width: "48%" },

  selectedButton: { fontSize: "12px",padding: '8px 16px', borderRadius: '5px', background: '#FF7777', border: "1px solid #ccc", color: '#FFF', cursor: 'pointer',height: "40px", width: "48%" },
  completeButton: { width: "100%", padding: "10px", background: "#007BFF", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "15px" }};

export default LoginPage;
