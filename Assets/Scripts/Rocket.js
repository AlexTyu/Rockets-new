#pragma strict

//Values
var position : Vector3;
var mass : float;
var height: float;
var altitude: float;
var speed: float;

var stages: int;

//States
var inFlight: boolean;
var exploded: boolean;
var exhausted: boolean;
var falling: boolean;

var isTiltingLeft: boolean;
var isTiltingRight: boolean;
var isTiltingForward: boolean;
var isTiltingBackward: boolean;

var activeStage: int;
var head: GameObject;

var explosion: GameObject;

var willExplode: boolean;
var willExplodeAtHeight: float;

var isProduceVacuum: boolean = false;

function Start (){
    inFlight = false;
}

function Update () {
    altitude = getAltitude();
    speed = getSpeed();
    // exhausted = isExhausted();
    // falling = isFalling();

    if (willExplode && altitude > willExplodeAtHeight ){
        explode();
    }
    var activeBooster: GameObject = getPart(activeStage, "Booster");

    if (speed >= 1000 && altitude <= 13000){
      activeBooster.GetComponent(Booster).isProduceVacuum = true;
    } else {
      activeBooster.GetComponent(Booster).isProduceVacuum = false;
    }
}

function tiltLeft(isPressed: boolean){
  var object: GameObject = getPart(activeStage, "Booster");
  object.GetComponent(Booster).tilerTopLeft.GetComponent(tilter).isActive = isPressed;
  object.GetComponent(Booster).tilerBottomRight.GetComponent(tilter).isActive = isPressed;

}

function tiltRight(isPressed: boolean){
  var object: GameObject = getPart(activeStage, "Booster");
  object.GetComponent(Booster).tilerTopRight.GetComponent(tilter).isActive = isPressed;
  object.GetComponent(Booster).tilerBottomLeft.GetComponent(tilter).isActive = isPressed;

}

function tiltForward(isPressed: boolean){
  var object: GameObject = getPart(activeStage, "Booster");
  object.GetComponent(Booster).tilerTopForward.GetComponent(tilter).isActive = isPressed;
  object.GetComponent(Booster).tilerBottomBackward.GetComponent(tilter).isActive = isPressed;

}

function tiltBackward(isPressed: boolean){
  var object: GameObject = getPart(activeStage, "Booster");
  object.GetComponent(Booster).tilerTopBackward.GetComponent(tilter).isActive = isPressed;
  object.GetComponent(Booster).tilerBottomForward.GetComponent(tilter).isActive = isPressed;

}




function getPart(ofStage, partType){
  for (var i=0; i < transform.childCount; i++){
    var rocketPart = transform.GetChild(i).gameObject;
    var partStage = rocketPart.GetComponent(Part).stage;
    var name = rocketPart.GetComponent(Part).partType;
    if (partStage == ofStage && name == partType){
          return rocketPart;
        }
    }
}


function getHeight(){
    var colider = this.GetComponent.<Collider>();
    var height = colider.bounds.size;
}

function setPhysics(isActive){
    for (var i=0; i < transform.childCount; i++){
        var child = transform.GetChild(i).gameObject;
        var rb: Rigidbody = child.GetComponent.<Rigidbody>();
        if (isActive){
            rb.useGravity = true;
            // rb.isKinematic = false;
        } else {
            rb.useGravity = false;
            // rb.isKinematic = true;
        }
    }
}


function getAltitude (){
    var objAlitude = head.transform.position.y;
    var altitude = Mathf.Floor(objAlitude * 8.8 );
    return altitude;
}

function getSpeed (){
    var vel = head.GetComponent.<Rigidbody>().velocity;
    var speed = Mathf.Floor(vel.magnitude * 10);
    return speed;
}

function isExhausted(){
    // var result;
    // for (var i=0; i < transform.childCount; i++){
    //     if (!stages[i].GetComponent(Stage).isEmpty){
    //         result = false;
    //         return result;
    //     }
    // }
    // result = true;
    // return result;
}


function isFalling(){
    // if (!falling){
    //     if (exhausted && speed < 100){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // } else {
    //     return true;
    // }

}

function Launch (){
    activeStage = 1;
}

function igniteStage(number: int){
    inFlight = true;
    activeStage = number;
    setPhysics(true);
    for (var i=0; i < transform.childCount; i++){
        var rocketPart = transform.GetChild(i).gameObject;
        var stage = rocketPart.GetComponent(Part).stage;
        var name = rocketPart.GetComponent(Part).partType;
        if (stage == number && name == "Engine"){
            rocketPart.GetComponent(engine).ignition();
            }
        }
    }

function detachStage(number: int){
    for (var i=0; i < transform.childCount; i++){
        var rocketPart = transform.GetChild(i).gameObject;
        var stage = rocketPart.GetComponent(Part).stage;
        var name = rocketPart.GetComponent(Part).partType;
        rocketPart.layer = 0;
        if (stage == number && name == "Booster"){
                rocketPart.GetComponent(Booster).detachBooster();
            }
        }
    }


function Reset (){
    // exploded = false;
    // exhausted = false;
    // falling = false;
}

function explode (){

    explosion.SetActive(true);
    explosion.GetComponent.<AudioSource>().Play();
	exploded = true;
    for (var i=0; i < transform.childCount; i++){
        var rocketPart = transform.GetChild(i).gameObject;
        var joint = rocketPart.GetComponent(ConfigurableJoint);
        rocketPart.layer = 0;
        Destroy (joint);
    }
}
