#pragma strict

var isActive : boolean;
var fuelMax: int;
var fuelLeft: int;
var isEmpty : boolean;
var attached : boolean;
var isIgnited : boolean;

var boosters: GameObject[];
var engines: GameObject[];

public var countdown : float = 0f;

function Start () {
	fuelLeft = fuelMax;
}

function Update () {
	if ((isActive)&&(fuelLeft > 0)){
		countdown += Time.deltaTime;
		fuelLeft = fuelMax - countdown;
        for (var i=0; i < engines.length; i++) {
            engines[i].GetComponent(engine).ignition();
        }
	} else {
		isActive = false;
        for (var u=0; u < engines.length; u++) {
            engines[u].GetComponent(engine).shutdown();
        }
	}
    if (fuelLeft == 0){
        isEmpty = true;
    }
}

function ignition(){
	isActive = true;
}

function explosion(){
}

function detach(){
	attached = false;
}
