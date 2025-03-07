import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

export default function FeedBack() {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <Header />
      <section>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            {" "}
            Service Feedback
          </Typography>
          <Grid container spacing={2} className="mt-3 justify-content-center">
            <Box
              sx={{
                backgroundColor: "#f2f2f2",
                // width: "363px",
                padding: "50px 30px ",
                borderRadius: "10px",
              }}
            >
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                <span style={{ fontWeight: "700" }}>Issue:</span>  Flat Tire
              </h6>
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                {" "}
                <span style={{ fontWeight: "700" }}>Mechanic:</span> John Doe
              </h6>
              <h6 style={{ fontSize: "18px", fontWeight: "400" }}>
                {" "}
                <span style={{ fontWeight: "700" }}> Resolution: </span> Tire
                replaced successfully
              </h6>

              <Typography
                component="legend"
                className="mt-3"
                sx={{ fontSize: "18px", fontWeight: "700" }}
              >
                Rate the Service
              </Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <div>
                <textarea
                  placeholder="Write your Feedback...."
                  className="py-4 px-5"
                  style={{ borderRadius: "10px" }}
                ></textarea>
              </div>
              <div className="mt-4 text-center">
                <Button
                  className="px-3"
                  sx={{
                    backgroundColor: "#E3641B",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  Submit Feedback
                </Button>
              </div>
            </Box>
          </Grid>
        </Container>
      </section>
      <Footer />
    </>
  );
}
