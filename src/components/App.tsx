import * as React from "react";
import { Container, Typography } from "@material-ui/core";
import Canvas from "./Canvas";

const App = () => (
  <Container>
    <Typography variant="h3">Fabric sample</Typography>
    <Canvas id="canvas" />
  </Container>
);

export default App;
