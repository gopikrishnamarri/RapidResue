import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { postApihandler } from "../../Apihandler";

const mechanics = [
  {
    name: "Mechanic Name",
    rating: "Rating",
    status: "Availability status",
    cost: "$50",
    expertise: "Specialist in flat tires",
  },
  {
    name: "Mechanic Name",
    rating: "Rating",
    status: "Availability status",
    cost: "$45",
    expertise: "Battery expert",
  },
];
export default function Mechanic() {
  const [mechanics, setMechanics] = useState([]);
  const [data, setData] = useState([]);
  console.log(" data ---->", data);

  console.log("mechanic data ---->", mechanics);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    // Retrieve latitude and longitude from localStorage
    const savedLatitude = localStorage.getItem("latitude");
    const savedLongitude = localStorage.getItem("longitude");

    if (savedLatitude && savedLongitude) {
      setLatitude(savedLatitude);
      setLongitude(savedLongitude);
      fetchMechanics(savedLatitude, savedLongitude);
    }
  }, []);

  const fetchMechanics = async (lat, lng) => {
    const data = {
      longitude: parseFloat(lng),
      latitude: parseFloat(lat),
      maxDistance: 5000, // 5 km radius
    };
    console.log("data is --->", data);
    const response = await postApihandler("/findNearbyMechanics", data);
    console.log("Find nearby mechanic api response --->", response);

    if (response.message === "Nearby mechanics found") {
      setData(response.data);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select a Mechanic
        </Typography>

        <Grid container spacing={2}>
          {mechanics.map((mechanic) => (
            <Grid item xs={12} key={mechanic._id}>
              <Card
                sx={{ backgroundColor: "#f2f2f2", p: 2, borderRadius: "10px" }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    {mechanic.user_Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    Garage: {mechanic.garage_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    Contact: {mechanic.mobile_no}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#E3641B", mt: 2 }}
                    size="small"
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
