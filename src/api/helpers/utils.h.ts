
/** 
 * checks if the object has any undefiend properties
 * @param {any} object
 */
export function hasUndefined(obj : any) : boolean{
    
    if(obj === undefined)
        return true;

    for(var p in obj) {
      if(obj[p] === undefined){
        return true;
      }
    }
    
    return false;
  }