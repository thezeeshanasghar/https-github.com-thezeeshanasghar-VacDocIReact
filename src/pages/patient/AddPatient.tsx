import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonGrid,
  IonButton,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonListHeader,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./css/addpatient.css";
import { useHistory } from "react-router-dom";
// import { format } from "date-fns";
import Toast from "../../components/custom-toast/Toast";
import cities from "../test/citiesData";
type DoctorClinicType = { Id: number; Name: string };
const AddPatient: React.FC = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [cnic, setCnic] = useState("");
  const [gender, setGender] = useState("");
  // const [scheduleType, setScheduleType] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("auto");
  const [mobileNumber, setMobileNumber] = useState("");
  const [toDay, setToDay] = useState("");
  // const [preferredSchedule, setpreferredSchedule] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<number>();
  const [selectedClinic, setSelectedClinic] = useState<number>();
  const [city, setCity] = useState<string>("");
  const [isEPIDone, setIsEPIDone] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const history = useHistory();
  const [clinicData, setClinicData] = useState<DoctorClinicType[]>([]);
  const [doctorData, setDoctorData] = useState<DoctorClinicType[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const formatedDate = format(
    //   new Date(dob),
    //   "yyyy-MM-dd'T'HH:mm:ss.SSSX"
    // );
    const data_to_be_sent = {
      name,
      // guardian,
      fatherName,
      email,
      dob,
      gender,
      // type: scheduleType,
      password,
      city,
      cnic,
      mobileNumber,
      // preferredSchedule,
      isEPIDone,
      isVerified,
      isInactive: false,
      clinicId: selectedClinic,
      doctorId: selectedDoctor,
    };

    fetch(`${import.meta.env.VITE_API_URL}api/Child`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => {
        if (res.status === 204) {
          setSuccess(true);
          history.push("/members/child", "back");
          // window.location.reload();
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true))
      .finally(() => {
        clearStateVariables();
      });
  };
  // function to clear all state variables
  const clearStateVariables = () => {
    setName("");
    setFatherName("");
    setGuardian("");
    setCnic("");
    setGender("Boy");
    // setScheduleType("special");
    setDob("");
    setEmail("");
    setPassword("");
    setMobileNumber("");
    // setpreferredSchedule("");
    setSelectedDoctor(0);
    setSelectedClinic(0);
    setCity("");
    setIsEPIDone(false);
    setIsVerified(false);
  };

  // getting doctors list for dropdown and clinic;
  useEffect(() => {
    //@ts-ignore
    const doctorData = JSON.parse(sessionStorage.getItem("docData"));
    if (doctorData) {
      // const lastIndex = doctorData.Clinics && doctorData.Clinics.length - 1;
      const clinicID = doctorData.Clinics[0].Id;
      setSelectedDoctor(doctorData["Id"]);
      setSelectedClinic(clinicID);
    }

    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
      .then((res) => res.json())
      .then((data) => setDoctorData(data))
      .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_API_URL}api/Clinic`)
      .then((res) => res.json())
      .then((data) => setClinicData(data))
      .catch((err) => console.error(err));

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

    console.log(today);
    setToDay(today);
  }, []);

  const canSubmit =
    name !== "" &&
    fatherName !== "" &&
    // guardian !== "" &&
    password !== "" &&
    cnic !== "" &&
    gender !== "" &&
    dob !== "" &&
    email !== "" &&
    mobileNumber !== "" &&
    city !== "";
  return (
    <IonPage>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Patient added successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while adding patient. plz try again"
        color="danger"
      />
      <Header pageName="Add Patient" />
      <IonCard style={{ overflowY: "scroll" }}>
        <IonCardContent>
          <form onSubmit={handleFormSubmit}>
            <IonItem>
              <IonLabel position="floating">Patient Name</IonLabel>
              <IonInput
                type="text"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                required
                id="name"
              />
            </IonItem>
            {/* <IonItem>
              <IonLabel position="floating">Guardian's Name</IonLabel>
              <IonInput
                type="text"
                value={guardian}
                onIonChange={(e) => setGuardian(e.detail.value!)}
              />
            </IonItem> */}
            <IonItem>
              <IonLabel position="floating">Father's Name</IonLabel>
              <IonInput
                type="text"
                value={fatherName}
                onIonChange={(e) => setFatherName(e.detail.value!)}
                required
                id="fname"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
                id="email"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">CNIC</IonLabel>
              <IonInput
                type="number"
                placeholder="CNIC"
                value={cnic}
                onIonChange={(e) => setCnic(e.detail.value!)}
                required
                id="cnic"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Mobile Number</IonLabel>
              <IonInput
                required
                type="number"
                value={mobileNumber}
                id="mobileNumber"
                itemID="mobileNumber"
                style={{
                  color:
                    mobileNumber.startsWith("0") || mobileNumber.startsWith("+")
                      ? "red"
                      : "",
                }}
                placeholder="3331234567"
                onIonChange={(e) => setMobileNumber(e.detail.value!)}
              />
            </IonItem>
            <IonText
              color={"danger"}
              style={{
                fontSize: "10px",
                marginBottom: "11px",
                display:
                  mobileNumber.startsWith("0") || mobileNumber.startsWith("+")
                    ? "block"
                    : "none",
              }}
            >
              Mobile Number Must be In 333-1234567 Format
            </IonText>
            <IonItem>
              <IonLabel position="stacked">Date of Birth</IonLabel>
              <IonInput
                // slot="end"
                type="date"
                max={toDay}
                value={dob}
                onIonChange={(e) => setDob(e.detail.value!)}
                id="db"
              />
            </IonItem>
            <IonRadioGroup
              value={gender}
              onIonChange={(e) => setGender(e.detail.value)}
            >
              <IonListHeader>Gender</IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Boy</IonLabel>
                      <IonRadio slot="start" value="boy" />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Girl</IonLabel>
                      <IonRadio slot="start" value="girl" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
            {/* <IonRadioGroup
              value={scheduleType}
              onIonChange={(e) => setScheduleType(e.detail.value)}
            >
              <IonListHeader>Schedule Type</IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Regular</IonLabel>
                      <IonRadio slot="start" value="regular" />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Special</IonLabel>
                      <IonRadio slot="start" value="special" />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
            <IonItem>
              <IonLabel position="floating">Preferred Schedule</IonLabel>
              <IonInput
                type="text"
                value={preferredSchedule}
                onIonChange={(e) => setpreferredSchedule(e.detail.value!)}
              />
            </IonItem> */}
            {/* <IonItem>
              <IonLabel position="floating">Select Doctor</IonLabel>
              <IonSelect
                value={selectedDoctor}
                onIonChange={(e) => setSelectedDoctor(e.detail.value!)}
                id="doc"
              >
                {doctorData &&
                  doctorData.map((item, index) => (
                    <IonSelectOption key={index} value={item.Id || 0}>
                      {item.Name}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Select Clinic</IonLabel>
              <IonSelect
                value={selectedClinic}
                onIonChange={(e) => setSelectedClinic(e.detail.value!)}
                id="clinic"
              >
                {clinicData &&
                  clinicData.map((item, index) => (
                    <IonSelectOption key={index} value={item.Id || 0}>
                      {item.Name}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem> */}
            <IonItem>
              <input
                type="text"
                list="cityOptions"
                value={city}
                placeholder="Choose City"
                className="custom-input-search"
                style={{
                  border: "none",
                  width: "100%",
                  height: "2.8rem",
                  marginTop: "0.3px",
                  paddingLeft: "6px",
                }}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist
                id="cityOptions"
                style={{ width: "100%", border: "none" }}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Is EPI done?</IonLabel>
                    <IonCheckbox
                      slot="start"
                      name="isEPIDone"
                      checked={isEPIDone}
                      onIonChange={(e) => setIsEPIDone(e.detail.checked)}
                      id="epi"
                    />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel>Is Verified?</IonLabel>
                    <IonCheckbox
                      slot="start"
                      name="IsVerified"
                      checked={isVerified}
                      onIonChange={(e) => setIsVerified(e.detail.checked)}
                      id="verified"
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton
              expand="full"
              type="submit"
              id="submit"
              disabled={!canSubmit}
            >
              Add Patient
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default AddPatient;
