interface Element {
  domElement: HTMLElement; 
  value: string; 
  type: string;
  classError:string;
  classDone:string; 
  events:string[];
  target: HTMLElement;
}

export class Validation {
  static REGULAR_EXPRESSIONS = {
    login: /^[a-zA-Zа-яА-Я?!@#$%^&*??0-9?]{2,20}$/,
    phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
    email:
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    name: /^[a-zA-Zа-яА-Я]{2,20}$/,
    password:
    /^(?=.*\d)\w{3,20}$/m,
  };
  private elements: Element[];
  public status: boolean
  constructor(elements: Element[]) {
    this.elements = elements;
    this.status = true
  }
  getValidStatus(values){
    for(let key in values){
      if( !this.getResult(values[key].type, values[key].value)){
        return false
      }
      
    }
    return true
  },
  getResult(type:string, value:string):boolean {
    return Validation.REGULAR_EXPRESSIONS[type].test(
      value
    );
  }
  handleValidation(element:Element, value:string) {
      const result = this.getResult(element.type, value);
      const target = element.target ? element.target : element.domElement
      if (!result) {
        target.classList.remove(element.classDone);
        target.classList.add(element.classError);
      }
      if (result) {
        target.classList.remove(element.classError);
        target.classList.add(element.classDone);
      }
    },
  setValidation(flag:boolean) {
    this.elements.forEach((element) => {
      element.events.forEach((event) => {
        if(!flag){
          element.domElement.removeEventListener(event, (e:unknown) =>
          this.handleValidation(element, e.target.value))
        }else{
          element.domElement.addEventListener(event, (e:unknown) =>
          this.handleValidation(element, e.target.value)
        );
        }
        
      });
    });
  }

  on() {
    this.setValidation(true);
  }
  off(){
    this.setValidation(false);
  }
  }
}
