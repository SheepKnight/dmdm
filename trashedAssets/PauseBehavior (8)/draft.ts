class PauseBehavior extends Sup.Behavior {
  
  awake() {
    
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
  
  onNotPaused(){
    
  }
  
  whateverPause(){
    
  }
}
Sup.registerBehavior(PauseBehavior);