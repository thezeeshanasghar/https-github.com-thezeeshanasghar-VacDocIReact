import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import { useIonRouter } from "@ionic/react";

type BrandInventoryType = { Id: number; Name: string };
type VaccineDataType = { Id: number; Name: string };
const AddBrandInventory: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<BrandInventoryType[]>([]);
  const [brandName, setBrandName] = useState("");
  const [vaccineData, setVaccineData] = useState<VaccineDataType[]>([]);
  const [vaccineName, setVaccineName] = useState<string>("");
  const [brandCount, setBrandCount] = useState<string>("");
  const data = useIonRouter();
  const handelList = () => {
    data.push("/members/doctor/brandamount");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data_to_be_sent = {
      count: brandCount,
      brandId: brandName,
      doctorId: 1,
    };
    console.log(data_to_be_sent);
    fetch("http://localhost:5041/api/BrandInventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => (res.status === 201 ? setSuccess(true) : setError(true)))
      .catch((err) => setError(true))
      .finally(() => {
        setBrandName("");
        setBrandCount("");
        setVaccineName("");
      });
  };
  
  const handleBrandCount = () => {
    console.log(brandCount);
  };
  const handleClickVaccine = () => {
    fetch(`http://localhost:5041/api/Brand/brand_name/${vaccineName}`)
      .then((res) => res.json())
      .then((data) => setBrandData(data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetch("http://localhost:5041/api/Vaccine")
      .then((res) => res.json())
      .then((data) => setVaccineData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <IonPage>
        <Toast
          isOpen={success}
          setOpen={setSuccess}
          message="Brand Inventory added successfully."
          color="success"
        />
        <Toast
          isOpen={error}
          setOpen={setError}
          message="An error occurred while adding Brand Inventory. plz try again"
          color="danger"
        />
        <Header pageName="Add Brand Inventory" />
        <IonContent>
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Brand Count</IonLabel>
                  <IonInput
                    type="number"
                    value={brandCount}
                    onIonChange={(e) => setBrandCount(e.detail.value!)}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Vaccine Name</IonLabel>
                  <IonSelect
                    value={vaccineName}
                    onIonChange={(e) => setVaccineName(e.detail.value!)}
                  >
                    {vaccineData &&
                      vaccineData.map((item, index) => (
                        <IonSelectOption key={index} value={item.Id}>
                          {item.Name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Selected Vaccine Brand Name
                  </IonLabel>
                  <IonSelect
                    value={brandName}
                    onClick={handleClickVaccine}
                    onIonChange={(e) => setBrandName(e.detail.value!)}
                  >
                    {brandData &&
                      brandData.map((item, index) => (
                        <IonSelectOption key={index} value={item.Id}>
                          {item.Name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
                <IonButton type="submit">Add Inventory</IonButton>
              </form>
              <IonButton onClick={handelList}>list</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AddBrandInventory;
