import * as React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import Form from "./Form";
import Canvas from "./Canvas";

const App = () => (
  <Container>
    <Typography variant="h6" component="h1">
      React + Fabric + Formik
    </Typography>
    <Form>
      <Grid container spacing={2}>
        <Grid item>
          <Canvas id="canvas" name="canvas.objects" />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  </Container>
);

export default App;
