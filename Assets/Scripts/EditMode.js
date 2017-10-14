#pragma strict

var hitTarget: GameObject;
var isMouseDragging: boolean;
var offsetValue: Vector3;
var positionOfScreen: Vector3;

var draggingObject: GameObject;

var rocket: GameObject;
var storage: GameObject;
var player: GameObject;


var isEditMode: boolean = false;


function Start () {
    rocket = GameObject.Find("Rocket");
    player = GameObject.Find("Player");

    // storage = GameObject.Find("Storage").gameObject;
    // storage.<Collider>().enabled = false;
}

function Update () {
	if (Input.GetMouseButtonDown(0)){
        hitTarget = ReturnHitObject();
        if (hitTarget != null){
			draggingObject = hitTarget;
            isMouseDragging = true;
            positionOfScreen = Camera.main.WorldToScreenPoint(hitTarget.transform.position);
            offsetValue = hitTarget.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, positionOfScreen.z));
        }
        // storage.GetComponent.<Collider>().enabled = false;
    } else if (Input.GetMouseButtonUp(0)){
		hitTarget = null;
        hitTarget = ReturnHitObject();
        isMouseDragging = false;
		// if (hitTarget.name == "Joint"){
		// 	attachToRocket(draggingObject, hitTarget);
		// }
		// if (hitTarget.name == "store"){
		// 	attachToRocket(draggingObject, hitTarget);
		// }
    //     if (hitTarget.name == "sell"){
    //         sellPart(draggingObject);
    //     } if (hitTarget.name == null) {
    //         return;
    //     }
    }
}



//Return object that currently under pointer
function ReturnHitObject(){
    var target: GameObject;
    var hit : RaycastHit;
    var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    if (Physics.Raycast(ray.origin, ray.direction * 10, hit)){
        target = hit.collider.gameObject;
    }
    return target;
}


function attachToRocket(obj, toAnchr) {
    var object: GameObject = obj;
    var toAnchor: GameObject = toAnchr;
    var targetObject: GameObject = toAnchor.transform.parent.gameObject;

    //placing object in rocket's hierarchy
	object.transform.parent = GameObject.Find("Rocket").transform;
    object.transform.localScale = Vector3(1,1,1);

    var selfAnchor = object.GetComponent(Part).joint;

    if (toAnchor.GetComponent(joint).facing == "right" || "left" && object.GetComponent(Part).partType == "Booster" ){
        selfAnchor = object.GetComponent(Booster).sideJoint;
        if (selfAnchor.GetComponent(joint).facing == "left"){
            object.transform.rotation.y = 180;
        }
    }

    toAnchor.GetComponent(joint).inUse = true;
    selfAnchor.GetComponent(joint).inUse = true;

    object.GetComponent(Part).attached = true;

    //aligning joints
    object.transform.position = toAnchor.transform.position;
    var yDistance = toAnchor.transform.position.y - selfAnchor.transform.position.y;
    object.transform.position.y = object.transform.position.y + yDistance;

    var joint: ConfigurableJoint;
    joint = object.GetComponent.<ConfigurableJoint>();
    joint.connectedBody = targetObject.GetComponent.<Rigidbody>();

}


function sellPart(object: GameObject){
    object.SetActive(false);
    var price = object.GetComponent(Part).price;
    var balance = player.GetComponent(Player).ethereum;
    Debug.Log(price);
    Debug.Log(balance);
    player.GetComponent(Player).ethereum = balance + price;
}

function DetachFromRocket(object: GameObject) {
	object.transform.parent = null;
}
