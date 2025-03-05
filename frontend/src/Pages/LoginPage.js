import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import logo from '../Image/logo.png'; // GUESSGUEST 로고 이미지 경로

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 초기화

  // 로그인 버튼 클릭 시 MainPage로 이동
  const handleLogin = () => {
    navigate('/MainPage'); // MainPage로 이동
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 영역 */}
      <div style={styles.leftContainer}>
        <p style={styles.slogan}>여행에서 인연을 찾으세요</p>
        <div style={{ ...styles.leftImage, backgroundImage: `url(${logo})` }}>
          {/* GUESS GUEST 로고 */}
        </div>
      </div>

      {/* 오른쪽 로그인 박스 */}
      <div style={styles.rightContainer}>
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Guess Me</h2>
          <form style={styles.form}>
            {/* 전화번호 입력 */}
            <label htmlFor="phone" style={styles.label}>
              전화번호
            </label>
            <input
              type="text"
              id="phone"
              placeholder="010-0000-0000"
              style={styles.input}
            />
            {/* 비밀번호 입력 */}
            <label htmlFor="password" style={styles.label}>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              style={styles.input}
            />
            {/* 버튼 */}
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

// 스타일 정의 (생략 가능)

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#FF9999', // 전체 배경색
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
  },
  slogan: {
    fontSize: '20px', // 문구 크기
    fontWeight: 'bold', // Bold 적용
    color: '#FFFFFF', // 흰색 텍스트 색상
    marginBottom: '20px', // 로고와 간격 조정
  },
  leftImage: {
    width: '400px', // 로고 너비 (크기 키움)
    height: '400px', // 로고 높이 (크기 키움)
    backgroundSize: 'contain', // 이미지 크기 유지
    backgroundRepeat: 'no-repeat', // 반복 없음
    backgroundPosition: 'center', // 중앙 정렬
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', // 가로 중앙 정렬
    alignItems: 'center', // 세로 중앙 정렬
  },
  loginBox: {
    backgroundColor: '#FFECEC', // 박스 배경색
    borderRadius: '10px',
    padding: '20px',
    height: '450px', // 박스 높이
    width: '350px', // 박스 너비 (고정)
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // 약간의 그림자 추가
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // 내부 콘텐츠 세로 정렬
    alignItems: 'center', // 내부 콘텐츠 가로 정렬
  },
  title: {
    fontSize: '24px',
    color: '#FF9999', // 제목 색상
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '300px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000000', // 검정색 글씨
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
    backgroundColor: '#007BFF', // 파란색 버튼
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
