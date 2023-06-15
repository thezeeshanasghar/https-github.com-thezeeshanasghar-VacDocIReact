import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
// import ReactDOM from "react-dom";
type BrandAmountType = { Price: number; VaccineName: string; Brand: string };
const BrandAmount: React.FC = () => {
  const [brandData, setBrandData] = useState<BrandAmountType[]>([]);
  useEffect(() => {
    fetchBrandData();
  }, []);
  
  const fetchBrandData = async () => {
    try {
      const response = await fetch("http://localhost:5041/api/BrandAmount/doctor-vaccine-price/1"); // Replace 'API_ENDPOINT' with the actual API endpoint URL
      const data = await response.json();
      setBrandData(data);
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  };
  return (
    <IonPage>
      <Header pageName="Brand Amount" />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader
            style={{
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <b>
              <div>VaccineName</div>
            </b>
            <b>
              {" "}
              <div>Brand</div>
            </b>
            <b>
              {" "}
              <div>Price</div>
            </b>
          </IonCardHeader>
        </IonCard>
        {brandData &&
          brandData.map((item, index) => (
            <IonCard  key={index}>
              <IonCardContent
                style={{
                  color: "black",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>{item.VaccineName}</div>
                <div>{item.Brand}</div>
                <div>{item.Price}</div>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default BrandAmount;
// ReactDOM.render(<BrandAmount />, document.getElementById('root'));