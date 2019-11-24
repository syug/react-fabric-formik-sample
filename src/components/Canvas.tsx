import * as React from "react";
import { Box, Button, Grid } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import useFabric from "../hooks/useFabric";

const ContainedButton = props => (
  <Button variant="contained" {...props}>
    {props.children}
  </Button>
);

interface CanvasProps {
  id: string;
  name: string;
}
const Canvas = ({ id, name }: CanvasProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const {
    addRect,
    addPolygon,
    someObjectIsSelected,
    removeSelection,
    removeAll
  } = useFabric({ id, objects: field.value });

  const handleAddRandomObject = React.useCallback(
    e => {
      const newValue = [
        ...field.value,
        {
          left: Number(Math.random() * 200),
          top: Number(Math.random() * 200),
          fill: "green",
          width: Number(Math.random() * 30),
          height: Number(Math.random() * 30)
        }
      ];
      setFieldValue(name as never, newValue);
    },
    [field.value, name, setFieldValue]
  );

  const handleAddRect = React.useCallback(
    e => {
      addRect({
        left: 100,
        top: 100,
        fill: "red",
        width: 20,
        height: 20
      });
    },
    [addRect]
  );

  const handleAddPolygon = React.useCallback(
    e => {
      addPolygon(
        [
          { x: 10, y: 10 },
          { x: 50, y: 30 },
          { x: 40, y: 70 },
          { x: 60, y: 50 },
          { x: 100, y: 150 },
          { x: 40, y: 100 }
        ],
        {
          stroke: "red",
          left: 100,
          top: 100,
          fill: "#FF000033"
        }
      );
    },
    [addPolygon]
  );

  return (
    <Grid container spacing={2}>
      <Grid item>
        
        <Box p={2}>
          <canvas id={id} />
        </Box>
      </Grid>
      <Grid container item spacing={1}>
        <Grid item>
          <ContainedButton color="secondary" onClick={handleAddRandomObject}>
            Add randam object
          </ContainedButton>
        </Grid>

        <Grid item>
          <ContainedButton onClick={handleAddRect}>Add rect</ContainedButton>
        </Grid>

        <Grid item>
          <ContainedButton onClick={handleAddPolygon}>
            Add polygon
          </ContainedButton>
        </Grid>

        <Grid item>
          <ContainedButton
            onClick={removeSelection}
            disabled={!someObjectIsSelected}
          >
            Remove selection
          </ContainedButton>
        </Grid>

        <Grid item>
          <ContainedButton onClick={removeAll}>Remove All</ContainedButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Canvas;
