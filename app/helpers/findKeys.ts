type Path = (string | number)[];

function penetrateJson(data: any|string, target: string, path: Path = []): Path[] {
    let result: Path[] = [];

    if (typeof data === 'string' || typeof data === 'number') {
        return data === target ? [path] : [];
    }

    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            for (let index = 0; index < data.length; index++) {
                let currentPath = [...path, index];
                result = result.concat(penetrateJson(data[index], target, currentPath));
            }
        } else {
            if (data !== null) {
                Object.keys(data).forEach(key => {
                    let currentPath = [...path, key];
                    if (key === target) {
                        result.push(currentPath);
                    }
                    result = result.concat(penetrateJson(data[key], target, currentPath));
                });
            }
        }
    }
    

    return result;
}

function processResult(result:Path[]) {
    let final_list:Array<string>=[]
    console.log("result is", result)
    result.forEach(inner_arr=> {
        console.log("inner ar",inner_arr)
        let path = '';
        let faced_integer = false;

        for (let j = inner_arr.length - 1; j >= 0; j--) {
            if (typeof inner_arr[j] === 'number') {
                path = '[' + inner_arr[j] + '].' + path;
                faced_integer = true;
            } else {
                if (faced_integer || j === inner_arr.length - 1) {
                    path = inner_arr[j] + path;
                    faced_integer = false;
                } else {
                    path = inner_arr[j] + '.' + path;
                    faced_integer = false;
                }
            }
        }
        path='$.'+path
        final_list.push(path)
        
    });
    console.log("final list length", final_list.length)
    return final_list
}

// Example usage:
const data = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        zip: 10001,
        coordinates: [40.7128, -74.0060]
    },
    hobbies: ['Reading', 'Music']
};



export function findKeys(data:any, target:string, path:Path=[]):Path{
    return processResult(penetrateJson(data, target, path))
}


console.log( findKeys(data, "name"))
