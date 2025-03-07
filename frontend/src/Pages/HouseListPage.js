import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HouseListPage = () => {
  const navigate = useNavigate();
  const [sortStateMBTI, setSortStateMBTI] = useState("default");
  const [sortStateSolo, setSortStateSolo] = useState("default");
  const [sortStateGender, setSortStateGender] = useState("default");
  const [sortStateAge, setSortStateAge] = useState("default");
  const [aiRecommendation, setAiRecommendation] = useState(false); // AI 추천 상태 추가

  const [guestHouses, setGuestHouses] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("⚠ HouseListPage: userId가 저장되지 않음!");
    }
  }, []);



  // ✅ API에서 게스트 하우스 데이터를 가져오는 함수
  useEffect(() => {
    const fetchGuestHouses = async () => {
      try {
        console.log("🔄 숙소 정보 불러오는 중...");
        const response = await fetch("http://localhost:9000/houses?filter=전체");
        console.log("🟢 응답 상태:", response.status);

        if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

        const data = await response.json();
        console.log("✅ 불러온 데이터:", data);

        setGuestHouses(data);
      } catch (error) {
        console.error("❌ API 요청 오류:", error);
      }
    };

    fetchGuestHouses();
  }, []);


  const resetSortStates = () => {
    setSortStateMBTI("default");
    setSortStateSolo("default");
    setSortStateGender("default");
    setSortStateAge("default");
    setAiRecommendation(false); // AI 추천 비활성화

  };

  // ✅ AI 추천 기능
  // const handleAiRecommendation = async () => {
  //   resetSortStates();
  //   try {
  //     console.log("🤖 AI 추천 숙소 불러오는 중...");
  //     const response = await fetch("http://localhost:9000/houses/ai");
  //     console.log("🟢 AI 추천 응답 상태:", response.status);

  //     if (!response.ok) throw new Error("AI 추천 데이터를 불러오는데 실패했습니다.");

  //     const data = await response.json();
  //     console.log("✅ AI 추천 데이터:", data);

  //     setGuestHouses(data);
  //     setAiRecommendation(true);
  //   } catch (error) {
  //     console.error("❌ AI 추천 오류:", error);
  //   }
  // };
  const handleAiRecommendation = async () => {
    resetSortStates();
    
    // ✅ localStorage에서 유저 데이터 가져오기
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (!userData) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }
  
    try {
      console.log("🤖 AI 추천 숙소 불러오는 중...");
  
      // ✅ AI 추천 요청에 유저 정보 포함
      const response = await fetch("http://localhost:9000/houses/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),  // 🔥 유저 데이터를 함께 전송
      });


      console.log("JSON 받아오기");
      console.log(userData);
      console.log("JSON 받아오기");

      console.log("🟢 AI 추천 응답 상태:", response.status);
  
      if (!response.ok) throw new Error("AI 추천 데이터를 불러오는데 실패했습니다.");
  
      const data = await response.json();
      console.log("✅ AI 추천 데이터:", data);
  
      setGuestHouses(data);
      setAiRecommendation(true);
    } catch (error) {
      console.error("❌ AI 추천 오류:", error);
    }
  };
  

  // ✅ MBTI (비율 기준 정렬)
  const sortByMBTI = () => {
    resetSortStates();
    let sortedList;
    if (sortStateMBTI === "default") {
      sortedList = [...guestHouses].sort(
        (a, b) => (b.mbtiE / b.totalUser) - (a.mbtiE / a.totalUser)
      );
      setSortStateMBTI("asc");
    }
    else if (sortStateMBTI === "asc") {
      sortedList = [...guestHouses].sort(
        (a, b) => (a.mbtiE / a.totalUser) - (b.mbtiE / b.totalUser)
      );
      setSortStateMBTI("desc");
    } else {
      sortedList = [...guestHouses];
      setSortStateMBTI("default");
    }
    setGuestHouses(sortedList);
  };

  // ✅ 솔로 여부 (비율 기준 정렬)
  const sortBySolo = () => {
    resetSortStates();
    let sortedList;
    if (sortStateSolo === "default") {
      sortedList = [...guestHouses].sort(
        (a, b) => (b.solo / b.totalUser) - (a.solo / a.totalUser)
      );
      setSortStateSolo("asc");
    }
    else if (sortStateSolo === "asc") {
      sortedList = [...guestHouses].sort(
        (a, b) => (a.solo / a.totalUser) - (b.solo / b.totalUser)
      );
      setSortStateSolo("desc");
    } else {
      sortedList = [...guestHouses];
      setSortStateSolo("default");
    }
    setGuestHouses(sortedList);
  };

  // ✅ 성별 정렬 (기존 방식 유지)
  const sortByGender = () => {
    resetSortStates();
    let sortedList;
    if (sortStateGender === "default") {
      sortedList = [...guestHouses].sort((a, b) => b.female - a.female);
      setSortStateGender("asc");
    } 
    else if (sortStateGender === "asc") {
      sortedList = [...guestHouses].sort((a, b) => a.female - b.female);
      setSortStateGender("desc");
    } 
    else {
      sortedList = [...guestHouses];
      setSortStateGender("default");
    }
    setGuestHouses(sortedList);
  };

  // ✅ 연령대 정렬 (성별 정렬과 동일)
  const sortByAge = () => {
    resetSortStates();
    let sortedList;
    if (sortStateAge === "default") {
      sortedList = [...guestHouses].sort(
        (a, b) => (b.age20) - (a.age20)
      );
      setSortStateAge("20대");
    }
    else if (sortStateAge === "20대") {

      sortedList = [...guestHouses].sort(
        (a, b) => (b.age30) - (a.age30)
      );
      setSortStateAge("30대");
    }
    else if (sortStateAge === "30대") {
      sortedList = [...guestHouses].sort(
        (a, b) => (b.age40) - (a.age40)
      );
      setSortStateAge("40대");
    } else {
      sortedList = [...guestHouses];
      setSortStateAge("default");
    }
    setGuestHouses(sortedList);
  };

  // ✅ 숙소 상세 보기 페이지 이동
  const handleViewHouse = (id) => {
    navigate("/StaticPage", { state: { houseId: id } });
  };

  // ✅ 게스트 보기 페이지 이동
  const handleViewGuests = (id) => {
    navigate("/UserListPage", { state: { houseId: id } });
  };

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.pageTitle}>Guess Your Place</h1>

      <div style={styles.wrapperBox}>
        {/* 필터 버튼 */}
        <div style={styles.filterContainer}>
          <button style={styles.filterButton}>관광명소</button>
          <button style={styles.filterButton} onClick={sortByMBTI}>
            {sortStateMBTI === "asc"
              ? "MBTI E↑"
              : sortStateMBTI === "desc"
              ? "MBTI E↓"
              : "MBTI"}
          </button>
          <button style={styles.filterButton} onClick={sortByAge}>
            {sortStateAge === "20대"
              ? "20대 ↑"
              : sortStateAge === "30대"
              ? "30대 ↑"
              : sortStateAge === "40대"
              ? "40대 ↑"
              : "연령대"}
          </button>
          <button style={styles.filterButton} onClick={sortBySolo}>
            {sortStateSolo === "asc"
              ? "솔로 ↑"
              : sortStateSolo === "desc"
              ? "솔로 ↓"
              : "솔로"}
          </button>
          <button style={styles.filterButton} onClick={sortByGender}>
            {sortStateGender === "asc"
              ? "여자 ↑"
              : sortStateGender === "desc"
              ? "남자 ↑"
              : "성비"}
          </button>
          <button style={styles.AifilterButton} onClick={handleAiRecommendation}>
            {aiRecommendation ? "AI 추천 🔄" : "AI 추천 🤖"}
          </button>
        </div>

        {/* ✅ 리스트 영역에 스크롤 적용 */}
        <div style={styles.listContainer}>
          {guestHouses.length > 0 ? (
            guestHouses.map((house) => (
              <div key={house.houseId} style={styles.guestHouseBox}>
                <div style={styles.infoContainer}>
                  {/* ✅ houseId를 기반으로 이미지 적용 */}
                  <img 
                    src={`/house/house${(house.houseId % 20 + 1).toString().padStart(2, '0')}.jpg`} 
                    alt="숙소 이미지" 
                    style={styles.imagePlaceholder} 
                    onError={(e) => {
                      // JPG가 없으면 PNG로 변경, 그래도 없으면 기본 이미지
                      e.target.onerror = null; // 무한 루프 방지
                      e.target.src = `/house/house${(house.houseId % 20 + 1).toString().padStart(2, '0')}.png`;
                      // e.target.onerror = (e) => e.target.src = "/house/default.jpg"; 
                    }}                   />
                  <div style={styles.textInfo}>
                    <h3>{house.name}</h3>
                    <p>{house.place}</p>
                    <p>"{house.description}"</p>
                  </div>

                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleViewHouse(house.houseId)}
                    >
                      숙소보기
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleViewGuests(house.houseId)}
                    >
                      게스트보기
                    </button>
                    
                  </div>
                  
                </div>
                <div style={styles.statsGrid}>
                  <div>
                    MBTI: {((house.mbtiE / house.totalUser) * 100).toFixed(1)}%
                  </div>
                  <div>
                    주 연령대:{" "}
                    {house.age20 > house.age30 && house.age20 > house.age40
                      ? "20대"
                      : house.age30 > house.age40
                      ? "30대"
                      : "40대"}
                  </div>
                  <div>
                    솔로: {((house.solo / house.totalUser) * 100).toFixed(1)}%
                  </div>
                  <div>
                    성비: 남 {house.male} / 여 {house.female}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.loadingText}>숙소 정보를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};



// ✅ 스타일 적용 (스크롤 정상 적용)
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FF9999",
    minHeight: "100vh",
  },
  pageTitle: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: "10px",
  },
  wrapperBox: {
    background: "#fff",
    width: "80%",
    padding: "20px",
    borderRadius: "15px",
    maxHeight: "600px", // ✅ 고정 높이 설정
    overflowY: "auto", // ✅ 내부에 스크롤 적용
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  filterButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    background: "#fff",
    border: "1px",

    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  AifilterButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    border: "1px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  listContainer: {
    maxHeight: "500px", // ✅ 스크롤이 생길 높이 설정
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  guestHouseBox: {
    background: "#FFECEC",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  // imagePlaceholder: {
  //   width: "50px",
  //   height: "50px",
  //   borderRadius: "50%",
  //   backgroundColor: "#ccc",
  // },
  imagePlaceholder: {
    marginTop:"30px",
    marginBottom:"-30px",
    
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",  // ✅ 이미지가 영역에 맞게 잘리도록 설정
    overflow: "hidden",  // ✅ 테두리 밖 요소가 보이지 않도록 처리
  },
  textInfo: { textAlign: "center", flex: 1 },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "40px",
    marginLeft: "-30px",
  },
  actionButton: {
    padding: "8px 36px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    width: "60%",
    textAlign: "center",
    marginTop: "10px",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default HouseListPage;
