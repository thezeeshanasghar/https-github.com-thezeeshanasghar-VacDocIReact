import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import WeekDaysCard from "../clinic/WeekDaysCard";

const Test: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <form noValidate className="ion-padding">
          <IonItem>
            <IonLabel position="floating" color="primary">
              Name
            </IonLabel>
            <IonInput type="text" required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Phone Number
            </IonLabel>
            <IonInput type="text" required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Address
            </IonLabel>
            <IonTextarea required></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              Consultation Fee
            </IonLabel>
            <IonInput type="number" min="0" required />
          </IonItem>
          <IonItem>
            <IonButton slot="end">Upload Monogram</IonButton>
          </IonItem>
          <WeekDaysCard name="Monday" />
          <WeekDaysCard name="Tuesday" />
          <WeekDaysCard name="Wednesday" />
          <WeekDaysCard name="Thursday" />
          <WeekDaysCard name="Friday" />
          <WeekDaysCard name="Satureday" />
          <WeekDaysCard name="Sunday" />
          <IonItem style={{ minHeight: "300px" }}>
            <div
              className="map"
              style={{
                minHeight: "300px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Google Maps component or placeholder */}
            </div>
          </IonItem>
          <IonButton type="submit" disabled>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Test;
