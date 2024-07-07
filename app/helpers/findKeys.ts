type Path = (string | number|object)[];

export class PathManager {

  
  private final_keys: Set<string>;

  constructor(){
    this.final_keys=new Set()
  }

  getKeys(): Set<string> {
    return this.final_keys;
  }

  clearKeys() {
    this.final_keys.clear();
  }

  penetrateJson(data: any | string, target: string, path: Path = []): Path[] {
    let result: Path[] = [];

    if (typeof data === 'string') {
      try {
        const parsedData = JSON.parse(data);
        result = result.concat(this.penetrateJson(parsedData, target, path));
      } catch (error) {
      }
    } else if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        for (let index = 0; index < data.length; index++) {
          let currentPath = [...path, index];
          result = result.concat(this.penetrateJson(data[index], target, currentPath));
        }
      } else {
        Object.keys(data).forEach(key => {
          let currentPath = [...path, key];
          // Assuming keyManager is an instance of KeyManager
          // this.final_keys.add(key);

          if (key === target) {
            currentPath.push(data[key]);
            result.push(currentPath);
          }
          result = result.concat(this.penetrateJson(data[key], target, currentPath));
        });
      }
    } else if (data === target) {
      result.push(path);
    }
    return result;
  }


  fetchKeys(data: any | string, target: string) {
    if (typeof data === 'string') {
      try {
        const parsedData = JSON.parse(data);
        this.penetrateJson(parsedData, target)
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        for (let index = 0; index < data.length; index++) {
          this.penetrateJson(data[index], target)
        }
      } else {
        Object.keys(data).forEach(key => {
          this.final_keys.add(key);
          this.penetrateJson(data[key], target)
        });
      }
    } 
  }
}


export function processResultSeperately(inner_arr: Array<string|number|object>) {
  let path = '';
  let faced_integer = false;

  for (let j = inner_arr.length - 2; j >= 0; j--) {
    if (typeof inner_arr[j] === 'number') {
      path = '[' + inner_arr[j] + '].' + path;
      faced_integer = true;
    } else {
      if (faced_integer || j === inner_arr.length - 2) {
        path = inner_arr[j] + path;
        faced_integer = false;
      } else {
        path = inner_arr[j] + '.' + path;
        faced_integer = false;
      }
    }
  }
  path = '$.' + path;
  return path;
}
