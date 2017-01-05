class ManagerBehavior extends Sup.Behavior{
  private lastPauseStatus : boolean = false;
  
  private Game = {
  options : {},
  isPaused : false,
  };
  
  getInfos(property :string){
  return(this.Game[property])
  }

  private phone = Sup.getActor("Phone");
  private phoneState : number = 0;
  //0 is for hidden
  //1 is for open
  //2 is for opening
  //3 is for closing
  
  private phoneCooldown : number = 0;
  private phoneSpeed : number = 10;
  
  awake() {
    
  }

  onNotPaused() {
    //tracing ray and checking if it touches the phone.
    let ray = new Sup.Math.Ray();
    ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    let hit = ray.intersectActor(this.phone)
    if(hit.length != 0){

      if(Sup.Input.wasMouseButtonJustReleased(0) && this.phoneState != 2 && this.phoneState != 3){
        //Opening or closing (beginning).
        this.phoneCooldown = this.phoneSpeed;
        if(this.phoneState == 1){
          this.phoneState = 3;
        }else if(this.phoneState == 0){
          this.phoneState = 2;
        }
      }
    }
    //Lowering the cooldown.
    if(this.phoneCooldown !=0){
      this.phoneCooldown--; 
    }
    //finishing the opening or the closing action.
    if(this.phoneState == 2 || this.phoneState == 3){
      if(this.phoneCooldown == 0){
        if(this.phoneState == 2){
          this.phoneState = 1; 
        }
        if(this.phoneState == 3){
          this.phoneState = 0;   
        }
      }
      
    }
    //Set the position of the phone
    if(this.phoneState == 0){
      this.phone.setY(-7.5);
    }
    if(this.phoneState == 1){
      this.phone.setY(0) 
    }
    if(this.phoneState == 2){
      this.phone.setY(-7.5*(this.phoneCooldown / this.phoneSpeed))
    }
    if(this.phoneState == 3){
      this.phone.setY(-7.5+7.5*(this.phoneCooldown / this.phoneSpeed)) 
    }
  }
  update() {
    this.whateverPause()
    if(Sup.getActor("Manager").getBehavior(ManagerBehavior).getInfos("isPaused") == true){
      if(this.lastPauseStatus == false){
        this.onStartPause()
      }
      this.onPaused()
    }else{
      this.onNotPaused()
      if(this.lastPauseStatus == true){
        this.onEndPause()
      }
    }
  }
  
  onPaused(){
    
  }
  
  onEndPause(){
    
  }
  
  onStartPause(){
    
  }
  whateverPause(){
    
    if(this.phoneState == 1){
      
      Sup.getActor("AppCameras").camera.setViewport(0.655,0.2,0.1,0.1);
      
    }else{
      
      Sup.getActor("AppCameras").camera.setViewport(0,0,0,0);
    }
    
  }
}
Sup.registerBehavior(ManagerBehavior);
