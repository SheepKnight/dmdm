class ManagerBehavior extends Sup.Behavior{
  private lastPauseStatus : boolean = false;
  private player = Sup.getActor("Player");
  private lane1 = Sup.getActor("Lane1");
  private lane2 = Sup.getActor("Lane2");
  private lane3 = Sup.getActor("Lane3");
  private targetLane : number = 0;
  //0 means no target
  private currentLane : number = 1
  private phone = Sup.getActor("Phone");
  private phoneState : number = 0;
  
  //0 is for hidden
  //1 is for open
  //2 is for opening
  //3 is for closing
  
  private phoneCooldown : number = 0;
  private phoneSpeed : number = 10;
  
  private playerCooldown : number = 0;
  private playerSpeed : number = 15;

  awake() {
    this.lane1 = Sup.getActor("Lane1");
    this.lane2 = Sup.getActor("Lane2");
    this.lane3 = Sup.getActor("Lane3");
    this.player = Sup.getActor("Player");
  }

  onNotPaused() {
    Sup.log(this.player.getZ())
    //Sup.log(this.player.getZ())
    //tracing ray and checking if it touches the phone or the player.
    let ray = new Sup.Math.Ray();
    ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    let hitPhone = ray.intersectActor(this.phone);
    let hitLane1 = ray.intersectActor(this.lane1)
    let hitLane2 = ray.intersectActor(this.lane2)
    let hitLane3 = ray.intersectActor(this.lane3)
    
    this.player.setZ( -1 + -2 * this.currentLane - (this.currentLane - this.targetLane)*2*(this.playerCooldown / this.playerSpeed) )
    
    if(this.playerCooldown == 0){
      this.player.setZ( -1 + -2*this.currentLane  )
    
      if(this.targetLane != 0){
        this.currentLane = this.targetLane
        this.targetLane = 0;
      }
        if(Sup.Input.wasMouseButtonJustReleased(0)){
      
        if(hitLane1.length != 0){
          this.targetLane = 1;
          this.playerCooldown = this.playerSpeed;
        }

        if(hitLane2.length != 0){
          this.targetLane = 2;
          this.playerCooldown = this.playerSpeed;
        }

        if(hitLane3.length != 0){
          this.targetLane = 3;
          this.playerCooldown = this.playerSpeed;
        }
        
      }
      
    }else{
 
      this.playerCooldown--;
      
    }
    
    
    if(hitPhone.length != 0){

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
      this.phone.setY(-4);
    }
    if(this.phoneState == 1){
      this.phone.setY(0) 
    }
    if(this.phoneState == 2){
      this.phone.setY(-4*(this.phoneCooldown / this.phoneSpeed))
    }
    if(this.phoneState == 3){
      this.phone.setY(-4+4*(this.phoneCooldown / this.phoneSpeed)) 
    }
  }
  
  update() {
    this.whateverPause()
    if(Game.isPaused == true){
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
      
      let screen = Sup.Input.getScreenSize()
      
      //Sup.getActor("AppCameras").camera.setViewport(0.5,0,0.5,1);
      
    }else{
      
      Sup.getActor("AppCameras").camera.setViewport(0,0,0,0);
    }
    
  }
}
Sup.registerBehavior(ManagerBehavior);
