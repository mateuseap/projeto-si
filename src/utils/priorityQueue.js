class PriorityQueue {
    constructor() {
      this.elements = [];
    }
    
    enqueue(element) {
      let has = false;
   
      for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i][2] > element[2]) {
          this.elements.splice(i, 0, element);
          has = true;
          break;
        }
      }
   
      if (!has) {
        this.elements.push(element);
      }
    }
    
    dequeue() {
      if (this.isEmpty()) return "Queue underflow";
      return this.elements.shift();
    }
    
    front() {
      if (this.isEmpty()) return "Empty queue";
      return this.elements[0];
    }
    
    isEmpty() {
      return this.elements.length == 0;
    }
  }