export const updateObject = (object, update) => {
    return {
        ...object,
        ...update
    }
}