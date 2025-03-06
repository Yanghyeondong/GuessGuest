import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HouseListPage = () => {
  const navigate = useNavigate();
  const [sortStateMBTI, setSortStateMBTI] = useState("default");
  const [sortStateSolo, setSortStateSolo] = useState("default");
  const [sortStateGender, setSortStateGender] = useState("default");
  const [sortStateAge, setSortStateAge] = useState("default");

  // ✅ 더미데이터 제거하고 초기값을 빈 배열로 설정
  const [guestHouses, setGuestHouses] = useState([]);

  //정렬
  
  const sortByMBTI = () => {
    let sortedList;
    setSortStateMBTI(
      sortStateMBTI === "default"
        ? "asc"
        : sortStateMBTI === "asc"
        ? "desc"
        : "default"
    );
    setSortStateSolo("default");
    setSortStateGender("default");
    setSortStateAge("default");

    if (sortStateMBTI === "asc") {
      sortedList = [...guestHouses].sort(
        (a, b) => a.mbtiE / a.totalGuests - b.mbtiE / b.totalGuests
      );
    } else if (sortStateMBTI === "desc") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.mbtiE / b.totalGuests - a.mbtiE / a.totalGuests
      );
    } else {
      sortedList = [...guestHouses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    setGuestHouses(sortedList);
  };

  const sortBySolo = () => {
    let sortedList;
    setSortStateSolo(
      sortStateSolo === "default"
        ? "asc"
        : sortStateSolo === "asc"
        ? "desc"
        : "default"
    );
    setSortStateMBTI("default");
    setSortStateGender("default");
    setSortStateAge("default");

    if (sortStateSolo === "asc") {
      sortedList = [...guestHouses].sort(
        (a, b) => a.soloYes / a.totalGuests - b.soloYes / b.totalGuests
      );
    } else if (sortStateSolo === "desc") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.soloYes / b.totalGuests - a.soloYes / a.totalGuests
      );
    } else {
      sortedList = [...guestHouses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    setGuestHouses(sortedList);
  };

  const sortByGender = () => {
    let sortedList;
    setSortStateGender(
      sortStateGender === "default"
        ? "asc"
        : sortStateGender === "asc"
        ? "desc"
        : "default"
    );
    setSortStateMBTI("default");
    setSortStateSolo("default");
    setSortStateAge("default");

    if (sortStateGender === "asc") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.genderRatio.여자 - a.genderRatio.여자
      );
    } else if (sortStateGender === "desc") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.genderRatio.남자 - a.genderRatio.남자
      );
    } else {
      sortedList = [...guestHouses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    setGuestHouses(sortedList);
  };

  const sortByAge = () => {
    let sortedList;
    setSortStateAge(
      sortStateAge === "default"
        ? "20"
        : sortStateAge === "20"
        ? "30"
        : sortStateAge === "30"
        ? "40"
        : "default"
    );
    setSortStateMBTI("default");
    setSortStateSolo("default");
    setSortStateGender("default");

    if (sortStateAge === "20") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.ageGroups["20"] - a.ageGroups["20"]
      );
    } else if (sortStateAge === "30") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.ageGroups["30"] - a.ageGroups["30"]
      );
    } else if (sortStateAge === "40") {
      sortedList = [...guestHouses].sort(
        (a, b) => b.ageGroups["40"] - a.ageGroups["40"]
      );
    } else {
      sortedList = [...guestHouses].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    setGuestHouses(sortedList);
  };






  // ✅ API에서 게스트 하우스 데이터를 가져오는 함수
  useEffect(() => {
    const fetchGuestHouses = async () => {
      try {
        console.log("🔄 숙소 정보 불러오는 중..."); // 요청 시작 로그
  
        const response = await fetch("http://localhost:9000/houses?filter=전체"); // API 요청
        console.log("🟢 응답 상태:", response.status); // 응답 상태 확인
  
        if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
  
        const data = await response.json(); // JSON 변환
        console.log("✅ 불러온 데이터:", data); // 응답 데이터 출력
  
        setGuestHouses(data); // 상태 업데이트
      } catch (error) {
        console.error("❌ API 요청 오류:", error);
      }
    };
  
    fetchGuestHouses();
  }, []);
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

      {/* <div style={styles.wrapperBox}>
        <div style={styles.listContainer}> */}



        <div style={styles.wrapperBox}>
        <div style={styles.filterContainer}>
        {/* <div style={styles.listContainer}>  */}

          <button style={styles.filterButton}>관광명소</button>
          <button style={styles.filterButton} onClick={sortByMBTI}>
            {sortStateMBTI === "asc"
              ? "MBTI E↑"
              : sortStateMBTI === "desc"
              ? "MBTI E↓"
              : "MBTI"}
          </button>
          <button style={styles.filterButton} onClick={sortByAge}>
            {sortStateAge === "20"
              ? "20대 ↑"
              : sortStateAge === "30"
              ? "30대 ↑"
              : sortStateAge === "40"
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
              ? "남자 ↑"
              : sortStateGender === "desc"
              ? "여자 ↑"
              : "성비"}
          </button>
        </div>

          
          {guestHouses.length > 0 ? (
            guestHouses.map((house) => (
              <div key={house.houseId} style={styles.guestHouseBox}>
                <div style={styles.infoContainer}>
                  <div style={styles.imagePlaceholder}></div>

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
        {/*</div>{/*이거*/}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FF9999",
    minHeight: "100vh",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
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
    minHeight: "500px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  listContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  guestHouseBox: {
    background: "#FFECEC",
    marginBottom:"10px",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  imagePlaceholder: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
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
  filterButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
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
