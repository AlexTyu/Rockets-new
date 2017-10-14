var isDragging: boolean;
var startDragPoint: Vector3;

var position: Vector3;

var nextPosition: Vector3;
var moveSpeed: float;

var pocketPosition: Vector3;
var facePosition: Vector3;


var isActive: boolean;

function OnMouseDrag(){
    if (!isActive){
        var distanceToScreen = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        if (!isDragging){
            startDragPoint = Vector3(Input.mousePosition.x, Input.mousePosition.y, distanceToScreen );
        }
        var movedX = startDragPoint.x - Input.mousePosition.x;
        var movedY = startDragPoint.y - Input.mousePosition.y;
        isDragging = true;
        transform.localPosition = Vector3(position.x - movedX * 0.001, position.y - movedY * 0.001, distanceToScreen);
    }
}

function OnMouseUp(){
    if (!isActive){
        isDragging = false;
        if (Input.mousePosition.x < 300){
                isActive = true;
                position = facePosition;
                nextPosition = facePosition;
                transform.rotation.x = 0;
            }   
        if (Input.mousePosition.x > 300){
                isActive = false;
                position = pocketPosition;
                nextPosition = pocketPosition;
                transform.rotation.x = -13;
        }
    }
}


function Update () {
      var time = Time.deltaTime;
      transform.localPosition = Vector3.Lerp(transform.localPosition, nextPosition, time * moveSpeed);
}

function Start(){
        moveSpeed = 3;
        facePosition = Vector3(0, 0, 1);
        pocketPosition = Vector3(0.4, -0.6, 1.75);
        position = pocketPosition;
        nextPosition = position;
}


