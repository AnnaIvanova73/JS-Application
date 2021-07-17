export const appendElement = (container, child) => {
    container.appendChild(child);
};

export const removeChildren  = (container) => {
    Array.from(container.childNodes).forEach(e => e.remove());
};