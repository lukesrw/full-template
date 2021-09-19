export function debounce(
    func: Function,
    ms: number,
    is_immediate: boolean = false
) {
    let timeoutId: number | undefined;

    return function (this: Function) {
        var that = this;
        var args = arguments;
        var callback = function () {
            timeoutId = undefined;

            if (!is_immediate) {
                func.apply(that, args);
            }
        };
        var is_now = is_immediate && !timeoutId;

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(callback, ms);

        if (is_now) func.apply(that, args);
    };
}
