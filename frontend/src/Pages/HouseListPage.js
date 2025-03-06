import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Tooltip, ArcElement, CategoryScale, LinearScale);

const HouseListPage = () => {
  const navigate = useNavigate();
  const [sortStateMBTI, setSortStateMBTI] = useState("default");
  const [sortStateSolo, setSortStateSolo] = useState("default");
  const [sortStateGender, setSortStateGender] = useState("default");
  const [sortStateAge, setSortStateAge] = useState("default");

  const [guestHouses, setGuestHouses] = useState([
    {
      id: 1,
      name: "SDS 게스트 하우스",
      location: "경기도 양평군",
      description: "게스트들과 즐기는 불멍🔥",
      totalGuests: 10,
      mbtiE: 6,
      mbtiI: 4,
      ageGroups: { 20: 4, 30: 5, 40: 1 },
      soloYes: 7,
      soloNo: 3,
      genderRatio: { 남자: 6, 여자: 4 },
    },
    {
      id: 2,
      name: "힐링 게스트하우스",
      location: "강원도 강릉시",
      description: "바다가 보이는 힐링 숙소 🌊",
      totalGuests: 8,
      mbtiE: 2,
      mbtiI: 6,
      ageGroups: { 20: 2, 30: 3, 40: 3 },
      soloYes: 5,
      soloNo: 3,
      genderRatio: { 남자: 3, 여자: 5 },
    },
  ]);

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

  // 숙소보기 버튼 클릭 시 StaticPage로 이동
  const handleViewHouse = (id) => {
    navigate("/StaticPage", { state: { houseId: id } });
  };

  // 게스트보기 버튼 클릭 시 UserListPage로 이동
  const handleViewGuests = (id) => {
    navigate("/UserListPage", { state: { houseId: id } });
  };

  return (
    <div style={styles.mainContainer}>
      <h2 style={styles.sectionTitle}>Guess Your Place</h2>

      <div style={styles.wrapperBox}>
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

        <div style={styles.listContainer}>
          {guestHouses.map((house) => (
            <div key={house.id} style={styles.guestHouseBox}>
              <div style={styles.infoContainer}>
                <div style={styles.imagePlaceholder}></div>

                <div style={styles.textInfo}>
                  <h3>{house.name}</h3>
                  <p>{house.location}</p>
                  <p>"{house.description}"</p>
                </div>

                <div style={styles.buttonContainer}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleViewHouse(house.id)}
                  >
                    숙소보기
                  </button>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleViewGuests(house.id)}
                  >
                    게스트보기
                  </button>
                </div>
              </div>

              <div style={styles.statsGrid}>
                <div>
                  MBTI: {((house.mbtiE / house.totalGuests) * 100).toFixed(1)}%
                </div>
                <div>
                  연령대:{" "}
                  {Object.keys(house.ageGroups).reduce((a, b) =>
                    house.ageGroups[a] > house.ageGroups[b] ? a : b
                  )}
                  대
                </div>
                <div>
                  솔로: {((house.soloYes / house.totalGuests) * 100).toFixed(1)}%
                </div>
                <div>
                  성비: 남 {house.genderRatio.남자} / 여 {house.genderRatio.여자}
                </div>
              </div>
            </div>
          ))}
        </div>
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
    padding: "40px",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
  },
  wrapperBox: {
    background: "#fff",
    width: "80%",
    padding: "20px",
    borderRadius: "15px",
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
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
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
    marginTop:"40px",
    marginLeft:"-30px",
  },
  actionButton: {
    padding: "8px 36px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop:"20px",
    // marginBottom:"50px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    width: "60%",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default HouseListPage;
