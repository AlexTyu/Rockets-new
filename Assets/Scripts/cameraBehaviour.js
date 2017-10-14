#pragma strict

var position: Vector3;
var nextPosition: Vector3;
var moveSpeed: float;

var follow: GameObject;
var following: boolean = true;

var shiftY: float;

function Start () {
    moveSpeed = 1;
    position = transform.position;
    toggleStandby();
    following = false;
}

function Update(){
    var time = Time.deltaTime;
    var alt = GameObject.Find("Rocket").GetComponent(Rocket).altitude;

    // transform.LookAt(follow.transform);

    // transform.position = Vector3.Lerp(transform.position, nextPosition, time * moveSpeed);

    if(alt <= 14000){
      nextPosition = Vector3(follow.transform.position.x, follow.transform.position.y - alt*0.001, follow.transform.position.z - 21);
      shiftY = follow.transform.position.y - transform.position.y;
    }  if (alt >= 14000 && alt < 20000){
      shiftY = follow.transform.position.y - transform.position.y;
      nextPosition = Vector3(follow.transform.position.x, follow.transform.position.y - shiftY + alt*0.001, follow.transform.position.z - 21);
    }
    if (alt >= 20000){
      shiftY = follow.transform.position.y - transform.position.y;
      nextPosition = Vector3(follow.transform.position.x, follow.transform.position.y + 10, follow.transform.position.z - 21);
    }

    transform.position = nextPosition;
    transform.LookAt(follow.transform);

    // transform.position = nextPosition;
}


function toggleStandby(){
    following = true;
    nextPosition = Vector3(-15, 5, 0);
}

function toggleEditMode(){
    following = false;
    nextPosition = Vector3(-17, 5, -0.5);
}

function toggleLaunchMode(){
    following = true;
    nextPosition = Vector3(-27, 5, 0);
}

function toggleInFlightMode(){
}

function toggleGameOver(){
    moveSpeed = 0.5;
    nextPosition = Vector3(-170, transform.position.y, 0);
}
