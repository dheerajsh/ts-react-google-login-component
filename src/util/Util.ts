/**
 * load a script into the browser and call callback when loading done.
 * @param source full path of the the js script.
 * @param callback callback to be called when loading done.
 */
export function getScript(source: string, callback: () => void): void {
    const el = document.createElement('script')
    el.addEventListener('load', callback)
    el.setAttribute('src', source)

    document.body.appendChild(el)
}
