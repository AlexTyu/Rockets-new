#pragma strict

//Structure
var stages: GameObject[];
var activeStage: GameObject;

//Values
var position : Vector3;
var mass : float;
var height: float;
var altitude: float;
var speed: float;

//States
var exploded: boolean;
var exhausted: boolean;
var falling: boolean;

function Start () {
}

function Update () {
    altitude = getAltitude();
    speed = getSpeed();
    exhausted = isExhausted();
    falling = isFalling();
}

function getAltitude (){
    var objAlitude = activeStage.transform.position.y;
    var altitude = Mathf.Floor(objAlitude * 8.8 );
    return altitude;
}

function getSpeed (){
    var vel = activeStage.GetComponent.<Rigidbody>().velocity;
    var speed = Mathf.Floor(vel.magnitude * 10);
    return speed;
}

function isExhausted(){
    var result;
    for (var i = 0; i < stages.length; i++){
        if (!stages[i].GetComponent(Stage).isEmpty){
            result = false;
            return result;
        }
    }
    result = true;
    return result;
}

function isFalling(){
    if (!falling){
        if (exhausted && speed < 100){
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function Launch (){
    activeStage = stages[0];
}

function igniteStage(stage: GameObject){
    activeStage = stage;
    stage.GetComponent(Stage).ignition();
}

function detachStage(stage: GameObject){
    var engines = stage.GetComponent(Stage).engines;
    var boosters = stage.GetComponent(Stage).boosters;
    if (boosters.length > 0){
        for (var i=0; i < boosters.length; i++) {
            var boosterJoint = boosters[i].GetComponent(ConfigurableJoint);
            Destroy (boosterJoint);
        }
    } else {
        var stageJoint = stage.GetComponent(ConfigurableJoint);
        Destroy (stageJoint);
    }
}

function Reset (){
    exploded = false;
    exhausted = false;
    falling = false;
}

function explosion (){
	exploded = true;
}
