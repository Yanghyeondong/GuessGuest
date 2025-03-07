import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Tooltip, ArcElement, CategoryScale, LinearScale);

const StaticPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { houseId } = location.state || {}; // HouseListPage에서 넘긴 houseId 가져오기

  const [modalVisible, setModalVisible] = useState(false); // 예약 완료 모달 상태

  const currentDate = new Date().toLocaleDateString();

  const userStats = {
    gender: { male: 60, female: 40 },
    mbti: { E: 80, I: 20 },
    solo: { yes: 70, no: 30 },
    foodPreference: { korean: 50, japanese: 30, chinese: 20 },
    ageRange: { "20s": 40, "30s": 35, "40s": 25 },
  };


  const [houseStats, setHouseStats] = useState({
    totalUser: 0,
    male: 0,
    female: 0,
    korean: 0,
    japanese: 0,
    chinese: 0,
    mbtiE: 0,
    mbtiI: 0,
    age20: 0,
    age30: 0,
    age40: 0,
    solo: 0,
    notSolo: 0,
  });

  // ✅ 숙소 통계 API 요청

  useEffect(() => {
  if (!houseId) return;

  const fetchHouseStats = async () => {
    try {
      // ✅ 날짜를 YYYY-MM-DD 형식으로 변환
      const formattedDate = new Date().toISOString().split("T")[0]; 
      console.log(`🔄 숙소 통계 조회 중 (houseId: ${houseId}, date: ${formattedDate})`);

      // ✅ URL 인코딩 적용
      const apiUrl = `http://localhost:9000/houses/stat?houseId=${encodeURIComponent(houseId)}&date=${encodeURIComponent(formattedDate)}`;
      console.log("📌 API 요청 URL:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("🟢 응답 상태:", response.status);

      if (!response.ok) throw new Error("숙소 통계를 불러오는데 실패했습니다.");

      const data = await response.json();
      console.log("✅ 숙소 통계 데이터:", data);

      setHouseStats(data);
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
    }
  };

  fetchHouseStats();
}, [houseId]);


  // 파이차트트
  const getChartData = (data, colors) => ({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });

  const handleBackButton = () => {
    // navigate('/HouseListPage'); 
    navigate(-1);
  };

  const handleReservation = () => {
    setModalVisible(true); 
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.dateBox}>
        <button style={styles.dateButton}>◀</button>
        <span style={styles.dateText}>{currentDate}</span>
        <button style={styles.dateButton}>▶</button>
      </div>

      <div style={styles.statsBox}>
        <div style={styles.backButtonContainer}>
          <button style={styles.backButton} onClick={handleBackButton}>
            ◁ 뒤로가기
          </button>
        </div>

        <h2 style={styles.statsTitle}>이용자 통계</h2>

        <div style={styles.statItem}>
          <div style={styles.statLabel}>성별</div>
          <div style={styles.statGauge}>
            <div
              style={{
                width: `${houseStats.male*10}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${houseStats.female*10}%`,
                backgroundColor: "#FF9999",
                height: "30px",
              }}
            ></div>
          </div>
        </div>

        <div style={styles.statItem}>
          <div style={styles.statLabel}>MBTI</div>
          <div style={styles.statGauge}>
            <div
              style={{
                width: `${houseStats.mbtiE*10}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${houseStats.mbtiI*10}%`,
                backgroundColor: "#FF9999",
                height: "30px",
              }}
            ></div>
          </div>
        </div>

        <div style={styles.statItem}>
          <div style={styles.statLabel}>솔로 여부</div>
          <div style={styles.statGauge}>
            <div
              style={{
                width: `${houseStats.solo*10}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${houseStats.notSolo*10}%`,
                backgroundColor: "#FF9999",
                height: "30px",
              }}
            ></div>
          </div>
        </div>
        <div style={styles.chartContainer}>
          <div style={styles.statItem}>
            <div style={styles.statLabel}>선호 음식</div>
            <Pie
              data={getChartData(
                { 한식: houseStats.korean, 중식: houseStats.chinese, 일식: houseStats.japanese },
                ["#FFCC99", "#FF9999", "#99CCFF"]
              )}
              options={{ responsive: false, maintainAspectRatio: true, cutoutPercentage: 70 }}
            />

          </div>

          <div style={styles.statItem}>
            <div style={styles.statLabel}>나이대</div>
            <Pie
              data={getChartData(
                { "20대": houseStats.age20, "30대": houseStats.age30, "40대": houseStats.age40 },
                ["#FFCC99", "#FF9999", "#99CCFF"]
              )}
              options={{ responsive: false, maintainAspectRatio: true, cutoutPercentage: 70 }}
            />
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.detailButton}
            onClick={() => navigate("/UserListPage", { state: { houseId } })}
          >
            이용자 상세보기
          </button>

          <button style={styles.reserveButton} onClick={handleReservation}>
            예약하기
          </button>
        </div>
      </div>

      {modalVisible && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>예약 완료!</h2>
            <button style={styles.closeButton} onClick={handleCloseModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#FF9999",
    height: "95vh",
  },
  dateBox: {
    textAlign: "center",
    fontSize: "20px",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
    marginLeft: "120px",
    alignSelf: "center",
    background: "#ffecec",
  },
  dateButton: {
    fontSize: "18px",
    padding: "10px",
    background: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
    margin: "0 5px",
  },
  dateText: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  statsBox: {
    background: "#fff",
    borderRadius: "10px",
    padding: "30px",
    width: "60%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "auto",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    alignItems: "center",
  },
  statsTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  statItem: {
    marginBottom: "20px",
  },
  statLabel: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  statGauge: {
    display: "flex",
    width: "100%",
    height: "30px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  detailButton: {
    marginTop: "25px",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reserveButton: {
    marginTop: "25px",
    padding: "10px 20px",
    background: "#ff5733",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButtonContainer: {
    marginBottom: "20px",
  },
  backButton: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
};

export default StaticPage;
