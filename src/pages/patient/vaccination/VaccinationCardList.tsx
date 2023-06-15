import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import VaccinationCard from "./VaccinationCard";
import axios from "axios";
import { groupBy } from "lodash";
import { useLocation } from "react-router";
export interface IPSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  DoctorId: number;
  childId: number;
  isSkip: boolean;
  isDone: boolean;
}

interface IParam {
  match: {
    params: {
      Id: number;
    };
  };
}
const VaccinationCardList: React.FC<IParam> = ({
  match: {
    params: { Id: childId },
  },
}) => {
  // extracting doctor id from query param;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get("doctorId");
  const [count, setCount] = useState(1);
  // const [doctorId, setdoctorId] = useState(2)
  const [patientSchedule, setPatientSchedule] = useState<IPSchedule[]>([]);
  const [groupedPatientSchedule, setGroupedPatientSchedule] = useState<
    Record<string, IPSchedule[]>
  >({});
  const [patientName, setPatientName] = useState<string>();

  const fetchPatientScheduleData = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/patient_schedule/${childId}`
      )
      .then((res) => setPatientSchedule(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (count === 1) {
      axios
        .post(
          `${
            import.meta.env.VITE_API_URL
          }api/PatientSchedule/doctor_post_schedule/child?doctorId=${doctorId}&childId=${childId}`
        )
        .then((res) => res.status === 200 && fetchPatientScheduleData())
        .catch((err) => console.log(err));
      setCount(2);
    }
  }, [childId, doctorId]);

  useEffect(() => {
    if (patientSchedule) {
      const groupedD: Record<string, IPSchedule[]> = groupBy(
        patientSchedule,
        (item: IPSchedule) => item.Date.split("T")[0]
      );
      setGroupedPatientSchedule(groupedD);
    }
  }, [patientSchedule]);

  function setName(name: string) {
    setPatientName(name);
  }

  console.log(childId, doctorId);
  return (
    <>
      {patientSchedule && (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Vaccination</IonTitle>
            </IonToolbar>
            <IonToolbar style={{ padding: "0px 10px" }}>
              <IonButton size="small" slot="start">
                print
              </IonButton>
              <IonText slot="end">{patientName}</IonText>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {patientSchedule.length >= 1 ? (
              <>
                {groupedPatientSchedule ? (
                  Object.entries(groupedPatientSchedule).map(([date, data]) => {
                    return (
                      <VaccinationCard
                        key={date}
                        date={date}
                        data={data}
                        forceRender={fetchPatientScheduleData}
                        setName={setName}
                      />
                    );
                  })
                ) : (
                  <h1>Patient schedule list is loading...</h1>
                )}
              </>
            ) : (
              <h1>patient schedule list could not Load</h1>
            )}
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default VaccinationCardList;
