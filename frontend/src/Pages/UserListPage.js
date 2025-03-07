import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { houseId } = location.state || {};
  const currentDate = new Date().toISOString().split("T")[0];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (!houseId) return;

    const fetchUsers = async () => {
      try {
        console.log(`🔄 유저 리스트 조회 중 (houseId: ${houseId}, date: ${currentDate})`);
        const response = await fetch(
          `http://localhost:9000/houses/user?houseId=${houseId}&date=${currentDate}`
        );

        if (!response.ok) throw new Error("유저 리스트를 불러오는데 실패했습니다.");

        const data = await response.json();
        console.log("✅ 유저 리스트 데이터:", data);
        setUsers(data);
      } catch (error) {
        console.error("❌ API 요청 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [houseId, currentDate]);

  const handleBack = () => {
    // navigate('/StaticPage');
    navigate(-1);
  };
  const handleReservation = () => {
    setModalVisible("reservation"); // 예약하기 모달 활성화
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };


  const handleModalOpen = (user, type) => {
    setSelectedUser(user);
    setModalVisible(type);
    setInputText("");
  };

  const handleModalClose = () => {
    setModalVisible(null);
    setSelectedUser(null);
    setInputText("");
  };
  const [inputTextSent, setInputTextSent] = useState(false);

  const handleSend = async () => {
    if (!selectedUser) return;
  
    const apiUrl =
      modalVisible === "dislike"
        ? "http://localhost:9000/users/report"
        : "http://localhost:9000/users/message";
  
    const payload = {
      userId: selectedUser.userId,
      message: inputText,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("전송에 실패했습니다.");
  
      setInputTextSent(true);
    } catch (error) {
      console.error("❌ 전송 오류:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Guess Your Mate</h1>
      <div style={styles.mainBox}>
      <button onClick={handleBack} style={styles.backButton}>
        ◁ 뒤로가기
        </button>

        <button style={styles.reserveButton} onClick={handleReservation}>예약하기</button>

        {/* <button onClick={() => navigate(-1)} style={styles.backButton}>◁ 뒤로가기</button> */}
        <div style={styles.userList}>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.userId} style={styles.userCard}>
                {/* <div style={styles.userImage}></div> */}
                <img 
                    src={`/user/user${(user.userId % 40%13 + 1).toString().padStart(2, '0')}.jpg`} 
                    alt="숙소 이미지" 
                    style={styles.userImage} 
                    onError={(e) => {
                      // JPG가 없으면 PNG로 변경, 그래도 없으면 기본 이미지
                      e.target.onerror = null; // 무한 루프 방지
                      e.target.src = `/user/user${(user.userId % 40%13 + 1).toString().padStart(2, '0')}.png`;
                      // e.target.onerror = (e) => e.target.src = "/house/default.jpg"; 
                    }}                   
                />

                
                <div style={styles.userInfo}>
                  <h3>{user.nickName} ({user.age}세)</h3>
                  <p>성별: {user.gender ? "남자" : "여자"}</p>
                  <p>MBTI: {user.mbti}</p>
                  <p>선호 음식: {user.food}</p>
                  <p>방문 목적: {user.visitPlace}</p>
                </div>
                <div style={styles.buttonContainer}>
                  <button style={styles.actionButton} onClick={() => handleModalOpen(user, "dislike")}>
                    별로에요
                  </button>
                  <button style={styles.actionButton} onClick={() => handleModalOpen(user, "message")}>
                    메세지 보내기
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noUserText}>이 숙소에 등록된 이용자가 없습니다.</p>
          )}
        </div>
      </div>
      {modalVisible && (
  <div style={styles.modal}>
    <div style={styles.modalContent}>
      {modalVisible === "reservation" && (
        <>
          <h2>예약 완료!</h2>
          <p>예약이 정상적으로 완료되었습니다.</p>
        </>
      )}

      {modalVisible === "dislike" && selectedUser && (
        <>
          {!inputTextSent ? (
            <>
              <h2>{selectedUser.nickName} 님의 어떤 점이 불만이었나요?</h2>
              <textarea
                style={styles.textarea}
                placeholder="여기에 입력하세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button style={styles.sendButton} onClick={handleSend}>
                전송
              </button>
            </>
          ) : (
            <>
              <h2>신고 감사합니다</h2>
              <p>신고가 정상적으로 접수되었습니다.</p>
            </>
          )}
        </>
      )}

      {modalVisible === "message" && selectedUser && (
        <>
          {!inputTextSent ? (
            <>
              <h2>{selectedUser.nickName} 님에게 메세지 보내기</h2>
              <textarea
                style={styles.textarea}
                placeholder="메세지를 입력하세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button style={styles.sendButton} onClick={handleSend}>
                전송
              </button>
            </>
          ) : (
            <>
              <h2>전송이 완료되었습니다</h2>
              <p>메세지가 정상적으로 전송되었습니다.</p>
            </>
          )}
        </>
      )}

      <button style={styles.closeButton} onClick={handleModalClose}>닫기</button>
    </div>
  </div>
)}


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
      // paddingTop: '20px', 
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
      height: '70%',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
      padding: '20px',
      overflow: 'hidden', 
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '25px',
      padding: "10px 20px",
      backgroundColor: '#007BFF', 
      color: '#FFFFFF',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    reserveButton: {
      position: 'absolute',
      top: '20px',
      right: '35px',
      padding: "10px 20px",
      // marginRight: "20px",
      // marginTop: "20px",
      backgroundColor: '#FF6666', 
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
      marginRight:"15PX",
      objectFit: "cover",  // ✅ 이미지가 영역에 맞게 잘리도록 설정
      overflow: "hidden",  // ✅ 테두리 밖 요소가 보이지 않도록 처리
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
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "center",
    },
    closeButton: {
      padding: "10px 20px",
      background: "#ff5733",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    
    textarea: { width: "100%", height: "80px", marginBottom: "10px" },
    sendButton: { padding: "10px 20px", background: "#007bff", color: "white", border: "1px #fff", borderRadius: "5px", cursor: "pointer" },
    cancelButton: { padding: "10px 20px", background: "#ff5733", color: "white",  border: "1px #fff",borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }
  };

export default UserListPage;
