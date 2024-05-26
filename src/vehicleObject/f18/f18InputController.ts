import { F18GamepadController } from './f18GamePadController';
import { F18CameraController } from './f18CameraController';
/*
 * @Author: renjianfeng
 * @Date: 2022-03-21 15:08:40
 * @LastEditTime: 2022-04-08 17:29:48
 * @LastEditors: renjianfeng
 */
import { F18Physics } from "./f18Physics";
import * as BABYLON from '@babylonjs/core'

/**
 * input controller
 */
export class F18InputController {

    private static instance: F18InputController;

    public static get ins(): F18InputController {
        if (!this.instance) {
            this.instance = new F18InputController();
        }
        return this.instance;
    }ene

    private scene:BABYLON.Scene

    public init(scene) {
        this.scene=scene
        this.addEvent()
    }

    constructor() {
        // super()
    }


    private _keydown;
    private _keyup;

    private beforeRender

    private addEvent() {
        window.addEventListener('keydown', this._keydown = (e) => { this.keydown(e) });
        window.addEventListener('keyup', this._keyup = (e) => { this.keyup(e) });
        this.beforeRender=this.scene.onBeforeRenderObservable.add(()=>{
            this.render()
        })
    }

    public gamePadState=false

    private removeEvent() {
        this.scene.onBeforeRenderObservable.remove(this.beforeRender);
        window.removeEventListener('keydown', this._keydown, false);
        window.removeEventListener('keyup', this._keyup, false);
    }

    private render(){
        document.getElementById("gamepadState").innerHTML=this.gamePadState?"Gamepad State:on":"Gamepad State:off"
        if(!this.gamePadState){
            this.updateYawNumber()
            this.updateRollNumber()
            this.updatePitchNumber()
            this.updateAccelerateNumberAndBrakeNumber()
        }
        this.vehicle.flyGamePadData.yawNumber=this.yawNumber
        this.vehicle.flyGamePadData.rollNumber=this.rollNumber
        this.vehicle.flyGamePadData.pitchNumber=this.pitchNumber
        this.vehicle.flyGamePadData.accelerateNumber=this.accelerateNumber
        this.vehicle.flyGamePadData.brakeNumber=this.brakeNumber
    }

    private keydown(e) {
        this.keyToAction(e.code, true)
        if (!this.vehicle) {
            return
        }
    }

    private keyup(e) {
        this.keyToAction(e.code, false)
    }



    public vehicle: F18Physics

    public tergetVehicle(vehicle: F18Physics) {
        this.vehicle = vehicle
        this.accelerateNumber= this.vehicle.flyGamePadData.accelerateNumber;
    }

     /**
     * Updated throttle and brakes
     */
    private updateAccelerateNumberAndBrakeNumber(){
        if(this.flyInputData.accelerate){
            if (this.accelerateNumber >= 1000) {
                this.accelerateNumber = 1000
            } else {
                this.accelerateNumber += 5
            }
            this.brakeNumber=0
        }else if(this.flyInputData.brake){
            if (this.accelerateNumber <= 0) {
                this.accelerateNumber = 0
            } else {
                this.accelerateNumber -= 5
            }
            this.brakeNumber=1
        }else{
            this.brakeNumber=0
        }
    }

    /**
     * Update pitch
     */
    private updatePitchNumber(){
        if(this.flyInputData.pitchDown){
            this.pitchNumber=-1
        }else if(this.flyInputData.pitchUp){
            this.pitchNumber=1
        }else{
            this.pitchNumber=0
        }
    }

     /**
     * Update rollover
     */
    private updateRollNumber(){
        if(this.flyInputData.rollLeft){
            this.rollNumber=-1
        }else if(this.flyInputData.rollRight){
            this.rollNumber=1
        }else{
            this.rollNumber=0
        }
    }

    /**
     * Update yaw
     */
    private updateYawNumber() {
        if(this.flyInputData.yawLeft){
            this.yawNumber=-1
        }else if(this.flyInputData.yawRight){
            this.yawNumber=1
        }else{
            this.yawNumber=0
        }
    }

    // original value 

    public pitchNumber=0


    public rollNumber=0


    public yawNumber=0


    public accelerateNumber=0


    public brakeNumber=0

     //Aircraft keyboard input data
     public flyInputData: FlyInputData = {
        pitchUp: false,
        pitchDown: false,
        rollLeft: false,
        rollRight: false,
        yawLeft: false,
        yawRight: false,
        accelerate: false,
        brake: false
    }


    private keyToAction(code, state: boolean) {

        if (!this.vehicle) {
            return
        }

        switch (code) {
            case "KeyW": this.flyInputData.pitchDown = state;
                break;
            case "KeyS": this.flyInputData.pitchUp = state;
                break;
            case "KeyA": this.flyInputData.rollLeft = state;
                break;
            case "KeyD": this.flyInputData.rollRight = state;
                break;
            case "KeyQ": this.flyInputData.yawLeft = state;
                break;
            case "KeyE": this.flyInputData.yawRight = state;
                break;
            case "ShiftLeft": this.flyInputData.accelerate = state;
                break;
            case "Space": this.flyInputData.brake = state;
                break;
            case "KeyV":!state&&F18CameraController.ins.cameraChange();
                break;
            case "KeyR":!state&&this.vehicle.undercarriageChange();
                break;
        }
    }

    public dispose() {
        this.removeEvent()
        this.vehicle = null;
    }

}