import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const UserListPage = () => {
  const navigate = useNavigate();


  const handleBack = () => {
    navigate('/StaticPage');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Guess Your Mate</h1>

      <div style={styles.mainBox}>
        <button onClick={handleBack} style={styles.backButton}>
          뒤로가기
        </button>

        <button style={styles.reserveButton}>예약하기</button>

        <div style={styles.userList}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} style={styles.userCard}>
              <div style={styles.userImage}></div>
              <div style={styles.userInfo}>
                <h3 style={styles.userName}>User Name</h3>
                <p style={styles.userDetails}>MBTI: ENTP, 선호음식: 양식, 나이: 20대, 솔로여부: 예</p>
              </div>
              <div style={styles.buttonContainer}>
                <button style={styles.actionButton}>별로네요</button>
                <button style={styles.actionButton}>메세지 보내기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FF9999', 
    paddingTop: '20px', 
  },
  pageTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: '10px',
  },
  mainBox: {
    position: 'relative',
    width: '80%',
    maxWidth: '800px',
    height: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    padding: '20px',
    overflow: 'hidden', 
  },
  backButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '8px',
    backgroundColor: '#FF6666', 
    color: '#FFFFFF',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  reserveButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px',
    backgroundColor: '#007BFF', 
    color: '#FFFFFF', 
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  userList: {
    marginTop: '50px', // 타이틀과 버튼 영역 제외한 간격
    height: 'calc(100% - 70px)', // 타이틀과 버튼 영역 제외한 높이
    overflowY: 'auto',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#FFECEC', 
  },
  userImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%', 
    backgroundColor:'#CCCCCC' , 
marginRight:"15PX"
},
userInfo:{
flexGrow:"1",
},
userName:{
fontSize:"18PX",
fontWeight:"BOLD",
},
userDetails:{
fontSize:"14PX",
color:"#555555",
marginBottom:"10PX",
},
buttonContainer:{
display:"FLEX",
flexDirection:"COLUMN",
gap:"10PX"
},
actionButton:{
width:"120PX",
padding:"10PX",
borderRadius:"8PX",background:"#FFF" , 
border:"#DDD solid "
}
};

export default UserListPage;
