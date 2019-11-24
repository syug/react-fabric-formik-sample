import * as React from "react";
import { fabric } from "fabric";

interface Point {
  x: number;
  y: number;
}
type Coords = Point[];

interface RectOpt {
  stroke?: string; // "red";
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  fill?: string; // "#FF000033";
}

interface PolygonOpt {
  stroke?: string; // "red";
  left?: number;
  top?: number;
  fill?: string; // "#FF000033";
}

/**
 * useFabric
 * @param id: string
 */
interface useFabricOptions {
  id: string;
  objects?: RectOpt[];
}

const useFabric = ({ id, objects }: useFabricOptions) => {
  const canvasRef = React.useRef(null);
  const [someObjectIsSelected, setSomeObjectIsSelected] = React.useState(false);
  // const [objects, setObjects] = React.useState(undefined);

  /**
   * Initialize
   */
  React.useEffect(() => {
    const canvas = new fabric.Canvas(id);
    canvasRef.current = canvas;

    // Rendering
    canvas.on("after:render", opt => {
      console.log("after:render", opt);
    });

    // Mouse
    canvas.on("mouse:up", opt => {
      console.log("mouse:up", opt);
    });

    // Objects
    canvas.on("object:added", opt => {
      console.log("object:added", opt);
    });
    canvas.on("object:removed", opt => {
      console.log("object:removed", opt);
    });

    // Selection
    canvas.on("selection:created", opt => {
      console.log("selection:created", opt);
      setSomeObjectIsSelected(true);
    });
    canvas.on("selection:updated", opt => {
      console.log("selection:updated", opt);
    });
    canvas.on("selection:cleared", opt => {
      console.log("selection:cleared", opt);
      setSomeObjectIsSelected(false);
    });

    return () => {
      canvas.removeListeners();
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [id]);

  /**
   * Methods
   */
  const addRect = React.useCallback((opt: RectOpt) => {
    var rect = new fabric.Rect(opt);
    canvasRef.current.add(rect);
  }, []);

  const addPolygon = React.useCallback((coords: Coords, opt: PolygonOpt) => {
    var poly = new fabric.Polygon(coords, opt);
    canvasRef.current.add(poly);
  }, []);

  const removeObjects = React.useCallback(objects => {
    if (objects && objects.length > 0) {
      objects.forEach(o => canvasRef.current.remove(o));
    }
  }, []);

  const removeSelection = React.useCallback(() => {
    var objects = canvasRef.current.getActiveObjects();
    console.log("objects", objects);
    removeObjects(objects);
  }, [removeObjects]);

  const removeAll = React.useCallback(() => {
    const objects = canvasRef.current.getObjects();
    removeObjects(objects);
  }, [removeObjects]);

  /**
   * Bindings
   */
  React.useEffect(() => {
    console.log("objects", objects);
    if (objects && objects.length > 0) {
      removeAll();
      objects.forEach(object => addRect(object));
    }
  }, [objects, removeAll, addRect]);

  return {
    canvasRef,
    addRect,
    addPolygon,
    removeSelection,
    removeAll,
    someObjectIsSelected
  };
};

export default useFabric;
