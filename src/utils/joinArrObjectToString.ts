export const joinArrObjectToString = (array: Record<string, any>[], propToJoin: string) => {
    if(!Array.isArray(array)) return;
    return array.reduce((output, obj) => {
        output += obj[propToJoin] || '';
        return output;
    }, '');
}