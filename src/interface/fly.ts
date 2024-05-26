
/**
 * throttleSize 
 * resistance 
 * flySpeed 
 * flyLift 
 */
interface FlyData {
    accelerateSize,
    resistance,
    flySpeed,
    flyLift
}

/**
 //pitch
pitchUp: boolean;pitchDown: boolean;

 //roll
rollLeft: boolean;
rollRight: boolean;

 //yaw
yawLeft: boolean;
yawRight: boolean;

 //accelerate
accelerate: boolean;

 //brake
brake: boolean;

 //switch landing gear
switchUndercarriage: boolean;

 //Switch perspective
switchCamera: boolean;
 */
interface FlyInputData {
    pitchUp: boolean;
    pitchDown: boolean;
    rollLeft: boolean;
    rollRight: boolean;
    yawLeft: boolean;
    yawRight: boolean;
    accelerate: boolean;
    brake: boolean;
}