export enum ModalHeaderBackground {
  warning = 'warning',
  error = 'error',
  success = 'success',
}

export interface RedirectPath {
  pathName: string;
  buttonText: string;
}

export interface ModalMessage {
  title?: string;
  content: string;
  headerBackground?: ModalHeaderBackground;
  closeText?: string;
  saveText?: string;
  redirectPath?: RedirectPath;
}
