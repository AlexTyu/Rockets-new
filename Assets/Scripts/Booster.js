var partType: String = "Booster";

var isActive : boolean;
var fuelMax: int;
var fuelLeft: int;
var sideJoint: GameObject;

var isEmpty: boolean = false;

var tilerTopLeft: GameObject;
var tilerTopRight: GameObject;
var tilerTopForward: GameObject;
var tilerTopBackward: GameObject;

var tilerBottomLeft: GameObject;
var tilerBottomRight: GameObject;
var tilerBottomForward: GameObject;
var tilerBottomBackward: GameObject;

var aircut: GameObject;
var isProduceVacuum: boolean;

var burnRate: int = 0;

var countdown : float = 0f;

function Start () {
	fuelLeft = fuelMax;
}

function sumBurnRate(amount: int){
    burnRate = burnRate + amount;
}

function Update () {
	if ((isActive)&&(fuelLeft > 0)){
		countdown += Time.deltaTime;
		fuelLeft = fuelMax - countdown * burnRate;
	} else {
		isActive = false;
	}
    if (fuelLeft == 0){
        isEmpty = true;
    }

		if (isProduceVacuum){
			aircut.SetActive(true);
		} else {
			aircut.SetActive(false);
		}
}

function ignition(){
	isActive = true;
}

function detachBooster(){
    var joint = this.GetComponent(ConfigurableJoint);
    Destroy (joint);
}
