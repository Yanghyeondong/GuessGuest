import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 React Router의 네비게이션 훅 가져오기

const MainPage = () => {
  const navigate = useNavigate(); // 🔹 페이지 이동을 위한 훅 사용
  // const [guestHouses, setGuestHouses] = useState([]); // 초기값 0개
  const [guestHouses, setGuestHouses] = useState([
    { name: "Seoul Guesthouse", location: "서울", date: "2024-04-01" },
    { name: "Jeju Stay", location: "제주도", date: "2024-04-10" },
    { name: "Busan View", location: "부산", date: "2024-05-05" },
    { name: "Gangwon Retreat", location: "강원도", date: "2024-06-15" },
  ]);
  


  return (
    <div style={styles.mainContainer}>
      <h2 style={styles.sectionTitle}>Guess Your Trip</h2>
      <div style={styles.box}>
        {guestHouses.length === 0 ? (
          <p style={styles.message}>현재 예약 중인 게스트 하우스가 없습니다.</p>
        ) : (
          <div style={styles.listContainer}>
            {guestHouses.map((house, index) => (
              <div key={index} style={styles.guestHouseBox}>
                <h3>{house.name}</h3>
                <p>{house.location}</p>
                <p>{house.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 여행 찾으러 가기 버튼 클릭 시 StaticPage로 이동 */}
        <button style={styles.findTripButton} onClick={() => navigate("/HouseListPage")}>
          여행 찾으러 가기
        </button>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff9999",
    minHeight: "100vh",
    padding: "40px",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "70%",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
  },
  message: {
    fontSize: "18px",
    color: "#333",
  },
  listContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  guestHouseBox: {
    background: "#FFECEC",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    width: "90%",
  },
  findTripButton: {
    background: "#007bff",
    color: "white",
    padding: "12px 20px",
    width: "50%",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default MainPage;
