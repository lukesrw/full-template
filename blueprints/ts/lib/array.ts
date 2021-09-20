export async function forEachAsync<Type>(
    array: Type[],
    forEach: (item: Type, index: number, array: Type[]) => Promise<void>
) {
    for (let index = 0; index < array.length; index += 1) {
        await forEach(array[index], index, array);
    }
}
