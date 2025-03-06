import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [modalVisible, setModalVisible] = useState(false); // 예약 완료 모달 상태

  const currentDate = new Date().toLocaleDateString();

  const userStats = {
    gender: { male: 60, female: 40 },
    mbti: { E: 80, I: 20 },
    solo: { yes: 70, no: 30 },
    foodPreference: { korean: 50, western: 30, chinese: 20 },
    ageRange: { "20s": 40, "30s": 35, "40s": 25 },
  };

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
                width: `${userStats.gender.male}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${userStats.gender.female}%`,
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
                width: `${userStats.mbti.E}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${userStats.mbti.I}%`,
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
                width: `${userStats.solo.yes}%`,
                backgroundColor: "#99CCFF",
                height: "30px",
              }}
            ></div>
            <div
              style={{
                width: `${userStats.solo.no}%`,
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
              data={getChartData(userStats.foodPreference, [
                "#FFCC99",
                "#FF9999",
                "#99CCFF",
              ])}
              options={{
                responsive: false,
                maintainAspectRatio: true,
                cutoutPercentage: 70,
                width: 10,
                height: 10,
              }}
            />
          </div>

          <div style={styles.statItem}>
            <div style={styles.statLabel}>나이대</div>
            <Pie
              data={getChartData(userStats.ageRange, [
                "#FFCC99",
                "#FF9999",
                "#99CCFF",
              ])}
              options={{
                responsive: false,
                maintainAspectRatio: true,
                cutoutPercentage: 70,
                width: 10,
                height: 10,
              }}
            />
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <button
            style={styles.detailButton}
            onClick={() => navigate("/UserListPage")}
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
