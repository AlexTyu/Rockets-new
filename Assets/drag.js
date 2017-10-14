var dragable: boolean;
var isDragging: boolean;

function OnMouseDrag(){
    if (dragable){
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
    } else {
        this.GetComponent.<Collider>().enabled = true;
    }
}
