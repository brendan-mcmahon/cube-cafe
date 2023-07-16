export default interface AlertModel {
    title: string,
    text: string,
    show: boolean,
    setShow: (open: boolean) => void,
    confirmText: string,
    confirm: () => {},
    cancelText: string,
    cancel: () => {}
}