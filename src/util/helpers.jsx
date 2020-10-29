export const updateObject = (object, update) => {
    // console.log({...object , ...update}, 'store Updated');
    return {
        ...object,
        ...update
    }
}