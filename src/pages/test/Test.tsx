import React, { useState } from "react";
import {
  IonPopover,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonDatetime,
  IonPage,
  IonContent,
  IonIcon,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { format } from "date-fns";

const Test: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  console.log(selectedDate);
  return (
    <IonPage>
      <IonContent>
        <DatePicker
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />
      </IonContent>
    </IonPage>
  );
};

interface DatePickerProps {
  selectedDate: string;
  onDateSelected: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelected,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleDateSelected = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    onDateSelected(selectedDate);
    setShowPopover(false);
  };

  return (
    <>
      <IonIcon icon={calendar} onClick={() => setShowPopover(true)}></IonIcon>

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime
              // displayFormat="DD/MM/YYYY"
              // pickerFormat="MM/DD/YYYY"
              value={selectedDate || undefined}
              onIonChange={handleDateSelected}
            />
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default Test;

//DateTimePicker
