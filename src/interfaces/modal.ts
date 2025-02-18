export interface ModalMessage {
  title?: string;
  content: string;
  headerBackground?: string;
}

export enum ModalHeaderBackground {
  warning = 'warning',
  error = 'error',
  //   warning = '#ffc107',
  //   error = '#de4701',
}
