import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { useIonRouter } from "@ionic/react";
import ErrorComponent from "../Error/ErrorComponent";
import { mail, call } from "ionicons/icons";
import { useLocation } from "react-router";

type PatientDataType = {
  Id: number;
  Name: string;
  ClinicId: number;
  DoctorId: number;
};
const Alert: React.FC = () => {
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const [patientData, setPatientData] = useState<PatientDataType[]>([]);
  const location = useLocation();
  const fetchPatientData = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}api/PatientSchedule/today_alert`
    )
      .then((response) => response.json())
      .then((data: PatientDataType[]) => setPatientData(data))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPatientData();
  }, [location]);

  return (
    <IonPage>
      <Header pageName="Alert" />
      <IonSegment>
        {/* <IonSegmentButton layout="icon-top" value="last5days">
          <IonLabel>Last 5 Days</IonLabel>
        </IonSegmentButton> */}
        <IonSegmentButton
          value="today"
          className="segment-button segment-activated"
        >
          <IonLabel>Today</IonLabel>
        </IonSegmentButton>
        {/* <IonSegmentButton layout="icon-top" value="next5days">
          <IonLabel>Next 5 Days</IonLabel>
        </IonSegmentButton> */}
      </IonSegment>
      <IonContent className="ion-padding">
        {patientData.length > 0 ? (
          patientData &&
          patientData.map((item, index) => {
            return (
              <IonGrid key={item.Id}>
                <IonRow tabIndex={0}>
                  <IonCol>
                    <IonItem
                      routerLink={`/members/child/vaccine/${item.Id}?doctorId=${item.DoctorId}`}
                      routerDirection="forward"
                    >
                      <IonLabel>{item.Name}</IonLabel>
                      <IonIcon color="primary" icon={call} slot="end" />
                      <IonIcon color="primary" icon={mail} slot="end" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            );
          })
        ) : (
          <ErrorComponent title="Alert" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Alert;
