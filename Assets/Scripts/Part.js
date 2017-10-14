var partType: String;

var dragable: boolean;
var isDragging: boolean;
var attached: boolean;
var stage: int;

var price: int;
var level: int;

var defaultPosition: Vector3;
var defaultRotation: Quaternion;

var joint: GameObject;


function OnMouseDrag(){
    var game = GameObject.Find("Game").GetComponent(Game);
    if (dragable && game.isEditMode){
        isDragging = true;
        var distanceToScreen = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        transform.position = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, distanceToScreen ));
    }
}

function OnMouseUp(){
    isDragging = false;
}

function Update () {
    if (isDragging){
        this.GetComponent.<Collider>().enabled = false;
        this.GetComponent.<ConfigurableJoint>().connectedBody = null;
    } else {
        this.GetComponent.<Collider>().enabled = true;
    }
}
