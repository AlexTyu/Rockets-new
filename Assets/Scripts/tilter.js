var partType: String = "Engine";

var isActive : boolean;
var soundPlaying: boolean;

var burnRate: int;
var thrust: float;
var attachedToBooster: GameObject;
var Exhaust: GameObject;

function start(){
    soundPlaying = false;
    isActive = false;
}

function Update () {
   if (isActive){
     this.GetComponent.<Rigidbody>().AddForce(transform.up * thrust);
     Exhaust.gameObject.SetActive(true);
   } else {
     this.GetComponent.<Rigidbody>().AddForce(transform.up * 0);
     Exhaust.gameObject.SetActive(false);
   }
}

function ignition(){
    isActive = true;
    GetComponent.<Renderer>().material.color = Color.red;
    if (!soundPlaying){
        GetComponent.<AudioSource>().Play();
        soundPlaying = true;
    }
    attachedToBooster.GetComponent(Booster).sumBurnRate(burnRate);
    attachedToBooster.GetComponent(Booster).ignition();
}


function shutdown(){
    isActive = false;
    soundPlaying = false;
    GetComponent.<AudioSource>().Stop();
    GetComponent.<Renderer>().material.color = Color.gray;
}
