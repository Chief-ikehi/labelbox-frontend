import React, { useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const AnnotationCanvas = ({ imageUrl, onSave }) => {
    const [annotations, setAnnotations] = useState([]);
    const stageRef = useRef();

    const handleMouseUp = (event) => {
        const stage = stageRef.current;
        const pointerPosition = stage.getPointerPosition();
        const newAnnotation = {
            x: pointerPosition.x,
            y: pointerPosition.y,
            width: 50,
            height: 50,
        };
        setAnnotations([...annotations, newAnnotation]);
    };

    return (
        <div>
            <h2>Annotate the Image</h2>
            <Stage
                width={1425}
                height={1200}
                onMouseUp={handleMouseUp}
                ref={stageRef}
                style={{ border: "2px solid black", backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}
            >
                <Layer>
                    {annotations.map((rect, index) => (
                        <Rect
                            key={index}
                            x={rect.x}
                            y={rect.y}
                            width={rect.width}
                            height={rect.height}
                            fill="rgba(0, 255, 0, 0.5)"
                            draggable
                        />
                    ))}
                </Layer>
            </Stage>
            <button onClick={() => onSave(annotations)}>Save Annotations</button>
        </div>
    );
};

export default AnnotationCanvas;